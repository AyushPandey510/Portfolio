import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import { person } from "../content/site";
import GeofenceDemo from "../components/GeofenceDemo";
import HeroDrawing from "../components/HeroDrawing";
import LatencyChart from "../components/LatencyChart";
import LayerStack, { type Layer } from "../components/LayerStack";
import WorkIndex, { type WorkRow } from "../components/WorkIndex";
import { initMotion } from "../lib/motion";
import Frame from "../components/Frame";

const work: WorkRow[] = [
  { slug: "space", no: "S-01", name: "Space", tag: "load-tested", line: "Chat rooms you can only enter while you're physically inside them.", stack: "Rust, Axum, Flutter, Postgres",
    flow: [{ label: "Flutter", c: "c-mob" }, { label: "Axum + geofence", c: "c-be", hot: true }, { label: "Postgres", c: "c-data" }] },
  { slug: "swiftshare", no: "S-02", name: "SwiftShare", tag: "live", line: "Send a file, share a 6-character code. 200 MB through 15 MB of memory.", stack: "Rust, Warp, React, Flutter", img: "/work/swiftshare-web.webp",
    flow: [{ label: "Web, app", c: "c-web" }, { label: "Warp stream", c: "c-be", hot: true }, { label: "Disk", c: "c-data" }] },
  { slug: "life-engine", no: "S-03", name: "Life Engine AI", line: "An AI you talk to as your future self, grounded in your goals.", stack: "FastAPI, React, Groq, FAISS",
    flow: [{ label: "React", c: "c-web" }, { label: "FastAPI", c: "c-be" }, { label: "Groq LLM", c: "c-ai", hot: true }] },
  { slug: "counter-drop", no: "S-04", name: "Counter Drop", tag: "live", line: "A print-shop queue on Lambda and one DynamoDB table.", stack: "Go, DynamoDB, CDK, PWA", img: "/work/counterdrop-board.webp",
    flow: [{ label: "PWA", c: "c-web" }, { label: "Go Lambdas", c: "c-be" }, { label: "DynamoDB", c: "c-data", hot: true }] },
  { slug: "phisguard", no: "S-05", name: "PhisGuard", line: "Scores a page's phishing risk the moment it loads.", stack: "Flask, Chrome MV3, scikit-learn",
    flow: [{ label: "Extension", c: "c-ship" }, { label: "Flask", c: "c-be" }, { label: "Risk score", c: "c-ai", hot: true }] },
  { slug: "xpensecalc", no: "S-06", name: "XpenseCalc", line: "Spending insights from bank SMS. Nothing leaves the phone.", stack: "Flutter, Kotlin, sqflite",
    flow: [{ label: "SMS", c: "c-mob" }, { label: "Kotlin parser", c: "c-mob", hot: true }, { label: "sqflite", c: "c-data" }] },
  { slug: "rustcart", no: "S-07", name: "RustCart API", line: "An e-commerce backend, and the system behind my paper.", stack: "Rust, Actix Web, Postgres",
    flow: [{ label: "Actix", c: "c-be" }, { label: "Order txn", c: "c-be", hot: true }, { label: "Postgres", c: "c-data" }] },
  { slug: "changeshare", no: "S-08", name: "ChangeShare", line: "Hand uncommitted Git changes to the person next to you.", stack: "TypeScript, Git, CPace", img: "/work/changeshare-poster.webp",
    flow: [{ label: "CLI", c: "c-ship" }, { label: "CPace + AES-GCM", c: "c-ship", hot: true }, { label: "git apply", c: "c-web" }] },
  { slug: "pdf-qa-rag", no: "S-09", name: "PDF-QA RAG", line: "Answers from a PDF and nothing else, fully offline.", stack: "FAISS, MiniLM, Llama 3",
    flow: [{ label: "PDF chunks", c: "c-data" }, { label: "FAISS", c: "c-ai", hot: true }, { label: "Llama 3", c: "c-ai" }] },
];

