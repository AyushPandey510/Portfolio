import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "@fontsource/jetbrains-mono/latin-500.css";
import "./index.css";
import "./styles/motion.css";

const root = document.getElementById("root")!;
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// Production pages are prerendered per route (scripts/prerender.mjs), so
// crawlers and AI assistants read full content without running JavaScript.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
