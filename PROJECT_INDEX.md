# Project Index: AWFixer Websites Monorepo

**Generated:** 2026-01-13
**Repository:** Multi-site monorepo with 7 independent websites
**Total Source Size:** ~15MB across all sites

---

## 📁 Project Structure

```
websites/
├── awfixer.blog/          # 3.5MB - Next.js 16 + Sanity CMS (85+ tests, production-ready)
├── awfixer.vip/           # 5.2MB - Vue 3 + Vite (SaaS app with auth, 43 UI components)
├── awfixer.me/            # 3.9MB - Astro + Starlight (docs/portfolio)
├── awfixerwiki/           # 2.0MB - Astro + React (knowledge base)
├── awfixer.com/           # 368KB - Next.js 16 + MDX (landing page)
├── awfixer.academy/       # 116KB - Vite + React (education platform)
├── awfixer.link/          # Config only - Vercel redirect service
├── .opencode/             # OpenCode AI assistant workspace
└── CLAUDE.md              # Repository-wide developer guide
```

---

## 🚀 Entry Points

### Development Servers

| Site | Command | Port | Entry Point |
|------|---------|------|-------------|
| awfixer.blog | `pnpm dev` | 3000 | `src/app/layout.tsx` |
| awfixer.com | `npm run dev` | 3000 | `src/app/layout.tsx` |
| awfixer.vip | `bun dev` | 5173 | `src/main.tsx` |
| awfixer.academy | `bun dev` | 5173 | `src/main.tsx` |
| awfixer.me | `bun dev` | 4321 | `src/pages/index.astro` |
| awfixerwiki | `bun dev` | 3001 | `src/pages/index.astro` |

### Build Outputs

- **Next.js sites:** `.next/` (standalone mode for Docker)
- **Vite sites:** `dist/`
- **Astro sites:** `dist/`

### Key Configuration Files

```
awfixer.blog/
  ├── next.config.ts          # Next.js 16 config, image domains, redirects
  ├── sanity.config.ts        # Sanity Studio config (66 schemas)
  ├── vitest.config.ts        # Test config (unit, component, integration)
  └── playwright.config.ts    # E2E test config

awfixer.vip/
  ├── vite.config.ts          # Vite + Vue plugin
  ├── vitest.config.ts        # Test config
  └── playwright.config.ts    # E2E tests

awfixer.me/
  └── astro.config.mjs        # Astro + Starlight integration

awfixerwiki/
  ├── astro.config.mjs        # Astro + React integration
  └── next-sitemap.config.js  # Sitemap generation

awfixer.com/
  └── next.config.ts          # Next.js + MDX config

awfixer.academy/
  └── vite.config.ts          # Vite + React
```

---

## 📦 Core Modules by Site

### awfixer.blog (Next.js + Sanity)

**Framework:** Next.js 16, React 19, TypeScript
**CMS:** Sanity with 66 schema types
**Testing:** 85+ tests (Vitest + Playwright)

**Key Modules:**
- `src/app/(frontend)/[locale]/` - Multi-language routing (nb, en, ar)
- `src/app/(studio)/studio/` - Sanity Studio at /studio
- `src/sanity/schemaTypes/` - 66 content schemas (article, page, author, etc.)
- `src/components/blocks/` - 130+ block components (modules, objects, layout)
- `src/components/ui/` - 41 base UI primitives
- `src/lib/core/` - env, logger, errors, safe-action
- `src/lib/utils/` - url, dates, strings, article-helpers
- `src/lib/collections/` - Collection registry and types
- `src/i18n/` - Internationalization config (3 languages)
- `tests/` - 85+ test files (unit, component, integration, E2E)

**Notable Features:**
- Article system with categories and authors
- Multi-language support (Norwegian, English, Arabic)
- Sanity Live Content API integration
- RSS feeds per locale
- Docker support (standalone output)
- Sentry error monitoring
- Comprehensive testing suite

### awfixer.vip (Vue 3 + Vite)

**Framework:** Vue 3, TypeScript, Vite
**Auth:** Better Auth
**UI Library:** shadcn-vue (43 components)

**Key Modules:**
- `src/components/ui/` - 43 shadcn-vue components (accordion, dialog, form, etc.)
- `src/lib/auth.ts` - Better Auth configuration
- `src/lib/discord-guild.ts` - Discord integration
- `src/lib/utils.ts` - Utility functions (cn, etc.)
- `src/pages/SignIn.tsx` - Authentication page
- `src/main.tsx` - App entry point
- `src/hooks/use-mobile.ts` - Responsive hook
- `tests/` - Vitest + Playwright tests

