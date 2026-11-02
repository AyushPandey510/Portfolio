import { useContext, useEffect, useRef, useState, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { CaseContent, CaseStudy } from "../content/cases";
import { CaseContentContext } from "../content/context";
import { loadCase } from "../content/load";
import "../styles/case.css";
import { initMotion } from "../lib/motion";

// What the prerendered page already contains, so hydration needs no fetch.
function fromDom(slug: string): CaseContent | null {
  if (typeof document === "undefined") return null;
  const body = document.querySelector<HTMLElement>(`[data-case="${slug}"]`);
  const style = document.querySelector<HTMLStyleElement>(`style[data-case-css="${slug}"]`);
  return body && style ? { slug, html: body.innerHTML, css: style.textContent || "" } : null;
}

// Renders one case study. The article is static HTML (so it is in the
// prerendered page for crawlers); React only handles the Full / Quick read
// switch and keeps in-site links on the client router.
export default function CaseStudyPage({ study }: { study: CaseStudy }) {
  const server = useContext(CaseContentContext);
  const [content, setContent] = useState<CaseContent | null>(() => server?.[study.slug] ?? fromDom(study.slug));
  const [failed, setFailed] = useState(false);
  const [full, setFull] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (content) return;
    let live = true;
    loadCase(study)
      .then((c) => live && setContent(c))
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, [content, study]);

  useEffect(() => (content && ref.current ? initMotion(ref.current) : undefined), [content]);

  useEffect(() => {
    ref.current?.querySelectorAll<HTMLButtonElement>("[data-mode]").forEach((b) => {
      b.setAttribute("aria-pressed", String((b.dataset.mode === "full") === full));
    });
  }, [full, content]);

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const mode = target.closest<HTMLElement>("[data-mode]");
    if (mode) {
      setFull(mode.dataset.mode === "full");
      return;
    }
    const a = target.closest<HTMLAnchorElement>("a[href^='/']");
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const href = a.getAttribute("href")!;
    if (href.endsWith(".pdf") || href.endsWith(".txt")) return;
    e.preventDefault();
    navigate(href);
  };

  if (!content) {
    return (
      <main className="cs-wait" aria-busy={!failed}>
        <p>{study.no}</p>
        <h1>{study.name}</h1>
        {failed ? (
          <p>
            This page didn't load. <a href={`/work/${study.slug}`}>Try again</a>
          </p>
        ) : (
          <i aria-hidden="true" />
        )}
      </main>
    );
  }

  return (
    <>
      <style data-case-css={study.slug} dangerouslySetInnerHTML={{ __html: content.css }} />
      <div
        ref={ref}
        data-case={study.slug}
        className={`cs-${study.slug}${full ? "" : " quick"}`}
        onClick={onClick}
        dangerouslySetInnerHTML={{ __html: content.html }}
      />
    </>
  );
}
