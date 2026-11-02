import { useState } from "react";

// A browser copy of the rules in Space's Rust engine (apps/backend/src/geofence):
// 100 m fence, exit only past 120 m, three outside readings before "Outside",
// impossible jumps rejected, and a grace period for someone who was inside.
type Decision = "Waiting" | "Inside" | "NearBoundary" | "Outside" | "Rejected";
type Life = "Joining" | "Inside" | "NearBoundary" | "GracePeriod" | "Outside";

interface State { d: number; count: number; life: Life; decision: Decision; jumped: boolean; log: string[]; n: number }
const START: State = { d: 40, count: 0, life: "Joining", decision: "Waiting", jumped: false, log: [], n: 0 };
const colors: Record<Decision, string> = { Inside: "#5FE3BC", NearBoundary: "#FFC857", Outside: "#FF8FB1", Rejected: "#FF8FB1", Waiting: "#E3E9FF" };

function reading(s: State, nd: number, jump: boolean): State {
  let decision: Decision; let count = s.count; let life: Life = s.life; let reason = "";
  if (jump) {
    decision = "Rejected"; life = "Outside"; count = 0; reason = "impossible jump";
  } else {
    const raw = nd <= 100 ? "Inside" : nd <= 120 ? "NearBoundary" : "Outside";
    const wasIn = s.life === "Inside" || s.life === "NearBoundary" || s.life === "GracePeriod";
    if (raw === "Outside" && wasIn) {
      count += 1;
      decision = count >= 3 ? "Outside" : "NearBoundary";
      if (decision === "NearBoundary") reason = "waiting for 3 readings";
    } else {
      count = 0; decision = raw;
      if (raw === "NearBoundary") reason = "inside the exit buffer";
    }
    if (decision === "Inside") life = "Inside";
    else if (decision === "NearBoundary") life = "NearBoundary";
    else life = wasIn ? "GracePeriod" : "Outside";
  }
  const n = s.n + 1;
  const text = `#${n}  ${jump ? "2,000" : nd} m: ${decision}${reason ? ` (${reason})` : ""}`;
  return { d: nd, count, life, decision, jumped: jump, n, log: [text, ...s.log].slice(0, 5) };
}

export default function GeofenceDemo() {
  const [s, set] = useState<State>(START);
  const base = s.jumped ? 40 : s.d;
  const shown = Math.min(s.d, 140);
  const dist = s.jumped ? "2,000 m" : `${s.d} m`;
  const chip = colors[s.decision];

  return (
    <div className="demo-g">
      <div>
        <div className="map" role="img" aria-label={`Geofence: you are ${dist} from the centre, decision ${s.decision}`}>
          <div style={{ position: "absolute", left: 26, top: 26, width: 264, height: 264, boxSizing: "border-box", border: "2px dashed #FFC857", borderRadius: "50%" }} />
          <div style={{ position: "absolute", left: 48, top: 48, width: 220, height: 220, boxSizing: "border-box", border: "2px solid #5FE3BC", background: "rgba(95,227,188,.14)", borderRadius: "50%" }} />
          <div className="radar" />
          <div className="ping" />
          <div style={{ position: "absolute", left: 154, top: 154, width: 8, height: 8, background: "#FFFFFF" }} />
          <div style={{ position: "absolute", left: 182, top: 136, fontSize: 14, fontWeight: 700, color: "#5FE3BC" }}>r = 100 m</div>
          <div style={{ position: "absolute", left: 186, top: 30, fontSize: 14, fontWeight: 700, color: "#FFC857" }}>exit at 120 m</div>
          {!s.jumped ? (
            <div style={{ position: "absolute", left: Math.round(158 + shown * 1.1 - 10), top: 148, width: 20, height: 20, boxSizing: "border-box", border: "3px solid #0F1B3D", outline: "2px solid #FFFFFF", background: chip, borderRadius: "50%", transition: "left .4s cubic-bezier(.22,1,.36,1)" }} className="me" />
          ) : (
            <div style={{ position: "absolute", right: 8, top: 144, fontSize: 14, fontWeight: 700, background: "#FF8FB1", color: "#0F1B3D", padding: "6px 8px" }}>you, 2 km away</div>
          )}
        </div>
        <div className="ctl">
          <button onClick={() => set(reading(s, Math.min(base + 10, 160), false))} style={{ background: "#FFC857" }}>Walk 10 m out</button>
          <button onClick={() => set(reading(s, Math.max(base - 10, 0), false))} style={{ background: "#5FE3BC" }}>Walk 10 m in</button>
          <button onClick={() => set(reading(s, s.d, true))} style={{ background: "#FF8FB1" }}>Teleport 2 km</button>
          <button onClick={() => set(START)} style={{ background: "#FFFFFF" }}>Reset</button>
        </div>
      </div>
      <div>
        <div className="readout" key={s.n}>
          <div><small>Distance</small><strong>{dist}</strong></div>
          <div><small>Outside readings</small><strong>{s.count} / 3</strong></div>
          <div><small>Decision</small><strong style={{ background: chip, color: "#0F1B3D", padding: "2px 8px", fontSize: 17 }}>{s.decision}</strong></div>
          <div><small>Session</small><strong style={{ fontSize: 17 }}>{s.life}</strong></div>
        </div>
        <div className="log" aria-live="polite">
          {s.log.map((t) => <div key={t}>{t}</div>)}
          {s.log.length === 0 && <p style={{ margin: 0, color: "#E3E9FF" }}>No readings yet. Walk out, or teleport.</p>}
        </div>
        <p style={{ margin: "20px 0 0" }}><a href="/work/space" style={{ color: "#FFFFFF", fontWeight: 700 }}>How the real engine works, with load-test results</a></p>
      </div>
    </div>
  );
}
