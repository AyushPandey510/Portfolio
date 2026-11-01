import { faqs } from "@/data/profile";

const Faq = () => (
  <section className="section faq" aria-labelledby="faq-h">
    <div className="wrap faq-grid">
      <h2 id="faq-h" className="h2">
        Quick answers for recruiters.
      </h2>
      <div className="faq-list">
        {faqs.map((f) => (
          <details key={f.q} className="qa">
            <summary>
              <h3>{f.q}</h3>
              <span className="qa-plus" aria-hidden="true" />
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default Faq;
