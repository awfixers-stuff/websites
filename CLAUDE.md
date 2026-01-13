# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo containing multiple AWFixer brand websites and applications, each serving a different purpose. All sites share common infrastructure patterns (Tailwind CSS 4, Vercel deployment, Vitest testing) but use different frameworks based on their specific needs.

## Repository Structure

```
websites/
├── awfixer.blog/          # Next.js 16 + Sanity CMS - Blog/content platform (NextMedal template)
├── awfixer.com/           # Next.js 16 + MDX - Main landing page
├── awfixer.vip/           # Vue 3 + Vite - SaaS application with authentication
├── awfixer.me/            # Astro + Starlight - Documentation and portfolio
├── awfixerwiki/           # Astro + React - Knowledge base and wiki
├── awfixer.academy/       # Vite + React - Educational platform
├── awfixer.link/          # Redirect service (Vercel config only)
└── .opencode/             # OpenCode AI assistant configuration
```

## Site-Specific Commands

### awfixer.blog (Next.js + Sanity)

**Package manager:** pnpm (enforced)
**Node version:** ≥24.0.0

```bash
cd awfixer.blog

# Development
pnpm dev                    # Start dev server with Turbopack (http://localhost:3000)
pnpm build                  # Production build
pnpm start                  # Run production build

# Code Quality
pnpm lint                   # Run Biome linting
pnpm format                 # Auto-format with Biome
pnpm typecheck              # TypeScript type checking

# Testing (Vitest)
pnpm test                   # Run all tests
pnpm test:watch             # Run tests in watch mode
pnpm test:unit              # Run unit tests only
pnpm test:components        # Run component tests only
pnpm test:integration       # Run integration tests only
pnpm test:coverage          # Run tests with coverage

# E2E Testing (Playwright)
pnpm e2e                    # Run full E2E tests
pnpm e2e:smoke              # Run smoke tests
pnpm e2e:visual             # Run visual regression tests
pnpm e2e:a11y               # Run accessibility tests
pnpm e2e:perf               # Run performance/Lighthouse tests

# Sanity
pnpm generate:collections   # Generate Sanity collection types
pnpm setup:check            # Validate environment setup

# Docker
pnpm docker:build           # Build production Docker image
```

This site has extensive documentation in its own `awfixer.blog/CLAUDE.md` and `awfixer.blog/README.md`.

### awfixer.vip (Vue 3 + Vite)

**Package manager:** npm/pnpm/bun
**Node version:** Latest stable

```bash
cd awfixer.vip

# Development
bun dev                     # Start dev server (http://localhost:5173)
bun build                   # Production build
bun preview                 # Preview production build

# Code Quality
bun lint                    # Run ESLint

# Testing
bun test                    # Run Vitest tests
bun test:ui                 # Run Vitest with UI
bun test:run                # Run tests once
bun test:coverage           # Run tests with coverage

# E2E Testing
bun test:e2e                # Run Playwright E2E tests
bun test:e2e:ui             # Run E2E tests with UI
bun test:e2e:debug          # Debug E2E tests
bun test:e2e:update         # Update E2E snapshots
```

### awfixer.me (Astro + Starlight)

**Package manager:** npm/pnpm/bun
**Node version:** Latest stable

```bash
cd awfixer.me

# Development
bun dev                     # Start dev server (http://localhost:4321)
bun build                   # Production build (includes HTML processing)
bun preview                 # Preview production build
bun start                   # Alias for dev
```

### awfixerwiki (Astro + React)

**Package manager:** bun (enforced)
**Bun version:** ≥1.3.3

```bash
cd awfixerwiki

# Development
bun dev                     # Start dev server (http://localhost:3001 or $PORT)
bun build                   # Production build
bun preview                 # Preview production build

# Code Quality
bun tsc                     # TypeScript type checking

# Testing
bun test                    # Run Vitest tests
bun test:ui                 # Run Vitest with UI
bun test:coverage           # Run tests with coverage

# Maintenance
bun clean                   # Clean build artifacts
```

