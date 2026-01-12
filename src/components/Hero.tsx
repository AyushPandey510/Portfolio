import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center section-padding pt-32">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-6 opacity-0 animate-fade-in-up">
          <span className="font-mono text-sm tracking-wider">Software Developer</span>
        </div>
        
        <h1 className="text-display mb-8 opacity-0 animate-fade-in-up delay-100">
          AYUSH<br />PANDEY
        </h1>
        
        <div className="max-w-2xl mb-12 opacity-0 animate-fade-in-up delay-200">
          <p className="text-body-lg text-muted-foreground">
            Computer Science undergraduate specializing in backend development, 
            REST APIs, and full-stack applications. Passionate about building 
            secure, scalable systems with Rust and Python.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-16 opacity-0 animate-fade-in-up delay-300">
          <a href="#contact" className="btn-brutal">
            Get in Touch
          </a>
          <a href="#projects" className="btn-brutal-outline">
            View Projects
          </a>
        </div>

        <div className="flex items-center gap-6 opacity-0 animate-fade-in-up delay-400">
          <a
            href="https://github.com/AyushPandey510"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 brutal-border hover:bg-foreground hover:text-background transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com/in/ayush-pandey-097027242"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 brutal-border hover:bg-foreground hover:text-background transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:ayushgauravpandey@gmail.com"
            className="p-3 brutal-border hover:bg-foreground hover:text-background transition-colors"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>

        <div className="mt-8 flex justify-center opacity-0 animate-fade-in-up delay-500">
          <a
            href="#about"
            className="p-3 brutal-border animate-bounce"
            aria-label="Scroll down"
          >
            <ArrowDown size={20} />
          </a>
        </div>
      </div>

    </section>
  );
};

export default Hero;
