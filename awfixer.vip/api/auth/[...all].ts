import { auth } from "../../src/lib/auth";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Get the path from the request
    const path = req.url?.replace("/api/auth", "") || "/";
    
    // Convert Vercel request to standard Request for better-auth
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers.host || "localhost";
    const url = new URL(path, `${protocol}://${host}`);
    
    // Build headers
    const headers = new Headers();
    Object.entries(req.headers).forEach(([key, value]) => {
      if (value) {
        headers.set(key, Array.isArray(value) ? value[0] : value);
      }
    });

    // Build request body
    let body: string | undefined;
    if (req.method !== "GET" && req.method !== "HEAD" && req.body) {
      body = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
    }

    // Create Request object
    const request = new Request(url.toString(), {
      method: req.method,
      headers,
      body,
    });

    // Handle the auth request
    const response = await auth.handler(request);
    
    // Convert response back to Vercel response
    const responseBody = await response.text();
    
    // Set status
    res.status(response.status);
    
    // Set headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    
    // Send response
    res.send(responseBody);
  } catch (error) {
    console.error("Auth handler error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

