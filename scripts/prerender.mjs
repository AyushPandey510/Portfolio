// Runs after `vite build` and `vite build --ssr`:
//  - injects server-rendered HTML so crawlers see full content without JavaScript
//  - injects JSON-LD structured data built from src/data/profile.ts
//  - writes llms.txt for AI assistants
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssr = path.join(root, "dist-ssr");

const entry = fs.readdirSync(ssr).find((f) => /^entry-server\.(m?js)$/.test(f));
const { render, jsonLd, llmsTxt } = await import(pathToFileURL(path.join(ssr, entry)).href);

const htmlPath = path.join(dist, "index.html");
let html = fs.readFileSync(htmlPath, "utf8");

const app = render();
if (!html.includes('<div id="root"></div>')) throw new Error("prerender: root placeholder not found");
html = html.replace('<div id="root"></div>', `<div id="root">${app}</div>`);

const ld = JSON.stringify(jsonLd()).replace(/</g, "\\u003c");
html = html.replace("</head>", `  <script type="application/ld+json">${ld}</script>\n  </head>`);

fs.writeFileSync(htmlPath, html);
fs.writeFileSync(path.join(dist, "llms.txt"), llmsTxt());
fs.rmSync(ssr, { recursive: true, force: true });

console.log(`prerender: index.html ${(html.length / 1024).toFixed(1)} kB, llms.txt written`);
