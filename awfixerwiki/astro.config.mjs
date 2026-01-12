import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  integrations: [react(), tailwind()],
  vite: {
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    // Bun-specific optimizations
    optimizeDeps: {
      exclude: ["@vercel/analytics", "@vercel/speed-insights"],
    },
  },
  server: {
    port: 3001,
  },
  // Enable Bun's native TypeScript support
  typescript: {
    strict: true,
  },
});
