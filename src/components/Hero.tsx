import { person } from "@/data/profile";
import SystemMap from "./SystemMap";
import { IconGithub, IconLinkedin } from "./icons";

const Hero = () => (
  <section className="hero" id="top" aria-labelledby="hero-name">
    <div className="wrap">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-status">
            <span className="pulse" aria-hidden="true" />
            {person.openTo}
          </p>
          <h1 id="hero-name" className="hero-name">
            <span className="hero-line">Ayush</span>
            <span className="hero-line">Pandey</span>
            <span className="sr-only">, {person.role} — full-stack, backend, AI/ML and mobile developer in {person.location}</span>
          </h1>
          <p className="hero-lede">{person.headline}</p>
          <p className="hero-sub">
            Frontend Developer at Q2Pay in Mumbai by day, shipping the Xpentra platform. On my own time I build
            Rust and Python backends, Flutter apps and RAG-powered AI products, and every one of them is live
            or open source.
          </p>
          <div className="hero-cta">
            <a className="btn btn-solid" href="#work">
              See my work
            </a>
            <a className="btn btn-line" href={`mailto:${person.email}`}>
              Email me
            </a>
          </div>
          <ul className="hero-social" aria-label="Profiles">
            <li>
              <a href={person.github} target="_blank" rel="noopener me" aria-label="GitHub profile">
                <IconGithub size={20} />
                <span>{person.githubHandle}</span>
              </a>
            </li>
            <li>
              <a href={person.linkedin} target="_blank" rel="noopener me" aria-label="LinkedIn profile">
                <IconLinkedin size={20} />
                <span>LinkedIn</span>
              </a>
            </li>
          </ul>
        </div>
        <SystemMap />
      </div>
    </div>
  </section>
);

export default Hero;
