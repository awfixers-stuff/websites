import Link from "next/link";
import { notFound } from "next/navigation";

import { ChevronLeft } from "lucide-react";

import { Background } from "@/components/background";
import { AuthorByline } from "@/components/blocks/author-byline";
import { AuthorCard } from "@/components/blocks/author-card";
import { MDXContent } from "@/components/blog/mdx-content";
import { TableOfContents } from "@/components/blocks/table-of-contents";
import { Button } from "@/components/ui/button";
import { AWFIXER } from "@/lib/authors";
import { getPostData, getSortedPostsData } from "@/lib/blog";
import { getPostComponent } from "@/lib/generated/post-components";

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
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      siteName: "AWFixer Blog",
      images: post.image ? [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ] : [],
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
      creator: "@awfixer",
    },
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

  // Get the pre-compiled MDX component
  const PostContent = getPostComponent(params.slug);

  if (!PostContent) {
    notFound();
  }

  return (
    <Background>
      {/* Table of Contents */}
      <TableOfContents />

      <article className="container mx-auto max-w-5xl px-4 py-24 md:py-32 lg:pt-44">
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
          <MDXContent Component={PostContent} />
        </div>

        {/* Author bio at the end of the post */}
        <div className="mt-12 border-t pt-8">
          <AuthorCard author={AWFIXER} variant="full" />
        </div>
      </article>
    </Background>
  );
}
