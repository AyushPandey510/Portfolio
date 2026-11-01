import { useEffect, useState } from "react";
import { IconClose, IconMenu } from "./icons";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Work" },
  { href: "#path", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setCurrent(`#${e.target.id}`));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <nav className="nav-inner" aria-label="Primary">
        <a href="#top" className="logo" aria-label="Ayush Pandey, back to top">
          <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
            <rect width="32" height="32" rx="9" className="logo-bg" />
            <path d="M8 23 L13.5 9 L19 23 M10.2 18h6.6" className="logo-a" />
            <circle cx="23.5" cy="21.5" r="2.3" className="logo-dot" />
          </svg>
          <span>Ayush Pandey</span>
        </a>

        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} aria-current={current === l.href ? "true" : undefined}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn btn-solid btn-sm nav-cta">
          Hire me
        </a>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </nav>

      <div id="mobile-menu" className={`sheet ${open ? "is-open" : ""}`} hidden={!open}>
        <ul>
          {links.map((l, i) => (
            <li key={l.href} style={{ ["--i" as string]: i }}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="btn btn-solid" onClick={() => setOpen(false)}>
          Hire me
        </a>
      </div>
    </header>
  );
};

export default Nav;
