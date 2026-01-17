import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlaskConical, ArrowRight } from "lucide-react";

const navigation = [
  {
    name: "Overview",
    href: "/products/experimental",
    icon: FlaskConical,
  },
  {
    name: "Quantum Compute",
    href: "/products/experimental/quantum-compute",
    icon: FlaskConical,
  },
  {
    name: "Neural Interface",
    href: "/products/experimental/neural-interface",
    icon: FlaskConical,
  },
  {
    name: "Fusion Reactor",
    href: "/products/experimental/fusion-reactor",
    icon: FlaskConical,
  },
  {
    name: "Matter Printer",
    href: "/products/experimental/matter-printer",
    icon: FlaskConical,
  },
];

export default function ExperimentalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* Warning Banner */}
      <div className="bg-red-50 dark:bg-red-950 border-b border-red-200 dark:border-red-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-2 text-red-800 dark:text-red-200 text-sm">
            <FlaskConical className="h-4 w-4" />
            <span className="font-semibold">Experimental Products - Use at Your Own Risk</span>
            <FlaskConical className="h-4 w-4" />
          </div>
        </div>
      </div>

      <nav className="mb-8 border-b border-border/40 bg-red-50/30 dark:bg-red-950/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-8 overflow-x-auto py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 whitespace-nowrap border-b-2 pb-1 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-red-500 text-red-700 dark:text-red-400"
                      : "border-transparent text-muted-foreground hover:text-red-600 dark:hover:text-red-400"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pb-16">
        {children}
      </div>
    </div>
  );
}