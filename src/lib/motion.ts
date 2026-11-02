// One small motion engine for the whole site. It tags elements, reveals them
// as they scroll into view, counts numbers up, and keeps "running" flows
// (step lists and pipelines) cycling while they are on screen.
// Everything is skipped when the visitor prefers reduced motion.

const REVEAL: [string, string][] = [
  [".sec-n, .kicker", "fade"],
  [".h2, .h3, .title", "words"],
  [".p, .dek, .note, .pull, .term, .meta, .links, figcaption", "up"],
  [".tldr-in > *", "up"],
  [".tier", "tier"],
  [".tier .node", "pop"],
  [".link", "link"],
  [".pipe .step, .pipe .arr", "pop"],
  [".seq-r", "slide"],
  [".rows .row, .rows-h", "slide"],
  [".cards .card", "up"],
  [".code, pre:not(.code pre)", "wipe"],
  
  [".fig", "fig"],
  [".nav2 .nv, .author", "up"],
];

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function splitWords(el: HTMLElement) {
  if (el.dataset.split) return;
  el.dataset.split = "1";
  const walk = (node: Node): Node[] => {
    if (node.nodeType === 3) {
      return (node.textContent || "").split(/(\s+)/).filter(Boolean).map((t) => {
        if (/^\s+$/.test(t)) return document.createTextNode(t);
        const outer = document.createElement("span");
        outer.className = "w";
        const inner = document.createElement("span");
        inner.textContent = t;
        outer.appendChild(inner);
        return outer;
      });
    }
    if (node.nodeType === 1 && (node as HTMLElement).tagName !== "SVG") {
      const kids = Array.from(node.childNodes);
      node.textContent = "";
      kids.forEach((k) => walk(k).forEach((n) => node.appendChild(n)));
    }
    return [node];
  };
  walk(el);
  el.querySelectorAll<HTMLElement>(".w > span").forEach((s, i) => s.style.setProperty("--wi", String(i)));
}

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  if (!Number.isFinite(target)) return;
  const dur = 1400;
  const t0 = performance.now();
  const fmt = (n: number) => Math.round(n).toLocaleString("en-IN");
  const tick = (t: number) => {
    const k = Math.min(1, (t - t0) / dur);
    const e = 1 - Math.pow(1 - k, 4);
    el.textContent = fmt(target * e) + (el.dataset.suffix || "");
    if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// Cycles a "run" class through the children of a flow, like a job moving
// through the system, while the flow is visible.
function runFlow(container: HTMLElement, selector: string) {
  const items = Array.from(container.querySelectorAll<HTMLElement>(selector));
  if (items.length < 2) return () => {};
  let i = 0;
  let timer = 0;
  const step = () => {
    items.forEach((el, k) => el.classList.toggle("run", k === i));
    items.forEach((el, k) => el.classList.toggle("done", k < i));
    i = (i + 1) % (items.length + 1);
    timer = window.setTimeout(step, i === 0 ? 1400 : 1100);
  };
  const io = new IntersectionObserver(([en]) => {
    window.clearTimeout(timer);
    if (en.isIntersecting) step();
  }, { threshold: 0.35 });
  io.observe(container);
  return () => {
    io.disconnect();
    window.clearTimeout(timer);
  };
}

export function initMotion(root: HTMLElement): () => void {
  const cleanups: (() => void)[] = [];
  const still = reduced();

  if (!still) {
    for (const [sel, kind] of REVEAL) {
      root.querySelectorAll<HTMLElement>(sel).forEach((el) => {
        if (!el.dataset.m) el.dataset.m = kind;
      });
    }
    root.querySelectorAll<HTMLElement>('[data-m="words"]').forEach(splitWords);
    // Stagger siblings that animate together.
    root.querySelectorAll<HTMLElement>(".tier-c, .pipe, .seq, .rows, .cards, .stats, .tldr-in, .also, .revs, .wi ol").forEach((group) => {
      Array.from(group.children).forEach((c, i) => (c as HTMLElement).style.setProperty("--d", `${Math.min(i, 10) * 90}ms`));
    });
  }

  // Case-study stat figures like "79,860/s" or "71×" count up from zero.
  if (!still) {
    root.querySelectorAll<HTMLElement>(".stat > b").forEach((b) => {
      const m = (b.textContent || "").trim().match(/^([\d,]+)(\D.*)?$/);
      if (!m) return;
      b.dataset.count = m[1].replace(/,/g, "");
      b.dataset.suffix = m[2] || "";
    });
  }

  const targets = root.querySelectorAll<HTMLElement>("[data-m], [data-reveal], [data-count], [data-inview]");
  if (still || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target as HTMLElement;
        el.classList.add("in");
        if (el.dataset.count) countUp(el);
        io.unobserve(el);
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
    targets.forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    root.querySelectorAll<HTMLElement>(".seq").forEach((s) => cleanups.push(runFlow(s, ".seq-r")));
    root.querySelectorAll<HTMLElement>(".pipe").forEach((s) => cleanups.push(runFlow(s, ".step")));
  }

  // "On this page": highlight the section being read.
  const toc = Array.from(root.querySelectorAll<HTMLAnchorElement>(".toc-d a[href^='#']"));
  if (toc.length && "IntersectionObserver" in window) {
    const map = new Map<Element, HTMLAnchorElement>();
    toc.forEach((a) => {
      const sec = root.querySelector(a.getAttribute("href")!);
      if (sec) map.set(sec, a);
    });
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        toc.forEach((a) => a.classList.remove("cur"));
        map.get(en.target)?.classList.add("cur");
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    map.forEach((_, sec) => spy.observe(sec));
    cleanups.push(() => spy.disconnect());
  }

  return () => cleanups.forEach((c) => c());
}

// Thin bar at the top of the window showing how far down the page you are.
export function initProgress(bar: HTMLElement): () => void {
  let raf = 0;
  const draw = () => {
    raf = 0;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  };
  const on = () => {
    if (!raf) raf = requestAnimationFrame(draw);
  };
  draw();
  window.addEventListener("scroll", on, { passive: true });
  window.addEventListener("resize", on);
  return () => {
    window.removeEventListener("scroll", on);
    window.removeEventListener("resize", on);
    cancelAnimationFrame(raf);
  };
}
