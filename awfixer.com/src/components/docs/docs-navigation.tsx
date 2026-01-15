"use client";

import Link from "next/link";

import { ChevronLeft, ChevronRight } from "lucide-react";

import type { DocMetadata } from "@/lib/generated/docs-manifest";
import { cn } from "@/lib/utils";

interface DocsNavigationProps {
  prev: DocMetadata | null;
  next: DocMetadata | null;
  className?: string;
}

export function DocsNavigation({ prev, next, className }: DocsNavigationProps) {
  if (!prev && !next) return null;

  return (
    <nav
      className={cn("mt-12 flex items-stretch gap-4 border-t pt-8", className)}
    >
      {prev ? (
        <Link
          href={prev.path}
          className={cn(
            "flex flex-1 flex-col gap-2 rounded-xl border p-4",
            "hover:bg-accent hover:border-primary/20 transition-colors",
            "group",
          )}
        >
          <span className="text-muted-foreground flex items-center gap-1 text-sm">
            <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Previous
          </span>
          <span className="group-hover:text-primary font-medium transition-colors">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={next.path}
          className={cn(
            "flex flex-1 flex-col gap-2 rounded-xl border p-4 text-right",
            "hover:bg-accent hover:border-primary/20 transition-colors",
            "group",
          )}
        >
          <span className="text-muted-foreground flex items-center justify-end gap-1 text-sm">
            Next
            <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
          <span className="group-hover:text-primary font-medium transition-colors">
            {next.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