### awfixer.com (Next.js + MDX)

**Package manager:** npm/pnpm/yarn
**Node version:** Latest stable

```bash
cd awfixer.com

# Development
npm run dev                 # Start dev server with Turbopack (http://localhost:3000)
npm run build               # Production build
npm run start               # Run production build

# Code Quality
npm run lint                # Run ESLint with auto-fix
npm run format              # Format with Prettier
```

### awfixer.academy (Vite + React)

**Package manager:** bun (enforced)
**Bun version:** ≥1.1.0

```bash
cd awfixer.academy

# Development
bun dev                     # Start dev server (http://localhost:5173)
bun build                   # Production build (includes type checking)
bun preview                 # Preview production build

# Code Quality
bun lint                    # Run ESLint
bun typecheck               # TypeScript type checking

# Testing
bun test                    # Run Vitest tests
bun test:ui                 # Run Vitest with UI
```

### awfixer.link (Redirect Service)

No build process. This is a simple Vercel configuration for URL redirects.

## Cross-Project Patterns

### Package Managers

Different sites use different package managers:
- **awfixer.blog:** pnpm (enforced via `preinstall` script)
- **awfixerwiki:** bun (preferred, specified in `packageManager` field)
- **awfixer.academy:** bun (preferred, specified in `packageManager` field)
- **awfixer.vip, awfixer.me, awfixer.com:** Any package manager

Always use the package manager specified in each project's `package.json` or documentation.

### Styling

All projects use **Tailwind CSS 4** via `@tailwindcss/vite` or `@tailwindcss/postcss`. Key patterns:
- Mobile-first responsive design
- Consistent breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Common utilities: `clsx`, `tailwind-merge`, `class-variance-authority`
- Animation libraries: `motion` (formerly Framer Motion), `gsap`, `@vueuse/motion` (Vue)

### Testing

Most projects use **Vitest** for unit/component/integration tests:
- Test files: `*.test.ts`, `*.test.tsx`
- Setup files in `tests/setup/` or project root
- Common libraries: `@testing-library/react`, `@testing-library/vue`, `vitest-axe`

E2E testing (where present):
- **Playwright** for browser automation
- **@axe-core/playwright** for accessibility testing
- Visual regression tests with screenshot comparison

### UI Components

Common component libraries:
- **Radix UI** - Accessible primitives (Next.js/React projects)
- **Base UI** - Headless components (awfixer.blog)
- **shadcn/ui** - Component patterns (awfixer.vip)
- **Reka UI / Radix Vue** - Vue equivalents (awfixer.vip)
- **Lucide** - Icon library (all projects)

### Authentication & Services

- **Better Auth** - Authentication solution (awfixer.vip, awfixer.academy)
- **Sanity** - Headless CMS (awfixer.blog)
- **Ory** - Identity management (awfixer.me, awfixerwiki)
- **Vercel Analytics** - Analytics (most sites)
- **PostHog** - Product analytics (awfixer.vip, awfixerwiki)
- **Sentry** - Error monitoring (awfixer.blog, awfixer.vip)

### Deployment

All sites deploy to **Vercel**:
- `vercel.json` for configuration (where needed)
- Environment variables managed per project
- Most projects use `vercel` package for deployment utilities

## Architecture Guidelines

### Framework Selection

- **Next.js** - For SEO-critical content sites, blogs, and marketing pages (awfixer.blog, awfixer.com)
- **Astro** - For documentation, static content, and fast-loading sites (awfixer.me, awfixerwiki)
- **Vue + Vite** - For interactive applications with complex state (awfixer.vip)
- **React + Vite** - For educational platforms and SPAs (awfixer.academy)

### Code Organization

