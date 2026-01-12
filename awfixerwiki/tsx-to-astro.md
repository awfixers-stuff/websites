# TSX to Astro Migration Plan

## 🎯 Migration Overview

Complete migration of 27 React components (TSX/JSX) to native Astro components with React Islands for interactive functionality.

### Current State Analysis
- **Total Components**: 27 React components
- **Component Types**: 
  - Simple Display (~15): No state, static content
  - Interactive (~12): Uses hooks, event handlers  
  - Complex (~9): Multiple state management, complex logic
- **Key Dependencies**: React hooks, Tailwind CSS with Twin Macro, React Feather icons

### Migration Strategy

#### 1. **Component Classification**
| Difficulty | Count | Components | Strategy |
|------------|--------|-------------|----------|
| **EASY** | 15 | Static display, no state | Direct Astro conversion |
| **MEDIUM** | 12 | Interactive, single hook | React Islands pattern |
| **HARD** | 9 | Complex state, multiple hooks | Architecture redesign |

#### 2. **Architecture Pattern**
```
src/
├── components/           # Native Astro components
│   ├── SimpleComponent.astro
│   └── ComplexComponent.astro
├── islands/             # React Islands for interactive parts
│   ├── ThemeSwitcherIsland.tsx
│   ├── SearchModalIsland.tsx
│   └── CardNavIsland.tsx
└── hooks/               # React hooks for islands only
```

## 📋 Detailed Migration Phases

### Phase 1: Foundation (Day 1-2)
**Objective**: Establish patterns and convert simple components

**Components to Convert:**
1. `LoadingIndicator` - Simple SVG display
2. `Footer` - Static footer content
3. `Logo` - Simple logo display
4. `NotFound` - Error page component
5. `SEO` - Meta tags component
6. `Icon` - Simple icon wrapper

**Tasks:**
- [ ] Create `src/islands/` directory structure
- [ ] Establish Astro component pattern
- [ ] Convert 6 simple components
- [ ] Remove Twin Macro dependencies
- [ ] Update imports in pages
- [ ] Test basic functionality

**Migration Pattern - Simple Component:**
```astro
---
// Replace React imports with Astro imports
export interface Props {
  // Define props interface
}

const { prop1, prop2 } = Astro.props
---

<!-- Direct HTML with Tailwind classes -->
<div class={prop1}>
  {prop2}
</div>
```

### Phase 2: Interactive Components (Day 3-5)
**Objective**: Convert interactive components using React Islands

**Components to Convert:**
1. `ThemeSwitcher` - Theme toggle with hooks
2. `Header` - Scroll functionality
3. `Collapse` - Expand/collapse interaction
4. `ScrollArea` - Scroll interaction
5. `GlobalBanner` - Dismissable banner
6. `InlineCode` - Copy functionality

**Tasks:**
- [ ] Create React Islands architecture
- [ ] Split interactive logic into islands
- [ ] Convert 6 interactive components
- [ ] Handle prop passing between Astro and islands
- [ ] Test interactions thoroughly

**Migration Pattern - Interactive Component:**
```astro
---
// Main Astro component (static parts)
import InteractiveIsland from '../islands/ComponentIsland.tsx'
import ThemeProvider from '../providers/ThemeProvider.astro'

const { initialProps } = Astro.props
---

<div class="static-container">
  <!-- Static HTML content -->
  <ThemeProvider>
    <InteractiveIsland 
      client:load 
      initialProps={initialProps}
    />
  </ThemeProvider>
</div>
```

### Phase 3: Complex Components (Day 6-8)
**Objective**: Convert complex components requiring architectural changes

**Components to Convert:**
1. `CardNav` - Complex state management
2. `Search/Modal` - Search functionality
3. `Search/Results` - Search results display
4. `Search/QueryInput` - Search input with debouncing
5. `Search/OpenModalButton` - Search trigger
6. `Sidebar` - Navigation state
7. `SidebarItem` - Sidebar items
8. `CodeBlock` - Code highlighting
9. `Banner` - Interactive banner

**Tasks:**
- [ ] Redesign state management
- [ ] Create complex React islands
- [ ] Handle data flow between components
- [ ] Optimize for performance
- [ ] Comprehensive testing

