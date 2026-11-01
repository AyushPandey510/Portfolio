# Ayush Pandey — Portfolio

Personal site of Ayush Pandey: software engineer (frontend at Q2Pay; Rust/Python backends, React/Flutter apps, RAG/LLM features).

Live: https://portfolio-ayushpandey.vercel.app

## Editing content
Every word on the site lives in **`src/data/profile.ts`** — skills, projects, timeline, FAQ.
The page, the JSON-LD structured data and `llms.txt` are all generated from it, so edit once.

## Scripts
```sh
npm install --legacy-peer-deps
npm run dev      # local dev server on :8080
npm run build    # client build + SSR pre-render + JSON-LD + llms.txt into dist/
npm run preview
```

## How it is built
- React 18 + TypeScript + Vite, hand-written CSS (`src/index.css`), custom SVG icon set (`src/components/icons.tsx`).
- `npm run build` pre-renders the page to static HTML (`scripts/prerender.mjs`) so search engines and AI crawlers read everything without JavaScript; the browser then hydrates it.
- SEO / AI: canonical + Open Graph + Twitter tags, Person/ProfilePage/ItemList/FAQPage JSON-LD, `sitemap.xml`, `robots.txt` that welcomes AI crawlers, `llms.txt`.
- Motion: one page-load sequence, an animated system diagram (SVG SMIL), scroll-linked process rail, Lenis smooth scrolling on desktop. All respect `prefers-reduced-motion`.
- Fonts are self-hosted (Bricolage Grotesque variable, JetBrains Mono) via Fontsource.