Each project follows its framework's conventions:
- **Next.js:** App Router in `app/` directory, Server Components by default
- **Astro:** Pages in `src/pages/`, components in `src/components/`
- **Vue:** Composition API with `<script setup>`, components in `src/components/`
- **React:** Functional components with hooks, components in `src/components/`

### Shared Utilities

While there's no shared library (yet), common patterns include:
- Environment validation with **Zod** (all projects)
- Date formatting with **date-fns** (Next.js projects)
- Form validation with **Zod** + **react-hook-form** or **vee-validate**
- Type safety with **TypeScript** (all projects)

## Development Workflow

### Working Across Multiple Sites

When making changes that affect multiple sites:

1. Make changes in each site's directory independently
2. Test each site individually with its own test suite
3. Ensure consistent patterns (e.g., same Tailwind classes, component structure)
4. Commit changes per site or as a logical group

### Environment Variables

Each site manages its own environment variables:
- `.env.example` or `.env.local.example` files show required variables
- **awfixer.blog** has strict environment validation via `lib/env.ts`
- Never commit `.env.local` or `.env` files

### Git Workflow & CI/CD

**Centralized at Monorepo Root:**

All projects now share centralized Git hooks and GitHub workflows managed at the repository root.

#### Pre-commit Hooks (Root Level)

Location: `/.husky/pre-commit`

The monorepo pre-commit hook automatically:
- Detects which projects have staged changes
- Runs project-specific linters and type checkers
- Regenerates types for awfixer.blog (Sanity schema)
- Respects each project's package manager (pnpm, bun, npm)

**To bypass:** `git commit --no-verify` (not recommended - CI will catch issues)

#### GitHub Workflows (Root Level)

Centralized workflows at `/.github/workflows/`:
- **type-check.yml** - TypeScript validation for all projects
- **lint.yml** - Code linting (Biome, ESLint, Prettier)
- **test.yml** - Run test suites (Vitest, Playwright)

These workflows run for all projects on every push to catch cross-project breaking changes early.

#### Project-Specific Workflows

Some workflows remain project-specific due to unique requirements:
- **awfixer.blog**: Azure Container Apps deployment (prod, preview, cleanup, reaper)
- **awfixer.vip**: Comprehensive test matrix (unit, E2E, visual, accessibility)
- **awfixerwiki**: Meilisearch documentation indexing

See individual project `.github/workflows/` directories for these project-specific workflows.

#### Branch Strategy

- **Main branch:** Most sites use `main` or `dev`
- **awfixer.blog** has a `prod` branch for production deployments to Azure Container Apps

## Important Notes

### awfixer.blog (NextMedal Template)

This is the most complex site, built from the Medal Social NextMedal template. It has:
- Comprehensive testing (85+ test files)
- Multi-language support (Norwegian, English, Arabic)
- Sanity CMS integration with 66 schema types
- Extensive accessibility and SEO tooling
- Docker support with standalone output

**Always refer to `awfixer.blog/CLAUDE.md` for detailed guidance on this project.**

### .opencode Directory

This contains OpenCode AI assistant configuration. Do not modify unless specifically working on AI assistant features.

### uhm.astro File

This appears to be a reference/example file demonstrating two ways to import SVG in Astro:
1. As raw HTML (`?raw` suffix)
2. As a component

Not part of the active build process.

## Code Style

### General Principles

- **TypeScript** for all new code
- **Functional programming** preferred over classes
- **Composition** over inheritance
- **Explicit** over implicit (avoid magic)
- **Descriptive names** over single-letter variables (except simple loop indices)

### Project-Specific Styles

- **awfixer.blog:** Biome (2 spaces, single quotes, semicolons always, 100 char width)
- **awfixer.vip, awfixer.academy:** ESLint + TypeScript ESLint
- **awfixer.com:** ESLint + Prettier
- **awfixerwiki, awfixer.me:** Prettier

### Accessibility Standards