### Phase 4: Integration & Cleanup (Day 9-10)
**Objective**: Final integration and optimization

**Tasks:**
- [ ] Update all page imports
- [ ] Fix TypeScript issues
- [ ] Remove unused React dependencies
- [ ] Optimize bundle sizes
- [ ] Performance testing
- [ ] Documentation updates

## 🔧 Technical Implementation Details

### React Islands Strategy
```typescript
// src/islands/ExampleIsland.tsx
import React, { useState, useEffect } from 'react';

interface Props {
  initialData?: any;
  onAction?: (data: any) => void;
}

export default function ExampleIsland({ initialData, onAction }: Props) {
  const [state, setState] = useState(initialData);
  
  useEffect(() => {
    // Component logic here
  }, []);

  return (
    <div className="interactive-element">
      {/* Interactive content */}
    </div>
  );
}
```

### Astro Integration Pattern
```astro
---
import ExampleIsland from '../islands/ExampleIsland.tsx';

const { initialData } = Astro.props
---

<div class="component-wrapper">
  <!-- Static content rendered at build time -->
  <section class="static-section">
    <h2>Static Title</h2>
    <p>Static content</p>
  </section>
  
  <!-- Interactive content hydrated on client -->
  <section class="interactive-section">
    <ExampleIsland 
      client:load
      initialData={initialData}
    />
  </section>
</div>
```

### State Management Strategy
```typescript
// src/stores/themeStore.ts
import { writable } from 'svelte/store';

export const themeStore = writable({
  mode: 'light',
  setMode: (mode: string) => {
    document.documentElement.classList.toggle('dark');
    themeStore.update(state => ({ ...state, mode }));
  }
});

// Use in islands
import { themeStore } from '../stores/themeStore';
```

## 🎨 Styling Migration

### Twin Macro Removal
```typescript
// ❌ Before (Twin Macro)
const StyledDiv = tw.div`flex items-center justify-between`;
<StyledDiv />

// ✅ After (Direct Tailwind)
<div className="flex items-center justify-between">
</div>
```

### Dynamic Styling
```astro
---
// Astro approach for conditional styling
const { isActive, variant } = Astro.props

const buttonClasses = `
  base-button-styles
  ${isActive ? 'active-styles' : ''}
  ${variant === 'primary' ? 'primary-styles' : 'secondary-styles'}
`.trim()
---

<button class={buttonClasses}>
  Button content
</button>
```

## 📊 Performance Optimizations

### 1. **Selective Hydration**
```astro
<!-- Load critical islands immediately -->
<CriticalIsland client:load />

<!-- Delay non-critical islands -->
<SecondaryIsland client:idle />

<!-- Load on interaction -->
<TertiaryIsland client:visible />
```

### 2. **Code Splitting**
```typescript
// src/islands/lazy/HeavyIsland.tsx
import React from 'react';

export default function HeavyIsland() {
  return <div>Heavy component</div>;
}
```

```astro
---
import { lazy } from 'astro';

const HeavyIsland = lazy(() => import('../islands/lazy/HeavyIsland.tsx'));
---

<HeavyIsland client:load />
```

## 🔄 Migration Examples

### Example 1: LoadingIndicator
**Before (React):**
```tsx
export const LoadingIndicator = () => {
  const LoadingIcon = tw.svg`
    inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600
  `;

  return (
    <div role="status">
      <LoadingIcon aria-hidden="true" viewBox="0 0 100 101">
        {/* SVG paths */}
      </LoadingIcon>
    </div>
  );
};
```

**After (Astro):**
```astro
---
const { className = "" } = Astro.props
---

<div role="status" class={className}>
  <svg 
    class="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600"
    aria-hidden="true" 
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908Z" fill="currentColor" />
  </svg>
</div>
```

### Example 2: ThemeSwitcher
**Before (React):**
```tsx
export const ThemeSwitcher: React.FC = () => {
  const { colorMode, setColorMode } = useTheme();
  const toggleColorMode = () => {
    const newMode = colorMode === "dark" ? "light" : "dark";
    setColorMode(newMode);
  };

  return (
    <button onClick={toggleColorMode}>
      {colorMode === "dark" ? <Sun /> : <Moon />}
    </button>
  );
};
```

