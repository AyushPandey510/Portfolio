import { person } from "@/data/profile";

const Footer = () => (
  <footer className="footer">
    <div className="wrap footer-inner">
      <p>
        © {new Date().getFullYear()} {person.name}. Designed and built by me with React, TypeScript and a lot of
        SVG.
      </p>
      <p>
        <a href="/llms.txt">llms.txt</a> <a href="/sitemap.xml">Sitemap</a> <a href="#top">Back to top</a>
      </p>
    </div>
  </footer>
);

export default Footer;
