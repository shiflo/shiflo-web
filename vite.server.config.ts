import { resolve } from 'path';

import devServer from '@hono/vite-dev-server';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: ['src/server.tsx', 'api/_routes.ts'],
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name.indexOf('_routes') !== -1) {
            return 'routes.js';
          }
          return '[name].js';
        }
      }
    },
    ssr: true
  },
  plugins: [
    devServer({
      entry: 'api/index.ts',
      injectClientScript: false
    })
  ],
  resolve: {
    alias: [
      {
        find: '@api',
        replacement: resolve(__dirname, 'api')
      },
      {
        find: '@server',
        replacement: resolve(__dirname, 'src/server.tsx')
      },
      {
        find: '@activities',
        replacement: resolve(__dirname, 'src/activities')
      },
      {
        find: '@components',
        replacement: resolve(__dirname, 'src/components')
      },
      {
        find: '@entities',
        replacement: resolve(__dirname, 'src/entities')
      },
      {
        find: '@hooks',
        replacement: resolve(__dirname, 'src/hooks')
      },
      {
        find: '@libraries',
        replacement: resolve(__dirname, 'src/libraries')
      }
    ]
  }
});