const layers: Layer[] = [
  { c: "c-ai", fill: "#FF8FB1", n: "L6", name: "AI and ML", body: "RAG with FAISS, LLM APIs (OpenAI, Groq, Gemini), scikit-learn, PyTorch, XGBoost. At Imarticus Learning I worked on 500K+ records and made models 22% more accurate.",
    proof: [{ slug: "life-engine", label: "S-03 Life Engine AI" }, { slug: "phisguard", label: "S-05 PhisGuard" }, { slug: "pdf-qa-rag", label: "S-09 PDF-QA RAG" }] },
  { c: "c-web", fill: "#9DB7FF", n: "L5", name: "Frontend", body: "My day job, at Q2Pay. On my own: React, TypeScript, Tailwind, PWAs, Electron and Chrome extensions.",
    proof: [{ slug: "swiftshare", label: "S-02 SwiftShare" }, { slug: "counter-drop", label: "S-04 Counter Drop" }, { slug: "phisguard", label: "S-05 PhisGuard" }] },
  { c: "c-mob", fill: "#5FE3BC", n: "L4", name: "Mobile", body: "Flutter and Dart, plus native Kotlin when Flutter can't reach the platform: location, SMS, QR, offline storage.",
    proof: [{ slug: "space", label: "S-01 Space" }, { slug: "swiftshare", label: "S-02 SwiftShare" }, { slug: "xpensecalc", label: "S-06 XpenseCalc" }] },
  { c: "c-be", fill: "#FFC857", n: "L3", name: "Backend", body: "Rust on tokio (Axum, Actix Web, Warp), FastAPI, Flask, Go. WebSockets, JWT, streaming uploads, OpenAPI-first.",
    proof: [{ slug: "space", label: "S-01 Space" }, { slug: "swiftshare", label: "S-02 SwiftShare" }, { slug: "rustcart", label: "S-07 RustCart API" }] },
  { c: "c-data", fill: "#CDB8FF", n: "L2", name: "Data", body: "PostgreSQL with SQLx and Alembic, single-table DynamoDB, Redis, SQLite. I design the access patterns before the tables.",
    proof: [{ slug: "space", label: "S-01 Space" }, { slug: "counter-drop", label: "S-04 Counter Drop" }, { slug: "rustcart", label: "S-07 RustCart API" }] },
  { c: "c-ship", fill: "#D8F07A", n: "L1", name: "Ship and secure", body: "Docker, nginx with TLS, GitHub Actions with Trivy, AWS CDK, Vercel. Hashed identifiers, PAKE-protected transfers, secret scanning.",
    proof: [{ slug: "swiftshare", label: "S-02 SwiftShare" }, { slug: "counter-drop", label: "S-04 Counter Drop" }, { slug: "changeshare", label: "S-08 ChangeShare" }] },
];

const also = [
  { name: "Procrastinator", href: "https://github.com/AyushPandey510/Procastinator", body: "Tracks time on distracting apps and roasts you out loud when you overdo it. Focus points and leaderboards.", stack: "Flutter, usage stats, text-to-speech" },
  { name: "IndiaMART pipeline", href: "https://github.com/AyushPandey510/indiamart-data-engineering-pipeline", body: "Scrapes JavaScript-heavy listings, cleans messy fields, loads an analysis-ready dataset.", stack: "Playwright, BeautifulSoup, PostgreSQL", img: "/work/indiamart-chart.webp" },
  { name: "Zettabyte", href: "https://github.com/AyushPandey510/Zettabyte", body: "Registration and QR check-in for the college tech fest I led as head organiser.", stack: "FastAPI, React, QR codes" },
  { name: "Skill Navigator", href: "https://skill-navigator-hub.vercel.app", body: "My own career tracker: daily goals, DSA practice, job applications, weekly reviews. Installable, with a Pomodoro timer.", stack: "React 19, TanStack Start" },
];

