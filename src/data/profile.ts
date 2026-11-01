// Single source of truth for every word on the site.
// Edit here; components, JSON-LD and llms.txt all read from this file.

export const SITE_URL = "https://portfolio-ayushpandey.vercel.app";

export const person = {
  name: "Ayush Pandey",
  role: "Software Engineer",
  currentRole: "Frontend Developer at Q2Pay",
  headline:
    "I build the whole system: the app people tap, the API behind it, the data it keeps and the AI that makes it smarter.",
  location: "Mumbai, India",
  email: "ayushgauravpandey@gmail.com",
  phone: "+91-7007257841",
  github: "https://github.com/AyushPandey510",
  githubHandle: "AyushPandey510",
  linkedin: "https://www.linkedin.com/in/ayush-pandey-097027242",
  linkedinHandle: "ayush-pandey-097027242",
  openTo: "Frontend Developer at Q2Pay, Mumbai",
};

export type LayerId = "ai" | "backend" | "web" | "mobile" | "data" | "ship";

export interface Layer {
  id: LayerId;
  name: string;
  short: string;
  summary: string;
  detail: string;
  tools: string[];
  proof: string[]; // project slugs
}

export const layers: Layer[] = [
  {
    id: "ai",
    name: "AI & machine learning",
    short: "AI / ML",
    summary: "RAG systems, vector search and models that ship inside real products.",
    detail:
      "I build retrieval-augmented apps with FAISS memory, wire LLMs (Groq, OpenAI, Gemini) into FastAPI backends, and train classical models on large, messy datasets. At Imarticus Learning I ran EDA and feature engineering on 500K+ records and improved prediction accuracy by 22%.",
    tools: [
      "Python",
      "LLM APIs (OpenAI, Groq, Gemini)",
      "RAG",
      "FAISS",
      "scikit-learn",
      "PyTorch",
      "TensorFlow",
      "XGBoost",
      "Ollama + Llama 3",
      "Pandas",
    ],
    proof: ["lifeengine-ai", "pdf-qa-rag", "phisguard"],
  },
  {
    id: "backend",
    name: "Backend & APIs",
    short: "Backend",
    summary: "Fast, memory-safe services in Rust and Python, with Go where it fits.",
    detail:
      "Async Rust services on tokio with Axum, Actix Web and warp; Python services in FastAPI, Django and Flask with Celery workers and Alembic migrations. Real-time WebSockets, JWT and role-based access, Razorpay payment webhooks, and an OpenAPI contract for every API. Go when a service should be small and boring.",
    tools: [
      "Rust",
      "Axum",
      "Actix Web",
      "warp",
      "tokio",
      "FastAPI",
      "Django",
      "Flask",
      "Celery",
      "SQLAlchemy",
      "Go",
      "WebSockets",
      "REST",
      "JWT / RBAC",
      "OpenAPI",
    ],
    proof: ["swiftshare", "space", "counter-drop", "rustcart-api"],
  },
  {
    id: "web",
    name: "Frontend & web",
    short: "Web",
    summary: "Production UI at Q2Pay, plus PWAs, desktop apps and extensions.",
    detail:
      "This is my day job: as a Frontend Developer at Q2Pay I own and ship production features for the Xpentra platform, maintain its shared UI components, and fix performance and cross-browser issues. On my own projects it is React and TypeScript on Vite with Tailwind and shadcn/ui, plus PWAs, an Electron client, a Chrome MV3 extension and a VS Code extension.",
    tools: [
      "React",
      "TypeScript",
      "JavaScript",
      "Vite",
      "Tailwind CSS",
      "shadcn/ui",
      "TanStack Query",
      "PWA",
      "Electron",
      "Chrome extensions",
    ],
    proof: ["swiftshare", "lifeengine-ai", "counter-drop", "phisguard"],
  },
  {
    id: "mobile",
    name: "Mobile apps",
    short: "Mobile",
    summary: "Cross-platform Flutter apps with maps, QR and offline data.",
    detail:
      "One Flutter codebase for Android, iOS, web and desktop. I have built geofenced chat on live maps, QR scan-to-download flows, and an offline-first expense tracker that reads bank SMS into spending insights.",
    tools: ["Flutter", "Dart", "Material 3", "flutter_map", "Geolocator", "sqflite", "QR scanning"],
    proof: ["space", "swiftshare", "xpensecalc"],
  },
  {
    id: "data",
    name: "Data & storage",
    short: "Data",
    summary: "Schemas, queries and pipelines that stay fast as data grows.",
    detail:
      "Relational design in PostgreSQL and SQLite with compile-time checked queries through SQLx and migrations through Alembic, Redis for caching and rate limiting, DynamoDB for key-value access, and preprocessing pipelines that clean data before a model ever sees it.",
    tools: ["PostgreSQL", "SQLite", "MySQL", "MongoDB", "Redis", "DynamoDB", "SQLx", "SQLAlchemy", "Alembic", "ETL pipelines"],
    proof: ["space", "rustcart-api", "lifeengine-ai", "indiamart-pipeline"],
  },
  {
    id: "ship",
    name: "Cloud, DevOps & security",
    short: "Ship",
    summary: "Containers, CI and the security work that keeps it all honest.",
    detail:
      "Everything I build runs in Docker and deploys through GitHub Actions (clippy, fmt, tests, Trivy scans, health checks) to Render, Vercel or AWS. Security is built in: AES-GCM encryption, hashed device IDs, GPS spoof detection, secret scanning before a patch leaves a laptop, phishing detection, and a published paper on Rust for e-commerce security.",
    tools: ["Docker", "Docker Compose", "nginx + TLS", "GitHub Actions", "CI/CD", "Trivy", "AWS", "Render", "Vercel", "Linux", "Git", "Swagger / OpenAPI"],
    proof: ["changeshare", "swiftshare", "space", "phisguard"],
  },
];

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  layers: LayerId[];
  flow: string[]; // how data moves, left to right
  highlights: string[];
  repo: string;
  live?: string;
  featured?: boolean;
}

