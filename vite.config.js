import { defineConfig } from 'vite';
import { extname, relative } from 'path';
import { fileURLToPath, URL } from 'url';
import { glob } from 'glob';
import { copy } from '@web/rollup-plugin-copy';

export default defineConfig({
  build: {
    lib: {
      formats: ['es'],
      entry: Object.fromEntries(
        glob
          .sync(['src/**/*.ts'], {
            ignore: ['src/**/*.stories.ts', 'src/**/*.test.ts'],
          })
          .map(file => [
            relative('src', file.slice(0, file.length - extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
    },
    rollupOptions: {
      external: [/^lit/, /^@open-wc/],
      output: {
        hoistTransitiveImports: false,
      },
    },
    target: 'esnext',
    sourcemap: true,
  },
  plugins: [copy({ patterns: 'themes/**/*', exclude: [], rootDir: 'src' })],
});
