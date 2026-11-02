import { cases, type CaseContent } from "./cases";
import { decorate } from "./decorate";

// Server-side only: every case body, so prerendered pages contain the full article.
const htmls = import.meta.glob<string>("./*.html", { query: "?raw", import: "default", eager: true });
const csss = import.meta.glob<string>("./*.css", { query: "?raw", import: "default", eager: true });

export const allCaseContent: Record<string, CaseContent> = Object.fromEntries(
  cases.map((c) => [c.slug, decorate(c, htmls[`./${c.slug}.html`], csss[`./${c.slug}.css`])]),
);
