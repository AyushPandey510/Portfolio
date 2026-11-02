import { caseBySlug } from "./content/cases";
import { SITE_URL, home } from "./content/site";

export interface Meta { title: string; description: string; url: string; type: "profile" | "article"; image: string; imageAlt: string }

export function metaFor(pathname: string): Meta {
  const m = pathname.match(/^\/work\/([^/]+)\/?$/);
  const study = m ? caseBySlug(m[1]) : undefined;
  if (study) {
    return {
      title: `${study.name}: architecture and how I built it — Ayush Pandey`,
      description: study.summary,
      url: `${SITE_URL}/work/${study.slug}`,
      type: "article",
      image: `${SITE_URL}/og/${study.slug}.png`,
      imageAlt: `${study.no} ${study.name}: ${study.summary}`,
    };
  }
  const image = `${SITE_URL}/og.png`;
  const imageAlt = "Ayush Pandey, software engineer: Rust, full-stack, AI/ML and Flutter";
  if (pathname === "/" || pathname === "") return { ...home, url: `${SITE_URL}/`, type: "profile", image, imageAlt };
  return { title: "Not found — Ayush Pandey", description: home.description, url: `${SITE_URL}${pathname}`, type: "profile", image, imageAlt };
}
