# Cloudflare Pages Deployment Guide - OpenNext

**IMPORTANT**: This repository uses **OpenNext** (`@opennextjs/cloudflare`), NOT the old deprecated `@cloudflare/next-on-pages` adapter.

## The Error You're Seeing

If you see this error:
```
ERROR: Failed to produce a Cloudflare Pages build from the project.
The following routes were not configured to run with the Edge Runtime:
  - /_middleware
  - /api/auth/[...all]
  - /api/patreon
```

**This means Cloudflare Pages is trying to use the OLD adapter (`@cloudflare/next-on-pages`)**, which requires Edge Runtime. We're using the NEW OpenNext adapter which uses Node.js runtime instead.

## How to Fix

### Option 1: Deploy via Wrangler CLI (Recommended)

This is the most reliable method:

```bash
# awfixer.com
cd awfixer.com
bun install
bun run build:worker  # Runs: next build && opennextjs-cloudflare
bunx wrangler deploy

# awfixer.blog (requires Node.js 24+)
cd awfixer.blog
pnpm install
pnpm run build:worker  # Runs: next build && opennextjs-cloudflare
pnpm exec wrangler deploy
```

**First time deployment:**
```bash
# Login to Cloudflare (one time)
bunx wrangler login

# Deploy
bunx wrangler deploy
```

### Option 2: Cloudflare Pages Dashboard (Git Integration)

If you want automatic deployments from Git, configure these settings in your Cloudflare Pages project:

#### awfixer.com Settings:

**Framework preset:** `None` (don't use Next.js preset!)

**Build settings:**
- **Build command:** `bun install && bun run build:worker`
- **Build output directory:** `.open-next`
- **Root directory:** `awfixer.com`

**Environment variables:**
- `NODE_VERSION` = `22`
- `BUN_VERSION` = `1.2.0` (or latest)

#### awfixer.blog Settings:

**Framework preset:** `None`

**Build settings:**
- **Build command:** `pnpm install && pnpm run build:worker`
- **Build output directory:** `.open-next`
- **Root directory:** `awfixer.blog`

**Environment variables:**
- `NODE_VERSION` = `24` (REQUIRED - minimum 24.0.0)
- Add all required Sanity, Sentry environment variables (see `.env.example`)

### Option 3: GitHub Actions / CI/CD

Create `.github/workflows/deploy-cloudflare.yml`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main, prod]
  workflow_dispatch:

jobs:
  deploy-awfixer-com:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: 1.2.0

      - name: Install dependencies
        run: cd awfixer.com && bun install --frozen-lockfile

      - name: Build for Cloudflare
        run: cd awfixer.com && bun run build:worker

      - name: Deploy to Cloudflare
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          workingDirectory: awfixer.com

  deploy-awfixer-blog:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '24'

      - uses: pnpm/action-setup@v2
        with:
          version: 10.27.0

      - name: Install dependencies
        run: cd awfixer.blog && pnpm install --frozen-lockfile

      - name: Build for Cloudflare
        run: cd awfixer.blog && pnpm run build:worker
        env:
          # Add all required environment variables here
          NEXT_PUBLIC_SANITY_PROJECT_ID: ${{ secrets.SANITY_PROJECT_ID }}
          NEXT_PUBLIC_SANITY_DATASET: ${{ secrets.SANITY_DATASET }}

      - name: Deploy to Cloudflare
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          workingDirectory: awfixer.blog
```

## Understanding the Build Process

### What `build:worker` Does

```json
"build:worker": "next build && opennextjs-cloudflare"
```

1. **`next build`**: Creates a standalone Next.js build in `.next/`
2. **`opennextjs-cloudflare`**: Converts the build to Cloudflare Workers format

**Output structure:**
```
.open-next/
├── worker.js          # Main Cloudflare Worker
├── assets/            # Static assets
├── cache/             # Build cache
└── server/            # Server functions
```

### What NOT to Do

❌ **Don't use** `npx @cloudflare/next-on-pages` (old adapter)
❌ **Don't select** "Next.js" framework preset in Cloudflare Pages dashboard
❌ **Don't add** `export const runtime = 'edge'` to your routes (that's for the old adapter)
❌ **Don't run** `vercel build` for Cloudflare deployments

## Verifying Your Setup

### Check installed packages:

```bash
cd awfixer.com
grep -A 5 "devDependencies" package.json | grep -E "cloudflare|wrangler"
```

Should show:
```json
"@opennextjs/cloudflare": "^1.14.8",
"wrangler": "^4.59.1"
```

Should NOT show:
```json
"@cloudflare/next-on-pages": "..." // ❌ Remove this if present
```

### Test build locally:

```bash
cd awfixer.com
bun run build:worker
```

You should see:
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization

[opennextjs-cloudflare] Building...
[opennextjs-cloudflare] ✓ Build complete
```

