import { ExternalLink } from "lucide-react";

const Experience = () => {
  return (
    <section id="experience" className="section-padding bg-secondary">
      <div className="max-w-6xl mx-auto">
        <span className="font-mono text-sm tracking-wider text-muted-foreground mb-4 block">
          03 — Experience
        </span>
        <h2 className="text-headline mb-16">Work & Education</h2>

        <div className="space-y-8">
          {/* Experience */}
          <div className="brutal-card">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-bold">Data Science Intern</h3>
                <p className="text-lg text-muted-foreground">Imarticus Learning, Mumbai</p>
              </div>
              <span className="font-mono text-sm bg-foreground text-background px-3 py-1 self-start">
                Aug 2025 – Present
              </span>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-foreground">→</span>
                Performed EDA and feature engineering on datasets with 500K+ records to improve data quality
              </li>
              <li className="flex gap-3">
                <span className="text-foreground">→</span>
                Trained and evaluated supervised ML models using Scikit-learn and TensorFlow, achieving up to 22% accuracy improvement
              </li>
              <li className="flex gap-3">
                <span className="text-foreground">→</span>
                Automated analysis workflows using reproducible notebooks, reducing manual effort by 30%
              </li>
            </ul>
          </div>

          {/* Education */}
          <div className="brutal-card">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-bold">B.Sc. Computer Science</h3>
                <p className="text-lg text-muted-foreground">Thakur Ramnarayan College of Arts and Commerce</p>
              </div>
              <span className="font-mono text-sm bg-foreground text-background px-3 py-1 self-start">
                2023 – 2026
              </span>
            </div>
            <div className="flex flex-wrap gap-6">
              <div>
                <span className="text-3xl font-bold">9.27</span>
                <p className="text-sm text-muted-foreground">CGPA</p>
              </div>
              <div className="border-l-2 border-foreground pl-6">
                <p className="text-sm text-muted-foreground">Relevant Coursework</p>
                <p className="font-medium">DSA, OS, Databases, Networking, ML, Cyber Security</p>
              </div>
            </div>
          </div>

          {/* Research */}
          <div className="brutal-card">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div>
                <h3 className="text-2xl font-bold">Research Publication</h3>
                <p className="text-lg text-muted-foreground">Leveraging Rust for Modern E-Commerce Security (2025)</p>
              </div>
              <ExternalLink size={20} className="shrink-0" />
            </div>
            <p className="text-muted-foreground">
              Studied Rust's ownership model, memory safety, and async concurrency in backend systems. 
              Evaluated security and performance improvements using a real-world e-commerce API.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
