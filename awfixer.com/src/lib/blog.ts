import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/content/blog");

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  content: string;
};

export function getSortedPostsData(): Post[] {
  // Create directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".mdx" from file name to get id
    const slug = fileName.replace(/\.mdx$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      slug,
      ...(matterResult.data as {
        title: string;
        date: string;
        excerpt: string;
        author: string;
      }),
      content: matterResult.content,
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostData(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  return {
    slug,
    ...(matterResult.data as {
      title: string;
      date: string;
      excerpt: string;
      author: string;
    }),
    content: matterResult.content,
  };
}
