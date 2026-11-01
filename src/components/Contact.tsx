import { useState } from "react";
import { person } from "@/data/profile";
import { IconCheck, IconCopy, IconGithub, IconLinkedin, IconMail } from "./icons";

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  };

  return (
    <section className="contact" id="contact" aria-labelledby="contact-h">
      <div className="wrap">
        <h2 id="contact-h" className="contact-h">
          Have a role or a problem worth building? Let's talk.
        </h2>
        <div className="contact-row">
          <a className="contact-mail" href={`mailto:${person.email}`}>
            <IconMail size={28} />
            <span>{person.email}</span>
          </a>
          <button className="btn btn-ink" onClick={copy} aria-live="polite">
            {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
            {copied ? "Copied" : "Copy email"}
          </button>
        </div>
        <ul className="contact-links">
          <li>
            <a href={person.linkedin} target="_blank" rel="noopener me">
              <IconLinkedin size={20} /> LinkedIn
            </a>
          </li>
          <li>
            <a href={person.github} target="_blank" rel="noopener me">
              <IconGithub size={20} /> GitHub
            </a>
          </li>
          <li>
            <a href={`tel:${person.phone.replace(/-/g, "")}`}>{person.phone}</a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Contact;
