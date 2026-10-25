import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://emirate-studios.vercel.app",
  output: "static",
  integrations: [sitemap()],
});