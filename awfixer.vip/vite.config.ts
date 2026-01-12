import path from "path"
import tailwindcss from "@tailwindcss/vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router'],
          'three-vendor': ['three', '@tresjs/core', '@tresjs/cientos'],
          'ui-vendor': ['radix-vue', 'reka-ui']
        }
      },
      external: [
        // Exclude CLI tools from bundling
        'shadcn-vue'
      ]
    },
    commonjsOptions: {
      exclude: ['shadcn-vue']
    }
  },
  optimizeDeps: {
    exclude: ['shadcn-vue']
  }
})
