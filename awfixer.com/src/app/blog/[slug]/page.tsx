import Link from "next/link";
import { notFound } from "next/navigation";

import { ChevronLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";

import { AuthorByline } from "@/components/blocks/author-byline";
import { AuthorCard } from "@/components/blocks/author-card";
import { TableOfContents } from "@/components/blocks/table-of-contents";
import { Button } from "@/components/ui/button";
import { AWFIXER } from "@/lib/authors";
import { getPostData, getSortedPostsData } from "@/lib/blog";

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = getPostData(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} - AWFixer Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPost(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = getPostData(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Table of Contents */}
      <TableOfContents />

      <article className="container mx-auto max-w-4xl pt-32 pb-24 md:py-32 max-w-5xl">
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-muted-foreground -ml-3"
          >
            <Link href="/blog">
              <ChevronLeft className="mr-2 size-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        <header className="mb-10 space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <AuthorByline author={post.author} date={post.date} showAvatar />
        </header>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <MDXRemote source={post.content} />
        </div>

        {/* Author bio at the end of the post */}
        <div className="mt-12 border-t pt-8">
          <AuthorCard author={AWFIXER} variant="full" />
        </div>
      </article>
    </>
  );
}