const revs = [
  { r: "F", when: "Jun 2026", now: true, title: "Frontend Developer, Q2Pay Technologies", body: "Intern from June, full-time since September." },
  { r: "E", when: "Aug 2025", title: "Data Science Intern, Imarticus Learning", body: "500K+ records, models 22% more accurate, about 30% less manual work." },
  { r: "D", when: "2025", title: "Published a paper", body: "Leveraging Rust for Modern E-Commerce Security." },
  { r: "C", when: "2024", title: "Won three competitions", body: "Aptech solo hackathon, inter-college debugging, inter-college algorithm writing." },
  { r: "B", when: "2024", title: "Head organiser, Zettabyte", body: "Ran the college tech fest, and built its check-in system." },
  { r: "A", when: "2023", title: "B.Sc. Computer Science", body: "Thakur Ramnarayan College, Mumbai. Graduated 2026, CGPA 9.10." },
];

const nav = [
  { href: "#work", n: "01", label: "Work" },
  { href: "#proof", n: "02", label: "Proof" },
  { href: "#engine", n: "03", label: "Engine" },
  { href: "#layers", n: "04", label: "Layers" },
  { href: "#contact", n: "05", label: "Contact" },
];

function SecHead({ n, kicker, title, intro }: { n: string; kicker: string; title: string; intro?: string }) {
  return (
    <div className="sh" data-reveal>
      <p className="sh-k"><span>{n}</span>{kicker}</p>
      <h2 className="sh-t" data-m="words" data-split="1">
        {title.split(" ").map((w, i) => (
          <span key={i}>
            <span className="w"><span style={{ ["--wi" as string]: i }}>{w}</span></span>{" "}
          </span>
        ))}
      </h2>
      {intro && <p className="sh-i">{intro}</p>}
    </div>
  );
}

