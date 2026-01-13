import Link from "next/link";
import { format } from "date-fns";
import { getSortedPostsData } from "@/lib/blog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Blog - AWFixer",
  description: "Latest news, updates, and insights from the AWFixer team.",
};

export default function BlogIndex() {
  const posts = getSortedPostsData();

  return (
    <div className="container py-24 md:py-32">
      <div className="flex flex-col items-center gap-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Blog & Announcements
        </h1>
        <p className="text-muted-foreground max-w-[700px] text-lg">
          Stay up to date with the latest news, product updates, and engineering insights from our team.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.slug} className="flex flex-col h-full">
            <CardHeader>
              <div className="text-sm text-muted-foreground mb-2">
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
              <Button asChild variant="ghost" className="p-0 h-auto font-medium">
                <Link href={`/blog/${post.slug}`}>
                  Read more <span aria-hidden="true" className="ml-1">&rarr;</span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {posts.length === 0 && (
         <div className="text-center py-12 text-muted-foreground">
           No posts found. Check back soon!
         </div>
      )}
    </div>
  );
}
