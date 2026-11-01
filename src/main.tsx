import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "@fontsource-variable/bricolage-grotesque/standard.css";
import "@fontsource/jetbrains-mono/latin-500.css";
import "./index.css";

const root = document.getElementById("root")!;

// The production build pre-renders the page to static HTML (see scripts/prerender.mjs),
// so search engines and AI crawlers read full content without running JavaScript.
if (root.hasChildNodes()) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
