# Migration Plan: Node.js + pnpm + Railway → Bun + Bun + Vercel

## Executive Summary

This plan outlines the migration of the awfixer-wiki documentation site from Node.js 20 + pnpm 8.10.2 on Railway to Bun 1.x runtime on Vercel. The migration will be executed in phases to minimize downtime and ensure stability.

**Current Stack:**
- Runtime: Node.js 20
- Package Manager: pnpm 8.10.2
- Framework: Next.js 15.5.9
- Hosting: Railway
- Build System: Railpack

**Target Stack:**
- Runtime: Bun 1.x
- Package Manager: Bun 1.x
- Framework: Next.js 15.5.9
- Hosting: Vercel
- Build System: Vercel Build Engine

---

## Phase 1: Preparation (Day 1-2)

### 1.1 Environment Setup
- [ ] Install Bun locally
- [ ] Create development branch `migration/bun-vercel`
- [ ] Backup current Railway configuration
- [ ] Document current environment variables and secrets

### 1.2 Dependency Analysis
Based on our analysis, the following dependencies need attention:

**High Priority (Potential Issues):**
- `next-contentlayer@0.3.4` - Has Next.js 15 compatibility issues
- `twin.macro@3.1.0` - Babel macro, needs testing with Bun
- `contentlayer@0.3.4` - Content processing library

**Medium Priority (Should Work):**
- All React dependencies
- Tailwind CSS and related packages
- TypeScript configuration

### 1.3 Testing Strategy
- [ ] Set up local Bun development environment
- [ ] Create test checklist for critical functionality
- [ ] Document current build times and performance metrics

---

## Phase 2: Bun Migration (Day 3-5)

### 2.1 Package Manager Migration
```bash
# Remove pnpm lockfile
rm pnpm-lock.yaml

# Install with Bun
bun install

# Update package.json scripts
```

**Package.json changes required:**
```json
{
  "packageManager": "bun@1.x",
  "scripts": {
    "dev": "bun next dev --port ${PORT-3001}",
    "build": "bun contentlayer build && bun next build",
    "postbuild": "bun next-sitemap",
    "start": "bun next start --port ${PORT-3001}",
    "clean": "rm -rf .next",
    "tsc": "bun tsc -p ."
  }
}
```

### 2.2 Contentlayer/Next.js 15 Compatibility
Given the compatibility issue with `next-contentlayer@0.3.4` and Next.js 15:

**Option A (Recommended): Upgrade Contentlayer**
```bash
bun remove next-contentlayer contentlayer
bun add contentcollections@latest
```

**Option B (Fallback): Use legacy peer deps**
```bash
bun add next-contentlayer@0.3.4 --legacy-peer-deps
```

### 2.3 Bun-specific Optimizations
- [ ] Update `bun.lock` generation
- [ ] Configure Bun's native TypeScript support
- [ ] Test `bun test` for faster test execution
- [ ] Verify all build processes work with Bun

---

## Phase 3: Vercel Migration (Day 6-7)

### 3.1 Vercel Configuration
Create `vercel.json`:
```json
{
  "buildCommand": "bun run build && bun run postbuild",
  "outputDirectory": ".next",
  "installCommand": "bun install",
  "framework": "nextjs",
  "regions": ["iad1", "sfo1"],
  "functions": {
    "pages/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

### 3.2 Environment Variables Migration
From `.env.example`:
```
NEXT_PUBLIC_RAILWAY_DOCS_URL= (Remove/Update)
EXPORT_ENDPOINT_PASSWORD= (Keep)
NEXT_PUBLIC_POSTHOG_API_KEY= (Keep)
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com (Keep)

