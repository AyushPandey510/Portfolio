import { renderToString } from "react-dom/server";
import App from "./App";
import { SITE_URL, faqs, layers, person, projects, timeline } from "./data/profile";

export const render = () => renderToString(<App />);

// Structured data so Google, Bing and AI assistants understand who this page is about.
export const jsonLd = () => {
  const personId = `${SITE_URL}/#person`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: person.name,
        jobTitle: "Frontend Developer",
        worksFor: { "@type": "Organization", name: "Q2Pay Technologies Pvt. Ltd." },
        description: person.headline,
        url: SITE_URL,
        image: `${SITE_URL}/og.png`,
        email: `mailto:${person.email}`,
        address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
        sameAs: [person.github, person.linkedin],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Thakur Ramnarayan College of Arts and Commerce",
        },
        hasOccupation: {
          "@type": "Occupation",
          name: "Software Engineer",
          skills: layers.flatMap((l) => l.tools).join(", "),
        },
        knowsAbout: [
          ...layers.map((l) => l.name),
          "Retrieval-augmented generation",
          "Vector search",
          "Rust",
          "Go",
          "Python",
          "React",
          "Flutter",
          "System design",
        ],
        award: [
          "Winner, Solo Hackathon — Aptech Learning (2024)",
          "Winner, Inter-College Debugging Competition",
          "Winner, Inter-College Algorithm Writing Competition",
        ],
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#page`,
        url: SITE_URL,
        name: `${person.name} — Software Engineer (Full-stack, Backend, AI/ML, Mobile)`,
        mainEntity: { "@id": personId },
        dateModified: new Date().toISOString().slice(0, 10),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#site`,
        url: SITE_URL,
        name: `${person.name} — Portfolio`,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ScholarlyArticle",
        headline: "Leveraging Rust for Modern E-Commerce Security",
        datePublished: "2025",
        author: { "@id": personId },
      },
      {
        "@type": "ItemList",
        name: "Projects by Ayush Pandey",
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "SoftwareSourceCode",
            name: p.name,
            description: `${p.tagline} ${p.description}`,
            codeRepository: p.repo,
            ...(p.live ? { url: p.live } : {}),
            programmingLanguage: p.flow.join(", "),
            author: { "@id": personId },
          },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
};

// Plain-text summary for LLM crawlers (https://llmstxt.org).
export const llmsTxt = () =>
  [
    `# ${person.name}`,
    "",
    `> ${person.role} in ${person.location}. ${person.headline} ${person.openTo}.`,
    "",
    `- Website: ${SITE_URL}`,
    `- Email: ${person.email}`,
    `- GitHub: ${person.github}`,
    `- LinkedIn: ${person.linkedin}`,
    "",
    "## Skills",
    ...layers.map((l) => `- **${l.name}**: ${l.detail} Tools: ${l.tools.join(", ")}.`),
    "",
    "## Projects",
    ...projects.map(
      (p) =>
        `- [${p.name}](${p.live ?? p.repo}): ${p.tagline} ${p.description} Stack: ${p.flow.join(" -> ")}.`,
    ),
    "",
    "## Experience and education",
    ...timeline.map((t) => `- ${t.when}: ${t.title}, ${t.org}. ${t.body}`),
    "",
    "## FAQ",
    ...faqs.map((f) => `- ${f.q} ${f.a}`),
    "",
  ].join("\n");