const gh = (q: string) => `${person.github}?tab=repositories&q=${encodeURIComponent(q)}`;

export const projects: Project[] = [
  {
    slug: "swiftshare",
    name: "SwiftShare",
    tagline: "Send a file. Share a code. No account needed.",
    description:
      "A live file-sharing product across web, Android and desktop. Upload a file, get a 6-character code, a link and a QR code; the file expires after 24 hours or a download limit you choose.",
    layers: ["backend", "web", "mobile", "ship"],
    flow: ["React / Flutter", "Rust + Warp", "SQLite", "Render"],
    highlights: [
      "Streaming uploads and an expiry sweeper",
      "CI: clippy, fmt, tests, Trivy, Docker health check",
      "Automated releases for the Android app",
    ],
    repo: `${person.github}/SwiftShare`,
    live: "https://swift-share-tau.vercel.app",
    featured: true,
  },
  {
    slug: "space",
    name: "Space",
    tagline: "Anonymous chat rooms you can only enter while you are physically there.",
    description:
      "A location-gated chat platform: a Space is a geofence, and the Rust server validates your position before you can read or post. Real-time messages, replies, reactions, polls and async moderation.",
    layers: ["backend", "mobile", "data", "ship"],
    flow: ["Flutter", "Rust + Axum", "WebSockets", "PostgreSQL"],
    highlights: [
      "21 REST and WebSocket routes",
      "Geofence engine: Haversine, smoothing, hysteresis, spoof detection",
      "~40 unit and widget tests, Docker + nginx + TLS",
    ],
    repo: `${person.github}/anonymous`,
    featured: true,
  },
  {
    slug: "lifeengine-ai",
    name: "Life Engine AI",
    tagline: "An AI that helps you make better life decisions, and remembers why.",
    description:
      "An AI decision-support platform on Groq (Llama 3.1) with FAISS-based RAG memory and document parsing, a React/TypeScript frontend and a FastAPI backend, deployed to production.",
    layers: ["ai", "backend", "web", "data"],
    flow: ["React + TS", "FastAPI", "FAISS RAG", "Groq Llama 3.1"],
    highlights: [
      "JWT auth, Redis caching and rate limiting",
      "Celery workers and Alembic migrations",
      "Live on Vercel and Render with GDPR-style data export",
    ],
    repo: `${person.github}/LifeEngine`,
    featured: true,
  },
  {
    slug: "counter-drop",
    name: "Counter Drop",
    tagline: "Print-shop queue that replaces “send it on WhatsApp”.",
    description:
      "Customers scan a shop QR, upload from their phone, see price and wait time, and get a token. Staff run a live queue board; files are deleted ten minutes after pickup.",
    layers: ["backend", "web", "data", "ship"],
    flow: ["React PWA", "Go API", "DynamoDB", "Cloudflare R2"],
    highlights: [
      "OpenAPI-first contract",
      "English, Hindi and Marathi screens",
      "Automatic deletion with receipts",
    ],
    repo: `${person.github}/counter-drop`,
  },
  {
    slug: "pdf-qa-rag",
    name: "PDF-QA RAG",
    tagline: "Ask a document a question and get an answer only from that document.",
    description:
      "Retrieval-augmented question answering that runs locally: chunks a PDF, embeds it, retrieves the right passages and refuses to answer from outside the source.",
    layers: ["ai"],
    flow: ["PDF", "MiniLM embeddings", "FAISS", "Llama 3 (Ollama)"],
    highlights: ["Fully local, no data leaves the machine", "Grounded answers only"],
    repo: gh("PDF"),
  },
  {
    slug: "changeshare",
    name: "ChangeShare",
    tagline: "Hand uncommitted Git changes to a teammate over the LAN.",
    description:
      "A CLI and VS Code extension that sends your working tree, a stash or a commit to another Linux machine on the same network — no temp branch, no push, no cloud.",
    layers: ["ship", "web"],
    flow: ["git diff", "Encrypt + compress", "LAN discovery", "Review & apply"],
    highlights: [
      "Blocks .env, keys and likely secrets",
      "Dry-run, three-way apply and undo",
      "Built-in doctor command",
    ],
    repo: `${person.github}/changeshare`,
  },
  {
    slug: "xpensecalc",
    name: "XpenseCalc",
    tagline: "Spending insights straight from your bank SMS.",
    description:
      "An offline Flutter app that parses transaction SMS into categories and trends, so you see where money goes without linking a bank account.",
    layers: ["mobile", "data"],
    flow: ["Bank SMS", "Flutter parser", "sqflite", "Insights"],
    highlights: ["No bank login required", "Works fully offline"],
    repo: gh("XpenseCalc"),
  },
  {
    slug: "phisguard",
    name: "PhisGuard",
    tagline: "Scores any URL from 0 to 100 for phishing risk, in real time.",
    description:
      "A Flask API and a Manifest V3 Chrome extension that combine heuristics with Google Safe Browsing, VirusTotal and PhishTank, plus SSL validation and redirect expansion.",
    layers: ["ship", "ai", "web"],
    flow: ["Chrome MV3", "Flask API", "Threat intel APIs", "Risk score"],
    highlights: ["Four signal sources in one score", "SSL checks and redirect expansion", "Dockerised"],
    repo: gh("Phis"),
  },
  {
    slug: "rustcart-api",
    name: "RustCart API",
    tagline: "An e-commerce and payments backend in Rust.",
    description:
      "Actix Web backend with JWT auth, role-based access, and transactional order and stock management, with Razorpay payments wired in through webhooks. It is also the system behind my research paper.",
    layers: ["backend", "data", "ship"],
    flow: ["REST clients", "Actix Web", "PostgreSQL", "Razorpay"],
    highlights: [
      "Transactional orders and stock",
      "Rate limiting, JSON logging, OpenAPI docs",
      "Dockerised",
    ],
    repo: `${person.github}/Rust-Ecom-Api`,
  },
  {
    slug: "indiamart-pipeline",
    name: "IndiaMART data pipeline",
    tagline: "A data-engineering pipeline over marketplace listings.",
    description:
      "Ingests, cleans and structures IndiaMART marketplace data so it is ready for analysis and modelling.",
    layers: ["data", "ai"],
    flow: ["Raw listings", "Clean + transform", "Structured store"],
    highlights: ["Repeatable ETL", "Analysis-ready output"],
    repo: gh("indiamart"),
  },
  {
    slug: "zettabyte",
    name: "Zettabyte",
    tagline: "Event manager with QR check-in for the college tech fest I led.",
    description:
      "Registration and QR-based check-in for Zettabyte, the technical event I headed as organiser.",
    layers: ["web", "backend"],
    flow: ["Registration", "QR pass", "Check-in desk"],
    highlights: ["Used at a live event", "Built for volunteers, not engineers"],
    repo: gh("Zettabyte"),
  },
  {
    slug: "skill-navigator-hub",
    name: "Skill Navigator Hub",
    tagline: "A web app for mapping and navigating skills.",
    description: "A TypeScript + React app with a serverless API layer, deployed on Vercel.",
    layers: ["web"],
    flow: ["React + Vite", "API routes", "Vercel"],
    highlights: ["Typed end to end", "Deployed and live"],
    repo: `${person.github}/skill-navigator-hub`,
    live: "https://skill-navigator-hub.vercel.app",
  },
];