export default function HomePage() {
  const [menu, setMenu] = useState(false);
  const close = () => setMenu(false);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => (root.current ? initMotion(root.current) : undefined), []);

  return (
    <div className="home" ref={root}>
      <Frame />
      <a className="skip" href="#work">Skip to the work</a>
      <header className="hdr">
        <a className="mark" href="#top" aria-label="Ayush Pandey, top of page">
          <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true"><rect x="1" y="1" width="32" height="32" fill="#0F1B3D" /><path d="M8 25 L14 9 L20 25 M10.2 19.5h7.6" fill="none" stroke="#FFFFFF" strokeWidth="2.6" /><path d="M25 9v16" stroke="#FFC857" strokeWidth="2.6" /></svg>
          <span><b>Ayush Pandey</b><small>Drawing set, rev F</small></span>
        </a>
        <nav className="hdr-nav" aria-label="Sections">
          {nav.map((n) => <a key={n.href} href={n.href}><small>{n.n}</small>{n.label}</a>)}
        </nav>
        <a className="hdr-cta" href={`mailto:${person.email}`}>Hire me</a>
        <button className="hdr-menu" aria-label="Open menu" aria-expanded={menu} onClick={() => setMenu(true)}>
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><path d="M3 7h16M3 15h11" stroke="currentColor" strokeWidth="2.4" fill="none" /></svg>
        </button>
      </header>

      {menu && (
        <>
          <button className="scrim" aria-label="Close menu" onClick={close} />
          <div className="sheet" role="dialog" aria-modal="true" aria-label="Menu">
            <button className="sheet-x" aria-label="Close menu" onClick={close}>
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2.4" /></svg>
            </button>
            <ul className="sheet-nav">
              {nav.map((n) => <li key={n.href}><a href={n.href} onClick={close}><small>{n.n}</small>{n.label}</a></li>)}
            </ul>
            <p className="sheet-h">Case studies</p>
            <ul className="sheet-cases">
              {work.map((w) => <li key={w.slug}><Link to={`/work/${w.slug}`} onClick={close}><small>{w.no}</small>{w.name}</Link></li>)}
            </ul>
          </div>
        </>
      )}

      <main>
        <section id="top" className="hero">
          <div className="hero-meta">
            <span>Sheet 00, index</span>
            <span className="live"><i aria-hidden="true" />Open to SDE roles, Mumbai or remote</span>
          </div>
          <div className="hero-top">
            <div className="hero-id">
              <h1 className="hero-name" aria-label="Ayush Pandey, software engineer">
                <span className="l1" aria-hidden="true">Ayush</span>
                <span className="l2" aria-hidden="true">Pandey</span>
              </h1>
              <div className="hero-dim" aria-hidden="true"><b /><i /><span>full stack, measured</span><i /><b /></div>
            </div>
            <div className="hero-fig">
              <p className="hero-fig-k"><span>Fig. 1</span>Space, the system I load-tested</p>
              <HeroDrawing />
            </div>
          </div>
          <div className="hero-copy">
            <p className="hero-lede">I build the whole system, then I try to break it.</p>
            <div>
              <p className="hero-sub">
                Frontend Developer at Q2Pay. On my own time: a Rust geofence engine load-tested to 4,000 people in one room,
                a streaming file-share, RAG apps and serverless on AWS. Every project below opens into its architecture,
                its hardest problem and the numbers I measured.
              </p>
              <div className="hero-ctas">
                <a className="b b-ink" href="#work">See the nine systems</a>
                <a className="b b-line" href={person.resume}>Resume, PDF</a>
              </div>
            </div>
          </div>
          <dl className="tblock">
            <div><dt>Drawn by</dt><dd>Ayush Pandey</dd></div>
            <div><dt>Role</dt><dd>Frontend Developer, Q2Pay</dd></div>
            <div><dt>Checked</dt><dd>Load-tested, raw output published</dd></div>
            <div><dt>LeetCode</dt><dd><a href={person.leetcode}>111 solved, 8 hard</a></dd></div>
            <div><dt>Education</dt><dd>B.Sc. CS, CGPA 9.10</dd></div>
            <div><dt>Sheets</dt><dd>01 to 09, rev 2026.11</dd></div>
          </dl>
        </section>

        <section id="work" className="sec">
          <SecHead n="01" kicker="Index of sheets" title="Nine systems. Every drawing included." intro="Each one is a real codebase with a full write-up: the architecture, the hard part marked in red, and the trade-offs I'd defend in an interview." />
          <WorkIndex rows={work} />
        </section>

        <section className="spreads">
          <article className="spread s-swift" data-reveal>
            <div className="spread-txt">
              <p className="sh-k"><span>S-02</span>Live</p>
              <h3>A 200 MB file, through 15 MB of server memory.</h3>
              <p>SwiftShare streams uploads chunk by chunk to disk and back out, so memory stays flat however big the file is. 61,220 code lookups a second on the same box.</p>
              <div className="spread-links"><Link to="/work/swiftshare">How it streams</Link><a href="https://swift-share-tau.vercel.app">Try it live</a></div>
            </div>
            <figure className="browser">
              <div className="browser-bar" aria-hidden="true"><i /><i /><i /><span>swift-share-tau.vercel.app</span></div>
              <img src="/work/swiftshare-web.webp" width="1280" height="900" loading="lazy" alt="SwiftShare web app: upload a file or paste text, choose a download limit, get a code." />
            </figure>
          </article>

          <article className="spread s-drop" data-reveal>
            <figure className="drop-shots">
              <img className="d-board" src="/work/counterdrop-board.webp" width="1280" height="800" loading="lazy" alt="Counter Drop shop board with columns for in line, printing, ready and collected." />
              <img className="d-phone" src="/work/counterdrop-drop.webp" width="600" height="1298" loading="lazy" alt="Counter Drop on a phone: two PDFs, print settings, and a Send to counter button showing 16 rupees." />
            </figure>
            <div className="spread-txt">
              <p className="sh-k"><span>S-04</span>Live, serverless</p>
              <h3>A print shop's queue, on one DynamoDB table.</h3>
              <p>Customers drop PDFs from their phone, the shop works a live board. Go on Lambda, one table with four indexes, token numbers from an atomic counter, live updates from DynamoDB Streams.</p>
              <div className="spread-links"><Link to="/work/counter-drop">Read the table design</Link><a href="https://counterdrop.cloudsuggest.in">Try it live</a></div>
            </div>
          </article>
        </section>

        <section id="proof" className="sec proof">
          <SecHead n="02" kicker="Measured, not claimed" title="I load-tested my own system until it bent." intro="Space, on a 2 vCPU machine, with a fan-out client I wrote in Rust. Every run's raw output is in the case study." />
          <div className="proof-g">
            <div data-reveal><LatencyChart /></div>
            <dl className="stats">
              <div data-reveal><dt>Deliveries a second, 4,000 people in one room</dt><dd><span data-count="79860">79,860</span></dd></div>
              <div data-reveal><dt>To decide if you're inside a geofence</dt><dd><span data-count="201">201</span><small>ns</small></dd></div>
              <div data-reveal><dt>Faster room discovery after one query fix</dt><dd><span data-count="71">71</span><small>×</small></dd></div>
              <div data-reveal><dt>Server memory to stream a 200 MB file</dt><dd><span data-count="15">15</span><small>MB</small></dd></div>
            </dl>
          </div>
          <p className="proof-more" data-reveal><Link to="/work/space">How each number was measured</Link></p>
        </section>

        <section id="engine" className="sec engine">
          <SecHead n="03" kicker="Try it" title="Walk out of a geofence." intro="Same rules as the Rust engine in Space: 100 m fence, 20 m exit buffer, three outside readings before it believes you left, then a grace period. Teleporting gets you rejected." />
          <GeofenceDemo />
        </section>

        <section id="layers" className="sec">
          <SecHead n="04" kicker="Skills, exploded" title="Six layers, one engineer." intro="Every system above is these layers stacked. Pick one to see the work that proves it." />
          <div data-reveal><LayerStack layers={layers} /></div>
        </section>

        <section className="sec also-sec">
          <SecHead n="05" kicker="Also built" title="Smaller things that taught me the big ones." />
          <div className="also">
            {also.map((a) => (
              <a key={a.name} className={`also-c${a.img ? " has-img" : ""}`} href={a.href} data-reveal>
                {a.img && <img src={a.img} alt="" loading="lazy" width="1000" height="545" />}
                <h3>{a.name}</h3>
                <p>{a.body}</p>
                <small>{a.stack}</small>
              </a>
            ))}
          </div>
        </section>

        <section id="journey" className="sec">
          <SecHead n="06" kicker="Revision history" title="Every drawing set has one." />
          <ol className="revs">
            {revs.map((r) => (
              <li key={r.r} className={r.now ? "now" : ""} data-reveal>
                <span className="rv">{r.r}</span>
                <time>{r.when}</time>
                <span className="rt"><b>{r.title}.</b> {r.body}</span>
              </li>
            ))}
          </ol>
        </section>

        <section id="contact" className="contact">
          <p className="sh-k"><span>07</span>Contact</p>
          <h2>Hiring an engineer who reads the whole stack?</h2>
          <a className="mail" href={`mailto:${person.email}`}>{person.email}<svg width="44" height="44" viewBox="0 0 28 28" aria-hidden="true"><path d="M6 22 L22 6 M10 6 H22 V18" fill="none" stroke="currentColor" strokeWidth="2.4" /></svg></a>
          <ul className="socials">
            <li><a href={person.resume}>Resume</a></li>
            <li><a href={person.github}>GitHub</a></li>
            <li><a href={person.linkedin}>LinkedIn</a></li>
            <li><a href={person.leetcode}>LeetCode</a></li>
          </ul>
          <p className="foot">Drawn and built by Ayush Pandey in Mumbai. Every sheet links to its source.</p>
        </section>
      </main>

      <div className="cbar">
        <a href={`mailto:${person.email}`} className="cb-a">Email me</a>
        <a href={person.resume} className="cb-b">Resume</a>
      </div>
    </div>
  );
}
