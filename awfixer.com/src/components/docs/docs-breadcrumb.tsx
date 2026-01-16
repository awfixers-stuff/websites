"use client";

import Link from "next/link";

import { ChevronRight, Home } from "lucide-react";

import { cn } from "@/lib/utils";
import type { DocMetadata } from "@/lib/generated/docs-manifest";

interface DocsBreadcrumbProps {
  doc: DocMetadata;
  className?: string;
}

export function DocsBreadcrumb({ doc, className }: DocsBreadcrumbProps) {
  const pathParts = doc.slug.split("/");

  // Build breadcrumb items (home icon already links to /docs, so start with path segments)
  const items: { label: string; href: string }[] = [];

  let currentPath = "";
  for (let i = 0; i < pathParts.length; i++) {
    currentPath += (i === 0 ? "" : "/") + pathParts[i];

    // Capitalize and clean up the label
    const label = i === pathParts.length - 1
      ? doc.title
      : pathParts[i]
          .split("-")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

    items.push({
      label,
      href: `/docs/${currentPath}`,
    });
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center gap-1 text-sm text-muted-foreground", className)}
    >
      <Link
        href="/docs"
        className="p-1 hover:text-foreground transition-colors"
        aria-label="Documentation home"
      >
        <Home className="size-4" />
      </Link>

      {items.map((item, index) => (
        <div key={item.href} className="flex items-center gap-1">
          <ChevronRight className="size-4" />
          {index === items.length - 1 ? (
            <span className="text-foreground font-medium truncate max-w-48">
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className="hover:text-foreground transition-colors truncate max-w-32"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