export const process = [
  {
    title: "Shape the problem",
    body: "Talk to the person who has it. Write down what “done” looks like before any code exists.",
  },
  {
    title: "Draw the contract",
    body: "Schemas and an OpenAPI spec first, so the app, the API and the tests agree from day one.",
  },
  {
    title: "Build the core",
    body: "A small, typed, testable service in Rust, Go or Python, with the data model doing the heavy lifting.",
  },
  {
    title: "Put it in hands",
    body: "A web, mobile or desktop client that feels quick, works offline where it should, and speaks the user's language.",
  },
  {
    title: "Ship and watch",
    body: "Docker, CI with security scans, a real deployment, and a cleanup job for whatever should not live forever.",
  },
];

export const timeline = [
  {
    when: "2023",
    title: "B.Sc. Computer Science",
    org: "Thakur Ramnarayan College of Arts and Commerce, Mumbai",
    body: "2023 to 2026, CGPA 9.10/10. Coursework in machine learning, data structures, algorithms, databases, operating systems and computer networks.",
    layer: "data" as LayerId,
  },
  {
    when: "2024",
    title: "Three competition wins",
    org: "Solo Hackathon at Aptech Learning, plus two inter-college titles",
    body: "Won the Aptech Learning solo hackathon (2024) and the inter-college debugging and algorithm-writing competitions.",
    layer: "ai" as LayerId,
  },
  {
    when: "2024",
    title: "Head organiser, Zettabyte",
    org: "College technical event",
    body: "Planned and ran the coding events and led the volunteer teams.",
    layer: "mobile" as LayerId,
  },
  {
    when: "2025",
    title: "Research paper published",
    org: "Leveraging Rust for Modern E-Commerce Security",
    body: "Studied ownership, memory safety and async concurrency in backend systems, measured on a real e-commerce API.",
    layer: "backend" as LayerId,
  },
  {
    when: "Aug 2025",
    title: "Data Science Intern",
    org: "Imarticus Learning, Mumbai (Aug to Nov 2025)",
    body: "EDA and feature engineering on 500K+ records, Scikit-learn and TensorFlow models with a 22% accuracy gain, and automated preprocessing pipelines that cut manual effort by about 30%.",
    layer: "ai" as LayerId,
  },
  {
    when: "Jun 2026",
    title: "Frontend Developer",
    org: "Q2Pay Technologies, Mumbai (intern from June, full-time since September 2026)",
    body: "Own and ship production features for the Xpentra platform from requirements to release, extend the shared UI component library, and fix production bugs, performance and cross-browser issues.",
    layer: "web" as LayerId,
  },
];

