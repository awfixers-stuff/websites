import Link from "next/link";

import {
  Book,
  Rocket,
  Settings,
  Code,
  Cloud,
  Wrench,
  Shield,
  FileText,
  ArrowRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sidebar, docs } from "@/lib/generated/docs-manifest";

// Icon mapping
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

export const metadata = {
  title: "Documentation - AWFixer",
  description: "Comprehensive documentation for AWFixer products and services.",
};

export default function DocsIndexPage() {
  // If no docs exist yet, show placeholder
  if (sidebar.length === 0) {
    return (
      <div className="max-w-3xl">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Documentation
          </h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive guides and references for AWFixer products.
          </p>
        </header>

        <div className="rounded-2xl border-2 border-dashed p-12 text-center">
          <Book className="size-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">Documentation Coming Soon</h2>
          <p className="text-muted-foreground">
            We&apos;re working on comprehensive documentation. Check back soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Documentation
        </h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive guides, tutorials, and references for all AWFixer products and services.
        </p>
      </header>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4 mb-12">
        <div className="p-4 rounded-xl bg-primary/5 text-center">
          <div className="text-2xl font-bold">{sidebar.length}</div>
          <div className="text-sm text-muted-foreground">Sections</div>
        </div>
        <div className="p-4 rounded-xl bg-primary/5 text-center">
          <div className="text-2xl font-bold">{docs.length}</div>
          <div className="text-sm text-muted-foreground">Articles</div>
        </div>
        <div className="p-4 rounded-xl bg-primary/5 text-center">
          <div className="text-2xl font-bold">
            {new Set(docs.map(d => d.section)).size}
          </div>
          <div className="text-sm text-muted-foreground">Products</div>
        </div>
      </div>

      {/* Section cards */}
      <div className="space-y-6">
        {sidebar.map((section) => {
          const SectionIcon = section.icon ? iconMap[section.icon] : Book;
          const sectionDocs = docs.filter(d => d.section === section.slug);

          return (
            <Card key={section.slug} className="group hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <SectionIcon className="size-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                      <CardDescription>
                        {sectionDocs.length} article{sectionDocs.length !== 1 ? "s" : ""}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {section.items.slice(0, 5).map((item) => (
                    <Link
                      key={item.slug}
                      href={item.path}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors group/item"
                    >
                      <span className="text-sm">{item.title}</span>
                      <ArrowRight className="size-4 text-muted-foreground group-hover/item:text-foreground group-hover/item:translate-x-1 transition-all" />
                    </Link>
                  ))}
                  {section.items.length > 5 && (
                    <Link
                      href={`/docs/${section.slug}`}
                      className="block text-sm text-primary hover:underline pl-3"
                    >
                      View all {section.items.length} articles →
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
