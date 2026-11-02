// Measured on a 2 vCPU box with the Rust wsbench client; raw output in the
// Space case study. 20 messages/s into one room, N subscribers.
const runs = [
  { n: 100, p50: 3.59, p99: 6.59 },
  { n: 1000, p50: 9.59, p99: 19.57 },
  { n: 2000, p50: 14.16, p99: 25.28 },
  { n: 4000, p50: 23.82, p99: 50.66 },
  { n: 8000, p50: 105.41, p99: 195.58 },
];

const W = 640, H = 340, L = 52, R = 24, T = 24, B = 48;
const x = (n: number) => L + ((W - L - R) * runs.findIndex((r) => r.n === n)) / (runs.length - 1);
const y = (ms: number) => T + (H - T - B) * (1 - ms / 200);
const line = (k: "p50" | "p99") => runs.map((r, i) => `${i ? "L" : "M"}${x(r.n).toFixed(1)} ${y(r[k]).toFixed(1)}`).join(" ");

export default function LatencyChart() {
  return (
    <figure className="lc" data-inview>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="lc-t">
        <title id="lc-t">
          Message delivery latency by room size. p99: 6.6 ms at 100 people, 19.6 ms at 1,000, 25.3 ms at 2,000, 50.7 ms at 4,000, 195.6 ms at 8,000.
          Every message was delivered in every run.
        </title>
        {[0, 50, 100, 150, 200].map((ms) => (
          <g key={ms} className="lc-grid">
            <line x1={L} x2={W - R} y1={y(ms)} y2={y(ms)} />
            <text x={L - 10} y={y(ms) + 5} textAnchor="end">{ms}</text>
          </g>
        ))}
        <text className="lc-unit" x={L - 10} y={T - 8} textAnchor="end">ms</text>
        {runs.map((r) => (
          <text key={r.n} className="lc-x" x={x(r.n)} y={H - B + 26} textAnchor="middle">{r.n.toLocaleString("en-IN")}</text>
        ))}
        <text className="lc-unit" x={W - R} y={H - 4} textAnchor="end">people in one room</text>
        <rect className="lc-ok" x={x(100) - 10} y={T} width={x(4000) - x(100) + 20} height={H - T - B} />
        <path className="lc-line p50" d={line("p50")} />
        <path className="lc-line p99" d={line("p99")} pathLength={1} />
        {runs.map((r, i) => (
          <circle key={r.n} className="lc-dot" cx={x(r.n)} cy={y(r.p99)} r="5" style={{ ["--i" as string]: i }} />
        ))}
        <circle className="lc-live" r="5" style={{ offsetPath: `path("${line("p99")}")` }} />
        <g className="lc-pen">
          <circle cx={x(4000)} cy={y(50.66)} r="16" />
          <text x={x(4000) - 22} y={y(50.66) - 26} textAnchor="end">51 ms, 79,860 deliveries/s</text>
          <text x={x(8000) - 14} y={y(195.58) + 6} textAnchor="end">2 vCPUs run out here</text>
        </g>
      </svg>
      <figcaption>
        <span><i className="k p99" /> p99</span>
        <span><i className="k p50" /> median</span>
        <span>Every one of 3.02 million deliveries arrived.</span>
      </figcaption>
    </figure>
  );
}
