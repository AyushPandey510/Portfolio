import { timeline } from "@/data/profile";

const Journey = () => (
  <section className="section journey" id="path" aria-labelledby="path-h">
    <div className="wrap">
      <div className="section-head">
        <h2 id="path-h" className="h2">
          The road so far.
        </h2>
        <p className="section-intro">Education, work, research and the wins along the way.</p>
      </div>
      <ol className="timeline">
        {timeline.map((t) => (
          <li key={t.title} className={`tl c-${t.layer}`}>
            <time className="tl-when">{t.when}</time>
            <div className="tl-card">
              <h3>{t.title}</h3>
              <p className="tl-org">{t.org}</p>
              <p>{t.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Journey;
