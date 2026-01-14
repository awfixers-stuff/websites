import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAuthorWithFallback, type Author } from "./authors";

const announcementsDirectory = path.join(process.cwd(), "src/content/announcements");

export type Announcement = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: Author;
  category: "product" | "company" | "engineering" | "security";
  content: string;
};

export function getSortedAnnouncementsData(): Announcement[] {
  // Create directory if it doesn't exist
  if (!fs.existsSync(announcementsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(announcementsDirectory);
  const allAnnouncementsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx?$/, "");
    const fullPath = path.join(announcementsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    const frontmatter = matterResult.data as {
      title: string;
      date: string;
      excerpt: string;
      author: string;
      category: "product" | "company" | "engineering" | "security";
    };

    return {
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
      excerpt: frontmatter.excerpt,
      author: getAuthorWithFallback(frontmatter.author),
      category: frontmatter.category,
      content: matterResult.content,
    };
  });

  // Sort announcements by date
  return allAnnouncementsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAnnouncementData(slug: string): Announcement | null {
  const fullPath = path.join(announcementsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  const frontmatter = matterResult.data as {
    title: string;
    date: string;
    excerpt: string;
    author: string;
    category: "product" | "company" | "engineering" | "security";
  };

  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    excerpt: frontmatter.excerpt,
    author: getAuthorWithFallback(frontmatter.author),
    category: frontmatter.category,
    content: matterResult.content,
  };
}
