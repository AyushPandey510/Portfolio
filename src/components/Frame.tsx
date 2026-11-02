import { useEffect, useRef } from "react";

// Drawing-sheet frame: grid references along the edges and, on desktop with a
// mouse, a crosshair that reads out the sheet coordinate under the cursor.
const COLS = "ABCDEFGH".split("");
const ROWS = ["1", "2", "3", "4", "5", "6"];

export default function Frame() {
  const h = useRef<HTMLDivElement>(null);
  const v = useRef<HTMLDivElement>(null);
  const tag = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (min-width: 960px)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || still) return;
    let raf = 0;
    let px = 0, py = 0;
    const draw = () => {
      raf = 0;
      const col = COLS[Math.min(COLS.length - 1, Math.floor((px / window.innerWidth) * COLS.length))];
      const row = ROWS[Math.min(ROWS.length - 1, Math.floor((py / window.innerHeight) * ROWS.length))];
      if (h.current) h.current.style.transform = `translateY(${py}px)`;
      if (v.current) v.current.style.transform = `translateX(${px}px)`;
      if (tag.current) {
        tag.current.style.transform = `translate(${px + 14}px, ${py + 14}px)`;
        tag.current.textContent = `${col}${row}  ${Math.round(px)}, ${Math.round(py + window.scrollY)}`;
      }
    };
    const move = (e: PointerEvent) => {
      px = e.clientX; py = e.clientY;
      document.documentElement.classList.add("xhair-on");
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const leave = () => document.documentElement.classList.remove("xhair-on");
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
      leave();
    };
  }, []);

  return (
    <div className="frame" aria-hidden="true">
      <div className="ruler top">{COLS.map((c) => <span key={c}>{c}</span>)}</div>
      <div className="ruler left">{ROWS.map((r) => <span key={r}>{r}</span>)}</div>
      <div className="xh h" ref={h} />
      <div className="xh v" ref={v} />
      <div className="xh-tag" ref={tag} />
    </div>
  );
}