All projects should follow:
- **WCAG 2.2 AA** compliance
- Semantic HTML first, ARIA as enhancement
- Keyboard navigation support
- Focus indicators on all interactive elements
- Color contrast ratios: 4.5:1 (normal text), 3:1 (large text)
- `alt` text on all images
- `aria-label` on icon-only buttons

## Testing Philosophy

### What to Test

- **Unit tests:** Pure functions, utilities, helpers
- **Component tests:** React/Vue component behavior and accessibility
- **Integration tests:** API routes, form submissions, multi-step flows
- **E2E tests:** Critical user paths, smoke tests
- **Visual tests:** UI regressions (where Playwright is configured)
- **Performance tests:** Core Web Vitals (where configured)

### What NOT to Test

- Third-party library internals
- Framework behavior (Next.js, Astro, Vue internals)
- Simple pass-through functions
- CSS styling (use visual regression instead)

## Common Tasks

### Adding a New Site

1. Create new directory in repository root
2. Initialize with chosen framework (`npm create`, `bun create`, etc.)
3. Install Tailwind CSS 4: `npm install -D tailwindcss @tailwindcss/vite`
4. Configure common tools: TypeScript, ESLint/Biome, Vitest
5. Add environment variable examples
6. Update this CLAUDE.md with site-specific commands
7. Configure Vercel deployment

### Updating Dependencies

Each site manages its own dependencies. To update:

```bash
cd <site-directory>

# Check outdated packages
npm outdated  # or pnpm outdated, bun outdated

# Update carefully (test after each major update)
npm update <package>  # or pnpm update, bun update

# For major version updates
npm install <package>@latest
```

### Running All Tests

There's no root-level test command. Run tests per project:

```bash
# Example: Run all tests across two key sites
cd awfixer.blog && pnpm test && cd ..
cd awfixer.vip && bun test && cd ..
```

## Troubleshooting

### Port Conflicts

Sites use different default ports:
- awfixer.blog: 3000
- awfixer.com: 3000
- awfixer.vip: 5173
- awfixer.academy: 5173
- awfixer.me: 4321
- awfixerwiki: 3001 (or `$PORT`)

If ports conflict, set the `PORT` environment variable or kill the conflicting process:
```bash
lsof -ti:3000 | xargs kill
```

### Package Manager Errors

If you see errors like "This project requires pnpm":
- Check the project's `package.json` for `packageManager` field
- Use the specified package manager (pnpm, bun, or npm)
- Some projects enforce this via `preinstall` scripts

### Build Failures

Common causes:
- **Missing environment variables:** Check `.env.example` files
- **Node version mismatch:** awfixer.blog requires Node 24+
- **Type errors:** Run `npm run typecheck` or `tsc --noEmit`
- **Outdated dependencies:** Try removing `node_modules` and reinstalling

### Sanity Issues (awfixer.blog)

- **Studio won't load:** Check CORS settings at sanity.io/manage
- **Missing content:** Create an index page with slug = "index" in Studio
- **Schema changes not reflecting:** Run `pnpm generate:collections`

## Performance Targets

### Core Web Vitals (Google Standards)

All sites should aim for:
- **LCP (Largest Contentful Paint):** ≤2.5s
- **INP (Interaction to Next Paint):** ≤200ms
- **CLS (Cumulative Layout Shift):** ≤0.1

### Framework-Specific Optimizations

- **Next.js:** Use Server Components, `next/image`, App Router
- **Astro:** Partial hydration, `client:load` directives
- **Vue/React:** Code splitting, lazy loading, `React.lazy()`
- **All:** Optimize images (WebP), defer non-critical scripts, minimize bundle size

## Support & Documentation

- **awfixer.blog:** Extensive docs in `awfixer.blog/README.md` and `awfixer.blog/CLAUDE.md`
- **Framework docs:** Next.js, Astro, Vue, Vite official documentation
- **Component libraries:** Radix UI, Base UI, shadcn/ui documentation
- **Deployment:** Vercel documentation

---

**Last updated:** 2026-01-13
**Maintained by:** AWFixer
