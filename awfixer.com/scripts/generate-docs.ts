/**
 * Build script to generate docs manifest for Cloudflare Workers compatibility.
 *
 * This script handles nested documentation structure with product sections.
 * It:
 * 1. Reads all MDX files recursively from src/content/docs/
 * 2. Compiles them to plain React components
 * 3. Generates metadata manifest with hierarchy information
 * 4. Generates a sidebar navigation structure
 *
 * Run with: bun scripts/generate-docs.ts
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compile } from "@mdx-js/mdx";

const CONTENT_DIR = path.join(process.cwd(), "src/content/docs");
const OUTPUT_DIR = path.join(process.cwd(), "src/lib/generated");
const DOCS_OUTPUT_DIR = path.join(OUTPUT_DIR, "docs");
const METADATA_FILE = path.join(OUTPUT_DIR, "docs-manifest.ts");
const COMPONENTS_FILE = path.join(OUTPUT_DIR, "doc-components.tsx");

interface DocFrontmatter {
  title: string;
  description?: string;
  order?: number;
  icon?: string;
  badge?: string;
}

interface DocMetadata {
  slug: string;
  path: string;
  title: string;
  description: string;
  order: number;
  icon?: string;
  badge?: string;
  section: string;
  parent?: string;
  depth: number;
}

interface SidebarItem {
  title: string;
  slug: string;
  path: string;
  icon?: string;
  badge?: string;
  children?: SidebarItem[];
}

interface SidebarSection {
  title: string;
  slug: string;
  icon?: string;
  items: SidebarItem[];
}

/**
 * Convert slug to PascalCase for component name
 * Handles nested paths like "awfixeros/user-guide/installation"
 */
function toPascalCase(slug: string): string {
  return slug
    .split(/[-_\/]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

/**
 * Get all MDX files recursively
 */
function getAllMdxFiles(dir: string, basePath: string = ""): string[] {
  const files: string[] = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      files.push(...getAllMdxFiles(fullPath, relativePath));
    } else if (entry.name.endsWith(".mdx")) {
      files.push(relativePath);
    }
  }

  return files;
}

/**
 * Parse a file path into section and slug components
 */
function parseDocPath(filePath: string): { section: string; slug: string; parent?: string; depth: number } {
  const parts = filePath.replace(/\.mdx$/, "").split("/");

  // Handle index files - use parent directory as slug
  if (parts[parts.length - 1] === "index") {
    parts.pop();
  }

  const depth = parts.length;
  const section = parts[0] || "general";
  const slug = parts.join("/") || "index";
  const parent = parts.length > 1 ? parts.slice(0, -1).join("/") : undefined;

  return { section, slug, parent, depth };
}

/**
 * Build sidebar structure from docs
 */
function buildSidebar(docs: DocMetadata[]): SidebarSection[] {
  // Group by top-level section
  const sections = new Map<string, DocMetadata[]>();

  for (const doc of docs) {
    const sectionKey = doc.section;
    if (!sections.has(sectionKey)) {
      sections.set(sectionKey, []);
    }
    sections.get(sectionKey)!.push(doc);
  }

  // Build hierarchical structure
  const sidebar: SidebarSection[] = [];

  for (const [sectionSlug, sectionDocs] of sections) {
    // Find the section index doc
    const sectionIndex = sectionDocs.find(d => d.slug === sectionSlug);

    // Build tree structure - only include non-section-index docs
    const nonIndexDocs = sectionDocs.filter(d => d.slug !== sectionSlug);
    const itemMap = new Map<string, SidebarItem>();

    // Sort by order then by title
    nonIndexDocs.sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return a.title.localeCompare(b.title);
    });

    // Create all items first
    for (const doc of nonIndexDocs) {
      const item: SidebarItem = {
        title: doc.title,
        slug: doc.slug,
        path: doc.path,
        icon: doc.icon,
        badge: doc.badge,
        children: [],
      };
      itemMap.set(doc.slug, item);
    }

    // Build hierarchy - items whose parent is the section go to root
    const rootItems: SidebarItem[] = [];
    for (const doc of nonIndexDocs) {
      const item = itemMap.get(doc.slug)!;

      // If parent is the section slug or undefined, it's a root item
      if (!doc.parent || doc.parent === sectionSlug) {
        rootItems.push(item);
      } else if (itemMap.has(doc.parent)) {
        // Otherwise, add as child of parent
        itemMap.get(doc.parent)!.children!.push(item);
      } else {
        // Fallback: if parent doesn't exist in map, add to root
        rootItems.push(item);
      }
    }

    // Clean up empty children arrays
    for (const item of itemMap.values()) {
      if (item.children && item.children.length === 0) {
        delete item.children;
      }
    }

    sidebar.push({
      title: sectionIndex?.title || sectionSlug.charAt(0).toUpperCase() + sectionSlug.slice(1),
      slug: sectionSlug,
      icon: sectionIndex?.icon,
      items: rootItems,
    });
  }

  // Sort sections by order of their index docs
  sidebar.sort((a, b) => {
    const aIndex = docs.find(d => d.slug === a.slug);
    const bIndex = docs.find(d => d.slug === b.slug);
    const aOrder = aIndex?.order ?? 999;
    const bOrder = bIndex?.order ?? 999;
    return aOrder - bOrder;
  });

  return sidebar;
}

