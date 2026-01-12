# AWFixer's Lounge - Codebase Guide

## Project Overview

A dynamic portfolio website built with React, TypeScript, Vite, and Three.js featuring:
- Interactive 3D Hyperspeed background animation
- Smooth scroll-based project showcase with card stacking effects
- Centralized content management via constants
- GSAP-powered navigation animations
- Spotlight card interactions

## Technology Stack

- **React 19.2.0** - UI library with modern JSX transform
- **TypeScript 5.9.3** - Type-safe development with strict mode
- **Vite 7.2.4** - Lightning-fast build tool and dev server
- **Tailwind CSS 4.1.17** - Utility-first styling with @tailwindcss/vite plugin
- **Three.js 0.167.1** - WebGL 3D rendering for Hyperspeed background
- **Postprocessing 6.38.2** - Bloom and SMAA effects for Three.js
- **GSAP 3.13.0** - High-performance animations (PillNav)
- **Lenis 1.3.17** - Smooth scrolling physics
- **React Router DOM 6.30.3** - Client-side routing

## Common Commands

```bash
# Development server with hot reload
pnpm dev

# Production build with type checking
pnpm build

# Lint check
pnpm lint

# Preview production build
pnpm preview
```

## Architecture Patterns

### 1. Content Management System

All website content is centralized in `/src/constants.ts` for easy updates without touching component code:

- `SITE_CONFIG` - Site title, subtitle, logo
- `NAV_ITEMS` - Navigation menu items
- `PROJECTS` - "In The Pipe" project showcase items
- `THEME_COLORS` - Color palette for theming
- `CTA_CONTENT` - Call-to-action section content
- `FOOTER_COLUMNS` - Footer link columns
- `FOOTER_QUOTE` - Inspirational quote
- `FOOTER_INFO` - Company information
- `STATUS_CONFIG` - Project status badge styling

**Pattern**: Export strongly-typed constants with `as const` for type safety. Components import and consume these constants rather than containing hardcoded content.

### 2. Z-Index Layering Strategy

The app uses a carefully orchestrated z-index system:

```
-z-10  → Hyperspeed 3D background (fixed, full viewport)
z-10   → All content sections (hero, projects, about, footer)
z-20   → Footer (slightly elevated for prominence)
default → PillNav navigation (sits naturally on top)
```

**Critical**: Always ensure content sections have `relative z-10` to appear above the Hyperspeed background.

### 3. Three.js Memory Management

The Hyperspeed component demonstrates proper WebGL resource disposal to prevent memory leaks:

```typescript
// Dispose geometries
mesh.geometry.dispose();

// Dispose materials (handles arrays)
if (Array.isArray(mesh.material)) {
  mesh.material.forEach((m: THREE.Material) => m.dispose());
} else {
  mesh.material.dispose();
}

// Traverse scene graph for complete cleanup
scene.traverse((object: THREE.Object3D) => {
  if (object instanceof THREE.Mesh) {
    // dispose geometry and materials
  }
});
scene.clear();

// Dispose renderer and remove DOM element
renderer.dispose();
renderer.domElement.parentElement?.removeChild(renderer.domElement);
```

**Pattern**: In useEffect cleanup function, call comprehensive `dispose()` method that cleans up ALL WebGL resources.

**Critical**: Use empty dependency array `[]` for Three.js initialization to prevent recreation on every render.

### 4. TypeScript Strict Mode Compliance

The project uses `verbatimModuleSyntax: true` which requires:

```typescript
// Split value and type imports
import { useState, useEffect } from 'react';
import type { FC, ReactElement } from 'react';

// NOT: import { useState, FC, ReactElement } from 'react';
```

**Pattern**: Always use `import type` for types, interfaces, and type-only imports.

### 5. Component Structure

```
src/
├── components/
│   ├── PillNav.tsx          # Animated navigation with GSAP hover effects
│   ├── ScrollStack.tsx      # Scroll-based card stacking container
│   ├── SpotlightCard.tsx    # Mouse-tracking spotlight effect
│   ├── Hyperspeed.tsx       # Three.js 3D background animation
│   ├── Footer.tsx           # Multi-column footer with quote
│   ├── CardSwap.tsx         # Card swap animation utility
│   └── MagicBento.tsx       # Bento grid layout component
├── constants.ts             # Centralized content management
├── App.tsx                  # Main application component
└── main.tsx                 # React app entry point
```

## Component Usage Guide

### PillNav

Animated navigation with morphing pill background:

```typescript
<PillNav
  logo={SITE_CONFIG.logo}
  logoAlt={SITE_CONFIG.logoAlt}
  items={NAV_ITEMS}
  activeHref={activeHref}
  baseColor={THEME_COLORS.nav.baseColor}
  pillColor={THEME_COLORS.nav.pillColor}
  hoveredPillTextColor={THEME_COLORS.nav.hoveredPillTextColor}
  pillTextColor={THEME_COLORS.nav.pillTextColor}
/>
```

**Animation**: GSAP morphs pill background to hovered item position/size.

### ScrollStack

Creates stacking card effect on scroll:

```typescript
<ScrollStack
  itemDistance={150}        // Scroll pixels between items
  itemScale={0.04}          // Scale factor per item
  itemStackDistance={40}    // Stacking offset distance
  stackPosition="25%"       // Where stacking begins
  scaleEndPosition="15%"    // Where scaling ends
  baseScale={0.9}          // Starting scale
  useWindowScroll={true}   // Use window scroll vs container
>
  {PROJECTS.map((project) => (
    <ScrollStackItem key={project.id}>
      <ProjectCard project={project} />
    </ScrollStackItem>
  ))}
</ScrollStack>
```

