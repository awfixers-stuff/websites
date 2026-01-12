# Testing Checklist

Use this checklist to ensure comprehensive testing before deploying features.

## Pre-Commit Checklist

- [ ] All unit tests pass (`bun run test:run`)
- [ ] All E2E tests pass (`bun run test:e2e`)
- [ ] No TypeScript errors (`bunx tsc --noEmit`)
- [ ] No linting errors (`bun run lint`)
- [ ] Visual regression tests pass or snapshots updated
- [ ] Accessibility tests pass
- [ ] Coverage meets minimum threshold (aim for >80%)

## Component Testing Checklist

When adding/modifying a component:

- [ ] Unit tests cover:
  - [ ] Component rendering
  - [ ] Props handling
  - [ ] Event handling
  - [ ] Edge cases
  - [ ] Accessibility attributes
- [ ] Visual regression test created/updated
- [ ] Accessibility test created
- [ ] Tested in multiple viewports (mobile, tablet, desktop)
- [ ] Tested with different data states (empty, loading, error, success)

## Visual Regression Testing

Before updating visual snapshots:

- [ ] Review the visual diff carefully
- [ ] Verify changes are intentional
- [ ] Test in multiple browsers (Chrome, Firefox, Safari)
- [ ] Test in multiple viewports
- [ ] Check for layout shifts
- [ ] Verify animations/transitions work correctly

## Accessibility Testing

- [ ] No axe violations
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus indicators visible
- [ ] ARIA labels present where needed

## Performance Testing

- [ ] Component renders quickly (<100ms)
- [ ] No memory leaks
- [ ] Animations are smooth (60fps)
- [ ] Bundle size impact is acceptable

## Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Common Issues to Watch For

### Visual Regressions
- Layout shifts
- Color changes
- Font rendering differences
- Spacing inconsistencies
- Animation timing issues

### Functional Issues
- Event handlers not firing
- State not updating correctly
- Props not being applied
- Slots not rendering
- Computed properties not recalculating

### Accessibility Issues
- Missing ARIA labels
- Poor keyboard navigation
- Low color contrast
- Missing focus indicators
- Screen reader incompatibilities

## Running Full Test Suite

```bash
# Run everything
bun run test:all

# For CI
bun run test:ci
```

## Updating Snapshots

When visual changes are intentional:

```bash
# Update all visual snapshots
bun run test:e2e:update

# Review changes in Playwright report
bun run test:e2e:ui
```

