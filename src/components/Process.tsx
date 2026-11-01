import { useEffect, useRef } from "react";
import { process } from "@/data/profile";

const colors = ["ai", "backend", "data", "web", "ship"] as const;

const Process = () => {
  const ref = useRef<HTMLOListElement>(null);

  // Scroll-linked progress: the rail fills as the section passes through the viewport.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.8 - r.top) / (r.height + vh * 0.3)));
      el.style.setProperty("--p", p.toFixed(3));
      raf = 0;
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  return (
    <section className="section process" aria-labelledby="process-h">
      <div className="wrap">
        <div className="section-head">
          <h2 id="process-h" className="h2">
            How a project moves through my hands.
          </h2>
          <p className="section-intro">The same five steps, whether it is a weekend tool or a production service.</p>
        </div>
        <ol className="flow" ref={ref}>
          {process.map((s, i) => (
            <li key={s.title} className={`flow-step c-${colors[i]}`}>
              <span className="flow-dot" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
