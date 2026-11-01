import { useState } from "react";
import { layers, projects, type LayerId } from "@/data/profile";
import { IconGithub, IconLive, layerIcon } from "./icons";

const Work = () => {
  const [filter, setFilter] = useState<LayerId | "all">("all");
  const shown = projects.filter((p) => filter === "all" || p.layers.includes(filter));

  return (
    <section className="section work" id="work" aria-labelledby="work-h">
      <div className="wrap">
        <div className="section-head">
          <h2 id="work-h" className="h2">
            Things I have built and shipped.
          </h2>
          <p className="section-intro">
            Twelve projects across every layer. Each card shows the path data takes through the system.
          </p>
        </div>

        <div className="filters" role="group" aria-label="Filter projects by skill area">
          <button className={`filter ${filter === "all" ? "is-on" : ""}`} aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
            All <span className="count">{projects.length}</span>
          </button>
          {layers.map((l) => {
            const Icon = layerIcon[l.id];
            const n = projects.filter((p) => p.layers.includes(l.id)).length;
            return (
              <button
                key={l.id}
                className={`filter c-${l.id} ${filter === l.id ? "is-on" : ""}`}
                aria-pressed={filter === l.id}
                onClick={() => setFilter(l.id)}
              >
                <Icon size={16} />
                {l.short} <span className="count">{n}</span>
              </button>
            );
          })}
        </div>

        <ul className="projects">
          {shown.map((p) => (
            <li
              key={p.slug}
              id={`project-${p.slug}`}
              className={`project c-${p.layers[0]} ${p.featured && filter === "all" ? "is-featured" : ""}`}
            >
              <article itemScope itemType="https://schema.org/SoftwareSourceCode">
                <div className="project-top">
                  <ul className="pips" aria-label="Skill areas">
                    {p.layers.map((l) => (
                      <li key={l} className={`pip c-${l}`} title={layers.find((x) => x.id === l)!.name}>
                        <span className="sr-only">{layers.find((x) => x.id === l)!.name}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="project-links">
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener" aria-label={`Open ${p.name} live`}>
                        <IconLive size={18} />
                        <span>Live</span>
                      </a>
                    )}
                    <a href={p.repo} target="_blank" rel="noopener" aria-label={`${p.name} source code on GitHub`} itemProp="codeRepository">
                      <IconGithub size={18} />
                      <span>Code</span>
                    </a>
                  </div>
                </div>

                <h3 className="project-name" itemProp="name">
                  {p.name}
                </h3>
                <p className="project-tag">{p.tagline}</p>
                <p className="project-desc" itemProp="description">
                  {p.description}
                </p>

                <ol className="pipe" aria-label="Data flow">
                  {p.flow.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ol>

                <ul className="project-hl">
                  {p.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>

        <p className="work-more">
          More experiments, coursework and study material live on{" "}
          <a href="https://github.com/AyushPandey510?tab=repositories" target="_blank" rel="noopener">
            my GitHub
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default Work;
