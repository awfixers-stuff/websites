"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ChevronRight,
  Github,
  LogOut,
  User,
  FolderKanban,
  Package,
  Building2,
  DollarSign,
  HelpCircle,
  FileText,
  Mail,
  Cloud,
  Shield,
  Cpu,
  Wrench,
  Book,
  Rocket,
  Settings,
  Globe,
  Train,
  Monitor,
  Zap,
} from "lucide-react";

import { useEnhancedAuth } from "@/components/enhanced-auth-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

// Helper to get current section from pathname
const getSectionFromPath = (
  pathname: string,
): {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
} | null => {
  if (pathname === "/" || pathname === "") return null;

  const sectionMap: Record<
    string,
    { label: string; icon: React.ComponentType<{ className?: string }> }
  > = {
    "/projects": { label: "Projects", icon: FolderKanban },
    "/products": { label: "Products", icon: Package },
    "/docs": { label: "Docs", icon: Book },
    "/about": { label: "About Us", icon: Building2 },
    "/pricing": { label: "Pricing", icon: DollarSign },
    "/faq": { label: "FAQ", icon: HelpCircle },
    "/blog": { label: "Blog", icon: FileText },
    "/contact": { label: "Contact", icon: Mail },
    "/privacy": { label: "Privacy", icon: Shield },
    "/login": { label: "Sign In", icon: User },
    "/signup": { label: "Sign Up", icon: User },
    "/protected": { label: "Dashboard", icon: User },
  };

  // Check for exact match first
  if (sectionMap[pathname]) return sectionMap[pathname];

  // Check for section prefix (e.g., /products/awfixeros matches /products)
  const firstSegment = "/" + pathname.split("/")[1];
  return sectionMap[firstSegment] || null;
};

// Project categories with nested structure
const PROJECT_CATEGORIES = [
  {
    id: "digital",
    title: "Digital Enhancements",
    icon: Monitor,
    href: "/projects/digital",
    description: "Software and digital infrastructure projects",
    color: "emerald",
    projects: [
      {
        title: "HTTPS Reform",
        icon: Globe,
        href: "/projects/digital/https-reform",
        description:
          "Modernizing web security standards and universal HTTPS adoption",
      },
    ],
  },
  {
    id: "physical",
    title: "Physical Enhancements",
    icon: Zap,
    href: "/projects/physical",
    description: "Hardware and physical infrastructure projects",
    color: "amber",
    projects: [
      {
        title: "Hyperloop Technology",
        icon: Train,
        href: "/projects/physical/hyperloop",
        description: "High-speed vacuum tube transportation systems",
      },
    ],
  },
];

const ITEMS = [
  {
    label: "Projects",
    href: "/projects",
    icon: FolderKanban,
    isMatrix: true, // Special flag for matrix dropdown
  },
  {
    label: "Products",
    href: "/products",
    icon: Package,
    dropdownItems: [
      {
        title: "AWFixerOS",
        icon: Cpu,
        href: "/products/awfixeros",
        description:
          "A modern, secure operating system built for performance and reliability",
      },
      {
        title: "AWFixer Cloud",
        icon: Cloud,
        href: "/products/cloud",
        description:
          "Scalable cloud infrastructure solutions for modern applications",
      },
      {
        title: "AWFixer Security",
        icon: Shield,
        href: "/products/security",
        description:
          "Enterprise-grade security solutions to protect your digital assets",
      },
      {
        title: "AWFixer Tools",
        icon: Wrench,
        href: "/products/tools",
        description:
          "Professional development tools to boost your productivity",
      },
    ],
  },
  {
    label: "Docs",
    href: "/docs",
    icon: Book,
    dropdownItems: [
      {
        title: "Getting Started",
        icon: Rocket,
        href: "/docs/getting-started",
        description: "Begin your journey with AWFixer products and services",
      },
      {
        title: "AWFixerOS",
        icon: Settings,
        href: "/docs/awfixeros",
        description:
          "Complete documentation for AWFixerOS - a modern, security-focused operating system",
      },
      {
        title: "AWFixer Cloud",
        icon: Cloud,
        href: "/docs/cloud",
        description:
          "Documentation for AWFixer Cloud infrastructure and services",
      },
      {
        title: "AWFixer Tools",
        icon: Wrench,
        href: "/docs/tools",
        description: "Developer tools and utilities from AWFixer",
      },
    ],
  },
  { label: "About Us", href: "/about", icon: Building2 },
  { label: "Pricing", href: "/pricing", icon: DollarSign },
  { label: "FAQ", href: "/faq", icon: HelpCircle },
  { label: "Blog", href: "/blog", icon: FileText },
  { label: "Contact", href: "/contact", icon: Mail },
];

