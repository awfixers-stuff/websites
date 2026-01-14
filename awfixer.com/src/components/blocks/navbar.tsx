"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronRight, Github, LogOut, User } from "lucide-react";

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
import { useEnhancedAuth } from "@/components/enhanced-auth-provider";

const ITEMS = [
  {
    label: "Projects",
    href: "/projects",
    dropdownItems: [
      {
        title: "Modern Product Teams",
        href: "/projects/modern-teams",
        description: "Built on habits that make the best product teams successful",
      },
      {
        title: "Resource Allocation",
        href: "/projects/resource-allocation",
        description: "Optimize your resource allocation and execution",
      },
      {
        title: "Momentum Building",
        href: "/projects/momentum-building",
        description: "Build momentum and healthy habits for continuous improvement",
      },
    ],
  },
  { 
    label: "Products", 
    href: "/products",
    dropdownItems: [
      {
        title: "AWFixerOS",
        href: "/products/awfixeros",
        description: "A modern, secure operating system built for performance and reliability",
      },
      {
        title: "AWFixer Cloud",
        href: "/products/cloud",
        description: "Scalable cloud infrastructure solutions for modern applications",
      },
      {
        title: "AWFixer Security",
        href: "/products/security", 
        description: "Enterprise-grade security solutions to protect your digital assets",
      },
      {
        title: "AWFixer Tools",
        href: "/products/tools",
        description: "Professional development tools to boost your productivity",
      },
    ],
  },
  { label: "About Us", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { user, isLoading, signIn, signOut } = useEnhancedAuth();

  return (
    <section
      className={cn(
        "bg-background/70 absolute left-1/2 z-50 w-[min(90%,700px)] -translate-x-1/2 rounded-4xl border backdrop-blur-md transition-all duration-300",
        "top-5 lg:top-12",
      )}
    >
      <div className="flex items-center justify-between px-6 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="https://github.com/awfixer-org.png"
            alt="logo"
            width={25}
            height={18}
            className="rounded-full"
          />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="max-lg:hidden">
          <NavigationMenuList>
            {ITEMS.map((link) =>
              link.dropdownItems ? (
                <NavigationMenuItem key={link.label} className="">
                  <NavigationMenuTrigger className="data-[state=open]:bg-accent/50 bg-transparent! px-1.5">
                    {link.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-[400px] space-y-2 p-4">
                      {link.dropdownItems.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className="group hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex items-center gap-4 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none"
                            >
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
                <NavigationMenuItem key={link.label} className="">
                  <Link
                    href={link.href}
                    className={cn(
                      "relative bg-transparent px-1.5 text-sm font-medium transition-opacity hover:opacity-75",
                      pathname === link.href && "text-muted-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                </NavigationMenuItem>
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center gap-2 max-lg:hidden">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary border-t-transparent" />
              <span className="text-sm text-muted-foreground">Loading...</span>
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
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}

              {/* User Links */}
              <Link href="/protected">
                <Button variant="ghost" size="sm">
                  <User className="size-4 mr-1" />
                  Dashboard
                </Button>
              </Link>

              {/* Sign Out */}
              <Button variant="ghost" size="sm" onClick={() => signOut()}>
                <LogOut className="size-4 mr-1" />
                Sign Out
              </Button>
            </div>
          )}

          {/* Not Authenticated */}
          {!isLoading && !user && (
            <Button
              variant="outline"
              className="max-lg:hidden"
              onClick={() => signIn()}
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
              <span className="relative z-10">Sign In with Patreon</span>
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
          "bg-background fixed inset-x-0 top-[calc(100%+1rem)] flex flex-col rounded-2xl border p-6 transition-all duration-300 ease-in-out lg:hidden",
          isMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-4 opacity-0",
        )}
      >
        <nav className="divide-border flex flex-1 flex-col divide-y">
          {ITEMS.map((link) =>
            link.dropdownItems ? (
              <div key={link.label} className="py-4 first:pt-0 last:pb-0">
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === link.label ? null : link.label,
                    )
                  }
                  className="text-primary flex w-full items-center justify-between text-base font-medium"
                >
                  {link.label}
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
                        className="group hover:bg-accent block rounded-md p-2 transition-colors"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setOpenDropdown(null);
                        }}
                      >
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
                  "text-primary hover:text-primary/80 py-4 text-base font-medium transition-colors first:pt-0 last:pb-0",
                  pathname === link.href && "text-muted-foreground",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ),
          )}

          {/* Mobile Auth Section */}
          <div className="border-border border-t pt-4 mt-4">
            {isLoading && (
              <div className="flex items-center justify-center gap-2 py-4">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary border-t-transparent" />
                <span className="text-sm text-muted-foreground">Loading...</span>
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
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {user.name || 'User'}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
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
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
                Sign In with Patreon
              </Button>
            )}
          </div>
        </nav>
      </div>
    </section>
  );
};
