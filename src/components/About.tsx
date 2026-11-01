import { facts } from "@/data/profile";

const About = () => (
  <section className="section about" id="about" aria-labelledby="about-h">
    <div className="wrap about-grid">
      <h2 id="about-h" className="h2">
        I like owning the whole problem.
      </h2>
      <div className="about-body">
        <p>
          Most of my projects start with a small, real annoyance. Sending a file to a print shop. Sharing
          half-finished code with the person next to me. Asking a PDF a question and getting an answer it
          made up. I fix them end to end: I design the API, write the service, model the data, build the app
          people actually touch, and ship it in a container with CI watching.
        </p>
        <p>
          That habit has taken me across the stack. Rust for services that must be fast and safe. Go and
          Python when they fit better. React for the web, Flutter for phones. And AI where it earns its
          place — retrieval, embeddings and models that sit inside a product rather than in a notebook.
        </p>
        <p>
          I graduated with a B.Sc. in Computer Science in Mumbai with a 9.10 CGPA, interned as a data
          scientist at Imarticus Learning, and published a paper on Rust for e-commerce security. Today I am a
          Frontend Developer at Q2Pay, where I own production features for the Xpentra platform from
          requirements to release. I like work where I can own a feature from the database to the user's
          screen.
        </p>
      </div>
      <dl className="facts">
        {facts.map((f) => (
          <div key={f.label} className="fact">
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default About;
