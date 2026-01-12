# AGENTS.md - AWFixer's Lounge Development Guide

## Overview

This guide provides essential information for agentic coding assistants working on the AWFixer's Lounge portfolio website. The project is a modern React/TypeScript application with Three.js 3D animations, built using Vite and Tailwind CSS.

## Build, Lint & Test Commands

### Development Workflow
```bash
# Start development server with hot reload
pnpm dev

# Production build with TypeScript type checking
pnpm build

# Run ESLint on all TypeScript/TSX files
pnpm lint

# Preview production build locally
pnpm preview
```

### Testing
**Note**: No test framework is currently configured. For future testing setup:
- Consider Vitest for unit/component testing
- Playwright for E2E testing
- Run single tests with: `pnpm test -- [test-file]`

## Code Style Guidelines

### TypeScript Configuration
- **Strict mode enabled**: All TypeScript strict checks are active
- **verbatimModuleSyntax**: Requires explicit `import type` for type-only imports
- **Target**: ES2022 with modern JavaScript features
- **JSX**: React JSX transform (no React import needed)

### Import Conventions
```typescript
// ✅ Correct: Split value and type imports
import { useState, useEffect } from 'react';
import type { FC, ReactNode } from 'react';

// ❌ Incorrect: Mixed imports
import { useState, FC, ReactNode } from 'react';
```

### Component Patterns
```typescript
// Interface definitions at top of file
interface ComponentProps {
  title: string;
  children?: ReactNode;
}

// Functional component with explicit typing
const MyComponent: FC<ComponentProps> = ({ title, children }) => {
  return (
    <div className="component-styles">
      <h1>{title}</h1>
      {children}
    </div>
  );
};
```

### Constants & Configuration
- All content centralized in `src/constants.ts`
- Use `as const` for type-safe constants
- Export interfaces alongside data structures
- Separate theme colors, navigation, and content

### Naming Conventions
- **Components**: PascalCase (e.g., `SpotlightCard`, `ScrollStack`)
- **Files**: PascalCase for components, camelCase for utilities
- **Interfaces**: PascalCase with descriptive names (e.g., `Project`, `FooterColumn`)
- **Constants**: SCREAMING_SNAKE_CASE for exported constants
- **Functions**: camelCase
- **Variables**: camelCase, descriptive names

### Error Handling
- Use TypeScript's strict null checks
- Handle Three.js resource disposal in useEffect cleanup
- Validate props and state changes
- Log errors appropriately (console.error for development)

### Comments & Documentation
- Minimal but meaningful comments for complex logic
- Document Three.js memory management patterns
- Explain animation timing and physics calculations
- Use JSDoc for complex function signatures

## Architecture Patterns

### Content Management System
All website content is managed via `src/constants.ts`:
- Site configuration, navigation items, projects
- Theme colors and styling constants
- Footer links and company information

**Pattern**: Never hardcode content in components. Always import from constants.

### Z-Index Layering System
```
-z-10  → Hyperspeed 3D background (fixed, full viewport)
z-10   → All content sections (hero, projects, about, footer)
z-20   → Footer (slightly elevated for prominence)
default → PillNav navigation (sits naturally on top)
```

**Critical**: Always add `relative z-10` to content sections to appear above 3D background.

### Three.js Memory Management
```typescript
useEffect(() => {
  const app = new App();
  app.start();

  return () => {
    // Comprehensive cleanup prevents memory leaks
    app.dispose(); // Dispose ALL WebGL resources
  };
}, []); // Empty dependency array - runs once
```

**Pattern**: Always dispose geometries, materials, textures, and renderers in cleanup.

### Component Structure
```
src/
├── components/     # React components (PascalCase files)
├── lib/           # Utilities (cn function, etc.)
├── constants.ts   # All content and configuration
├── App.tsx        # Main application component
└── main.tsx       # React entry point
```

### Path Aliases
- `@/` resolves to `./src/`
- Use `@/components/ComponentName` for imports
- Use `@/lib/utils` for utility imports

