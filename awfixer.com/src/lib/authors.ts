export type Author = {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  social?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
};

// Individual author constants for direct import
export const AWFIXER: Author = {
  id: "AWFixer",
  name: "AWFixer",
  role: "Founder and CEO",
  bio: "when broken fix",
  avatar: "https://github.com/awfixer.png",
  social: {
    twitter: "https://twitter.com/awfixer",
    github: "https://github.com/awfixer",
  },
};

export const AWFIXER_TEAM: Author = {
  id: "awfixer-team",
  name: "AWFixer Team",
  role: "Engineering Team",
  bio: "The collective engineering and product team at AWFixer, building the next generation of cloud infrastructure and development tools.",
  social: {
    twitter: "https://twitter.com/awfixer-org",
    github: "https://github.com/awandfriends",
  },
};

export const JOHN_DOE: Author = {
  id: "john-doe",
  name: "John Doe",
  role: "CEO & Founder",
  bio: "Passionate about building scalable infrastructure and empowering developers worldwide.",
  avatar: "/images/authors/john-doe.jpg",
  social: {
    twitter: "https://twitter.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
  },
};

export const JANE_SMITH: Author = {
  id: "jane-smith",
  name: "Jane Smith",
  role: "Head of Engineering",
  bio: "Leading engineering efforts to create reliable, performant, and secure cloud solutions.",
  avatar: "/images/authors/jane-smith.jpg",
  social: {
    github: "https://github.com/janesmith",
    linkedin: "https://linkedin.com/in/janesmith",
  },
};

// Record for lookup operations
const authors: Record<string, Author> = {
  AWFixer: AWFIXER,
  "awfixer-team": AWFIXER_TEAM,
  "john-doe": JOHN_DOE,
  "jane-smith": JANE_SMITH,
};

/**
 * Get an author by their ID
 * @param id - The author's unique identifier
 * @returns The author object or undefined if not found
 */
export function getAuthor(id: string): Author | undefined {
  return authors[id];
}

/**
 * Get all authors
 * @returns Array of all authors
 */
export function getAllAuthors(): Author[] {
  return Object.values(authors);
}

/**
 * Get author by ID with fallback to a default author
 * @param id - The author's unique identifier
 * @returns The author object or a default fallback author
 */
export function getAuthorWithFallback(id: string): Author {
  const author = getAuthor(id);
  if (author) {
    return author;
  }

  // Fallback for legacy string-based authors or unknown IDs
  return {
    id: "unknown",
    name: id,
    role: "Contributor",
    bio: "",
  };
}

/**
 * Validate if an author ID exists
 * @param id - The author's unique identifier
 * @returns True if author exists, false otherwise
 */
export function isValidAuthorId(id: string): boolean {
  return id in authors;
}