// Matrix dropdown component for Projects
const ProjectsMatrixDropdown = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div className="grid w-[600px] grid-cols-2 gap-4 p-4">
      {PROJECT_CATEGORIES.map((category) => {
        const CategoryIcon = category.icon;
        const isHovered = hoveredCategory === category.id;
        const colorClasses = {
          emerald: {
            bg: "bg-emerald-500/10 group-hover:bg-emerald-500/20",
            text: "text-emerald-600 dark:text-emerald-400",
            border: "border-emerald-500/20",
          },
          amber: {
            bg: "bg-amber-500/10 group-hover:bg-amber-500/20",
            text: "text-amber-600 dark:text-amber-400",
            border: "border-amber-500/20",
          },
        }[category.color];

        return (
          <div
            key={category.id}
            className="group relative"
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            {/* Category Card */}
            <NavigationMenuLink asChild>
              <Link
                href={category.href}
                className={cn(
                  "block rounded-lg border-2 p-4 transition-all duration-200",
                  "hover:shadow-md",
                  colorClasses?.border,
                  isHovered && "border-opacity-100",
                )}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className={cn("rounded-lg p-2", colorClasses?.bg)}>
                    <CategoryIcon
                      className={cn("size-5", colorClasses?.text)}
                    />
                  </div>
                  <div className={cn("font-semibold", colorClasses?.text)}>
                    {category.title}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 text-sm">
                  {category.description}
                </p>

                {/* Nested Projects */}
                <div className="space-y-2 border-t pt-3">
                  {category.projects.map((project) => {
                    const ProjectIcon = project.icon;
                    return (
                      <Link
                        key={project.href}
                        href={project.href}
                        className="hover:bg-accent flex items-center gap-2 rounded-md p-2 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ProjectIcon className="text-muted-foreground size-4" />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium">
                            {project.title}
                          </div>
                          <div className="text-muted-foreground truncate text-xs">
                            {project.description}
                          </div>
                        </div>
                        <ChevronRight className="text-muted-foreground size-3" />
                      </Link>
                    );
                  })}
                </div>
              </Link>
            </NavigationMenuLink>
          </div>
        );
      })}
    </div>
  );
};

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);
  const [isDocsOrTocOpen, setIsDocsOrTocOpen] = useState(false);
  const pathname = usePathname();
  const { user, isLoading, signIn, signOut } = useEnhancedAuth();
  const currentSection = getSectionFromPath(pathname);

  // Listen for docs sidebar and TOC mobile menu state changes
  useEffect(() => {
    const checkDocsTocState = () => {
      const docsOpen = document.body.hasAttribute("data-docs-open");
      const tocOpen = document.body.hasAttribute("data-toc-open");
      setIsDocsOrTocOpen(docsOpen || tocOpen);
    };

    // Check initial state
    checkDocsTocState();

    // Observe changes to body attributes
    const observer = new MutationObserver(checkDocsTocState);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-docs-open", "data-toc-open"],
    });

    return () => observer.disconnect();
  }, []);

  // Sync mobile menu state to document for cross-component coordination
  useEffect(() => {
    if (isMenuOpen) {
      document.body.setAttribute("data-nav-open", "true");
    } else {
      document.body.removeAttribute("data-nav-open");
    }
    return () => document.body.removeAttribute("data-nav-open");
  }, [isMenuOpen]);

  return (
    <section
      className={cn(
        "bg-background/70 fixed left-1/2 z-50 w-[min(90%,700px)] -translate-x-1/2 rounded-4xl border backdrop-blur-md transition-all duration-300 lg:w-auto lg:max-w-[95%]",
        "top-5 lg:top-12",
        isDocsOrTocOpen &&
          !isMenuOpen &&
          "max-lg:pointer-events-none max-lg:-translate-y-full max-lg:opacity-0",
      )}
    >
      <div className="flex items-center justify-between gap-4 px-6 py-3 lg:gap-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="https://github.com/awfixer-org.png"
            alt="logo"
            width={25}
            height={18}
            className="rounded-full"
          />
        </Link>

        {/* Section Indicator (Desktop) */}
        {currentSection && (
          <div className="flex items-center gap-1.5 max-lg:hidden">
            <span className="text-muted-foreground/50">/</span>
            <div className="bg-accent/50 flex items-center gap-1.5 rounded-full px-2.5 py-1">
              <currentSection.icon className="text-muted-foreground size-3.5" />
              <span className="text-muted-foreground text-xs font-medium">
                {currentSection.label}
              </span>
            </div>
          </div>
        )}

        {/* Desktop Navigation */}
        <NavigationMenu className="max-lg:hidden">
          <NavigationMenuList className="gap-1">
            {ITEMS.map((link) =>
              link.isMatrix ? (
                // Projects with Matrix Dropdown
                <NavigationMenuItem key={link.label}>
                  <NavigationMenuTrigger className="data-[state=open]:bg-accent/50 bg-transparent! px-3 whitespace-nowrap">
                    {link.icon && (
                      <link.icon className="mr-1.5 size-4 shrink-0" />
                    )}
                    {link.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ProjectsMatrixDropdown />
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : link.dropdownItems ? (
                <NavigationMenuItem key={link.label}>
                  <NavigationMenuTrigger className="data-[state=open]:bg-accent/50 bg-transparent! px-3 whitespace-nowrap">
                    {link.icon && (
                      <link.icon className="mr-1.5 size-4 shrink-0" />
                    )}
                    {link.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-[400px] space-y-2 p-4">
                      {link.dropdownItems.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className="group hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex items-center gap-3 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none"
                            >
                              {item.icon && (
                                <item.icon className="text-muted-foreground group-hover:text-accent-foreground size-5 shrink-0 transition-colors" />
                              )}
                              <div className="space-y-1.5 transition-transform duration-300 group-hover:translate-x-1">
                                <div className="text-sm leading-none font-medium">
                                  {item.title}
                                </div>
                                <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative flex items-center gap-1.5 bg-transparent px-3 text-sm font-medium whitespace-nowrap transition-opacity hover:opacity-75",
                      pathname === link.href && "text-muted-foreground",
                    )}
                  >
                    {link.icon && <link.icon className="size-4 shrink-0" />}
                    {link.label}
                  </Link>
                </NavigationMenuItem>
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth Buttons */}
        <div className="flex shrink-0 items-center gap-2.5">
          <ThemeToggle />

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center gap-2 max-lg:hidden">
              <div className="border-primary h-4 w-4 animate-spin rounded-full border-b-2 border-t-transparent" />
              <span className="text-muted-foreground text-sm">Loading...</span>
            </div>
          )}

          {/* Authenticated User */}
          {!isLoading && user && (
            <div className="flex items-center gap-2 max-lg:hidden">
              {/* User Avatar */}
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}

              {/* User Links */}
              <Link href="/protected">
                <Button variant="ghost" size="sm" className="whitespace-nowrap">
                  <User className="mr-1 size-4 shrink-0" />
                  Dashboard
                </Button>
              </Link>

              {/* Sign Out */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut()}
                className="whitespace-nowrap"
              >
                <LogOut className="mr-1 size-4 shrink-0" />
                Sign Out
              </Button>
            </div>
          )}

          {/* Not Authenticated */}
          {!isLoading && !user && (
            <Button
              variant="outline"
              className="whitespace-nowrap max-lg:hidden"
              onClick={() => signIn()}
            >
              <svg
                className="mr-2 h-4 w-4 shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
              <span className="relative z-10">Sign In</span>
            </Button>
          )}

          <a
            href="https://github.com/awfixer-org"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="size-4" />
            <span className="sr-only">GitHub</span>
          </a>

          {/* Hamburger Menu Button (Mobile Only) */}
          <button
            className="text-muted-foreground relative flex size-8 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <div className="absolute top-1/2 left-1/2 block w-[18px] -translate-x-1/2 -translate-y-1/2">
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "rotate-45" : "-translate-y-1.5"}`}
              ></span>
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "-rotate-45" : "translate-y-1.5"}`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/*  Mobile Menu Navigation */}
      <div
        className={cn(
          "bg-background fixed top-[calc(100%+1rem)] left-1/2 flex w-[min(90%,700px)] -translate-x-1/2 flex-col rounded-2xl border p-6 transition-all duration-300 ease-in-out lg:hidden",
          isMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-4 opacity-0",
        )}
      >
        <nav className="divide-border flex flex-1 flex-col divide-y">
          {ITEMS.map((link) =>
            link.isMatrix ? (
              // Projects with nested matrix structure (Mobile)
              <div key={link.label} className="py-4 first:pt-0 last:pb-0">
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === link.label ? null : link.label,
                    )
                  }
                  className="text-primary flex w-full items-center justify-between text-base font-medium"
                >
                  <span className="flex items-center gap-2">
                    {link.icon && <link.icon className="size-4" />}
                    {link.label}
                  </span>
                  <ChevronRight
                    className={cn(
                      "size-4 transition-transform duration-200",
                      openDropdown === link.label ? "rotate-90" : "",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    openDropdown === link.label
                      ? "mt-4 max-h-[2000px] opacity-100"
                      : "max-h-0 opacity-0",
                  )}
                >
                  <div className="space-y-4">
                    {PROJECT_CATEGORIES.map((category) => {
                      const CategoryIcon = category.icon;
                      const colorClasses = {
                        emerald: {
                          bg: "bg-emerald-500/10",
                          text: "text-emerald-600 dark:text-emerald-400",
                          border: "border-emerald-500/30",
                        },
                        amber: {
                          bg: "bg-amber-500/10",
                          text: "text-amber-600 dark:text-amber-400",
                          border: "border-amber-500/30",
                        },
                      }[category.color];

                      return (
                        <div
                          key={category.id}
                          className={cn(
                            "rounded-lg border-2 p-3",
                            colorClasses?.border,
                          )}
                        >
                          <button
                            onClick={() =>
                              setOpenSubDropdown(
                                openSubDropdown === category.id
                                  ? null
                                  : category.id,
                              )
                            }
                            className="flex w-full items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={cn(
                                  "rounded-md p-1.5",
                                  colorClasses?.bg,
                                )}
                              >
                                <CategoryIcon
                                  className={cn("size-4", colorClasses?.text)}
                                />
                              </div>
                              <span
                                className={cn(
                                  "font-medium",
                                  colorClasses?.text,
                                )}
                              >
                                {category.title}
                              </span>
                            </div>
                            <ChevronRight
                              className={cn(
                                "size-4 transition-transform duration-200",
                                colorClasses?.text,
                                openSubDropdown === category.id
                                  ? "rotate-90"
                                  : "",
                              )}
                            />
                          </button>

                          <div
                            className={cn(
                              "overflow-hidden transition-all duration-300",
                              openSubDropdown === category.id
                                ? "mt-3 max-h-[500px] opacity-100"
                                : "max-h-0 opacity-0",
                            )}
                          >
                            <Link
                              href={category.href}
                              className="text-muted-foreground mb-2 block text-sm hover:underline"
                              onClick={() => {
                                setIsMenuOpen(false);
                                setOpenDropdown(null);
                                setOpenSubDropdown(null);
                              }}
                            >
                              View all {category.title.toLowerCase()} →
                            </Link>
                            <div className="space-y-2">
                              {category.projects.map((project) => {
                                const ProjectIcon = project.icon;
                                return (
                                  <Link
                                    key={project.href}
                                    href={project.href}
                                    className="hover:bg-accent flex items-center gap-2 rounded-md p-2 transition-colors"
                                    onClick={() => {
                                      setIsMenuOpen(false);
                                      setOpenDropdown(null);
                                      setOpenSubDropdown(null);
                                    }}
                                  >
                                    <ProjectIcon className="text-muted-foreground size-4" />
                                    <div className="min-w-0 flex-1">
                                      <div className="text-sm font-medium">
                                        {project.title}
                                      </div>
                                      <div className="text-muted-foreground truncate text-xs">
                                        {project.description}
                                      </div>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : link.dropdownItems ? (
              <div key={link.label} className="py-4 first:pt-0 last:pb-0">
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === link.label ? null : link.label,
                    )
                  }
                  className="text-primary flex w-full items-center justify-between text-base font-medium"
                >
                  <span className="flex items-center gap-2">
                    {link.icon && <link.icon className="size-4" />}
                    {link.label}
                  </span>
                  <ChevronRight
                    className={cn(
                      "size-4 transition-transform duration-200",
                      openDropdown === link.label ? "rotate-90" : "",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    openDropdown === link.label
                      ? "mt-4 max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0",
                  )}
                >
                  <div className="bg-muted/50 space-y-3 rounded-lg p-4">
                    {link.dropdownItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="group hover:bg-accent flex items-start gap-3 rounded-md p-2 transition-colors"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setOpenDropdown(null);
                        }}
                      >
                        {item.icon && (
                          <item.icon className="text-muted-foreground mt-0.5 size-5 shrink-0" />
                        )}
                        <div className="transition-transform duration-200 group-hover:translate-x-1">
                          <div className="text-primary font-medium">
                            {item.title}
                          </div>

                          <p className="text-muted-foreground mt-1 text-sm">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-primary hover:text-primary/80 flex items-center gap-2 py-4 text-base font-medium transition-colors first:pt-0 last:pb-0",
                  pathname === link.href && "text-muted-foreground",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon && <link.icon className="size-4" />}
                {link.label}
              </Link>
            ),
          )}

          {/* Mobile Auth Section */}
          <div className="border-border mt-4 border-t pt-4">
            {isLoading && (
              <div className="flex items-center justify-center gap-2 py-4">
                <div className="border-primary h-4 w-4 animate-spin rounded-full border-b-2 border-t-transparent" />
                <span className="text-muted-foreground text-sm">
                  Loading...
                </span>
              </div>
            )}

            {!isLoading && user && (
              <div className="space-y-3">
                {/* User Info */}
                <div className="flex items-center gap-3 px-2">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full font-medium">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground truncate text-sm font-medium">
                      {user.name || "User"}
                    </p>
                    <p className="text-muted-foreground truncate text-xs">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* User Actions */}
                <Link
                  href="/protected"
                  className="hover:bg-accent flex items-center gap-2 rounded-md p-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="size-4" />
                  <span className="text-sm font-medium">Dashboard</span>
                </Link>

                <button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="hover:bg-accent flex w-full items-center gap-2 rounded-md p-2 text-left transition-colors"
                >
                  <LogOut className="size-4" />
                  <span className="text-sm font-medium">Sign Out</span>
                </button>
              </div>
            )}

            {!isLoading && !user && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  signIn();
                  setIsMenuOpen(false);
                }}
              >
                <svg
                  className="mr-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
                Sign In
              </Button>
            )}
          </div>
        </nav>
      </div>
    </section>
  );
};