## Styling Guidelines

### Tailwind CSS
- Utility-first approach with custom gradients
- Dark theme with glowing text effects
- Responsive design with mobile-first approach
- Custom color palette defined in constants

### Common Patterns
```typescript
// Glass morphism effect
className="bg-black/40 backdrop-blur-md border-white/10"

// Glowing gradient text
className="bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(100,100,255,0.3)]"

// Semi-transparent cards
className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl"
```

### Animation Guidelines
- GSAP for complex animations (PillNav morphing)
- Lenis for smooth scroll physics
- CSS transitions for simple state changes
- GPU-accelerated transforms for performance

## Performance Considerations

### Three.js Optimization
- Single WebGL context per application
- Instanced rendering for repeated objects
- RAF-based animation loops
- Comprehensive resource disposal

### React Performance
- Functional components with hooks
- Proper dependency arrays in useEffect
- Memoization for expensive calculations
- GPU-accelerated CSS transforms

### Build Optimization
- Vite automatic code splitting
- Tree shaking for unused dependencies
- Tailwind CSS purging in production
- Modern ES2022 target for smaller bundles

## Development Workflow

### File Organization
1. **New Components**: Create in `src/components/` with PascalCase naming
2. **Content Updates**: Modify `src/constants.ts` (never components)
3. **Styling**: Use Tailwind utilities, extend via constants if needed
4. **Assets**: Place in `/public/`, reference without `/public/` prefix

### Code Quality Checks
- Run `pnpm lint` before commits
- Run `pnpm build` to catch TypeScript errors
- Test in multiple browsers (Chrome, Firefox, Safari)
- Verify Three.js animations work correctly

### Git Workflow
- Feature branches for new work
- Atomic commits with descriptive messages
- Pre-commit hooks for linting (if configured)
- Build verification before merging

## Common Issues & Solutions

### Content Not Visible
**Problem**: Content appears but not visible against 3D background
**Solution**: Ensure sections have `relative z-10` class

### TypeScript Import Errors
**Problem**: `TS1484: Type must be imported using a type-only import`
**Solution**: Use `import type { TypeName } from 'module'`

### Three.js Memory Leaks
**Problem**: RAM usage increases over time
**Solution**: Verify comprehensive disposal in useEffect cleanup

### Build Failures
**Problem**: Build succeeds in dev but fails in production
**Solution**: Run `pnpm build` frequently during development

## Tooling Configuration

### ESLint Rules
- TypeScript recommended rules
- React hooks rules (exhaustive deps, etc.)
- React refresh rules for hot reload
- Browser globals available

### TypeScript Compiler Options
- Strict mode with all checks enabled
- No unused locals/parameters
- Verbatim module syntax
- ES2022 target with modern features

### Vite Configuration
- React plugin with SWC
- Tailwind CSS plugin
- Path aliases (`@/` → `./src/`)

## Asset Management

### Static Assets
- Images in `/public/` directory
- Reference without `/public/` prefix in code
- Logo: `/morty.jpeg`
- OG image: `/mortywelcome.png`

### Meta Tags
- All meta tags in `index.html`
- Update directly for SEO changes
- Open Graph and Twitter Card support

## Future Considerations

### Testing Setup (Recommended)
```bash
# Install testing dependencies
pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom

# Add test script to package.json
"test": "vitest",
"test:ui": "vitest --ui"
```

### Component Testing Pattern
```typescript
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import MyComponent from './MyComponent';

test('renders component correctly', () => {
  render(<MyComponent />);
  expect(screen.getByText('Expected Text')).toBeInTheDocument();
});
```

---

**Last Updated**: January 2026
**Project**: AWFixer's Lounge
**Tech Stack**: React 19.2.0, TypeScript 5.9.3, Three.js 0.167.1, Tailwind CSS 4.1.17</content>
<parameter name="filePath">/home/awfixer/awfixer.me/AGENTS.md