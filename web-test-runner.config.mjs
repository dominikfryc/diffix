import { playwrightLauncher } from '@web/test-runner-playwright';
import { esbuildPlugin } from '@web/dev-server-esbuild';

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  /** Test files to run */
  files: './src/**/*.test.ts',

  /** Resolve bare module imports */
  nodeResolve: true,

  /** Configure coverage */
  coverageConfig: {
    include: ['./src/**/*.ts'],
    reportDir: 'dist/coverage',
  },

  /** Filter out lit dev mode logs */
  filterBrowserLogs(log) {
    const filteredLogs = ['Lit is in dev mode'];
    for (const arg of log.args) {
      if (typeof arg === 'string' && filteredLogs.some(l => arg.includes(l))) {
        return false;
      }
    }
    return true;
  },

  /** Plugins to use */
  plugins: [
    esbuildPlugin({
      ts: true,
      target: 'ESNext',
      tsconfig: './tsconfig.json',
      loaders: { '.css': 'text', '.svg': 'text' },
    }),
  ],

  /** Amount of browsers to run concurrently */
  concurrentBrowsers: 3,

  /** Amount of test files per browser to test concurrently */
  concurrency: 1,

  /** Browsers to run tests on */
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'firefox' }),
    playwrightLauncher({ product: 'webkit' }),
  ],
});
