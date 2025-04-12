import { resolve } from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

import packageJson from './package.json';

const dependencyNames = Object.keys(packageJson.dependencies).sort((a, b) => b.length - a.length);

const alias = [
  {
    find: '@App',
    replacement: resolve(__dirname, 'src/App.tsx')
  },
  {
    find: '@Html',
    replacement: resolve(__dirname, 'src/Html.tsx')
  },
  {
    find: '@activities',
    chunkPath: 'src/activities',
    replacement: resolve(__dirname, 'src/activities')
  },
  {
    find: '@components',
    chunkPath: 'src/components',
    replacement: resolve(__dirname, 'src/components')
  },
  {
    find: '@entities',
    chunkPath: 'src/entities',
    replacement: resolve(__dirname, 'src/entities')
  },
  {
    find: '@hooks',
    chunkPath: 'src/hooks',
    replacement: resolve(__dirname, 'src/hooks')
  },
  {
    find: '@libraries',
    chunkPath: 'src/libraries',
    replacement: resolve(__dirname, 'src/libraries')
  }
];

export default defineConfig({
  build: {
    rollupOptions: {
      input: 'src/client.tsx',
      output: {
        entryFileNames: 'client.js',
        manualChunks: (id) => {
          const dependencyName = dependencyNames.find((dependencyName) =>
            id.includes(dependencyName)
          );

          if (dependencyName) {
            return dependencyName.replace(/\//g, '-');
          }

          return (
            removeExtension(
              getChunkName(id, alias.map(({ chunkPath }) => chunkPath || '').filter(Boolean))
            ) || null
          );
        }
      }
    }
  },
  plugins: [react()],
  resolve: {
    alias: alias.map(({ find, replacement }) => ({
      find,
      replacement
    }))
  }
});

function getChunkName(id: string, finds: string[]) {
  const find = finds.find((find) => id.includes(find));

  if (find) {
    const chunkNameTokens = id.replace(resolve(__dirname, find), '').split('/').filter(Boolean);

    return chunkNameTokens.join('-');
  }
}

function removeExtension(id?: string) {
  return id?.replace(/\.tsx|\.ts|\.mts/g, '');
}
