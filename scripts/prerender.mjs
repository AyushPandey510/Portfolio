// Runs after `vite build` and `vite build --ssr`. For every route it writes a
// fully rendered HTML file with its own title, description, canonical URL,
// Open Graph tags and JSON-LD, then writes sitemap.xml and llms.txt.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssr = path.join(root, "dist-ssr");
const SITE_URL = "https://portfolio-ayushpandey.vercel.app";

const entry = fs.readdirSync(ssr).find((f) => /^entry-server\.(m?js)$/.test(f));
const { render, routes, meta, jsonLd, llmsTxt } = await import(pathToFileURL(path.join(ssr, entry)).href);

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
if (!template.includes('<div id="root"></div>')) throw new Error("prerender: root placeholder not found");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const today = new Date().toISOString().slice(0, 10);

for (const url of routes) {
  const m = meta(url);
  const head = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<link rel="canonical" href="${m.url}" />`,
    `<meta property="og:type" content="${m.type}" />`,
    `<meta property="og:url" content="${m.url}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:image" content="${m.image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(m.imageAlt)}" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:image" content="${m.image}" />`,
    `<meta name="twitter:image:alt" content="${esc(m.imageAlt)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd(url)).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
  const html = template
    .replace("<!--head-->", head)
    .replace('<div id="root"></div>', `<div id="root">${render(url)}</div>`);
  const out = url === "/" ? path.join(dist, "index.html") : path.join(dist, url.slice(1), "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  console.log(`prerender: ${url.padEnd(22)} ${(html.length / 1024).toFixed(1)} kB`);
}

// 404 page for unknown URLs (Vercel serves dist/404.html).
fs.writeFileSync(
  path.join(dist, "404.html"),
  template
    .replace("<!--head-->", `<title>Not found — Ayush Pandey</title>\n    <meta name="robots" content="noindex" />`)
    .replace('<div id="root"></div>', `<div id="root">${render("/404")}</div>`),
);

fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map((u) => `  <url><loc>${SITE_URL}${u}</loc><lastmod>${today}</lastmod><priority>${u === "/" ? "1.0" : "0.8"}</priority></url>`)
    .join("\n")}\n</urlset>\n`,
);
fs.writeFileSync(path.join(dist, "llms.txt"), llmsTxt());
fs.rmSync(ssr, { recursive: true, force: true });
console.log(`prerender: sitemap.xml (${routes.length} URLs), llms.txt, 404.html written`);
