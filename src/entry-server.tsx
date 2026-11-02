import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { allCaseContent } from "./content/all.server";
import { CaseContentContext } from "./content/context";
import { cases, caseBySlug } from "./content/cases";
import { SITE_URL, home, person } from "./content/site";
import { metaFor } from "./seo";

export const routes = ["/", ...cases.map((c) => `/work/${c.slug}`)];

export const render = (url: string) =>
  renderToString(
    <CaseContentContext.Provider value={allCaseContent}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </CaseContentContext.Provider>,
  );

export const meta = metaFor;

const personId = `${SITE_URL}/#person`;
const personNode = {
  "@type": "Person",
  "@id": personId,
  name: person.name,
  jobTitle: "Frontend Developer",
  worksFor: { "@type": "Organization", name: "Q2Pay Technologies Pvt. Ltd." },
  description: home.description,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/og.png`,
  email: `mailto:${person.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
  sameAs: [person.github, person.linkedin, person.leetcode],
  alumniOf: { "@type": "CollegeOrUniversity", name: "Thakur Ramnarayan College of Arts and Commerce" },
  knowsAbout: ["Rust", "Go", "Python", "TypeScript", "React", "Flutter", "PostgreSQL", "DynamoDB", "AWS Lambda", "WebSockets", "Retrieval-augmented generation", "System design", "Load testing"],
  award: [
    "Winner, Solo Hackathon, Aptech Learning (2024)",
    "Winner, Inter-College Debugging Competition",
    "Winner, Inter-College Algorithm Writing Competition",
  ],
};

// Structured data per route, so search engines and AI assistants know who
// the site is about and what each case study covers.
export const jsonLd = (url: string) => {
  const m = url.match(/^\/work\/([^/]+)$/);
  const study = m ? caseBySlug(m[1]) : undefined;
  if (study) {
    const pageUrl = `${SITE_URL}/work/${study.slug}`;
    return {
      "@context": "https://schema.org",
      "@graph": [
        personNode,
        {
          "@type": "TechArticle",
          "@id": `${pageUrl}#article`,
          headline: `${study.name}: architecture and how I built it`,
          description: study.summary,
          url: pageUrl,
          author: { "@id": personId },
          image: `${SITE_URL}/og/${study.slug}.png`,
          proficiencyLevel: "Expert",
          about: { "@type": "SoftwareSourceCode", name: study.name, codeRepository: study.repo, programmingLanguage: study.stack.join(", "), ...(study.live ? { url: study.live } : {}) },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Ayush Pandey", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: study.name, item: pageUrl },
          ],
        },
      ],
    };
  }
  return {
    "@context": "https://schema.org",
    "@graph": [
      personNode,
      { "@type": "ProfilePage", "@id": `${SITE_URL}/#page`, url: `${SITE_URL}/`, name: home.title, mainEntity: { "@id": personId } },
      { "@type": "WebSite", "@id": `${SITE_URL}/#site`, url: `${SITE_URL}/`, name: "Ayush Pandey", inLanguage: "en", publisher: { "@id": personId } },
      { "@type": "ScholarlyArticle", headline: "Leveraging Rust for Modern E-Commerce Security", datePublished: "2025", author: { "@id": personId } },
      {
        "@type": "ItemList",
        name: "Case studies by Ayush Pandey",
        itemListElement: cases.map((c, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}/work/${c.slug}`, name: c.name })),
      },
    ],
  };
};

// Plain-text summary for LLM crawlers (https://llmstxt.org).
export const llmsTxt = () =>
  [
    `# ${person.name}`,
    "",
    `> Software engineer in Mumbai, ${person.role}. Builds complete systems: Rust and Go backends, React and Flutter apps, RAG and LLM features, serverless on AWS. Open to SDE roles.`,
    "",
    `- Website: ${SITE_URL}/`,
    `- Email: ${person.email}`,
    `- GitHub: ${person.github}`,
    `- LinkedIn: ${person.linkedin}`,
    `- LeetCode: ${person.leetcode} (111 solved: 66 easy, 37 medium, 8 hard)`,
    "",
    "## Case studies",
    ...cases.map((c) => `- [${c.no} ${c.name}](${SITE_URL}/work/${c.slug}): ${c.summary} Stack: ${c.stack.join(", ")}. Code: ${c.repo}${c.live ? `. Live: ${c.live}` : ""}`),
    "",
    "## Experience and education",
    "- Jun 2026 to now: Frontend Developer, Q2Pay Technologies (intern from June, full-time since September).",
    "- Aug 2025: Data Science Intern, Imarticus Learning. EDA on 500K+ records, models 22% more accurate.",
    "- 2025: Published \"Leveraging Rust for Modern E-Commerce Security\".",
    "- 2024: Won the Aptech Learning solo hackathon, an inter-college debugging and an inter-college algorithm writing competition. Head organiser of the Zettabyte tech fest.",
    "- 2023 to 2026: B.Sc. Computer Science, Thakur Ramnarayan College, Mumbai. CGPA 9.10.",
    "",
  ].join("\n");
