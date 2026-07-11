import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';

export default defineConfig({
  root: 'frontend',
  plugins: [vue()],
  build: { outDir: path.resolve(__dirname, 'web-dist'), emptyOutDir: true },
  server: { port: 5173, proxy: { '/api': 'http://localhost:3050', '/reports': 'http://localhost:3050' } }
});
