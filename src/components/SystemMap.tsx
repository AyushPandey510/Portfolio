import { useEffect, useRef, useState } from "react";
import { layers, projects, type LayerId } from "@/data/profile";
import { layerIcon } from "./icons";

type Node = { id: LayerId; x: number; y: number; w: number; h: number; label: string; sub: string };

const nodes: Node[] = [
  { id: "mobile", x: 10, y: 52, w: 168, h: 72, label: "Flutter app", sub: "Android, iOS" },
  { id: "web", x: 10, y: 200, w: 168, h: 72, label: "React web", sub: "PWA, Electron" },
  { id: "backend", x: 226, y: 112, w: 168, h: 120, label: "API core", sub: "Rust, FastAPI, Go" },
  { id: "data", x: 442, y: 52, w: 148, h: 72, label: "Storage", sub: "Postgres, Redis" },
  { id: "ai", x: 442, y: 200, w: 148, h: 72, label: "AI layer", sub: "LLM, FAISS" },
  { id: "ship", x: 196, y: 330, w: 228, h: 72, label: "Ship", sub: "Docker, CI, AWS" },
];

// Each wire touches two layers; it lights up when either end is active.
const wires: { id: string; d: string; ends: LayerId[]; back?: boolean; dur: number }[] = [
  { id: "w1", d: "M178 88 C 204 88, 200 150, 226 150", ends: ["mobile", "backend"], dur: 2.2 },
  { id: "w2", d: "M178 236 C 204 236, 200 196, 226 196", ends: ["web", "backend"], dur: 2.6 },
  { id: "w3", d: "M394 150 C 420 150, 416 88, 442 88", ends: ["backend", "data"], back: true, dur: 2.4 },
  { id: "w4", d: "M394 196 C 420 196, 416 236, 442 236", ends: ["backend", "ai"], back: true, dur: 2.8 },
  { id: "w5", d: "M310 232 L 310 330", ends: ["backend", "ship"], dur: 1.8 },
  { id: "w6", d: "M516 200 L 516 124", ends: ["ai", "data"], dur: 2 },
];

const SystemMap = () => {
  const [active, setActive] = useState<LayerId | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => (mq.matches ? svgRef.current?.pauseAnimations() : svgRef.current?.unpauseAnimations());
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const select = (id: LayerId) => {
    window.dispatchEvent(new CustomEvent("layer:select", { detail: id }));
    document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
  };

  const current = layers.find((l) => l.id === active);
  const usedIn = current
    ? projects.filter((p) => p.layers.includes(current.id)).map((p) => p.name)
    : [];

  return (
    <figure className="map" data-active={active ?? undefined}>
      <svg
        ref={svgRef}
        viewBox="0 0 600 412"
        className="map-svg"
        role="group"
        aria-label="Diagram of the systems Ayush builds: Flutter and React clients talk to a Rust, Go or FastAPI core, which uses Postgres and Redis for storage, an LLM and FAISS AI layer, and ships with Docker, CI and AWS."
        onMouseLeave={() => setActive(null)}
      >
        <defs>
          {wires.map((w) => (
            <path key={w.id} id={w.id} d={w.d} />
          ))}
        </defs>

        {wires.map((w, i) => {
          const lit = active ? w.ends.includes(active) : true;
          return (
            <g key={w.id} className={`wire ${lit ? "is-lit" : "is-dim"}`} style={{ ["--d" as string]: `${0.15 + i * 0.08}s` }}>
              <use href={`#${w.id}`} className="wire-base" pathLength={1} />
              <use href={`#${w.id}`} className="wire-dash" />
              {[0, 1].map((k) => (
                <circle key={k} r="3.4" className={`packet c-${w.ends[k === 0 ? 0 : 1]}`}>
                  <animateMotion
                    dur={`${w.dur}s`}
                    begin={`${1.1 + k * (w.dur / 2)}s`}
                    repeatCount="indefinite"
                    keyPoints={w.back && k === 1 ? "1;0" : "0;1"}
                    keyTimes="0;1"
                    calcMode="linear"
                  >
                    <mpath href={`#${w.id}`} />
                  </animateMotion>
                </circle>
              ))}
            </g>
          );
        })}

        {nodes.map((n, i) => {
          const Icon = layerIcon[n.id];
          const dim = active && active !== n.id;
          return (
            <g
              key={n.id}
              className={`node c-${n.id} ${dim ? "is-dim" : ""} ${active === n.id ? "is-on" : ""}`}
              style={{ ["--d" as string]: `${0.5 + i * 0.07}s` }}
              tabIndex={0}
              role="button"
              aria-label={`${layers.find((l) => l.id === n.id)!.name}: see details`}
              onMouseEnter={() => setActive(n.id)}
              onFocus={() => setActive(n.id)}
              onBlur={() => setActive(null)}
              onClick={() => select(n.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  select(n.id);
                }
              }}
            >
              <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={n.id === "backend" ? 22 : 16} className="node-box" />
              <Icon x={n.x + n.w - 40} y={n.y + 14} size={24} />
              <text x={n.x + 16} y={n.y + n.h - 32} className="node-label">
                {n.label}
              </text>
              <text x={n.x + 16} y={n.y + n.h - 14} className="node-sub">
                {n.sub}
              </text>
            </g>
          );
        })}
      </svg>

      <figcaption className="map-caption" aria-live="polite">
        {current ? (
          <>
            <strong>{current.name}.</strong> {current.summary}{" "}
            <span className="map-used">Used in {usedIn.slice(0, 4).join(", ")}.</span>
          </>
        ) : (
          <>Hover or tap a block to see where I use it. This is the shape of most things I ship.</>
        )}
      </figcaption>
    </figure>
  );
};

export default SystemMap;
