"use client";

import { useEffect, useState } from "react";

import { ChevronDown, List } from "lucide-react";

import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
}

export const TableOfContents = ({ className }: TableOfContentsProps) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [isNavOrDocsOpen, setIsNavOrDocsOpen] = useState(false);

  // Listen for navbar and docs sidebar mobile menu state changes
  useEffect(() => {
    const checkNavDocsState = () => {
      const navOpen = document.body.hasAttribute("data-nav-open");
      const docsOpen = document.body.hasAttribute("data-docs-open");
      setIsNavOrDocsOpen(navOpen || docsOpen);
    };

    // Check initial state
    checkNavDocsState();

    // Observe changes to body attributes
    const observer = new MutationObserver(checkNavDocsState);
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-nav-open", "data-docs-open"] });

    return () => observer.disconnect();
  }, []);

  // Broadcast TOC open state to document for cross-component coordination
  useEffect(() => {
    if (isOpen) {
      document.body.setAttribute("data-toc-open", "true");
    } else {
      document.body.removeAttribute("data-toc-open");
    }
    return () => document.body.removeAttribute("data-toc-open");
  }, [isOpen]);

  useEffect(() => {
    // Extract headings from the article
    const article = document.querySelector("article");
    if (!article) return;

    const headingElements = article.querySelectorAll("h2, h3, h4");
    const headingData: Heading[] = Array.from(headingElements).map((heading) => {
      // Generate ID if it doesn't exist
      if (!heading.id) {
        heading.id = heading.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") || "";
      }

      return {
        id: heading.id,
        text: heading.textContent || "",
        level: Number.parseInt(heading.tagName.substring(1)),
      };
    });

    setHeadings(headingData);
  }, []);

  useEffect(() => {
    // Track scroll position and highlight active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
      },
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setIsOpen(false);
    }
  };

  const activeHeading = headings.find((h) => h.id === activeId);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Mobile: Sticky Breadcrumb Dropdown */}
      <div
        className={cn(
          "lg:hidden fixed top-[72px] left-1/2 z-40 w-[min(90%,700px)] -translate-x-1/2 transition-all duration-300",
          isNavOrDocsOpen && !isOpen && "-translate-y-full opacity-0 pointer-events-none",
        )}
      >
        <div
          className={cn(
            "bg-background/70 border rounded-4xl backdrop-blur-md transition-all duration-300",
            className,
          )}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex w-full items-center justify-between px-6 py-3 text-sm font-medium"
          >
            <div className="flex items-center gap-2">
              <List className="size-4 shrink-0" />
              <span className="text-muted-foreground">On this page:</span>
              <span className="truncate">
                {activeHeading?.text || "Introduction"}
              </span>
            </div>
            <ChevronDown
              className={cn(
                "size-4 transition-transform duration-200",
                isOpen && "rotate-180",
              )}
            />
          </button>

          {/* Mobile Dropdown Menu */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0",
            )}
          >
            <nav className="border-t px-4 py-3">
              <div className="max-h-[350px] overflow-y-auto space-y-1">
                {headings.map((heading) => (
                  <button
                    key={heading.id}
                    onClick={() => scrollToHeading(heading.id)}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent",
                      heading.id === activeId &&
                        "bg-accent text-accent-foreground font-medium",
                      heading.level === 3 && "pl-6",
                      heading.level === 4 && "pl-9",
                    )}
                  >
                    {heading.text}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop: Sticky Sidebar */}
      <aside
        className={cn(
          "hidden lg:block fixed top-32 right-8 w-64 max-h-[calc(100vh-10rem)]",
          className,
        )}
      >
        <div className="bg-background/70 border rounded-2xl backdrop-blur-md p-4">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold">
            <List className="size-4" />
            On this page
          </h2>
          <nav>
            <div className="max-h-[calc(100vh-14rem)] overflow-y-auto space-y-1">
              {headings.map((heading) => (
                <button
                  key={heading.id}
                  onClick={() => scrollToHeading(heading.id)}
                  className={cn(
                    "w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors hover:bg-accent border-l-2 border-transparent",
                    heading.id === activeId &&
                      "bg-accent/50 text-accent-foreground font-medium border-primary",
                    heading.level === 2 && "pl-3",
                    heading.level === 3 && "pl-6 text-muted-foreground",
                    heading.level === 4 && "pl-9 text-muted-foreground",
                  )}
                >
                  {heading.text}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};
