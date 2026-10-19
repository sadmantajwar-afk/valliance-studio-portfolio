import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { cloudflare } from "@cloudflare/vite-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function inlineCssPlugin() {
  return {
    name: 'inline-css',
    apply: 'build' as const,
    enforce: 'post' as const,
    transformIndexHtml(html: string, ctx: any) {
      if (!ctx.bundle) return html;
      let inlinedHtml = html;
      for (const [fileName, file] of Object.entries(ctx.bundle)) {
        if (fileName.endsWith('.css') && !fileName.includes('lenis') && (file as any).type === 'asset' && typeof (file as any).source === 'string') {
          const regex = new RegExp(`<link[^>]+href="[^"]*${fileName}"[^>]*>`, 'g');
          inlinedHtml = inlinedHtml.replace(regex, `<style id="critical-styles">${(file as any).source}</style>`);
        }
      }
      return inlinedHtml;
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), inlineCssPlugin(), cloudflare()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('scheduler')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion') || id.includes('motion')) {
              return 'vendor-motion';
            }
            if (id.includes('lucide-react') || id.includes('clsx') || id.includes('tailwind-merge')) {
              return 'vendor-ui';
            }
            if (id.includes('lenis')) {
              return 'vendor-lenis';
            }
          }
        },
      },
    },
  },
});