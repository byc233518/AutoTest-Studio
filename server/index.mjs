import { createServer } from 'node:http';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createApp } from './app.mjs';

function originHost(host) {
  if (host === '0.0.0.0' || host === '::') return 'localhost';
  return host.includes(':') ? `[${host}]` : host;
}

export async function startServer(options = {}) {
  const host = options.host ?? process.env.HOST ?? '0.0.0.0';
  const port = Number(options.port ?? process.env.PORT ?? 3050);
  const app = await createApp(options.appOptions || {});
  const server = createServer(app);

  try {
    await new Promise((resolve, reject) => {
      const onError = (error) => reject(error);
      server.once('error', onError);
      server.listen(port, host, () => {
        server.off('error', onError);
        resolve();
      });
    });
  } catch (error) {
    app.locals.database.close();
    throw error;
  }

  const address = server.address();
  const actualPort = typeof address === 'object' && address ? address.port : port;
  const origin = `http://${originHost(host)}:${actualPort}`;
  let closed = false;

  return {
    app,
    server,
    origin,
    async close() {
      if (closed) return;
      closed = true;
      try {
        await app.locals.shutdown?.();
        await new Promise((resolve, reject) => {
          server.close((error) => error ? reject(error) : resolve());
        });
      } finally {
        app.locals.database.close();
      }
    }
  };
}

const isMainModule = process.argv[1]
  && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (isMainModule) {
  const { origin } = await startServer();
  console.log(`AutoTest Studio 已启动: ${origin}`);
}
