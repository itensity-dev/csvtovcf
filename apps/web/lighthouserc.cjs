// Lighthouse CI: mobile profile (Lighthouse default), budgets from the project brief.
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'pnpm exec astro preview --port 4322 --host localhost',
      startServerReadyPattern: 'localhost:4322',
      url: [
        'http://localhost:4322/',
        'http://localhost:4322/excel-to-vcf/',
        'http://localhost:4322/import-vcf-to-iphone/',
        'http://localhost:4322/ru/',
      ],
      // 3 runs, median run asserted: the first run on a cold CI runner is not representative
      numberOfRuns: 3,
      settings: { chromeFlags: '--no-sandbox --headless=new' },
    },
    assert: {
      aggregationMethod: 'median-run',
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.05 }],
        'total-blocking-time': ['warn', { maxNumericValue: 200 }],
      },
    },
    upload: { target: 'filesystem', outputDir: '.lighthouseci' },
  },
};
