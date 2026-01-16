import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { sidebar } from "@/lib/generated/docs-manifest";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="container mx-auto px-4">
      <div className="flex gap-8 pt-44 lg:pt-32 pb-16">
        {/* Sidebar */}
        <DocsSidebar sidebar={sidebar} className="shrink-0" />

        {/* Main content area */}
        <main className="flex-1 min-w-0 lg:pl-8">
          {children}
        </main>
      </div>
    </div>
  );
}
