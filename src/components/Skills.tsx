import { useEffect, useRef, useState } from "react";
import { layers, projects, type LayerId } from "@/data/profile";
import { layerIcon } from "./icons";

const Skills = () => {
  const [active, setActive] = useState<LayerId>("ai");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const on = (e: Event) => setActive((e as CustomEvent<LayerId>).detail);
    window.addEventListener("layer:select", on);
    return () => window.removeEventListener("layer:select", on);
  }, []);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = layers[(i + dir + layers.length) % layers.length];
    setActive(next.id);
    tabRefs.current[next.id]?.focus();
  };

  return (
    <section className="section skills" id="skills" aria-labelledby="skills-h">
      <div className="wrap">
        <div className="section-head">
          <h2 id="skills-h" className="h2">
            Six layers, one person.
          </h2>
          <p className="section-intro">
            Every colour on this site is one of these layers. Pick one to see what I use, how I use it, and
            where you can check the work.
          </p>
        </div>

        <div className="skills-ui">
          <div className="tabs" role="tablist" aria-label="Skill areas" aria-orientation="vertical">
            {layers.map((l, i) => {
              const Icon = layerIcon[l.id];
              const on = l.id === active;
              return (
                <button
                  key={l.id}
                  ref={(el) => (tabRefs.current[l.id] = el)}
                  role="tab"
                  id={`tab-${l.id}`}
                  aria-selected={on}
                  aria-controls={`panel-${l.id}`}
                  tabIndex={on ? 0 : -1}
                  className={`tab c-${l.id} ${on ? "is-on" : ""}`}
                  onClick={() => setActive(l.id)}
                  onKeyDown={(e) => onKey(e, i)}
                >
                  <span className="tab-icon">
                    <Icon size={22} />
                  </span>
                  <span className="tab-text">
                    <span className="tab-name">{l.name}</span>
                    <span className="tab-sum">{l.summary}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {layers.map((l) => {
            const Icon = layerIcon[l.id];
            const proof = projects.filter((p) => l.proof.includes(p.slug));
            return (
              <article
                key={l.id}
                role="tabpanel"
                id={`panel-${l.id}`}
                aria-labelledby={`tab-${l.id}`}
                hidden={l.id !== active}
                className={`panel c-${l.id}`}
              >
                <Icon size={56} className="panel-icon draw" />
                <h3 className="panel-title">{l.name}</h3>
                <p className="panel-detail">{l.detail}</p>

                <h4 className="panel-sub">Tools I reach for</h4>
                <ul className="chips">
                  {l.tools.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>

                <h4 className="panel-sub">Where to check it</h4>
                <ul className="proof">
                  {proof.map((p) => (
                    <li key={p.slug}>
                      <a href={`#project-${p.slug}`}>{p.name}</a>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