export const facts = [
  { value: "9.10", label: "CGPA in B.Sc. Computer Science" },
  { value: "20+", label: "public repositories on GitHub" },
  { value: "3", label: "competition wins" },
  { value: "1", label: "published research paper" },
];

export const faqs = [
  {
    q: "Where does Ayush Pandey work now?",
    a: "He is a Frontend Developer at Q2Pay Technologies in Mumbai, shipping production features for the Xpentra platform. Outside work he builds full-stack, backend and AI projects in Rust, Python, React and Flutter.",
  },
  {
    q: "Which languages does he work in?",
    a: "Python, Rust, TypeScript/JavaScript, Dart (Flutter) and SQL, with Go on smaller services.",
  },
  {
    q: "Has he built AI products, not just notebooks?",
    a: "Yes. Life Engine AI is a production decision-support platform with FAISS-based RAG memory on Groq's Llama 3.1, PDF-QA RAG answers strictly from a document, and at Imarticus Learning he improved model accuracy by 22%.",
  },
  {
    q: "Can he build mobile apps?",
    a: "Yes, in Flutter. Space (geofenced chat), SwiftShare (QR file sharing) and XpenseCalc (SMS expense insights) all have Flutter clients.",
  },
  {
    q: "How do I contact him?",
    a: `Email ${person.email} or message him on LinkedIn.`,
  },
];
