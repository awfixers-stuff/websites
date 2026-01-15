"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Book,
  Rocket,
  Settings,
  Code,
  Cloud,
  Wrench,
  Shield,
  FileText,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { SidebarSection, SidebarItem } from "@/lib/generated/docs-manifest";

// Icon mapping for sections
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  book: Book,
  rocket: Rocket,
  settings: Settings,
  code: Code,
  cloud: Cloud,
  wrench: Wrench,
  shield: Shield,
  file: FileText,
};

interface DocsSidebarProps {
  sidebar: SidebarSection[];
  className?: string;
}

interface SidebarItemComponentProps {
  item: SidebarItem;
  depth: number;
  pathname: string;
  expandedItems: Set<string>;
  toggleExpanded: (slug: string) => void;
}

function SidebarItemComponent({
  item,
  depth,
  pathname,
  expandedItems,
  toggleExpanded,
}: SidebarItemComponentProps) {
  const isActive = pathname === item.path;
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedItems.has(item.slug);

  // Check if any child is active
  const isChildActive = hasChildren && item.children?.some(
    child => pathname === child.path || pathname.startsWith(child.path + "/")
  );

  const Icon = item.icon ? iconMap[item.icon] : null;

  return (
    <div>
      <div className="flex items-center">
        <Link
          href={item.path}
          className={cn(
            "flex-1 flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors",
            "hover:bg-accent hover:text-accent-foreground",
            isActive && "bg-primary/10 text-primary font-medium",
            isChildActive && !isActive && "text-foreground",
            !isActive && !isChildActive && "text-muted-foreground",
            depth > 0 && "ml-4",
          )}
          style={{ paddingLeft: `${12 + depth * 16}px` }}
        >
          {Icon && <Icon className="size-4 shrink-0" />}
          <span className="truncate">{item.title}</span>
          {item.badge && (
            <span className="ml-auto text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded">
              {item.badge}
            </span>
          )}
        </Link>
        {hasChildren && (
          <button
            onClick={() => toggleExpanded(item.slug)}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
          </button>
        )}
      </div>
      {hasChildren && isExpanded && (
        <div className="mt-1">
          {item.children!.map((child) => (
            <SidebarItemComponent
              key={child.slug}
              item={child}
              depth={depth + 1}
              pathname={pathname}
              expandedItems={expandedItems}
              toggleExpanded={toggleExpanded}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function DocsSidebar({ sidebar, className }: DocsSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  // Auto-expand sections and items based on current path
  useEffect(() => {
    const newExpandedSections = new Set<string>();
    const newExpandedItems = new Set<string>();

    for (const section of sidebar) {
      // Check if current page is in this section
      const isInSection = section.items.some(
        item => pathname === item.path || pathname.startsWith(item.path + "/")
      );

      if (isInSection) {
        newExpandedSections.add(section.slug);

        // Find and expand parent items
        for (const item of section.items) {
          if (pathname.startsWith(item.path)) {
            newExpandedItems.add(item.slug);
          }
        }
      }
    }

    // Also expand first section by default if nothing matches
    if (newExpandedSections.size === 0 && sidebar.length > 0) {
      newExpandedSections.add(sidebar[0].slug);
    }

    setExpandedSections(newExpandedSections);
    setExpandedItems(newExpandedItems);
  }, [pathname, sidebar]);

  // Close mobile sidebar on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleExpanded = (slug: string) => {
    setExpandedItems(prev => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  const toggleSection = (slug: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  const sidebarContent = (
    <nav className="space-y-6">
      {sidebar.map((section) => {
        const SectionIcon = section.icon ? iconMap[section.icon] : Book;
        const isExpanded = expandedSections.has(section.slug);

        return (
          <div key={section.slug}>
            <button
              onClick={() => toggleSection(section.slug)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 text-sm font-semibold",
                "hover:bg-accent rounded-lg transition-colors"
              )}
            >
              <div className="flex items-center gap-2">
                <SectionIcon className="size-4" />
                <span>{section.title}</span>
              </div>
              {isExpanded ? (
                <ChevronDown className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </button>
            {isExpanded && (
              <div className="mt-1 space-y-1">
                {section.items.map((item) => (
                  <SidebarItemComponent
                    key={item.slug}
                    item={item}
                    depth={0}
                    pathname={pathname}
                    expandedItems={expandedItems}
                    toggleExpanded={toggleExpanded}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "lg:hidden fixed top-20 left-4 z-50 p-2 bg-background border rounded-lg shadow-sm",
          "hover:bg-accent transition-colors"
        )}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 lg:top-24 left-0 z-40 lg:z-0",
          "h-screen lg:h-[calc(100vh-6rem)] w-72",
          "bg-background lg:bg-transparent",
          "border-r lg:border-none",
          "p-6 overflow-y-auto",
          "transition-transform duration-300 lg:transform-none",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          className
        )}
      >
        {/* Mobile header */}
        <div className="lg:hidden mb-6 pb-4 border-b">
          <h2 className="text-lg font-bold">Documentation</h2>
        </div>

        {sidebarContent}
      </aside>
    </>
  );
}
