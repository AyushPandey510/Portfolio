import type { CaseContent, CaseStudy } from "./cases";
import { decorate } from "./decorate";

// Each case study is its own small chunk, fetched when its page opens (or
// when a link to it is hovered), so the home page doesn't carry all nine.
const htmls = import.meta.glob<string>("./*.html", { query: "?raw", import: "default" });
const csss = import.meta.glob<string>("./*.css", { query: "?raw", import: "default" });

const cache = new Map<string, Promise<CaseContent>>();

export function loadCase(c: CaseStudy): Promise<CaseContent> {
  let p = cache.get(c.slug);
  if (!p) {
    p = Promise.all([htmls[`./${c.slug}.html`](), csss[`./${c.slug}.css`]()]).then(([h, css]) => decorate(c, h, css));
    cache.set(c.slug, p);
  }
  return p;
}

export const prefetchCase = (c: CaseStudy) => {
  loadCase(c).catch(() => cache.delete(c.slug));
};
