import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const secret =
    process.env.EXPORT_ENDPOINT_PASSWORD ??
    Math.random().toString(36).substring(7);

  if (request.headers.get("authorization") !== secret) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const allPages: any[] = [];
  const responseData = allPages.map(page => ({
    ...page,
    body: page.body?.raw || "",
  }));

  return new Response(JSON.stringify(responseData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