**After (Astro + Island):**
```astro
---
import ThemeSwitcherIsland from '../islands/ThemeSwitcherIsland.tsx'
import { useTheme } from '../hooks/useTheme'

const initialTheme = useTheme()

---

<ThemeSwitcherIsland client:load initialTheme={initialTheme} />
```

```typescript
// src/islands/ThemeSwitcherIsland.tsx
import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'react-feather';

interface Props {
  initialTheme?: string;
}

export default function ThemeSwitcherIsland({ initialTheme }: Props) {
  const [theme, setTheme] = useState(initialTheme || 'light');
  
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <button 
      className="w-5 h-5 md:w-4 md:h-4 cursor-pointer outline-offset-4"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <Sun width="100%" height="100%" />
      ) : (
        <Moon width="100%" height="100%" />
      )}
      <span className="sr-only" aria-live="polite">
        Toggle {theme === "dark" ? "light" : "dark"} mode
      </span>
    </button>
  );
}
```

## 📈 Expected Benefits

### Performance Gains
| Metric | Before (React) | After (Astro) | Improvement |
|--------|-----------------|---------------|------------|
| Bundle Size | ~500KB | ~200KB | **60% reduction** |
| First Load | ~2.5s | ~0.8s | **3x faster** |
| Build Time | ~30s | ~15s | **2x faster** |
| Runtime JS | All components | Only islands | **80% less** |

### Developer Experience
- ✅ Faster development builds
- ✅ Better TypeScript support in Astro
- ✅ Modern component patterns
- ✅ Clear separation of static vs interactive

## 🚨 Risk Assessment

### High Risk
1. **Complex State Management** - Multiple components sharing state
2. **Event Handling** - Different patterns between React and Astro
3. **Hook Dependencies** - Some React hooks may not work in islands

### Medium Risk  
1. **Styling Issues** - Twin Macro migration complexity
2. **Component Communication** - Props passing between Astro and islands
3. **Testing Changes** - Need to update testing approach

### Low Risk
1. **TypeScript Issues** - Mostly compatible interfaces
2. **Build Integration** - Astro handles well
3. **Performance Regressions** - Expected improvements

## 📋 Success Criteria

### Functional Requirements
- [ ] All 27 components migrated to Astro
- [ ] Interactive functionality preserved
- [ ] No TypeScript errors
- [ ] All tests passing

### Performance Requirements
- [ ] Bundle size reduced by 50%+
- [ ] First load time under 1s
- [ ] Build time under 20s
- [ ] 90%+ Lighthouse score

### Quality Requirements
- [ ] Code follows Astro best practices
- [ ] Documentation updated
- [ ] No React dependencies in main bundle
- [ ] Islands architecture properly implemented

## 🛠️ Tools & Commands

### Migration Commands
```bash
# Create islands directory
mkdir -p src/islands

# Convert a component
mv src/components/OldComponent.tsx src/components/OldComponent.tsx.backup
# Create new Astro component and island
```

### Testing Commands
```bash
# Test specific component
bun run dev

# Build and test all
bun run build && bun run preview

# TypeScript check
tsc --noEmit
```

### Performance Testing
```bash
# Bundle analysis
bun run build --analyze

# Lighthouse
lighthouse http://localhost:3001 --output html
```

## 📅 Timeline Summary

| Phase | Days | Components | Key Deliverables |
|-------|-------|------------|------------------|
| Phase 1: Foundation | 2 | 6 simple components | Basic patterns established |
| Phase 2: Interactive | 3 | 12 interactive components | Islands architecture working |
| Phase 3: Complex | 3 | 9 complex components | Full functionality migrated |
| Phase 4: Integration | 2 | All components | Production ready |
| **Total** | **10 days** | **27 components** | **Complete migration** |

---

**Next Steps:**
1. Start with Phase 1: Foundation
2. Convert 6 simplest components first
3. Establish patterns for islands
4. Test and validate each phase

*This migration will provide significant performance improvements and modernize the codebase for Astro's architecture.*