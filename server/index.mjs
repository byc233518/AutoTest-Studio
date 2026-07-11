import { createServer } from 'node:http';
import { createApp } from './app.mjs';

const port = Number(process.env.PORT || 3050);
const host = process.env.HOST || '0.0.0.0';

const app = await createApp();
const server = createServer(app);

server.listen(port, host, () => {
  console.log(`JMOM 自动化测试平台已启动: http://localhost:${port}`);
});
