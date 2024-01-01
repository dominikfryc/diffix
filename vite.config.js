import { defineConfig } from 'vite';
import { extname, relative } from 'path';
import { fileURLToPath, URL } from 'url';
import { glob } from 'glob';
import { copy } from '@web/rollup-plugin-copy';

export default defineConfig({
  build: {
    lib: {
      entry: Object.fromEntries(
        glob
          .sync(['src/index.ts', 'src/components/**/*.ts'], {
            ignore: ['src/**/*.stories.ts', 'src/**/*.test.ts'],
          })
          .map(file => [
            relative('src', file.slice(0, file.length - extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
    },
    rollupOptions: {
      output: [
        {
          chunkFileNames: 'assets/[name]-[hash].js',
        },
      ],
    },
    target: 'esnext',
    sourcemap: true,
  },
  plugins: [copy({ patterns: 'themes/*', exclude: [], rootDir: 'src' })],
});
