import { notFound } from "next/navigation";

import { MDXContent } from "@/components/blog/mdx-content";
import { TableOfContents } from "@/components/blocks/table-of-contents";
import { DocsBreadcrumb } from "@/components/docs/docs-breadcrumb";
import { DocsNavigation } from "@/components/docs/docs-navigation";
import { getDoc, getAdjacentDocs, docs } from "@/lib/generated/docs-manifest";
import { getDocComponent } from "@/lib/generated/doc-components";

export async function generateStaticParams() {
  return docs.map((doc) => ({
    slug: doc.slug.split("/"),
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const slug = params.slug.join("/");
  const doc = getDoc(slug);

  if (!doc) {
    return {
      title: "Doc Not Found",
    };
  }

  return {
    title: `${doc.title} - AWFixer Docs`,
    description: doc.description,
  };
}

export default async function DocPage(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const slug = params.slug.join("/");
  const doc = getDoc(slug);

  if (!doc) {
    notFound();
  }

  const DocContent = getDocComponent(slug);

  if (!DocContent) {
    notFound();
  }

  const { prev, next } = getAdjacentDocs(slug);

  return (
    <>
      {/* Table of Contents - Right side */}
      <TableOfContents />

      <article className="max-w-3xl">
        {/* Breadcrumb */}
        <DocsBreadcrumb doc={doc} className="mb-12" />

        {/* Header */}
        <header className="mb-12 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {doc.title}
          </h1>
          {doc.description && (
            <p className="text-lg text-muted-foreground">
              {doc.description}
            </p>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <MDXContent Component={DocContent} />
        </div>

        {/* Navigation */}
        <DocsNavigation prev={prev} next={next} />
      </article>
    </>
  );
}
