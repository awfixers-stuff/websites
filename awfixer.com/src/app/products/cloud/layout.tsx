"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Cloud, Download, FileText, Sparkles, Settings } from "lucide-react";

import { cn } from "@/lib/utils";

const navigation = [
  {
    name: "Overview",
    href: "/products/cloud",
    icon: Cloud,
  },
  {
    name: "Features",
    href: "/products/cloud/features",
    icon: Sparkles,
  },
  {
    name: "Specifications",
    href: "/products/cloud/specifications",
    icon: Settings,
  },
  {
    name: "Downloads",
    href: "/products/cloud/downloads",
    icon: Download,
  },
  {
    name: "Documentation",
    href: "/products/cloud/docs",
    icon: FileText,
  },
];

export default function AWFixerCloudLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto px-4">
      {/* Sub-navigation */}
      <nav className="mb-8 border-b border-border/40">
        <div className="flex items-center gap-1 overflow-x-auto pb-4 scrollbar-hide">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Page content */}
      {children}
    </div>
  );
}
