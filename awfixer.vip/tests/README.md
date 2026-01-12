# Testing Guide

This project uses a comprehensive testing setup with Vitest for unit tests and Playwright for E2E and visual regression tests.

## Test Structure

```
tests/
├── components/          # Unit tests for Vue components
│   ├── Magnet.test.ts
│   └── ui/             # UI component tests
├── e2e/                # End-to-end and visual regression tests
│   ├── magnet.visual.spec.ts
│   ├── visual-regression.spec.ts
│   └── accessibility.spec.ts
├── utils/              # Test utilities and helpers
│   └── test-utils.ts
└── setup.ts            # Global test setup
```

## Running Tests

### Unit Tests (Vitest)

```bash
# Run tests in watch mode
bun run test

# Run tests once
bun run test:run

# Run tests with UI
bun run test:ui

# Run tests with coverage
bun run test:coverage

# Run tests in watch mode
bun run test:watch
```

### E2E Tests (Playwright)

```bash
# Run all E2E tests
bun run test:e2e

# Run E2E tests with UI
bun run test:e2e:ui

# Debug E2E tests
bun run test:e2e:debug

# Update visual regression snapshots
bun run test:e2e:update

# Install Playwright browsers (first time only)
bun run playwright:install
```

### All Tests

```bash
# Run all tests (unit + E2E)
bun run test:all

# Run all tests for CI
bun run test:ci
```

## Writing Tests

### Unit Tests

Example unit test for a Vue component:

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from '@/components/MyComponent.vue'

describe('MyComponent', () => {
  it('renders correctly', () => {
    const wrapper = mount(MyComponent, {
      props: {
        title: 'Test Title',
      },
    })
    expect(wrapper.text()).toContain('Test Title')
  })
})
```

### Visual Regression Tests

Example visual regression test:

```typescript
import { test, expect } from '@playwright/test'

test('component visual regression', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveScreenshot('component.png')
})
```

### Accessibility Tests

Example accessibility test:

```typescript
import { test } from '@playwright/test'
import { injectAxe, checkA11y } from 'axe-playwright'

test('page is accessible', async ({ page }) => {
  await page.goto('/')
  await injectAxe(page)
  await checkA11y(page)
})
```

## Visual Regression Testing

Visual regression tests capture screenshots of your components and pages. When you make changes:

1. Run `bun run test:e2e` to see if visual changes are detected
2. If changes are intentional, update snapshots with `bun run test:e2e:update`
3. Review the changes in the Playwright HTML report

## Coverage

Coverage reports are generated in the `coverage/` directory. Open `coverage/index.html` in a browser to view the detailed coverage report.

## CI/CD Integration

For CI/CD pipelines, use:

```bash
bun run test:ci
```

This runs all tests with coverage and is optimized for CI environments.

## Troubleshooting

### Tests failing due to timing issues

Add appropriate waits:

```typescript
await page.waitForLoadState('networkidle')
await page.waitForTimeout(1000) // For animations
```

### Visual regression tests failing

1. Review the diff images in `tests/test-results/`
2. If changes are intentional, update snapshots: `bun run test:e2e:update`
3. Check viewport sizes match between runs

### Playwright browsers not installed

Run: `bun run playwright:install`

