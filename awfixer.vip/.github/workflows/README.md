# GitHub Actions Workflows

This directory contains automated testing workflows for the project.

## Workflows

### 1. `test.yml` - Continuous Testing

Runs on every push and pull request to ensure code quality.

**Triggers:**
- Push to any branch
- Pull requests to any branch
- Manual dispatch

**Jobs:**
- **Unit Tests**: Runs Vitest unit tests with coverage
- **E2E Tests**: Runs Playwright end-to-end tests
- **Visual Regression**: Runs visual regression tests
- **Accessibility Tests**: Runs accessibility checks with axe-core
- **Test Summary**: Aggregates results from all test jobs

**Artifacts:**
- Coverage reports (30 days retention)
- Playwright HTML reports (30 days retention)
- Test screenshots on failure (7 days retention)
- Test traces on failure (7 days retention)

### 2. `regression-tests.yml` - Weekly Regression Suite

Runs comprehensive regression testing every Friday at noon UTC.

**Triggers:**
- Scheduled: Every Friday at 12:00 PM UTC
- Manual dispatch

**What it tests:**
- All unit tests with coverage
- All E2E tests across all browsers
- Visual regression tests
- Accessibility tests
- Type checking
- Linting

**Artifacts:**
- Coverage reports (90 days retention)
- Playwright reports (90 days retention)
- All test results (90 days retention)

## Timezone Note

GitHub Actions uses UTC timezone. The weekly regression tests run at:
- **12:00 PM UTC** (Friday)
- Convert to your local timezone:
  - EST: 7:00 AM
  - PST: 4:00 AM
  - CET: 1:00 PM
  - JST: 9:00 PM

## Manual Triggering

You can manually trigger any workflow:
1. Go to the "Actions" tab in GitHub
2. Select the workflow
3. Click "Run workflow"
4. Choose the branch and click "Run workflow"

## Viewing Results

### Test Reports
1. Go to the "Actions" tab
2. Click on a workflow run
3. Click on a job to see detailed logs
4. Download artifacts for HTML reports

### Coverage Reports
1. Download the `coverage-report-*` artifact
2. Extract and open `index.html` in a browser
3. View line-by-line coverage

### Playwright Reports
1. Download the `playwright-report-*` artifact
2. Extract and open `index.html` in a browser
3. View test results, screenshots, and traces

## Troubleshooting

### Tests Failing in CI but Passing Locally

1. Check the workflow logs for specific errors
2. Verify Playwright browsers are installed: `bunx playwright install --with-deps`
3. Check environment variables are set correctly
4. Review visual regression diffs in artifacts

### Playwright Browser Installation Issues

The workflows use `bunx playwright install --with-deps` which installs:
- Chromium
- Firefox
- WebKit
- System dependencies

If installation fails, check the workflow logs for specific errors.

### Visual Regression Failures

1. Download the `visual-diffs-*` artifact
2. Review the diff images
3. If changes are intentional:
   - Update snapshots locally: `bun run test:e2e:update`
   - Commit the updated snapshots
   - Push to trigger new tests

### Timeout Issues

If tests timeout:
- Check for long-running tests
- Review test parallelization settings
- Consider increasing timeout in workflow files

## Workflow Status Badge

Add this to your README.md to show test status:

```markdown
![Tests](https://github.com/your-username/awfixer.vip/workflows/Tests/badge.svg)
![Weekly Regression](https://github.com/your-username/awfixer.vip/workflows/Weekly%20Regression%20Tests/badge.svg)
```

Replace `your-username` with your GitHub username.

