import { useEffect } from "react";
import Index from "./pages/Index";

const App = () => {
  // Smooth, inertia-based scrolling on desktop. Skipped for touch and reduced-motion users.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    let stop = () => {};
    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -72 } });
      let id = 0;
      const raf = (t: number) => {
        lenis.raf(t);
        id = requestAnimationFrame(raf);
      };
      id = requestAnimationFrame(raf);
      stop = () => {
        cancelAnimationFrame(id);
        lenis.destroy();
      };
    });
    return () => stop();
  }, []);

  return <Index />;
};

export default App;
