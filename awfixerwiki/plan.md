# Migration Plan: Next.js → Vite+React + Modernization

## Executive Summary

Migrate AWFixer's Wiki from Next.js 15 to Astro + Vite + Bun with modern testing infrastructure, eliminate Babel conflicts, consolidate styling systems, replace index page with marketing focus, and implement proper analytics/protection.

**Current Issues Identified:**
- ⚠️ Babel/SWC conflict causing build warnings
- 🎨 4 overlapping styling systems (Tailwind + twin.macro + styled-components + shadcn/ui)
- 🔧 PostHog stub implementation (no real analytics)
- 🛡️ Turnstile backend ready, frontend not implemented
- 📁 Scattered configuration files
- 🧪 No testing framework

## Migration Goals

1. **Eliminate Babel/SWC conflicts** by moving to Vite (esbuild-only)
2. **Switch to Astro framework** for better content site performance
3. **Consolidate to single styling system** (Tailwind + shadcn/ui only)
4. **Modernize testing infrastructure** (Vitest + Rolldown)
5. **Reorganize project structure** for clarity
6. **Migrate to Bun runtime** (Bun + Vite + Astro setup)
7. **Implement working analytics** (Vercel Analytics + PostHog for tracking)
8. **Add comprehensive protection** (all middleware features for auth system)
9. **Enhance marketing page** (already good, may need tweaks)

---

## Phase 1: Preparation & Dependencies

### 1.1 New Dependencies

**Remove:**
```bash
npm uninstall next next-contentlayer next-contentlayer next-themes babel-plugin-macros styled-components @babel/core @babel/preset-env @babel/preset-react twin.macro
```

**Add:**
```bash
npm install astro @astrojs/react @astrojs/tailwind @astrojs/contentlayer vite vitest @vitest/ui jsdom rolldown
npm install -D @types/jsdom @vitest/coverage-v8 @testing-library/react @testing-library/jest-dom @testing-library/astro
bun --bun # Install Bun for runtime migration
```

**Keep (compatible):**
- React 18 (for components), TypeScript, Tailwind CSS, PostHog, shadcn/ui
- Contentlayer (CLI mode), nanostores, meilisearch
- All utility dependencies

**Remove (React-specific):**
- @tanstack/react-router (replace with Astro routing)

### 1.2 Configuration Files - Consolidation Plan

**New Structure:**
```
├── astro.config.mjs         # Main Astro config
├── vite.config.ts           # Vite config (Astro uses internally)
├── vitest.config.ts        # Testing config  
├── tailwind.config.js       # Keep (no changes)
├── tsconfig.json           # Update for Astro
├── tsconfig.node.json      # Node-specific TypeScript config
├── contentlayer.config.ts    # Keep (CLI mode)
├── bun.lockb              # Bun lockfile (replace package-lock.json)
├── .env.example           # Update with new vars
└── src/
    ├── pages/             # Astro file-based routing
    ├── layouts/           # Astro layouts
    ├── components/        # React components
    ├── content/          # Markdown/content files
    ├── lib/
    └── styles/
```

**Remove:**
- `next.config.js`
- `.babelrc.js`
- `package-lock.json` (replace with bun.lockb)
- `src/middleware.ts` (migrate to Astro middleware)
- `src/pages/_app.tsx`
- `src/pages/_document.tsx`
- `@tanstack/react-router` dependencies

---

## Phase 2: Core Migration

### 2.1 Astro Configuration

**File: `astro.config.mjs`**
```javascript
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import contentlayer from '@astrojs/contentlayer'
import { resolve } from 'path'

export default defineConfig({
  integrations: [
    react(),
    tailwind(),
    contentlayer(),
  ],
  vite: {
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        'contentlayer/generated': resolve(__dirname, './.contentlayer/generated'),
      },
    },
  },
  server: {
    port: 3001, // Match current setup
  },
})
```

### 2.2 TypeScript Updates

