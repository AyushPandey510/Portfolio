import { useRef, useState, type PointerEvent } from "react";
import { Link } from "react-router-dom";
import { caseBySlug } from "../content/cases";
import { prefetchCase } from "../content/load";

const prefetch = (slug: string) => {
  const c = caseBySlug(slug);
  if (c) prefetchCase(c);
};

export interface WorkRow {
  slug: string;
  no: string;
  name: string;
  line: string;
  stack: string;
  tag?: string;
  img?: string;
  flow: { label: string; c: string; hot?: boolean }[];
}

function Flow({ flow }: { flow: WorkRow["flow"] }) {
  return (
    <span className="wi-flow">
      {flow.map((f, i) => (
        <span key={f.label} className="wi-flow-i">
          {i > 0 && <i aria-hidden="true" />}
          <b className={`${f.c}${f.hot ? " hot" : ""}`}>{f.label}</b>
        </span>
      ))}
    </span>
  );
}

// The project list as a drawing index. On desktop a preview (real screenshot
// or the system flow) follows the cursor; on phones the flow shows inline.
export default function WorkIndex({ rows }: { rows: WorkRow[] }) {
  const [hover, setHover] = useState<WorkRow | null>(null);
  const prev = useRef<HTMLDivElement>(null);

  // Keep the preview beside the cursor and fully inside the window.
  const place = (e: PointerEvent) => {
    const el = prev.current;
    if (e.pointerType !== "mouse" || !el) return;
    const w = el.offsetWidth || 380;
    const h = el.offsetHeight || 260;
    const pad = 16;
    let x = e.clientX + 28;
    if (x + w > window.innerWidth - pad) x = e.clientX - w - 28;
    const y = Math.min(Math.max(e.clientY - h / 2, 90), window.innerHeight - h - pad);
    el.style.transform = `translate(${Math.max(pad, x)}px, ${Math.max(pad, y)}px)`;
  };

  return (
    <div className="wi" onPointerMove={place} onPointerLeave={() => setHover(null)}>
      <div className="wi-head" aria-hidden="true"><span>Sheet</span><span>System</span><span>What it is</span><span>Stack</span></div>
      <ol>
        {rows.map((r) => (
          <li key={r.slug} data-reveal>
            <Link
              to={`/work/${r.slug}`}
              className="wi-row"
              onPointerEnter={(e) => {
                if (e.pointerType !== "mouse") return;
                place(e);
                setHover(r);
                prefetch(r.slug);
              }}
              onFocus={() => {
                setHover(null);
                prefetch(r.slug);
              }}
              onTouchStart={() => prefetch(r.slug)}
            >
              <span className="wi-no">{r.no}</span>
              <span className="wi-name">{r.name}{r.tag && <em>{r.tag}</em>}</span>
              <span className="wi-line">{r.line}</span>
              <span className="wi-stack">{r.stack}</span>
              <span className="wi-m"><Flow flow={r.flow} /></span>
              <svg className="wi-arr" width="28" height="28" viewBox="0 0 28 28" aria-hidden="true"><path d="M6 22 L22 6 M10 6 H22 V18" fill="none" stroke="currentColor" strokeWidth="2.4" /></svg>
            </Link>
          </li>
        ))}
      </ol>
      <div className={`wi-prev${hover ? " on" : ""}`} ref={prev} aria-hidden="true">
        {hover && (hover.img ? <img src={hover.img} alt="" /> : (
          <div className="wi-prev-d"><small>{hover.no} system flow</small><Flow flow={hover.flow} /></div>
        ))}
      </div>
    </div>
  );
}
