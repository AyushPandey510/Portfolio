import type { CaseContent, CaseStudy } from "./cases";

const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

// Wraps the hero copy and adds a drawing-style title block beside it.
export function decorate(c: CaseStudy, html: string, css: string): CaseContent {
  const host = (u: string) => u.replace(/^https?:\/\//, "");
  const rows = [
    `<div class="big"><dt>Sheet</dt><dd>${c.no}</dd></div>`,
    `<div><dt>Stack</dt><dd>${esc(c.stack.join(", "))}</dd></div>`,
    `<div><dt>Built by</dt><dd>Ayush Pandey, solo</dd></div>`,
    `<div><dt>Source</dt><dd><a href="${c.repo}">${esc(host(c.repo))}</a></dd></div>`,
    c.live ? `<div><dt>Live</dt><dd><a href="${c.live}">${esc(host(c.live))}</a></dd></div>` : "",
  ].join("");
  const open = '<section class="hero">';
  const i = html.indexOf(open);
  const j = html.indexOf("</section>", i);
  if (i >= 0 && j >= 0) {
    html = html.slice(0, i) + open + '<div class="hero-l">' + html.slice(i + open.length, j) + `</div><dl class="hero-tb" aria-label="Project details">${rows}</dl>` + html.slice(j);
  }
  return { slug: c.slug, html, css };
}