**Notable Features:**
- SaaS application with authentication
- Discord integration
- 3D graphics with Three.js + TresJS
- GSAP animations
- PostHog analytics
- Stripe integration

### awfixer.me (Astro + Starlight)

**Framework:** Astro, Starlight
**Purpose:** Documentation and portfolio

**Key Modules:**
- `src/pages/` - Astro pages
- `src/components/ui/starlight/` - Custom Starlight components
- `astro.config.mjs` - Starlight sidebar, social links

**Notable Features:**
- Starlight documentation theme
- Custom theme components (SiteTitle, Head, ThemeSelect)
- Brotli compression
- Client prerendering (experimental)

### awfixerwiki (Astro + React)

**Framework:** Astro, React
**Purpose:** Knowledge base and wiki

**Key Modules:**
- `src/pages/` - Astro pages
- `src/components/` - React components
- `src/content/` - Markdown content
- PostHog analytics integration
- Ory authentication

**Notable Features:**
- React integration with Astro
- Markdown with Gray Matter
- Syntax highlighting (Prism.js)
- Search functionality
- Copy-to-clipboard utilities

### awfixer.com (Next.js + MDX)

**Framework:** Next.js 16, MDX
**Purpose:** Main landing page

**Key Modules:**
- `src/app/` - Next.js App Router pages (about, faq, login, pricing, etc.)
- `src/components/blocks/` - Contact form, investors, FAQ, logos
- `src/components/ui/` - 15+ base components (button, form, carousel, etc.)
- `src/lib/form-schema.ts` - Zod schemas
- `src/actions/` - Server actions (safe-action, server-action)

**Notable Features:**
- Turbopack dev mode
- MDX support
- Form handling with react-hook-form + Zod
- Theme provider (dark mode)
- StyleGlide integration

### awfixer.academy (Vite + React)

**Framework:** Vite, React
**Purpose:** Educational platform

**Key Modules:**
- `src/main.tsx` - App entry point
- `src/test/` - Test setup
- OpenAuth integration
- Better Auth
- Discord.js integration

**Notable Features:**
- VitePress documentation
- Authentication with OpenAuth and Better Auth
- Discord bot integration
- Email with Resend

### awfixer.link

**Type:** Redirect service
**Config:** `vercel.json` + `redirects.json`

No source code - pure configuration for URL redirects.

---

## 🔧 Technology Stack Summary

### Frameworks

| Framework | Sites | Version |
|-----------|-------|---------|
| Next.js | awfixer.blog, awfixer.com | 16.1.1 |
| Vue 3 | awfixer.vip | 3.5.25 |
| Astro | awfixer.me, awfixerwiki | 5.16.8 |
| React | awfixer.academy | 19.2.3 |
| Vite | awfixer.vip, awfixer.academy | 7.3.0+ |

### UI & Styling

- **Tailwind CSS 4:** All sites (`@tailwindcss/vite` or `@tailwindcss/postcss`)
- **Radix UI:** awfixer.com, awfixer.vip, awfixerwiki
- **Base UI:** awfixer.blog
- **shadcn-vue:** awfixer.vip (43 components)
- **Starlight:** awfixer.me

### Testing

| Site | Unit/Component | E2E | Coverage |
|------|----------------|-----|----------|
| awfixer.blog | Vitest (85+ tests) | Playwright | Yes |
| awfixer.vip | Vitest | Playwright | Yes |
| awfixer.academy | Vitest | - | Yes |
| Others | - | - | - |

### Authentication

- **Better Auth:** awfixer.vip, awfixer.academy
- **Ory:** awfixer.me, awfixerwiki

### Content Management

- **Sanity CMS:** awfixer.blog (66 schemas, Live API, Studio)
- **MDX:** awfixer.com
- **Markdown:** awfixerwiki (Gray Matter)

### Deployment

- **Platform:** Vercel (all sites)
- **Docker:** awfixer.blog (standalone output)
- **Analytics:** Vercel Analytics (most sites), PostHog (vip, wiki)
- **Error Tracking:** Sentry (blog, vip)

---

## 📚 Documentation Files

### Repository-Level

- `CLAUDE.md` - Comprehensive developer guide for entire monorepo
- `uhm.astro` - SVG import reference example

