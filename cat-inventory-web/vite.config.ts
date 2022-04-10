import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import svgrPlugin from 'vite-plugin-svgr';
import * as dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
const options = { path: path.resolve(process.cwd(), '../my-inventory-backend', envFile) };
dotenv.config(options);

export default defineConfig({
  plugins: [svgrPlugin(), react()],
  resolve: {
    alias: [
      { find: 'src', replacement: path.resolve(__dirname, 'src') },
      {
        find: 'my-inventory-common',
        replacement: path.resolve(__dirname, 'node_modules/my-inventory-common/dist')
      }
    ]
  },
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.PORT}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
