# AWFixer.com Project Notes

This file contains implementation notes and architectural decisions for future reference.

---

## AWFixerOS Product Pages (Added 2026-01-14)

AWFixerOS is a flagship product and has been restructured with a sub-page architecture for better organization and SEO.

### Structure

```
src/app/products/awfixeros/
├── layout.tsx          # Sub-navigation layout (client component)
├── page.tsx            # Overview/landing page
├── features/
│   └── page.tsx        # Detailed features breakdown
├── specifications/
│   └── page.tsx        # Technical specifications
├── downloads/
│   └── page.tsx        # Download options and system requirements
└── docs/
    └── page.tsx        # Documentation hub and resources
```

### Key Implementation Details

1. **Sub-navigation**: The `layout.tsx` is a client component (`"use client"`) that uses `usePathname()` to highlight the active tab. This provides persistent navigation across all AWFixerOS sub-pages.

2. **Container handling**: The AWFixerOS layout provides its own container, so individual pages don't need wrapper divs with container classes.

3. **Pattern for flagship products**: This structure can be replicated for other flagship products that need multiple dedicated pages (e.g., AWFixer Cloud, AWFixer Security).

### Navigation Items

The sub-navigation includes:
- **Overview** (`/products/awfixeros`) - Hero, stats, highlights, CTAs
- **Features** (`/products/awfixeros/features`) - Detailed feature breakdowns
- **Specifications** (`/products/awfixeros/specifications`) - Technical specs
- **Downloads** (`/products/awfixeros/downloads`) - Download editions and requirements
- **Documentation** (`/products/awfixeros/docs`) - Docs hub with guides and resources

### Extending This Pattern

To add a new sub-page:
1. Create a new directory under `src/app/products/awfixeros/`
2. Add a `page.tsx` with the content
3. Update the `navigation` array in `layout.tsx` to include the new page

To apply this pattern to another product:
1. Create a `layout.tsx` in the product directory (copy from awfixeros)
2. Update the navigation `href` paths to match the new product
3. Create sub-pages as needed

---

*Add new notes above this line*