Check output:
```bash
ls -la .open-next/
# Should show: worker.js, assets/, server/, etc.
```

## Troubleshooting

### Issue: "Invalid prerender config" warnings

These are warnings from Next.js and can usually be ignored for now. They don't prevent deployment.

### Issue: Edge Runtime errors

**Symptom:** Error about routes not having `export const runtime = 'edge'`

**Cause:** You're using the wrong adapter or wrong build command

**Fix:**
1. Make sure you're using `@opennextjs/cloudflare`, not `@cloudflare/next-on-pages`
2. Use `bun run build:worker` not `npx @cloudflare/next-on-pages`
3. In Cloudflare Pages dashboard, set framework to "None"

### Issue: Build works locally but fails on Cloudflare

**Possible causes:**
1. **Node version mismatch**: Set `NODE_VERSION` environment variable in Cloudflare
2. **Missing environment variables**: Add all required vars in Cloudflare dashboard
3. **Package manager issues**: Make sure Cloudflare has access to install dependencies

### Issue: "Cannot find module" errors

**Fix:** Ensure the build command includes dependency installation:
```bash
# Cloudflare Pages build command should be:
bun install && bun run build:worker
# OR
pnpm install && pnpm run build:worker
```

### Issue: awfixer.blog won't build (Node version)

**Symptom:** "Unsupported environment (bad pnpm and/or Node.js version)"

**Fix:** Set `NODE_VERSION=24` in Cloudflare Pages environment variables

## Cloudflare Pages Dashboard Configuration

### Step-by-Step Setup

1. **Go to Cloudflare Dashboard** → Workers & Pages → Create Application

2. **Choose "Connect to Git"**

3. **Select your repository** and branch (e.g., `main` or `prod`)

4. **Configure build settings:**
   - Framework preset: **None** (⚠️ Important!)
   - Build command: `bun install && bun run build:worker` (for awfixer.com)
   - Build output directory: `.open-next`
   - Root directory: `awfixer.com` (or `awfixer.blog`)

5. **Set environment variables:**
   - Click "Add variable"
   - Add `NODE_VERSION` = `22` (or `24` for awfixer.blog)
   - Add any other required environment variables

6. **Save and Deploy**

### Important Dashboard Settings

**Production branch:** `main` (or `prod` for awfixer.blog)

**Build settings:**
- ✅ Build command runs both install and build
- ✅ Output directory is `.open-next` (not `.next` or `out`)
- ✅ Framework preset is "None"

**Deployment settings:**
- ✅ Compatibility date: `2024-09-23` or later (set in wrangler.toml)
- ✅ Compatibility flags: `nodejs_compat` enabled (set in wrangler.toml)

## Migrating from @cloudflare/next-on-pages

If you previously used the old adapter:

### 1. Remove old package:
```bash
bun remove @cloudflare/next-on-pages
# or
pnpm remove @cloudflare/next-on-pages
```

### 2. Install OpenNext:
```bash
bun add -D @opennextjs/cloudflare wrangler
# or
pnpm add -D @opennextjs/cloudflare wrangler
```

### 3. Remove Edge Runtime exports:

Delete these from your API routes and pages:
```typescript
// ❌ Remove this:
export const runtime = 'edge';
```

### 4. Update build command:
```json
// Old:
"build": "next build && @cloudflare/next-on-pages"

// New:
"build:worker": "next build && opennextjs-cloudflare"
```

### 5. Update wrangler.toml:

```toml
# Old adapter:
compatibility_flags = []  # Edge runtime

# New (OpenNext):
compatibility_flags = ["nodejs_compat"]  # Node.js runtime
```

## Additional Resources

- **OpenNext Docs:** https://opennext.js.org/cloudflare
- **Wrangler CLI:** https://developers.cloudflare.com/workers/wrangler/
- **Cloudflare Pages:** https://developers.cloudflare.com/pages/

## Quick Reference

### Build Commands

| Task | Command |
|------|---------|
| **Install dependencies** | `bun install` or `pnpm install` |
| **Build for Cloudflare** | `bun run build:worker` |
| **Test locally** | `bun run cf:dev` |
| **Deploy** | `bunx wrangler deploy` |

### File Structure

```
awfixer.com/
├── wrangler.toml          # Cloudflare configuration
├── .node-version          # Node version for deployment
├── next.config.ts         # Next.js config (output: "standalone")
└── package.json           # Scripts: build:worker, cf:dev, cf:deploy
```

### Environment Variables Location

- **Local development:** `.env.local`
- **Cloudflare CLI:** `wrangler secret put VAR_NAME`
- **Cloudflare Dashboard:** Settings → Environment Variables
- **wrangler.toml:** `[vars]` section (for non-sensitive vars)

---

**Last Updated:** 2026-01-15
**OpenNext Version:** 1.14.8
**Adapter:** @opennextjs/cloudflare (NOT @cloudflare/next-on-pages)
