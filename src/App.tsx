import { useEffect, useRef } from "react";
import { initProgress } from "./lib/motion";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CaseStudyPage from "./pages/CaseStudyPage";
import NotFoundPage from "./pages/NotFoundPage";
import { cases } from "./content/cases";
import { metaFor } from "./seo";

// Keeps scroll position and the document title right on client-side navigation.
function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title = metaFor(pathname).title;
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function Progress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => (ref.current ? initProgress(ref.current) : undefined), []);
  return <div className="progress" ref={ref} aria-hidden="true" />;
}

const App = () => (
  <>
    <Progress />
    <RouteEffects />
    <Routes>
      <Route path="/" element={<HomePage />} />
      {cases.map((c) => (
        <Route key={c.slug} path={`/work/${c.slug}`} element={<CaseStudyPage key={c.slug} study={c} />} />
      ))}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </>
);

export default App;