**File: `tsconfig.json`**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "contentlayer/generated": ["./.contentlayer/generated"]
    }
  },
  "include": ["src/**/*"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 2.3 Astro Application Structure

**File: `src/pages/index.astro`**
```astro
---
import Layout from '../layouts/Layout.astro'
import HomePage from '../components/HomePage.jsx'
---
<Layout title="AWFixer Wiki">
  <HomePage />
</Layout>
```

**File: `src/layouts/Layout.astro`**
```astro
---
export interface Props {
  title: string;
}
const { title } = Astro.props;
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <title>{title}</title>
</head>
<body>
  <slot />
</body>
</html>
```

**File: `src/pages/docs/[...slug].astro`**
```astro
---
import Layout from '../../layouts/Layout.astro'
import { getCollection } from 'astro:content'
import DocsPage from '../../components/DocsPage.jsx'

export async function getStaticPaths() {
  const pages = await getCollection('docs')
  return pages.map((page) => ({
    params: { slug: page.slug },
    props: { page }
  }))
}

const { page } = Astro.props;
---
<Layout title={page.data.title}>
  <DocsPage page={page} />
</Layout>
```

---

## Phase 3: Styling Consolidation

### 3.1 Remove twin.macro & styled-components

**Actions:**
1. Convert `tw={...}` props to `className={...}` throughout codebase
2. Replace styled-components with Tailwind classes or CSS modules
3. Remove styled-components SSR from `_document.tsx`

**Example Conversion:**
```typescript
// Before (twin.macro)
<div tw="flex items-center justify-between p-4">

// After (Tailwind classes)
<div className="flex items-center justify-between p-4">

// Before (styled-components)
const StyledCard = styled.div`
  display: flex;
  padding: 1rem;
`

// After (Tailwind CSS module)
<div className="flex p-4">
```

### 3.2 Keep Only Tailwind + shadcn/ui

**Benefits:**
- Faster builds (no Babel macro processing)
- Smaller bundle size
- Better developer experience
- Vite-native HMR

---

## Phase 4: Content Processing & Routing

### 4.1 Contentlayer CLI Integration

**Update `package.json`:**
```json
{
  "scripts": {
    "dev": "concurrently \"npm run contentlayer:dev\" \"vite\"",
    "build": "npm run contentlayer:build && vite build",
    "contentlayer:dev": "contentlayer --watch",
    "contentlayer:build": "contentlayer --clear"
  }
}
```

**File: `src/pages/DocsPage.tsx`**
```typescript
import { useLoaderData } from '@tanstack/react-router'
import { allPages, Page } from 'contentlayer/generated'
import { DocsLayout } from '../layouts/DocsLayout'
import { MDXComponents } from '../components/MDXComponents'

interface DocsPageProps {
  slug: string
}

export function DocsPage({ slug }: DocsPageProps) {
  // Find page by slug
  const page = allPages.find((p: Page) => p.url === `/${slug}`)
  
  if (!page) {
    return <NotFound />
  }

  return (
    <DocsLayout page={page}>
      <MDXComponents code={page.body.code} />
    </DocsLayout>
  )
}
```

### 4.2 Sidebar & Navigation

**Keep existing:** `src/data/sidebar.ts` - structure is framework agnostic

**Update:** Navigation components to use TanStack Router instead of Next.js router

---

## Phase 5: Middleware & API Migration

### 5.1 Edge Functions (Vercel)

**Replace `src/middleware.ts` with Vercel Edge Functions:**

**File: `api/edge.ts`**
```typescript
import { NextRequest, NextResponse } from '@vercel/edge'

export const config = {
  runtime: 'edge',
}

export default async function middleware(request: Request) {
  const url = new URL(request.url)
  
  // Rate limiting (using Vercel KV or Upstash Redis)
  // Bot detection
  // Security headers
  // Markdown export URL rewriting
  
  return new Response(null, {
    status: 302,
    headers: { Location: `/dynamic${url.pathname}?format=md` }
  })
}
```

### 5.2 API Routes → Serverless Functions

**Convert to Vercel Serverless Functions:**
- `api/export.ts` → `api/export/route.ts`
- `api/verify-turnstile.ts` → `api/verify-turnstile/route.ts`  
- `api/llms-docs.md.ts` → `api/llms-docs/route.ts`

**Example:**
```typescript
// api/verify-turnstile/route.ts
import { NextRequest, NextResponse } from '@vercel/edge'

export const runtime = 'edge'

export async function POST(request: Request) {
  // Existing Turnstile verification logic
}
```

---

## Phase 6: Analytics Implementation

### 6.1 Decision: PostHog vs Vercel Analytics

**Option 1: Fix PostHog**
```typescript
// instrumentation-client.ts (replace with real init)
import posthog from 'posthog-js'

export const { posthog } = await import('posthog-js')
posthog.init(process.env.NEXT_PUBLIC_POSTHOG_API_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  capture_pageview: true,
})
```

**Option 2: Switch to Vercel Analytics (Simpler)**
```typescript
// src/components/Analytics.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

export function Analytics() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}
```

**Recommendation:** Use Vercel Analytics (already installed, simpler integration)

---

## Phase 7: Protection Implementation

### 7.1 Complete Turnstile Integration

**File: `src/components/Turnstile.tsx`**
```typescript
'use client'

import { useEffect, useRef } from 'react'

interface TurnstileProps {
  siteKey: string
  onVerify: (token: string) => void
  onError?: () => void
}

export function Turnstile({ siteKey, onVerify, onError }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    script.defer = true
    
    script.onload = () => {
      // @ts-ignore
      window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: onVerify,
        'error-callback': onError,
      })
    }

    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [siteKey, onVerify, onError])

  return <div ref={containerRef} />
}

declare global {
  interface Window {
    turnstile: {
      render: (container: HTMLElement, params: any) => string
    }
  }
}
```

**File: `src/components/TurnstileProtection.tsx`**
```typescript
import { useState } from 'react'
import { Turnstile } from './Turnstile'
import { verifyTurnstile } from '../lib/turnstile'

export function TurnstileProtection({ 
  children, 
  action 
}: { 
  children: React.ReactNode
  action: string 
}) {
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleVerify = async (token: string) => {
    setIsLoading(true)
    try {
      const isValid = await verifyTurnstile(token, action)
      setIsVerified(isValid)
    } catch (error) {
      console.error('Turnstile verification failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isVerified) {
    return <>{children}</>
  }

  return (
    <div className="flex items-center justify-center min-h-96">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Verify You're Human</h3>
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!}
          onVerify={handleVerify}
          onError={() => setIsLoading(false)}
        />
        {isLoading && <p className="mt-2 text-sm text-gray-600">Verifying...</p>}
      </div>
    </div>
  )
}
```

**Add to forms/protected routes:**
- Export functionality
- Any form submissions
- Rate-limited endpoints

---

## Phase 8: Testing Infrastructure

### 8.1 Vitest Setup

**File: `vitest.config.ts`**
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'contentlayer/generated': resolve(__dirname, './.contentlayer/generated'),
    },
  },
})
```

**File: `src/test/setup.ts`**
```typescript
import '@testing-library/jest-dom'
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Extend Vitest's expect
expect.extend({})
```

### 8.2 Test Structure

```
src/
├── test/
│   ├── setup.ts
│   └── __mocks__/
└── __tests__/
    ├── components/
    ├── hooks/
    ├── lib/
    └── pages/
