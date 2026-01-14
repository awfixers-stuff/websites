import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAuthorWithFallback, type Author } from "./authors";

const pressDirectory = path.join(process.cwd(), "src/content/press");

export type PressRelease = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: Author;
  location?: string;
  contact?: {
    name: string;
    email: string;
    phone?: string;
  };
  content: string;
};

export function getSortedPressReleasesData(): PressRelease[] {
  // Create directory if it doesn't exist
  if (!fs.existsSync(pressDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(pressDirectory);
  const allPressReleasesData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx?$/, "");
    const fullPath = path.join(pressDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    const frontmatter = matterResult.data as {
      title: string;
      date: string;
      excerpt: string;
      author: string;
      location?: string;
      contact?: {
        name: string;
        email: string;
        phone?: string;
      };
    };

    return {
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
      excerpt: frontmatter.excerpt,
      author: getAuthorWithFallback(frontmatter.author),
      location: frontmatter.location,
      contact: frontmatter.contact,
      content: matterResult.content,
    };
  });

  // Sort press releases by date
  return allPressReleasesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPressReleaseData(slug: string): PressRelease | null {
  const fullPath = path.join(pressDirectory, `${slug}.mdx`);

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
    location?: string;
    contact?: {
      name: string;
      email: string;
      phone?: string;
    };
  };

  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    excerpt: frontmatter.excerpt,
    author: getAuthorWithFallback(frontmatter.author),
    location: frontmatter.location,
    contact: frontmatter.contact,
    content: matterResult.content,
  };
}