async function generateDocs(): Promise<void> {
  console.log("Generating docs manifest...");

  // Ensure output directories exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  if (!fs.existsSync(DOCS_OUTPUT_DIR)) {
    fs.mkdirSync(DOCS_OUTPUT_DIR, { recursive: true });
  }

  // Check if content directory exists
  if (!fs.existsSync(CONTENT_DIR)) {
    console.warn(`Content directory not found: ${CONTENT_DIR}`);
    await writeEmptyManifests();
    return;
  }

  // Get all MDX files
  const mdxFiles = getAllMdxFiles(CONTENT_DIR);

  if (mdxFiles.length === 0) {
    console.warn("No MDX files found in docs content directory");
    await writeEmptyManifests();
    return;
  }

  const docs: DocMetadata[] = [];
  const componentEntries: { slug: string; componentName: string; outputPath: string }[] = [];

  // Process each MDX file
  for (const filePath of mdxFiles) {
    const fullPath = path.join(CONTENT_DIR, filePath);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    const frontmatter = matterResult.data as DocFrontmatter;

    const { section, slug, parent, depth } = parseDocPath(filePath);
    const urlPath = `/docs/${slug}`;

    docs.push({
      slug,
      path: urlPath,
      title: frontmatter.title,
      description: frontmatter.description || "",
      order: frontmatter.order ?? 999,
      icon: frontmatter.icon,
      badge: frontmatter.badge,
      section,
      parent,
      depth,
    });

    // Compile MDX to JavaScript
    const compiled = await compile(matterResult.content, {
      outputFormat: "program",
      jsx: false,
      jsxImportSource: "react",
      development: false,
      providerImportSource: undefined,
    });

    // Create nested output directory structure
    const outputSubDir = path.dirname(slug);
    const outputFileName = path.basename(slug) || "index";
    const componentOutputDir = outputSubDir
      ? path.join(DOCS_OUTPUT_DIR, outputSubDir)
      : DOCS_OUTPUT_DIR;

    if (!fs.existsSync(componentOutputDir)) {
      fs.mkdirSync(componentOutputDir, { recursive: true });
    }

    const componentCode = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT
 * Compiled from src/content/docs/${filePath}
 */

"use client";

${String(compiled)}`;

    const componentPath = path.join(componentOutputDir, `${outputFileName}.jsx`);
    fs.writeFileSync(componentPath, componentCode, "utf8");

    const componentName = `Doc${toPascalCase(slug)}`;
    const relativePath = slug ? `./docs/${slug}.jsx` : "./docs/index.jsx";

    componentEntries.push({
      slug,
      componentName,
      outputPath: relativePath,
    });

    console.log(`  Compiled: docs/${slug}.jsx`);
  }

  // Build sidebar navigation
  const sidebar = buildSidebar(docs);

  // Generate metadata file
  const metadataOutput = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT
 * Generated by scripts/generate-docs.ts
 *
 * Documentation metadata and navigation structure.
 */

export interface DocMetadata {
  slug: string;
  path: string;
  title: string;
  description: string;
  order: number;
  icon?: string;
  badge?: string;
  section: string;
  parent?: string;
  depth: number;
}

export interface SidebarItem {
  title: string;
  slug: string;
  path: string;
  icon?: string;
  badge?: string;
  children?: SidebarItem[];
}

export interface SidebarSection {
  title: string;
  slug: string;
  icon?: string;
  items: SidebarItem[];
}

export const docs: DocMetadata[] = ${JSON.stringify(docs, null, 2)};

export const sidebar: SidebarSection[] = ${JSON.stringify(sidebar, null, 2)};

/**
 * Get a doc by its slug
 */
export function getDoc(slug: string): DocMetadata | null {
  return docs.find(d => d.slug === slug) ?? null;
}

/**
 * Get all docs in a section
 */
export function getDocsInSection(section: string): DocMetadata[] {
  return docs.filter(d => d.section === section).sort((a, b) => a.order - b.order);
}

/**
 * Get previous and next docs for navigation
 */
export function getAdjacentDocs(slug: string): { prev: DocMetadata | null; next: DocMetadata | null } {
  const flatDocs = docs.sort((a, b) => {
    if (a.section !== b.section) return a.section.localeCompare(b.section);
    return a.order - b.order;
  });

  const index = flatDocs.findIndex(d => d.slug === slug);

  return {
    prev: index > 0 ? flatDocs[index - 1] : null,
    next: index < flatDocs.length - 1 ? flatDocs[index + 1] : null,
  };
}
`;

  fs.writeFileSync(METADATA_FILE, metadataOutput, "utf8");
  console.log(`Generated metadata for ${docs.length} docs to ${METADATA_FILE}`);

  // Generate component registry
  const imports = componentEntries
    .map(({ componentName, outputPath }) => `import ${componentName} from "${outputPath}";`)
    .join("\n");

  const registryEntries = componentEntries
    .map(({ slug, componentName }) => `  "${slug}": ${componentName},`)
    .join("\n");

  const slugsArray = componentEntries.map(e => e.slug);

  const componentsOutput = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT
 * Generated by scripts/generate-docs.ts
 *
 * Registry of pre-compiled documentation components.
 */

import type { ComponentType } from "react";

${imports}

const docComponents: Record<string, ComponentType> = {
${registryEntries}
};

export function getDocComponent(slug: string): ComponentType | null {
  return docComponents[slug] ?? null;
}

export function docExists(slug: string): boolean {
  return slug in docComponents;
}

export const availableDocSlugs = ${JSON.stringify(slugsArray)} as const;
export type DocSlug = (typeof availableDocSlugs)[number];
`;

  fs.writeFileSync(COMPONENTS_FILE, componentsOutput, "utf8");
  console.log("Generated component registry");
}

async function writeEmptyManifests(): Promise<void> {
  const metadataOutput = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT
 * Generated by scripts/generate-docs.ts
 */

export interface DocMetadata {
  slug: string;
  path: string;
  title: string;
  description: string;
  order: number;
  icon?: string;
  badge?: string;
  section: string;
  parent?: string;
  depth: number;
}

export interface SidebarItem {
  title: string;
  slug: string;
  path: string;
  icon?: string;
  badge?: string;
  children?: SidebarItem[];
}

export interface SidebarSection {
  title: string;
  slug: string;
  icon?: string;
  items: SidebarItem[];
}

export const docs: DocMetadata[] = [];
export const sidebar: SidebarSection[] = [];

export function getDoc(slug: string): DocMetadata | null {
  return null;
}

export function getDocsInSection(section: string): DocMetadata[] {
  return [];
}

export function getAdjacentDocs(slug: string): { prev: DocMetadata | null; next: DocMetadata | null } {
  return { prev: null, next: null };
}
`;

  const componentsOutput = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT
 * Generated by scripts/generate-docs.ts
 */

import type { ComponentType } from "react";

const docComponents: Record<string, ComponentType> = {};

export function getDocComponent(slug: string): ComponentType | null {
  return null;
}

export function docExists(slug: string): boolean {
  return false;
}

export const availableDocSlugs = [] as const;
export type DocSlug = never;
`;

  fs.writeFileSync(METADATA_FILE, metadataOutput, "utf8");
  fs.writeFileSync(COMPONENTS_FILE, componentsOutput, "utf8");
  console.log("Generated empty manifests");
}

generateDocs().catch(console.error);