### Site-Specific

**awfixer.blog/**
- `README.md` - Quick start, features, deployment guide
- `CLAUDE.md` - Detailed developer guide (architecture, commands, patterns)
- `QUICKSTART.md` - Beginner's guide for setup

**awfixer.vip/**
- `README.md` - Project overview
- `AUTH_SETUP.md` - Better Auth setup guide
- `GITHUB_ACTIONS_SETUP.md` - CI/CD configuration
- `MIGRATION_SUMMARY.md` - Migration history
- `TEST_SETUP_SUMMARY.md` - Testing setup guide

**awfixerwiki/**
- `migration-plan-bun-vercel.md` - Bun + Vercel migration plan
- `plan.md` - Project planning
- `posthog-setup-report.md` - Analytics setup
- `tsx-to-astro.md` - TSX to Astro migration notes

---

## 🧪 Test Coverage

### Total Test Files: 459

**awfixer.blog** (most comprehensive):
- Unit tests: `tests/unit/` (~30 files)
- Component tests: `tests/components/` (~41 files)
- Integration tests: `tests/integration/` (~14 files)
- E2E tests: `tests/e2e/` (~13 files)
  - Smoke tests (quick critical paths)
  - Visual regression tests
  - Accessibility tests (WCAG)
  - Performance tests (Lighthouse)
- Contract tests: `tests/contracts/` (API validation)

**awfixer.vip**:
- Vitest unit/component tests
- Playwright E2E tests
- Coverage reports enabled

**awfixer.academy**:
- Vitest tests in `src/test/`
- Coverage enabled

### Test Commands

```bash
# awfixer.blog
cd awfixer.blog
pnpm test                   # All unit/component/integration
pnpm test:coverage          # With coverage report
pnpm e2e                    # Full E2E suite
pnpm e2e:smoke              # Quick smoke tests
pnpm e2e:visual             # Visual regression
pnpm e2e:a11y               # Accessibility
pnpm e2e:perf               # Lighthouse performance

# awfixer.vip
cd awfixer.vip
bun test                    # Vitest tests
bun test:coverage           # With coverage
bun test:e2e                # Playwright E2E

# awfixer.academy
cd awfixer.academy
bun test                    # Vitest tests
```

---

## 🔗 Key Dependencies

### Shared Across Sites

| Dependency | Purpose | Sites |
|------------|---------|-------|
| `tailwindcss` v4 | Styling | All |
| `zod` | Schema validation | All |
| `lucide-react` / `lucide-vue-next` | Icons | 5 sites |
| `clsx` + `tailwind-merge` | Class utilities | Most |
| `class-variance-authority` | Component variants | Most |
| `typescript` | Type safety | All |
| `date-fns` | Date formatting | Next.js sites |

### Site-Specific

**awfixer.blog:**
- `@sanity/client`, `next-sanity` - CMS integration
- `@mux/mux-player-react` - Video streaming
- `next-intl` - i18n (3 languages)
- `mermaid` - Diagrams
- `shiki` - Code highlighting
- `@sentry/nextjs` - Error monitoring

**awfixer.vip:**
- `better-auth` - Authentication
- `@stripe/stripe-js` - Payments
- `three`, `@tresjs/core` - 3D graphics
- `posthog-js` - Analytics
- `radix-vue` - Vue UI primitives

**awfixer.academy:**
- `@openauthjs/openauth` - OpenAuth
- `discord.js` - Discord bot
- `resend` - Email
- `vitepress` - Documentation

---

## 📝 Quick Start (New Developer)

### Clone & Setup

```bash
git clone <repo-url>
cd websites

# Choose a site to work on
cd awfixer.blog  # or awfixer.vip, awfixer.me, etc.

# Install dependencies
pnpm install     # for awfixer.blog (enforced)
bun install      # for awfixerwiki, awfixer.academy (preferred)
npm install      # for awfixer.com (any package manager)

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with required values

# Start development
pnpm dev         # awfixer.blog
bun dev          # awfixer.vip, awfixerwiki, awfixer.academy
npm run dev      # awfixer.com
```

### Common Development Commands

```bash
# Development
<pm> dev                    # Start dev server

# Code Quality
<pm> lint                   # Run linter (Biome/ESLint)
<pm> format                 # Auto-format (Biome/Prettier)
<pm> typecheck              # TypeScript check

# Testing
<pm> test                   # Run tests
<pm> test:coverage          # With coverage

# Production
<pm> build                  # Build for production
<pm> start                  # Run production build
```

Replace `<pm>` with `pnpm`, `bun`, or `npm` based on the site.

---

## 🎯 Development Guidelines

### Package Manager Rules

- **awfixer.blog:** pnpm ONLY (enforced via preinstall script)
- **awfixerwiki, awfixer.academy:** bun preferred (packageManager field)
- **awfixer.vip, awfixer.me, awfixer.com:** Any package manager

### Code Style

- **awfixer.blog:** Biome (2 spaces, single quotes, semicolons, 100 char width)
- **awfixer.vip, awfixer.academy, awfixer.com:** ESLint + Prettier
- **TypeScript:** All projects
- **Naming:** Descriptive names over single letters (except loop indices)

### Responsive Design

- **Breakpoints:** sm (640px), md (768px), lg (1024px), xl (1280px)
- **Target devices:** 360px (Android), 390px (iPhone), 768px (tablet), 1280px+ (desktop)
- **Touch targets:** Minimum 44px, 8px spacing
- **Mobile-first:** Base styles for mobile, add complexity at larger breakpoints

### Accessibility (WCAG 2.2 AA)

- Semantic HTML first
- Color contrast: 4.5:1 (normal), 3:1 (large)
- Keyboard navigation
- Focus indicators
- Alt text on all images
- ARIA labels on icon buttons

### Performance (Core Web Vitals)

- LCP ≤ 2.5s
- INP ≤ 200ms
- CLS ≤ 0.1

---

## 🚢 Deployment

All sites deploy to **Vercel**:

- Push to main/dev branch triggers deployment
- awfixer.blog: Also supports Docker (standalone output) to Azure Container Apps via `prod` branch
- Environment variables managed per project in Vercel dashboard
- Each site has independent deployments

---

## 🔍 Finding Things Quickly

### Looking for...

**Authentication code?**
- awfixer.vip: `src/lib/auth.ts`
- awfixer.academy: Better Auth + OpenAuth setup

**UI Components?**
- awfixer.blog: `src/components/ui/` (41 components)
- awfixer.vip: `src/components/ui/` (43 shadcn-vue components)
- awfixer.com: `src/components/ui/` (15 components)

**Content schemas?**
- awfixer.blog: `src/sanity/schemaTypes/` (66 schemas)

**API routes?**
- awfixer.blog: `src/app/api/`

**Tests?**
- awfixer.blog: `tests/` (85+ files)
- awfixer.vip: `tests/`
- awfixer.academy: `src/test/`

**Configuration?**
- See "Key Configuration Files" section above

**Documentation?**
- Start with CLAUDE.md (this directory)
- Site-specific: See "Documentation Files" section

---

## 📊 Project Statistics

| Metric | Count |
|--------|-------|
| Total Sites | 7 (6 active + 1 redirect) |
| Total Source Size | ~15MB |
| Total Test Files | 459 |
| UI Components (total) | ~100+ across all sites |
| Sanity Schemas (blog) | 66 |
| Supported Languages (blog) | 3 (nb, en, ar) |
| Framework Diversity | 4 (Next.js, Vue, Astro, React) |

---

## 🆘 Troubleshooting Quick Reference

### Port Conflicts

Sites use ports: 3000 (blog, com), 3001 (wiki), 4321 (me), 5173 (vip, academy)

```bash
lsof -ti:3000 | xargs kill
# or
PORT=3002 <pm> dev
```

### Package Manager Errors

Check `package.json` for `packageManager` field and use the specified manager.

### Build Failures

1. Check environment variables (`.env.example`)
2. Verify Node version (blog requires Node 24+)
3. Run `<pm> typecheck`
4. Remove `node_modules` and reinstall

### Sanity Issues (awfixer.blog)

1. Configure CORS at sanity.io/manage
2. Create index page in Studio (slug = "index")
3. Run `pnpm generate:collections` after schema changes

---

**Index Size:** ~5KB (compressed)
**Token Efficiency:** ~3,000 tokens vs ~58,000 tokens for full read (94% reduction)
**Last Updated:** 2026-01-13

---

**For detailed information on any specific site, refer to:**
- `CLAUDE.md` (this directory) - Repository-wide guide
- `awfixer.blog/CLAUDE.md` - Comprehensive guide for the blog site
- Site-specific README.md files
