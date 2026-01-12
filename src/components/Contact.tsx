import { Mail, Phone, Linkedin, Github, ArrowUpRight } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <span className="font-mono text-sm tracking-wider text-muted-foreground mb-4 block">
          06 — Contact
        </span>
        <h2 className="text-headline mb-8">Let's Work Together</h2>
        <p className="text-body-lg text-muted-foreground max-w-2xl mb-16">
          I'm currently looking for Software Development Engineer (SDE-1) roles. 
          If you have an opportunity that matches my skills, let's connect!
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <a
            href="mailto:ayushgauravpandey@gmail.com"
            className="brutal-card group flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Mail size={24} />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-bold">ayushgauravpandey@gmail.com</p>
              </div>
            </div>
            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>

          <a
            href="tel:+917007257841"
            className="brutal-card group flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Phone size={24} />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-bold">+91-7007257841</p>
              </div>
            </div>
            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>

          <a
            href="https://linkedin.com/in/ayush-pandey-097027242"
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-card group flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Linkedin size={24} />
              <div>
                <p className="text-sm text-muted-foreground">LinkedIn</p>
                <p className="font-bold">ayush-pandey-097027242</p>
              </div>
            </div>
            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>

          <a
            href="https://github.com/AyushPandey510"
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-card group flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Github size={24} />
              <div>
                <p className="text-sm text-muted-foreground">GitHub</p>
                <p className="font-bold">AyushPandey510</p>
              </div>
            </div>
            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