```

### 8.3 Initial Tests

**File: `src/__tests__/components/Button.test.tsx`**
```typescript
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('applies variant styles', () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByRole('button', { name: /delete/i })
    expect(button).toHaveClass('bg-destructive')
  })
})
```

---

## Phase 9: Project Structure Consolidation

### 9.1 New Directory Structure

```
awfixerwiki/
├── public/                 # Static assets (no changes)
├── src/
│   ├── components/         # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── CodeBlock/     # Code highlighting
│   │   ├── Search/        # Search components
│   │   └── Turnstile.tsx  # Protection component
│   ├── pages/             # Page components
│   │   ├── HomePage.tsx   # Marketing page
│   │   ├── DocsPage.tsx  # Documentation
│   │   └── NotFound.tsx   # 404 page
│   ├── layouts/           # Layout components
│   │   └── DocsLayout.tsx
│   ├── lib/              # Utilities and integrations
│   │   ├── posthog.ts     # Analytics
│   │   ├── turnstile.ts   # Protection
│   │   └── utils.ts      # Helper functions
│   ├── hooks/            # Custom hooks
│   ├── styles/           # Global styles
│   │   └── globals.css
│   ├── data/             # Static data
│   │   └── sidebar.ts
│   ├── main.tsx          # App entry
│   ├── App.tsx           # Root component
│   └── test/             # Test setup
├── docs/                # Markdown content (no changes)
├── api/                 # Serverless functions
├── contentlayer.config.ts # Content processing
├── vite.config.ts       # Vite configuration
├── vitest.config.ts     # Testing configuration
├── tailwind.config.js    # Styling configuration
├── tsconfig.json        # TypeScript configuration
├── .env.example         # Environment variables
└── package.json         # Dependencies and scripts
```

### 9.2 Configuration Consolidation

**Environment Variables (`.env.example`):**
```env
# Analytics (choose one)
# NEXT_PUBLIC_POSTHOG_API_KEY=
# NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Protection
# NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=
# CLOUDFLARE_TURNSTILE_SECRET_KEY=

# Search
# MEILISEARCH_HOST=
# MEILISEARCH_API_KEY=

