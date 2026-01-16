import Image from "next/image";
import Link from "next/link";

import { Background } from "@/components/background";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSortedPostsData } from "@/lib/blog";

export const metadata = {
  title: "Blog - AWFixer",
  description: "Latest news, updates, and insights from the AWFixer team.",
};

export default function BlogIndex() {
  const posts = getSortedPostsData();

  return (
    <Background>
      <div className="container py-24 md:py-32 lg:pt-44">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Blog & Announcements
          </h1>
          <p className="text-muted-foreground max-w-[700px] text-lg">
            Stay up to date with the latest news, product updates, and engineering
            insights from our team.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.slug} className="group flex h-full flex-col overflow-hidden">
              {post.image && (
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <CardHeader>
                <div className="text-muted-foreground mb-2 text-sm">
                  {post.date}
                </div>
                <CardTitle className="line-clamp-2">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription className="line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="ghost"
                  className="h-auto p-0 font-medium"
                >
                  <Link href={`/blog/${post.slug}`}>
                    Read more{" "}
                    <span aria-hidden="true" className="ml-1">
                      &rarr;
                    </span>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-muted-foreground py-12 text-center">
            No posts found. Check back soon!
          </div>
        )}
      </div>
    </Background>
  );
}
