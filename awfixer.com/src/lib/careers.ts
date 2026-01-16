/**
 * Career position utilities for Cloudflare Workers compatibility.
 *
 * Positions are loaded from a generated manifest file (created at build time)
 * rather than reading from the filesystem at runtime. This is necessary
 * because Cloudflare Workers don't have filesystem access.
 *
 * MDX content is compiled at build time by Next.js and loaded via dynamic imports.
 * See src/lib/generated/career-components.tsx for the component registry.
 *
 * To update careers, run: bun scripts/generate-careers.ts
 */

import { careers as generatedCareers } from "./generated/careers";

export type CareerMetadata = {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  excerpt: string;
  postedDate: string;
  image?: string;
};

/**
 * Get all career positions sorted by date (newest first)
 */
export function getSortedCareersData(): CareerMetadata[] {
  return generatedCareers.map((career) => ({
    slug: career.slug,
    title: career.title,
    department: career.department,
    location: career.location,
    type: career.type,
    excerpt: career.excerpt,
    postedDate: career.postedDate,
    image: career.image,
  }));
}

/**
 * Get a single career position's metadata by slug
 */
export function getCareerData(slug: string): CareerMetadata | null {
  const career = generatedCareers.find((c) => c.slug === slug);

  if (!career) {
    return null;
  }

  return {
    slug: career.slug,
    title: career.title,
    department: career.department,
    location: career.location,
    type: career.type,
    excerpt: career.excerpt,
    postedDate: career.postedDate,
    image: career.image,
  };
}

/**
 * Get all career slugs (for static path generation)
 */
export function getAllCareerSlugs(): string[] {
  return generatedCareers.map((career) => career.slug);
}

/**
 * Get careers filtered by department
 */
export function getCareersByDepartment(department: string): CareerMetadata[] {
  return getSortedCareersData().filter(
    (career) => career.department.toLowerCase() === department.toLowerCase()
  );
}

/**
 * Get unique departments from all positions
 */
export function getAllDepartments(): string[] {
  const departments = new Set(generatedCareers.map((c) => c.department));
  return Array.from(departments).sort();
}
