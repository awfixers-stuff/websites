# GitHub Actions Testing Workflows

## ✅ Setup Complete

Comprehensive GitHub Actions workflows have been configured to run all tests automatically.

## 📋 Workflows

### 1. **test.yml** - Continuous Testing

Runs on every push and pull request.

**Triggers:**
- ✅ Push to any branch
- ✅ Pull requests to any branch
- ✅ Manual dispatch (workflow_dispatch)

**Test Jobs:**
1. **Unit Tests**
   - Linting
   - Type checking
   - Unit tests with Vitest
   - Coverage generation

2. **E2E Tests**
   - Full Playwright E2E test suite
   - All browsers (Chromium, Firefox, WebKit)
   - Mobile viewports

3. **Visual Regression Tests**
   - Visual regression test suite
   - Screenshot comparison
   - Visual diff detection

4. **Accessibility Tests**
   - Automated a11y checks with axe-core
   - WCAG compliance testing
   - Keyboard navigation tests

5. **Test Summary**
   - Aggregates all test results
   - Provides overall status

### 2. **regression-tests.yml** - Weekly Regression Suite

Runs comprehensive regression testing every Friday at noon UTC.

**Schedule:**
- **Every Friday at 12:00 PM UTC**
- Cron: `0 12 * * 5`
- Can be manually triggered

**What it tests:**
- ✅ All unit tests with coverage
- ✅ All E2E tests (all browsers)
- ✅ Visual regression tests
- ✅ Accessibility tests
- ✅ Type checking
- ✅ Linting

**Artifacts Retention:**
- 90 days (longer than regular tests for trend analysis)

## 🕐 Timezone Information

GitHub Actions uses **UTC timezone**. The weekly regression runs at:

- **12:00 PM UTC** (Friday)
- **7:00 AM EST** (Friday)
- **4:00 AM PST** (Friday)
- **1:00 PM CET** (Friday)
- **9:00 PM JST** (Friday)

## 📦 Artifacts

All workflows generate downloadable artifacts:

### Regular Tests (test.yml)
- Coverage reports (30 days)
- Playwright HTML reports (30 days)
- Test screenshots on failure (7 days)
- Test traces on failure (7 days)

### Weekly Regression (regression-tests.yml)
- Coverage reports (90 days)
- Playwright reports (90 days)
- All test results (90 days)

## 🚀 How It Works

### On Push/PR
1. Code is checked out
2. Bun is set up
3. Dependencies are installed
4. Tests run in parallel:
   - Unit tests
   - E2E tests
   - Visual regression
   - Accessibility
5. Results are aggregated
6. Artifacts are uploaded

### Weekly Regression
1. Runs every Friday at noon UTC
2. Executes full test suite
3. Generates comprehensive reports
4. Stores artifacts for 90 days
5. Creates summary in workflow run

## 🔍 Viewing Results

### In GitHub
1. Go to **Actions** tab
2. Click on a workflow run
3. Click on individual jobs to see logs
4. Download artifacts for detailed reports

### Coverage Reports
1. Download `coverage-report-*` artifact
2. Extract the zip file
3. Open `coverage/index.html` in browser
4. View line-by-line coverage

### Playwright Reports
1. Download `playwright-report-*` artifact
2. Extract the zip file
3. Open `index.html` in browser
4. View:
   - Test results
   - Screenshots
   - Traces
   - Video recordings

## 🛠️ Manual Triggering

You can manually trigger any workflow:

1. Go to **Actions** tab in GitHub
2. Select the workflow (e.g., "Tests" or "Weekly Regression Tests")
3. Click **Run workflow** button (top right)
4. Select branch
5. Click **Run workflow**

## 🐛 Troubleshooting

### Tests Failing in CI

1. **Check workflow logs**
   - Go to Actions → Failed workflow → Failed job
   - Review error messages

2. **Common issues:**
   - Missing dependencies → Check `bun install` step
   - Playwright browsers not installed → Check installation step
   - Visual regression failures → Review diff images in artifacts
   - Timeout issues → Check test duration

3. **Local reproduction:**
   ```bash
   # Run the same commands locally
   bun install --frozen-lockfile
   bunx playwright install --with-deps
   bun run test:ci
   ```

### Playwright Browser Issues

The workflows install browsers with:
```bash
bunx playwright install --with-deps
```

This installs:
- Chromium
- Firefox  
- WebKit
- System dependencies

If this fails, check the workflow logs for specific errors.

### Visual Regression Failures

1. Download `visual-diffs-*` artifact
2. Review the diff images
3. If changes are intentional:
   ```bash
   # Update snapshots locally
   bun run test:e2e:update
   # Commit and push
   git add tests/
   git commit -m "Update visual regression snapshots"
   git push
   ```

### Timeout Issues

If tests timeout:
- Check for long-running tests
- Review test parallelization
- Increase timeout in workflow (currently 15-30 minutes)

## 📊 Status Badges

Add these to your README.md:

```markdown
![Tests](https://github.com/YOUR_USERNAME/awfixer.vip/workflows/Tests/badge.svg)
![Weekly Regression](https://github.com/YOUR_USERNAME/awfixer.vip/workflows/Weekly%20Regression%20Tests/badge.svg)
```

Replace `YOUR_USERNAME` with your GitHub username.

## ✨ Benefits

1. **Automated Quality Checks** - Every push is tested
2. **Early Detection** - Catch issues before they reach production
3. **Visual Regression** - Prevent UI breakage
4. **Accessibility** - Ensure inclusive design
5. **Weekly Regression** - Comprehensive testing on schedule
6. **Historical Data** - 90-day artifact retention for trends

## 📝 Notes

- All workflows run on `ubuntu-latest` runners
- Playwright browsers are installed in CI (not required locally)
- Tests run in parallel for faster execution
- Artifacts are automatically cleaned up after retention period
- Workflows can be manually triggered for ad-hoc testing

## 🎯 Next Steps

1. **Push to GitHub** - Workflows will run automatically
2. **Check Actions tab** - Verify workflows are running
3. **Review first run** - Ensure all tests pass
4. **Set up notifications** - Get notified of test failures
5. **Add status badges** - Show test status in README

---

**Setup Date:** $(date)
**Status:** ✅ Ready to use

