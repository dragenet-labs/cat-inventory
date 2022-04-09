import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [svgrPlugin(), react()],
  resolve: {
    alias: [{ find: 'src', replacement: path.resolve(__dirname, 'src') }]
  }
});
