import * as dotenv from "dotenv";
dotenv.config();

import { writeFileSync, mkdirSync, readdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const localesDir = path.resolve(__dirname, "../src/locales");

const supportedLanguages = readdirSync(path.join(localesDir, "common"))
  .filter((f) => f.endsWith(".json"))
  .map((f) => f.replace(".json", ""));

const routeKeys = readdirSync(path.join(localesDir, "pages"), {
  withFileTypes: true,
})
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

routeKeys.unshift("home");
const uniqueRoutes = [...new Set(routeKeys)];

const hostname = process.env.PUBLIC_DOMAIN;

if (!hostname) {
  console.error("PUBLIC_DOMAIN is not set in .env");
  process.exit(1);
}

const generateSitemap = () => {
  const lastmod = new Date().toISOString().split("T")[0];

  const urls = supportedLanguages.flatMap((lng) =>
    uniqueRoutes.map((route, i) => {
      const cleanedRoute = route === "home" ? "" : route;
      const loc = cleanedRoute
        ? `${hostname}/${lng}/${cleanedRoute}`
        : `${hostname}/${lng}/`;
      const priority = i === 0 ? "1.0" : "0.9";

      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  const distDir = path.resolve(__dirname, "../dist");
  mkdirSync(distDir, { recursive: true });
  writeFileSync(path.resolve(distDir, "sitemap.xml"), xml);
  console.log("Sitemap generated!");
};

generateSitemap();
