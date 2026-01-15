"use client";

import type { ComponentType } from "react";

interface MDXContentProps {
  Component: ComponentType;
}

/**
 * Client component wrapper for MDX content.
 * MDX components need to be rendered client-side to avoid
 * React context issues in Cloudflare Workers.
 */
export function MDXContent({ Component }: MDXContentProps) {
  return <Component />;
}
