import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostData, getSortedPostsData } from "@/lib/blog";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
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

export default async function BlogPost(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = getPostData(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container py-24 md:py-32 max-w-3xl mx-auto">
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="-ml-3 text-muted-foreground">
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
        <div className="flex items-center gap-4 text-muted-foreground">
          <time dateTime={post.date}>{post.date}</time>
          <span>•</span>
          <span>{post.author}</span>
        </div>
      </header>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
