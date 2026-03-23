import { defineConfig } from "astro/config";
import "dotenv/config";
import react from "@astrojs/react";

export default defineConfig({
  site: process.env.PUBLIC_DOMAIN,
  integrations: [react()],
  output: "static",
});
