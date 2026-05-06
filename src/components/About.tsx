const About = () => {
  return (
    <section id="about" className="section-padding bg-foreground text-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <span className="font-mono text-sm tracking-wider opacity-60 mb-4 block">01 — About</span>
            <h2 className="text-headline mb-6">
              Building the Future with Code
            </h2>
          </div>
          
          <div className="space-y-6">
            <p className="text-body-lg opacity-80">
               I'm a graduate in B.Sc. Computer Science from Thakur Ramnarayan College of Arts 
               and Commerce, Mumbai, with a CGPA of 9.27. My passion lies in building 
               efficient backend systems, scalable architectures, and secure APIs.
            </p>
            <p className="text-body-lg opacity-80">
               With hands-on experience in Rust, Python, JavaScript, and modern AI frameworks, 
               I've built high-performance systems including RAG-based applications, AI-powered 
               platforms like LifeEngine, real-time file-sharing systems, and cybersecurity tools. 
               I enjoy working on distributed systems, vector search, LLM integrations, and 
               production-ready backend infrastructure focused on performance, scalability, and reliability.
            </p>
            <div className="pt-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <span className="text-4xl font-bold">9.27</span>
                  <p className="text-sm opacity-60 mt-1">CGPA</p>
                </div>
                <div>
                  <span className="text-4xl font-bold">5+</span>
                  <p className="text-sm opacity-60 mt-1">Projects Built</p>
                </div>
                <div>
                  <span className="text-4xl font-bold">3</span>
                  <p className="text-sm opacity-60 mt-1">Competition Wins</p>
                </div>
                <div>
                  <span className="text-4xl font-bold">1</span>
                  <p className="text-sm opacity-60 mt-1">Research Paper</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
