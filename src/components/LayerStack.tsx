import { useState } from "react";
import { Link } from "react-router-dom";

export interface Layer { c: string; fill: string; n: string; name: string; body: string; proof: { slug: string; label: string }[] }

// Six skill layers as an exploded isometric stack. Picking a plate lifts it
// and shows the work that proves it.
export default function LayerStack({ layers }: { layers: Layer[] }) {
  const [active, setActive] = useState(0);
  const a = layers[active];
  const gap = 46;
  return (
    <div className="ls" data-inview>
      <svg className="ls-svg" viewBox="0 0 420 420" aria-hidden="true">
        {layers.map((l, i) => {
          const lift = i === active ? -18 : 0;
          const top = 70 + i * gap + lift;
          const k = layers.length - 1 - i;
          return (
            <g key={l.n} className={`ls-plate${i === active ? " on" : ""}`} style={{ ["--k" as string]: k, ["--s" as string]: i - 2.5 }} onClick={() => setActive(i)}>
              <path d={`M210 ${top} L380 ${top + 60} L210 ${top + 120} L40 ${top + 60} Z`} fill={l.fill} />
              <path d={`M40 ${top + 60} L210 ${top + 120} L210 ${top + 132} L40 ${top + 72} Z`} fill={l.fill} className="side l" />
              <path d={`M380 ${top + 60} L210 ${top + 120} L210 ${top + 132} L380 ${top + 72} Z`} fill={l.fill} className="side r" />
              <text x="210" y={top + 110} textAnchor="middle">{l.n}</text>
            </g>
          );
        }).reverse()}
      </svg>
      <div className="ls-panel">
        <div className="ls-tabs" role="tablist" aria-label="Skill layers">
          {layers.map((l, i) => (
            <button key={l.n} role="tab" aria-selected={i === active} className={`ls-tab ${l.c}`} onClick={() => setActive(i)}>
              <small>{l.n}</small>{l.name}
            </button>
          ))}
        </div>
        <div className="ls-body" role="tabpanel" aria-label={a.name} key={a.n}>
          <p>{a.body}</p>
          <p className="ls-proof-h">Proved in</p>
          <div className="ls-proof">
            {a.proof.map((p) => <Link key={p.slug} to={`/work/${p.slug}`}>{p.label}</Link>)}
          </div>
        </div>
      </div>
    </div>
  );
}