# Build
# NODE_ENV=production
```

---

## Phase 10: Marketing Page Enhancement

### 10.1 Current State Analysis

**Current index page already includes:**
- ✅ Hero section with clear value proposition
- ✅ Feature highlights (Getting Started, Guides, Quickstart, Tutorials)
- ✅ Framework support grid (8 popular frameworks)
- ✅ Template deployment grid (8 production templates)
- ✅ Social proof and community links
- ✅ Clear calls-to-action

**Minor enhancements for broader audience:**
- Add more use cases beyond developers (technical writers, content managers, etc.)
- Include testimonials or case studies
- Add search functionality to landing page
- Improve mobile responsiveness
- Add feature comparison with alternatives

### 10.2 Suggested Improvements

```typescript
// Enhanced HomePage.tsx additions
const additionalFeatures = [
  {
    title: "Content Management",
    description: "Perfect for technical writers, documentation teams, and content managers",
    icon: FileText,
  },
  {
    title: "Team Collaboration", 
    description: "Built for teams contributing to shared documentation",
    icon: Users,
  },
  // ... more user personas
]
```

---

## Implementation Timeline

### Week 1: Foundation
- [ ] Set up Astro + Vite + Bun runtime
- [ ] Configure Astro with React and Tailwind integrations
- [ ] Install and configure Bun runtime
- [ ] Migrate to Astro file-based routing
- [ ] Remove Next.js and React-specific dependencies

### Week 2: Styling & Content
- [ ] Remove twin.macro and styled-components
- [ ] Convert all styling to Tailwind classes
- [ ] Set up Contentlayer CLI integration
- [ ] Migrate content pages to new routing

### Week 3: Infrastructure
- [ ] Convert API routes to serverless functions
- [ ] Implement edge functions for middleware
- [ ] Set up Turnstile protection
- [ ] Implement analytics (PostHog or Vercel)

### Week 4: Testing & Polish
- [ ] Set up Vitest testing framework
- [ ] Write initial test suite
- [ ] Performance optimization
- [ ] Documentation updates
- [ ] Deploy to staging for testing

---

## Risk Assessment & Mitigation

### High Risk
- **Middleware complexity** - Current middleware is complex with rate limiting and bot detection
  - *Mitigation*: Implement incrementally, start with basic functionality

### Medium Risk
- **Contentlayer integration** - CLI mode may have different behavior than Next.js integration
  - *Mitigation*: Test content processing early, fallback to unified.js if needed

### Low Risk
- **Styling migration** - Twin.macro to Tailwind conversion is straightforward
- **Routing changes** - TanStack Router is well-documented
- **Testing setup** - Vitest has excellent migration docs

---

## Success Criteria

1. ✅ **Zero build warnings** (Babel/SWC conflict resolved)
2. ✅ **Switched to Astro framework** (better content site performance)
3. ✅ **Single styling system** (Tailwind + shadcn/ui only)
4. ✅ **Modern testing infrastructure** (Vitest with 100% coverage)
5. ✅ **Migrated to Bun runtime** (Bun + Vite + Astro setup)
6. ✅ **Dual analytics system** (Vercel for hosting + PostHog for tracking)
7. ✅ **Comprehensive protection** (all middleware features for auth)
8. ✅ **Faster builds** (Astro + Vite vs Next.js webpack)
9. ✅ **Clean project structure** (Astro file-based routing)
10. ✅ **Enhanced marketing page** (broader audience appeal)

---

## Questions for Decision Making

1. **Analytics Strategy**: Should we fix PostHog implementation or switch to Vercel Analytics for simplicity?

- Answer: Keep Vercel Analytics for hosting decisions AND fix PostHog analytics for actual tracking.

2. **Framework Choice**: Are we committed to React SPA, or should we consider Astro for better content site performance?

- Answer: Switch to Astro with Bun + Vite + Astro setup.

3. **Runtime Migration**: Should we migrate to Bun runtime for performance benefits, or stay with Node.js for compatibility?

- Answer: Migrate to Bun runtime.

4. **Middleware Scope**: Which middleware features are essential vs nice-to-have? (Rate limiting, bot detection, security headers, etc.)

- Answer: Implement ALL middleware features to prepare for upcoming auth system.

5. **SSR Requirements**: Do we need server-side rendering for documentation, or is static generation sufficient?

- Answer: we will stick with Contentlayer ssg for the time being, though we will need to migrate to contentlayer2 as it was forked.

6. **Deployment Target**: Are we staying with Vercel, or do you prefer another platform?

- Answer: Vercel.

7. **Content Updates**: Are there specific landing page changes needed, or is the current design sufficient for your target audience?

- Answer: landing page does not currently render ;p but we need to impliment the footer component site wide still.

8. **Testing Coverage**: What's the minimum test coverage percentage we should aim for?

- Answer: 100% excluding manually excluded files.

---

## Next Steps

1. **Review and approve this migration plan**
2. **Answer the questions above** to clarify implementation details
3. **Create development branch** for migration work
4. **Begin Phase 1 implementation**
5. **Set up regular check-ins** to review progress and adjust approach

**Estimated Total Timeline**: 4 weeks for full migration and testing.
