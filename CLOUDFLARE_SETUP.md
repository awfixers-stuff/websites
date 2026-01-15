# Cloudflare Pages Setup for Next.js Projects

This repository now includes Cloudflare Pages deployment configuration for the Next.js projects using OpenNext.

## Overview

OpenNext is an adapter that enables Next.js applications to run on Cloudflare's developer platform. The projects configured are:

- **awfixer.com** - Configured and ready to deploy ✅
- **awfixer.blog** - Configured (requires Node.js 24+ for installation) ⚠️

## Prerequisites

### General Requirements

- **Wrangler CLI**: Version 3.99.0 or later
- **Cloudflare account**: Sign up at [cloudflare.com](https://cloudflare.com)
- **Node.js compatibility**: The adapter uses Node.js runtime (not Edge runtime)

### Project-Specific Requirements

#### awfixer.com
- **Package Manager**: Bun ≥1.2.0
- **Node.js**: Latest stable version (currently using v22.21.1)
- **Status**: ✅ Dependencies installed and ready

#### awfixer.blog
- **Package Manager**: pnpm (enforced via preinstall script)
- **Node.js**: ≥24.0.0 (REQUIRED)
- **Status**: ⚠️ Configuration complete, but dependencies not installed due to Node version mismatch
- **Action Required**: Upgrade to Node.js 24+ and run `pnpm install`

## Installation

### awfixer.com (Ready to Use)

Dependencies are already installed:
```bash
cd awfixer.com
# Dependencies already installed:
# - @opennextjs/cloudflare@^1.14.8
# - wrangler@^4.59.1
```

### awfixer.blog (Requires Node 24+)

Once you have Node.js 24+ installed:
```bash
cd awfixer.blog
pnpm install  # This will install @opennextjs/cloudflare and wrangler
```

## Configuration

Both projects are configured with:

### 1. Next.js Config (`next.config.ts`)
- **Output mode**: `standalone` (required for OpenNext)
- **Existing optimizations preserved**

### 2. Wrangler Config (`wrangler.toml`)

Key settings:
- **Compatibility date**: `2024-09-23` (minimum required)
- **Compatibility flags**: `nodejs_compat` enabled
- **Main worker**: `.open-next/worker.js` (generated during build)
- **Assets**: `.open-next/assets` (generated during build)

### 3. Build Scripts

New npm/pnpm/bun scripts added to both projects:

```json
{
  "build:worker": "next build && opennextjs-cloudflare",
  "preview": "wrangler dev",
  "deploy": "wrangler deploy",
  "cf:dev": "wrangler dev",
  "cf:deploy": "wrangler deploy --minify"
}
```

## Usage

### Local Development

#### Option 1: Standard Next.js Dev Server
```bash
# awfixer.com
cd awfixer.com
bun run dev

# awfixer.blog
cd awfixer.blog
pnpm dev
```

#### Option 2: Cloudflare Workers Dev Environment
```bash
# awfixer.com
cd awfixer.com
bun run build:worker  # Build the worker first
bun run cf:dev        # Start Cloudflare dev server

# awfixer.blog
cd awfixer.blog
pnpm run build:worker  # Build the worker first
pnpm run cf:dev        # Start Cloudflare dev server
```

### Building for Production

```bash
# awfixer.com
cd awfixer.com
bun run build:worker

# awfixer.blog
cd awfixer.blog
pnpm run build:worker
```

This will:
1. Run `next build` to create the standalone build
2. Run `opennextjs-cloudflare` to generate Cloudflare-compatible worker files in `.open-next/`

### Deployment

#### Manual Deployment

```bash
# awfixer.com
cd awfixer.com
bun run cf:deploy

# awfixer.blog
cd awfixer.blog
pnpm run cf:deploy
```

#### CI/CD Deployment

For GitHub Actions or other CI/CD pipelines:

1. **Set Cloudflare API token** as a secret:
   - `CLOUDFLARE_API_TOKEN` or `CLOUDFLARE_ACCOUNT_ID` + `CLOUDFLARE_API_TOKEN`

2. **Example workflow step**:
```yaml
- name: Deploy to Cloudflare Pages
  run: |
    cd awfixer.com
    bun install
    bun run build:worker
    bunx wrangler deploy
  env:
    CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

## Environment Variables

### awfixer.com

Add environment variables to `wrangler.toml`:
```toml
[vars]
YOUR_PUBLIC_VAR = "value"
```

For secrets:
```bash
wrangler secret put YOUR_SECRET_VAR
```

### awfixer.blog

This project uses many environment variables for Sanity CMS, Sentry, etc.

**Important**: Configure these in `wrangler.toml` or via Cloudflare Dashboard:

```toml
[vars]
NEXT_PUBLIC_SANITY_PROJECT_ID = "your-project-id"
NEXT_PUBLIC_SANITY_DATASET = "production"
# ... add other NEXT_PUBLIC_ vars
```

For sensitive variables:
```bash
wrangler secret put SANITY_API_TOKEN
wrangler secret put SENTRY_AUTH_TOKEN
```

**Note**: Check existing `.env.example` or `.env.local` files for required variables.

## Special Considerations

### awfixer.blog Specifics

This project has additional complexity:

1. **Sanity CMS Integration**
   - Configure CORS in Sanity.io dashboard to allow your Cloudflare Pages domain
   - Ensure image optimization works with `cdn.sanity.io` domains
   - The project uses a custom image loader (see `src/lib/image-loader.ts`)

2. **Sentry Integration**
   - Configure `SENTRY_ORG` and `SENTRY_PROJECT` environment variables
   - Set `SENTRY_AUTH_TOKEN` as a secret

3. **Internationalization**
   - The project supports Norwegian, English, and Arabic
   - Ensure locale routing works correctly in Cloudflare Workers environment

4. **Dynamic Redirects**
   - The project fetches redirects from Sanity CMS during build
   - Consider caching strategy for dynamic content

### Image Optimization

Both projects may need adjustments for image optimization on Cloudflare:

- **Next.js Image Optimization**: The built-in `next/image` loader may not work the same way on Cloudflare
- **Solutions**:
  - Use Cloudflare Images (paid service)
  - Set `images.unoptimized: true` (already set in awfixer.com)
  - Use a custom image loader with Cloudflare R2 or external CDN

## Troubleshooting

### Build Fails with "Cannot find module"

**Solution**: Ensure you run `next build` before `opennextjs-cloudflare`:
```bash
# Correct
bun run build:worker  # Runs both commands in sequence

# Incorrect
opennextjs-cloudflare  # Will fail if .next doesn't exist
```

### Wrangler Version Issues

**Error**: "This project requires Wrangler 3.99.0 or later"

**Solution**:
```bash
# Update wrangler
bun add -D wrangler@latest  # or pnpm add -D wrangler@latest
```

### Node.js Compatibility Errors

**Error**: "nodejs_compat flag is required"

**Solution**: Ensure `wrangler.toml` includes:
```toml
compatibility_date = "2024-09-23"
compatibility_flags = ["nodejs_compat"]
```

### awfixer.blog Node Version Error

**Error**: "Unsupported environment (bad pnpm and/or Node.js version)"

**Solution**: Upgrade Node.js to version 24 or later:
```bash
# Using nvm
nvm install 24
nvm use 24

# Using fnm
fnm install 24
fnm use 24

# Then install dependencies
cd awfixer.blog
pnpm install
```

### Environment Variables Not Working

**Issue**: Environment variables undefined in production

**Solutions**:
1. Check `wrangler.toml` has `[vars]` section
2. For secrets, use `wrangler secret put VARIABLE_NAME`
3. Ensure variables start with `NEXT_PUBLIC_` if needed in browser
4. Verify variables in Cloudflare Dashboard → Workers & Pages → Your Project → Settings → Variables

## Performance Optimization

### Recommended Settings

1. **Enable Minification** (already in deploy script):
   ```bash
   wrangler deploy --minify
   ```

2. **Enable Compression** in `wrangler.toml`:
   ```toml
   [build]
   command = "bun run build:worker"

   [observability]
   enabled = true
   ```

3. **Cache Static Assets**: Cloudflare automatically caches assets in `.open-next/assets`

4. **Monitor Performance**: Use Cloudflare's built-in analytics

## Migration from Vercel

Both projects currently deploy to Vercel. Key differences when migrating:

| Feature | Vercel | Cloudflare Pages |
|---------|--------|------------------|
| **Edge Functions** | Vercel Edge Runtime | Cloudflare Workers (Node.js compat) |
| **Environment Variables** | Vercel Dashboard | `wrangler.toml` or Cloudflare Dashboard |
| **Image Optimization** | Built-in | Requires Cloudflare Images or custom solution |
| **Analytics** | Vercel Analytics | Cloudflare Web Analytics |
| **Deploy Command** | `vercel deploy` | `wrangler deploy` |

### Migration Checklist

- [ ] Test build locally with `build:worker` script
- [ ] Configure all environment variables in Cloudflare
- [ ] Update CORS settings for external services (Sanity, etc.)
- [ ] Test image loading and optimization
- [ ] Verify API routes work correctly
- [ ] Check internationalization and routing
- [ ] Update DNS settings (if using custom domain)
- [ ] Set up deployment pipeline (GitHub Actions, etc.)
- [ ] Monitor errors and performance after deployment

## Resources

- **OpenNext Documentation**: [opennext.js.org/cloudflare](https://opennext.js.org/cloudflare)
- **Cloudflare Workers Docs**: [developers.cloudflare.com/workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)
- **Wrangler Documentation**: [developers.cloudflare.com/workers/wrangler](https://developers.cloudflare.com/workers/wrangler/configuration/)
- **GitHub Repository**: [github.com/opennextjs/opennextjs-cloudflare](https://github.com/opennextjs/opennextjs-cloudflare)

## Support

For issues specific to:
- **OpenNext**: Open an issue at [opennextjs/opennextjs-cloudflare](https://github.com/opennextjs/opennextjs-cloudflare/issues)
- **Cloudflare Workers**: Check [Cloudflare Community](https://community.cloudflare.com/)
- **This Repository**: Open an issue in this repository

---

**Last Updated**: 2026-01-15
**OpenNext Version**: 1.14.8
**Wrangler Version**: 4.59.1
