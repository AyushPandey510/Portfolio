// The Space architecture, drawn as a blueprint that inks itself in on load.
// Every number on it is measured (see /work/space).
const wires = [
  { id: "w1", d: "M142 210 H206" },
  { id: "w2", d: "M290 150 V200" },
  { id: "w3", d: "M376 245 H404 V292 H436" },
  { id: "w4", d: "M376 105 H430" },
  { id: "w5", d: "M526 60 V30 H80 V128" },
];

export default function HeroDrawing() {
  return (
    <svg className="hd" viewBox="0 0 640 420" role="img" aria-labelledby="hd-t hd-d">
      <title id="hd-t">Space system architecture</title>
      <desc id="hd-d">
        A Flutter app sends GPS fixes to an Axum API. A Rust geofence engine decides whether the user is inside the room,
        sessions and messages live in PostgreSQL, and a WebSocket fan-out pushes messages back to every phone in the room.
      </desc>
      <defs>
        <marker id="hd-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#0F1B3D" />
        </marker>
      </defs>

      <g className="hd-grid" aria-hidden="true">
        <text x="0" y="414">A</text><text x="160" y="414">B</text><text x="320" y="414">C</text><text x="480" y="414">D</text>
      </g>

      {/* phone */}
      <g className="hd-node" style={{ ["--i" as string]: 0 }}>
        <rect x="18" y="128" width="124" height="190" rx="18" className="ink c-mob-f" />
        <rect x="58" y="140" width="44" height="6" rx="3" fill="#0F1B3D" />
        <text x="80" y="214" textAnchor="middle" className="t1">Flutter</text>
        <text x="80" y="236" textAnchor="middle" className="t2">GPS fix every 5 s</text>
        <circle cx="80" cy="276" r="13" className="ink" fill="#FFFFFF" />
        <circle cx="80" cy="276" r="4" fill="#D7361F" />
      </g>

      {/* API */}
      <g className="hd-node" style={{ ["--i" as string]: 1 }}>
        <rect x="206" y="62" width="170" height="88" className="ink c-be-f" />
        <text x="222" y="98" className="t1">Axum API</text>
        <text x="222" y="122" className="t2">19 endpoints, JWT</text>
      </g>

      {/* engine: the hard part */}
      <g className="hd-node" style={{ ["--i" as string]: 2 }}>
        <rect x="206" y="200" width="170" height="90" className="ink" fill="#FFFFFF" />
        <text x="218" y="236" className="t1" style={{ fontSize: 18 }}>Geofence engine</text>
        <text x="222" y="260" className="t2">201 ns per check</text>
      </g>

      {/* fan-out */}
      <g className="hd-node" style={{ ["--i" as string]: 3 }}>
        <rect x="430" y="62" width="200" height="88" className="ink c-web-f" />
        <text x="444" y="98" className="t1">WebSocket fan-out</text>
        <text x="444" y="122" className="t2">79,860 deliveries / s</text>
      </g>

      {/* database */}
      <g className="hd-node" style={{ ["--i" as string]: 4 }}>
        <path d="M436 262 v64 a93 14 0 0 0 186 0 v-64" className="ink c-data-f" />
        <ellipse cx="529" cy="262" rx="93" ry="14" className="ink c-data-f" />
        <text x="529" y="304" textAnchor="middle" className="t1">PostgreSQL</text>
        <text x="529" y="326" textAnchor="middle" className="t2">sessions, messages</text>
      </g>

      {wires.map((w, i) => (
        <path key={w.id} id={w.id} d={w.d} className="hd-wire" style={{ ["--i" as string]: i }} markerEnd="url(#hd-arrow)" />
      ))}
      <circle r="4.5" className="hd-packet" style={{ offsetPath: `path("${wires[4].d}")` }} />
      <circle r="4.5" className="hd-packet p2" style={{ offsetPath: `path("${wires[0].d}")` }} />

      {/* red-pen markup */}
      <g className="hd-pen" aria-hidden="true">
        <path d="M196 246 C 194 186, 392 180, 392 246 C 392 312, 196 316, 200 252" />
        <path d="M300 318 L 286 356" />
        <text x="140" y="376">the hard part: is the GPS lying?</text>
        <path d="M612 160 L 560 196" />
        <text x="430" y="216">p99 51 ms, 4,000 in a room</text>
      </g>
    </svg>
  );
}
