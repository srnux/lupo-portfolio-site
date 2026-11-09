import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Relative base so the build works under /lupo-portfolio-site/ on GitHub Pages
  base: "./",
  plugins: [react()],
  server: { port: 5181, strictPort: true },
  preview: { port: 5181, strictPort: true },
});
