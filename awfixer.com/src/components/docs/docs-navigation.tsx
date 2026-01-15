"use client";

import Link from "next/link";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { DocMetadata } from "@/lib/generated/docs-manifest";

interface DocsNavigationProps {
  prev: DocMetadata | null;
  next: DocMetadata | null;
  className?: string;
}

export function DocsNavigation({ prev, next, className }: DocsNavigationProps) {
  if (!prev && !next) return null;

  return (
    <nav
      className={cn(
        "flex items-stretch gap-4 border-t pt-8 mt-12",
        className
      )}
    >
      {prev ? (
        <Link
          href={prev.path}
          className={cn(
            "flex-1 flex flex-col gap-2 p-4 rounded-xl border",
            "hover:bg-accent hover:border-primary/20 transition-colors",
            "group"
          )}
        >
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <ChevronLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            Previous
          </span>
          <span className="font-medium group-hover:text-primary transition-colors">
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
            "flex-1 flex flex-col gap-2 p-4 rounded-xl border text-right",
            "hover:bg-accent hover:border-primary/20 transition-colors",
            "group"
          )}
        >
          <span className="flex items-center justify-end gap-1 text-sm text-muted-foreground">
            Next
            <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </span>
          <span className="font-medium group-hover:text-primary transition-colors">
            {next.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
