import type { APIRoute } from "astro";
import { sidebarContent } from "@/data/sidebar";

export const GET: APIRoute = async ({ request }) => {
  let content = "# AWFixer Wiki Documentation\n\n";
  content +=
    "Complete documentation structure and content for LLM consumption.\n\n";

  for (const section of sidebarContent) {
    if (!section.title) continue;

    content += `# ${section.title}\n`;
    content += `Source: https://wiki.awfixer.com/docs/${section.title.toLowerCase()}\n\n`;

    section.content.forEach((item: any) => {
      if ("slug" in item && item.slug) {
        content += `## ${item.title}\n`;
        content += `Source: https://wiki.awfixer.com${item.slug}\n\n`;

        if (item.description) {
          content += `${item.description}\n\n`;
        }
      }
    });

    content += "\n";
  }

  return new Response(content, {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
};
