// The nine case studies: what search engines, the home page and llms.txt
// need to know about each one. The article bodies (HTML + scoped CSS) live
// next to this file and are loaded per page, see ./load.ts.

export interface CaseStudy {
  slug: string;
  no: string;
  name: string;
  summary: string;
  stack: string[];
  repo: string;
  live?: string;
}

export interface CaseContent {
  slug: string;
  html: string;
  css: string;
}

export const cases: CaseStudy[] = [
  {
    slug: "space",
    no: "S-01",
    name: "Space",
    summary: "Anonymous chat rooms you can only enter while you are physically inside them. Rust geofence engine, load-tested to 4,000 people in one room with 99% of messages delivered within 51 ms.",
    stack: ["Rust", "Axum", "WebSockets", "PostgreSQL", "Flutter"],
    repo: "https://github.com/AyushPandey510/anonymous",
  },
  {
    slug: "swiftshare",
    no: "S-02",
    name: "SwiftShare",
    summary: "Send a file, share a 6-character code. Streams 200 MB files on 15 MB of server memory; 61,220 code lookups a second.",
    stack: ["Rust", "Warp", "React", "Flutter", "Electron"],
    repo: "https://github.com/AyushPandey510/SwiftShare",
    live: "https://swift-share-tau.vercel.app",
  },
  {
    slug: "life-engine",
    no: "S-03",
    name: "Life Engine AI",
    summary: "An AI you talk to as your future self, grounded in your goals, habits and documents.",
    stack: ["FastAPI", "React", "Groq", "OpenAI embeddings", "FAISS", "PostgreSQL"],
    repo: "https://github.com/AyushPandey510/LifeEngine",
  },
  {
    slug: "counter-drop",
    no: "S-04",
    name: "Counter Drop",
    summary: "A print-shop queue on AWS Lambda and single-table DynamoDB, with live updates over DynamoDB Streams.",
    stack: ["Go", "AWS Lambda", "DynamoDB", "CDK", "React PWA"],
    repo: "https://github.com/AyushPandey510/counter-drop",
    live: "https://counterdrop.cloudsuggest.in",
  },
  {
    slug: "phisguard",
    no: "S-05",
    name: "PhisGuard",
    summary: "A browser extension that scores phishing risk from 0 to 100 the moment a page loads.",
    stack: ["Flask", "Chrome MV3", "scikit-learn", "Google Safe Browsing", "VirusTotal"],
    repo: "https://github.com/AyushPandey510/Phis_Shield",
  },
  {
    slug: "xpensecalc",
    no: "S-06",
    name: "XpenseCalc",
    summary: "Spending insights parsed from bank SMS, entirely on the phone. No bank login.",
    stack: ["Flutter", "Kotlin", "sqflite"],
    repo: "https://github.com/AyushPandey510/expense_calc",
  },
  {
    slug: "rustcart",
    no: "S-07",
    name: "RustCart API",
    summary: "An e-commerce and payments backend in Rust, and the system behind my research paper on Rust for e-commerce security.",
    stack: ["Rust", "Actix Web", "PostgreSQL", "SQLx"],
    repo: "https://github.com/AyushPandey510/Rust-Ecom-Api",
  },
  {
    slug: "changeshare",
    no: "S-08",
    name: "ChangeShare",
    summary: "Share uncommitted Git changes over the local network, protected by a spoken code (CPace PAKE, AES-256-GCM).",
    stack: ["TypeScript", "Node.js", "Git", "CPace"],
    repo: "https://github.com/AyushPandey510/changeshare",
  },
  {
    slug: "pdf-qa-rag",
    no: "S-09",
    name: "PDF-QA RAG",
    summary: "Answers from a PDF and nothing else, running fully offline with FAISS, MiniLM and Llama 3.",
    stack: ["Python", "FAISS", "sentence-transformers", "Ollama", "Llama 3"],
    repo: "https://github.com/AyushPandey510/PDF-QA-RAG-OLLAMA-llama3",
  },
];

export const caseBySlug = (slug: string) => cases.find((c) => c.slug === slug);
