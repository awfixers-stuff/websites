# Author System Documentation

## Overview

The AWFixer.com author system provides a centralized way to manage author information across all content types including blog posts, announcements, press releases, and future content.

## Architecture

### Core Components

1. **Author Registry** (`src/lib/authors.ts`)
   - Central source of truth for all author data
   - Type-safe author objects with rich metadata
   - Utility functions for retrieving and validating authors

2. **Content Utilities**
   - `src/lib/blog.ts` - Blog post management
   - `src/lib/announcements.ts` - Announcement management
   - `src/lib/press.ts` - Press release management

3. **UI Components**
   - `src/components/blocks/author-card.tsx` - Full author bio display
   - `src/components/blocks/author-byline.tsx` - Compact author attribution

## Author Data Structure

```typescript
type Author = {
  id: string;              // Unique identifier (used in MDX frontmatter)
  name: string;            // Display name
  role: string;            // Job title or role
  bio: string;             // Author biography
  avatar?: string;         // Optional profile image path
  social?: {               // Optional social media links
    twitter?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
};
```

## Adding New Authors

### 1. Register the Author

Edit `src/lib/authors.ts` and add a new entry to the `authors` object:

```typescript
const authors: Record<string, Author> = {
  // ... existing authors
  "your-author-id": {
    id: "your-author-id",
    name: "Full Name",
    role: "Job Title",
    bio: "A brief biography describing the author's background and expertise.",
    avatar: "/images/authors/your-author-id.jpg", // Optional
    social: {
      twitter: "https://twitter.com/username",
      github: "https://github.com/username",
      linkedin: "https://linkedin.com/in/username",
    },
  },
};
```

### 2. Add Profile Image (Optional)

If providing an avatar:
1. Add the image to `public/images/authors/`
2. Use format: `your-author-id.jpg` or `.png`
3. Recommended size: 400x400px (will be displayed at smaller sizes)

### 3. Use the Author ID

In your MDX frontmatter, reference the author by ID:

```yaml
---
title: "My Blog Post"
author: "your-author-id"
---
```

## Using Authors in Content

### Blog Posts

Location: `src/content/blog/`

```yaml
---
title: "Introducing New Features"
date: "2026-01-13"
excerpt: "We're excited to share our latest updates."
author: "jane-smith"
---
```

### Announcements

Location: `src/content/announcements/`

```yaml
---
title: "Product Launch"
date: "2026-01-13"
excerpt: "Announcing our newest product."
author: "john-doe"
category: "product"
---
```

### Press Releases

Location: `src/content/press/`

```yaml
---
title: "AWFixer Secures Series A Funding"
date: "2026-01-13"
excerpt: "Company raises $10M to accelerate growth."
author: "john-doe"
location: "San Francisco, CA"
contact:
  name: "Media Relations"
  email: "press@awfixer.com"
---
```

## UI Components

### AuthorByline

Compact author attribution with optional date and avatar.

```tsx
import { AuthorByline } from "@/components/blocks/author-byline";

<AuthorByline
  author={post.author}
  date={post.date}
  showAvatar={true}
/>
```

**Props:**
- `author: Author` - Author object (required)
- `date?: string` - Publication date (optional)
- `showAvatar?: boolean` - Display avatar image (default: false)

### AuthorCard

Full author bio with social links.

```tsx
import { AuthorCard } from "@/components/blocks/author-card";

<AuthorCard
  author={post.author}
  variant="full"
/>
```

**Props:**
- `author: Author` - Author object (required)
- `variant?: "compact" | "full"` - Display style (default: "compact")

**Variants:**
- `compact` - Small card with name and role
- `full` - Larger card with bio and social links

## Content Type Utilities

### Blog Posts

```typescript
import { getSortedPostsData, getPostData } from "@/lib/blog";

// Get all posts (sorted by date)
const posts = getSortedPostsData();

// Get single post
const post = getPostData("my-post-slug");
```

### Announcements

```typescript
import { getSortedAnnouncementsData, getAnnouncementData } from "@/lib/announcements";

// Get all announcements (sorted by date)
const announcements = getSortedAnnouncementsData();

// Get single announcement
const announcement = getAnnouncementData("my-announcement-slug");
```

### Press Releases

```typescript
import { getSortedPressReleasesData, getPressReleaseData } from "@/lib/press";

// Get all press releases (sorted by date)
const pressReleases = getSortedPressReleasesData();

// Get single press release
const pressRelease = getPressReleaseData("my-press-release-slug");
```

## Default Authors

The system includes these pre-configured authors:

### awfixer-team
- **Name:** AWFixer Team
- **Role:** Engineering Team
- **Use for:** General company updates, team announcements
- **ID:** `awfixer-team`

### john-doe
- **Name:** John Doe
- **Role:** CEO & Founder
- **Use for:** Executive communications, major announcements
- **ID:** `john-doe`

### jane-smith
- **Name:** Jane Smith
- **Role:** Head of Engineering
- **Use for:** Technical blog posts, engineering updates
- **ID:** `jane-smith`

## Fallback Behavior

If an invalid or unknown author ID is used:
- The system creates a fallback author using the provided string as the name
- Role defaults to "Contributor"
- No bio or social links are included
- This ensures content always displays, even with misconfigured authors

## Best Practices

### Author IDs
- Use lowercase with hyphens: `first-last`
- Keep IDs consistent and permanent (changing breaks references)
- Use descriptive IDs: `jane-smith` not `author1`

### Author Bios
- Write in third person
- Keep to 1-2 sentences
- Focus on expertise relevant to content
- Update regularly as roles change

### Profile Images
- Use professional headshots
- Consistent styling across all authors
- Square aspect ratio (400x400px recommended)
- Optimize for web (< 100KB)
- Use JPG or PNG format

### Social Links
- Only include active, professional accounts
- Use full URLs, not usernames
- Test links regularly
- Optional: not all authors need all platforms

## Templates

Example MDX templates are available in the `/templates` directory:
- `blog-post-template.mdx` - Blog post structure
- `announcement-template.mdx` - Announcement structure
- `press-release-template.mdx` - Press release structure

## Future Extensibility

This author system is designed to work with any future content types:

```typescript
// In your new content type utility
import { getAuthorWithFallback, type Author } from "./authors";

export type YourContentType = {
  // ... other fields
  author: Author;
};

// When parsing frontmatter
const frontmatter = matterResult.data as {
  author: string;
  // ... other fields
};

return {
  // ... other fields
  author: getAuthorWithFallback(frontmatter.author),
};
```

## Troubleshooting

### Author not displaying correctly
- Verify author ID exists in `src/lib/authors.ts`
- Check for typos in the author ID
- Ensure frontmatter is valid YAML

### Avatar not loading
- Check file path: `/images/authors/author-id.jpg`
- Verify file exists in `public/images/authors/`
- Check file permissions and format

### Social links not working
- Ensure URLs are complete (include `https://`)
- Test each link manually
- Verify proper object structure in `authors.ts`

## TypeScript Support

All author functions and components are fully typed:

```typescript
import type { Author } from "@/lib/authors";

// Type-safe author usage
const author: Author = getAuthor("john-doe")!;

// Type-safe component props
<AuthorCard author={author} variant="full" />
```

## Migration Guide

If you have existing content with string-based authors:

1. **Identify unique authors** in your content
2. **Register each author** in `src/lib/authors.ts`
3. **Update frontmatter** to use author IDs
4. **Test thoroughly** to ensure all content displays correctly

The system includes automatic fallback handling, so existing content will continue to work during migration.

---

**Last Updated:** 2026-01-13
**Maintained By:** AWFixer Engineering Team