# Add Vercel-specific:
NEXT_PUBLIC_VERCEL_URL= (Auto-added by Vercel)
```

### 3.3 DNS and Domain Migration
- [ ] Update DNS records from Railway to Vercel
- [ ] Configure custom domain in Vercel dashboard
- [ ] Set up SSL (automatically handled by Vercel)
- [ ] Test staging environment before DNS cutover

---

## Phase 4: Testing and Validation (Day 8-9)

### 4.1 Functionality Testing
- [ ] All MDX content renders correctly
- [ ] Search functionality (MeiliSearch) works
- [ ] Image optimization functions
- [ ] Theme switching and UI components
- [ ] Mobile responsiveness
- [ ] Performance metrics

### 4.2 Build and Deployment Testing
- [ ] Local builds succeed with Bun
- [ ] Vercel preview deployments work
- [ ] Environment variables are properly injected
- [ ] Build times comparison (expect 3-5x faster)

### 4.3 Performance Benchmarking
| Metric | Current (Railway) | Target (Vercel+Bun) |
|--------|------------------|-------------------|
| Cold Start | ~2-3s | ~500ms |
| Build Time | ~3-5min | ~30-60s |
| Page Load | ~2-3s | ~1-1.5s |
| Bundle Size | Current | Same or smaller |

---

## Phase 5: Production Deployment (Day 10)

### 5.1 Go-Live Checklist
- [ ] DNS TTL reduced to 300 seconds (5 minutes)
- [ ] Vercel production deployment tested
- [ ] Monitoring and alerts configured
- [ ] Rollback plan documented
- [ ] Team notified of migration window

### 5.2 Migration Execution
1. **T-60 minutes**: Deploy to Vercel production
2. **T-30 minutes**: Final smoke tests on Vercel
3. **T-5 minutes**: Reduce TTL, prepare DNS change
4. **T-0**: Update DNS to point to Vercel
5. **T+15 minutes**: Verify traffic routing
6. **T+60 minutes**: Monitor performance, restore TTL

### 5.3 Post-Migration
- [ ] Delete Railway deployment
- [ ] Update documentation
- [ ] Archive old configuration files
- [ ] Monitor for 48-72 hours

---

## Risk Assessment and Mitigation

### High Risk Items
1. **Contentlayer Compatibility**
   - Risk: Build failures due to Next.js 15 incompatibility
   - Mitigation: Test ContentCollections as alternative

2. **DNS Downtime**
   - Risk: Traffic loss during DNS propagation
   - Mitigation: Use low TTL, deploy during low traffic

3. **Environment Variable Issues**
   - Risk: Missing secrets in Vercel
   - Mitigation: Comprehensive testing, backup Railway env

### Medium Risk Items
1. **Bun Package Compatibility**
   - Risk: Some native modules not supported
   - Mitigation: Test all dependencies locally first

2. **Performance Regression**
   - Risk: Unexpected performance issues
   - Mitigation: Benchmark before/after, rollback ready

---

## Rollback Plan

If critical issues arise:

1. **Immediate**: Revert DNS to Railway
2. **Within 30 minutes**: Restore Railway environment
3. **If needed**: Keep both running for parallel testing
4. **Post-mortem**: Document root cause, adjust plan

---

## Success Criteria

- [ ] All pages load correctly with no 404s
- [ ] Build time reduced by 50%+
- [ ] Cold start time under 1 second
- [ ] No regression in Core Web Vitals
- [ ] Zero downtime during migration
- [ ] Team satisfied with developer experience

---

## Timeline Summary

| Day | Activity |
|-----|----------|
| 1-2 | Preparation and Environment Setup |
| 3-5 | Bun Migration and Testing |
| 6-7 | Vercel Configuration |
| 8-9 | Final Testing and Validation |
| 10 | Production Deployment |

**Total Duration**: 10 days
**Buffer Time**: +2 days if issues arise

---

## Next Steps

1. **Immediate**: Install Bun locally and begin testing
2. **Day 1**: Create migration branch and backup current setup
3. **Day 2**: Start dependency migration with Contentlayer testing
4. **Day 3**: Deploy first Vercel preview for testing

This plan provides a structured approach to migrating your documentation site while minimizing risks and ensuring a smooth transition to modern infrastructure.