**Physics**: Uses Lenis for smooth scroll interpolation.

### SpotlightCard

Interactive card with mouse-tracking radial gradient:

```typescript
<SpotlightCard
  className="p-12 md:p-16 bg-black/40 backdrop-blur-md border-white/10"
  spotlightColor="rgba(100, 100, 255, 0.15)"
>
  {children}
</SpotlightCard>
```

**Effect**: Radial gradient follows mouse position with opacity transitions.

### Hyperspeed

Three.js 3D animated background:

```typescript
<Hyperspeed />
```

**Optimization**: Automatically handles resize, disposal, and RAF cleanup. Use `fixed inset-0 -z-10` positioning.

## Dark Theme System

The site uses a black background with glowing text effects:

```css
/* Background */
bg-black

/* Text gradients with glow */
bg-gradient-to-r from-white via-blue-200 to-purple-300
bg-clip-text text-transparent
drop-shadow-[0_0_30px_rgba(100,100,255,0.3)]

/* Semi-transparent cards */
bg-black/40 backdrop-blur-md border-white/10
```

**Pattern**: Use gradient text with drop-shadow for glowing effects. Use backdrop-blur for glass morphism.

## Build Configuration

### Vite Config

```typescript
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
```

### TypeScript Config

```json
{
  "compilerOptions": {
    "strict": true,
    "verbatimModuleSyntax": true,
    "target": "ES2020",
    "module": "ESNext",
    "jsx": "react-jsx"
  }
}
```

**Note**: `verbatimModuleSyntax` requires explicit `import type` for type-only imports.

## Adding New Content

### Adding a New Project

Edit `src/constants.ts`:

```typescript
export const PROJECTS: Project[] = [
  // ... existing projects
  {
    id: 'project-6',
    title: 'New Project',
    description: 'Project description here...',
    status: 'planning', // 'planning' | 'in-progress' | 'testing' | 'launching-soon'
    tags: ['Tag1', 'Tag2', 'Tag3'],
    gradient: 'from-cyan-500 to-blue-500' // Tailwind gradient
  }
];
```

### Adding Navigation Items

Edit `src/constants.ts`:

```typescript
export const NAV_ITEMS: PillNavItem[] = [
  // ... existing items
  {
    label: 'Blog',
    href: '/blog',
    ariaLabel: 'Read our blog'
  }
];
```

### Updating Footer Links

Edit `src/constants.ts`:

```typescript
export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'New Section',
    links: [
      { id: 'link-1', text: 'Link 1', href: '/link1' },
      { id: 'link-2', text: 'Link 2', href: '/link2' }
    ]
  }
];
```

## Performance Considerations

### Three.js Best Practices

1. **Always dispose resources**: Geometries, materials, textures, and renderers must be manually disposed
2. **Empty dependency arrays**: Prevent unnecessary recreation of Three.js scenes
3. **Use requestAnimationFrame**: Cleanup RAF handles in useEffect cleanup
4. **Scene traversal**: Use `scene.traverse()` for complete resource cleanup

### Scroll Performance

- Lenis provides RAF-based smooth scrolling
- ScrollStack uses transform-based positioning (GPU-accelerated)
- Avoid layout thrashing by batching scroll calculations

### Build Optimization

- Vite automatically code-splits and tree-shakes
- Three.js imports are optimized via named imports
- Tailwind purges unused classes in production

## Common Issues & Solutions

### Content Not Visible

**Symptom**: Content appears but is not visible against background.

**Solution**: Ensure sections have `relative z-10` class to appear above Hyperspeed background.

### TypeScript Import Errors

**Symptom**: `TS1484: Type must be imported using a type-only import`

**Solution**: Use `import type { ... }` for types/interfaces.

### Hyperspeed Memory Leaks

**Symptom**: RAM usage increases over time.

**Solution**: Verify useEffect has empty dependency array and comprehensive disposal in cleanup.

### Build Type Errors

**Symptom**: Build fails with type errors that don't appear in dev.

**Solution**: Run `pnpm build` frequently. Vite dev mode is more permissive than build.

## Asset Management

Static assets are in `/public`:

- `/morty.jpeg` - Logo and favicon
- `/mortywelcome.png` - OG image for social sharing

Reference in code without `/public` prefix:

```typescript
logo: '/morty.jpeg'  // ✅ Correct
logo: '/public/morty.jpeg'  // ❌ Incorrect
```

## Meta Tags & SEO

All meta tags are in `index.html`:

- Primary meta tags (title, description)
- Open Graph tags (og:title, og:image, og:description)
- Twitter Card tags (twitter:card, twitter:image)
- Favicon link

**Update**: Edit `index.html` directly for meta tag changes.

## Development Workflow

1. **Start dev server**: `pnpm dev`
2. **Edit constants**: Update content in `src/constants.ts`
3. **Edit components**: Modify components in `src/components/`
4. **Build & test**: `pnpm build && pnpm preview`
5. **Lint check**: `pnpm lint`

## Key Files to Understand

1. **src/constants.ts** - All content configuration
2. **src/App.tsx** - Main layout and section composition
3. **src/components/Hyperspeed.tsx** - Three.js background with memory management patterns
4. **src/components/ScrollStack.tsx** - Scroll physics and stacking calculations
5. **vite.config.ts** - Build configuration and aliases

---

**Last Updated**: January 2026
**Maintainer**: AWFixer
**License**: See LICENSE file
