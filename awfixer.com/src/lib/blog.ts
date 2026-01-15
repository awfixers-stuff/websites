/**
 * Blog post utilities for Cloudflare Workers compatibility.
 *
 * Posts are loaded from a generated manifest file (created at build time)
 * rather than reading from the filesystem at runtime. This is necessary
 * because Cloudflare Workers don't have filesystem access.
 *
 * MDX content is compiled at build time by Next.js and loaded via dynamic imports.
 * See src/lib/generated/post-components.tsx for the component registry.
 *
 * To update posts, run: bun scripts/generate-posts.ts
 */

import { getAuthorWithFallback, type Author } from "./authors";
import { posts as generatedPosts } from "./generated/posts";

export type PostMetadata = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: Author;
};

/**
 * Get all posts sorted by date (newest first)
 */
export function getSortedPostsData(): PostMetadata[] {
  return generatedPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    author: getAuthorWithFallback(post.authorId),
  }));
}

/**
 * Get a single post's metadata by slug
 */
export function getPostData(slug: string): PostMetadata | null {
  const post = generatedPosts.find((p) => p.slug === slug);

  if (!post) {
    return null;
  }

  return {
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    author: getAuthorWithFallback(post.authorId),
  };
}

/**
 * Get all post slugs (for static path generation)
 */
export function getAllPostSlugs(): string[] {
  return generatedPosts.map((post) => post.slug);
}
