# Quick Start - GitHub Actions Workflows

## ✅ What's Set Up

Two automated testing workflows are configured:

### 1. **test.yml** - Runs on every push/PR
- Unit tests
- E2E tests  
- Visual regression
- Accessibility

### 2. **regression-tests.yml** - Runs every Friday at noon UTC
- Full regression suite
- All tests
- Extended artifact retention

## 🚀 First Run

1. **Push to GitHub:**
   ```bash
   git add .github/workflows/
   git commit -m "Add GitHub Actions test workflows"
   git push
   ```

2. **Check Actions tab:**
   - Go to your GitHub repository
   - Click "Actions" tab
   - Watch workflows run

3. **Verify:**
   - All jobs should pass ✅
   - Artifacts should be generated
   - Reports should be downloadable

## 📅 Weekly Regression

The weekly regression runs automatically every **Friday at 12:00 PM UTC**.

To manually trigger:
1. Go to Actions → "Weekly Regression Tests"
2. Click "Run workflow"
3. Select branch
4. Click "Run workflow"

## 🔍 Viewing Results

### Test Results
- Actions tab → Workflow run → Job → View logs

### Coverage Report
- Download `coverage-report-*` artifact
- Extract and open `coverage/index.html`

### Playwright Report
- Download `playwright-report-*` artifact  
- Extract and open `index.html`

## ⚠️ Troubleshooting

### Tests Fail
1. Check workflow logs
2. Review error messages
3. Fix issues locally
4. Push fixes

### Playwright Issues
- Browsers are auto-installed in CI
- No local installation needed
- Check logs if installation fails

### Visual Regression
- Review diff images in artifacts
- Update snapshots if intentional:
  ```bash
  bun run test:e2e:update
  git add tests/
  git commit -m "Update snapshots"
  git push
  ```

## 📊 Status

Add badges to README:
```markdown
![Tests](https://github.com/YOUR_USERNAME/awfixer.vip/workflows/Tests/badge.svg)
```

---

**Ready to use!** Push to GitHub and workflows will run automatically.

