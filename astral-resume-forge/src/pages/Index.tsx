import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ScrollProgress } from '../components/ScrollProgress';
import { SectionIndicator } from '../components/SectionIndicator';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { SkillBar } from '../components/SkillBar';
import { ContactForm } from '../components/ContactForm';

// Particle component for background animation
const ParticleBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles = [];
      // Reduce particles on mobile for better performance
      const particleCount = window.innerWidth < 768 ? 25 : 50;
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          left: Math.random() * 100,
          animationDuration: Math.random() * 3 + 2,
          delay: Math.random() * 2,
        });
      }
      setParticles(newParticles);
    };
    createParticles();

    // Update particle count on resize
    const handleResize = () => createParticles();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            animationDuration: `${particle.animationDuration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', description: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'achievements', 'contact'];

  // Function to scroll to a section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  // Effect to handle scroll and update active section for navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('nav')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  const generateProjectElaboration = async (projectTitle, projectDescription) => {
    setIsLoading(true);
    setError(null);
    setModalContent({ title: `Elaborating on ${projectTitle}...`, description: 'Generating content...' });
    setShowModal(true);

    try {
      const prompt = `Elaborate on the following project description for a software engineering portfolio. Focus on technical challenges, solutions, and impact. Make it sound professional and concise, suitable for a recruiter.

      Project Title: ${projectTitle}
      Current Description: ${projectDescription}

      Elaboration:`;

      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setModalContent({ title: `Elaboration for ${projectTitle}`, description: text });
      } else {
        setError('Failed to generate elaboration. Please try again.');
        setModalContent({ title: `Elaboration for ${projectTitle}`, description: 'Could not generate content.' });
      }
    } catch (err) {
      console.error("Error calling Gemini API:", err);
      setError('An error occurred while connecting to the AI. Please try again later.');
      setModalContent({ title: `Elaboration for ${projectTitle}`, description: 'Error: Could not generate content.' });
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent({ title: '', description: '' });
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 font-rajdhani text-white relative overflow-x-hidden">
      <ParticleBackground />
      <ScrollProgress />
      <SectionIndicator 
        sections={sections}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />
      
      {/* Enhanced Navigation Bar - Fixed mobile menu issues */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-glass backdrop-blur-lg p-3 md:p-4 md:px-8 flex justify-between items-center border-b border-pink-500/20">
        <div className="text-xl md:text-2xl font-orbitron font-bold gradient-text animate-pulse-glow">
          AYUSH PANDEY
        </div>
        
        {/* Desktop Navigation */}
        <ul className="hidden lg:flex space-x-6 xl:space-x-8">
          {sections.map((section) => (
            <li key={section}>
              <button
                onClick={() => scrollToSection(section)}
                className={`font-exo text-xs xl:text-sm uppercase tracking-wider transition-all duration-300 hover:text-pink-400 hover:scale-110 relative ${
                  activeSection === section 
                    ? 'text-pink-400 neon-text' 
                    : 'text-gray-300'
                }`}
              >
                {section}
                {activeSection === section && (
                  <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-pink-400 animate-glow"></div>
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="text-pink-400 hover:text-pink-300 focus:outline-none transition-colors duration-300 p-2"
            aria-label="Toggle mobile menu"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        {/* Mobile Menu - Improved positioning and styling */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-glass-dark backdrop-blur-lg border-b border-pink-500/20 lg:hidden animate-fade-in-up max-h-screen overflow-y-auto">
            <ul className="flex flex-col p-4 space-y-3">
              {sections.map((section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className={`block w-full text-left font-exo text-sm uppercase tracking-wider transition-colors duration-300 p-3 rounded ${
                      activeSection === section 
                        ? 'text-pink-400 bg-pink-500/20' 
                        : 'text-gray-300 hover:text-pink-400 hover:bg-pink-500/10'
                    }`}
                  >
                    {section}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Hero Section - Improved mobile spacing */}
      <section id="home" className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 p-4 pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 animate-pulse"></div>
        <div className="text-center space-y-6 md:space-y-8 z-10 animate-fade-in-up max-w-6xl mx-auto">
          <div className="animate-float">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-orbitron font-black gradient-text mb-2 md:mb-4">
              HI, I'M
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-orbitron font-black text-pink-400 neon-text mb-4 md:mb-6">
              AYUSH
            </h1>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-exo text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
            Final-year <span className="text-cyan-400 neon-text">Computer Science</span> student crafting 
            <span className="text-pink-400 neon-text"> high-performance</span>, 
            <span className="text-purple-400 neon-text"> secure</span>, and 
            <span className="text-cyan-400 neon-text"> scalable</span> digital experiences.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-6 md:pt-8 px-4">
            <button
              onClick={() => scrollToSection('projects')}
              className="btn-anime px-6 md:px-8 py-3 md:py-4 rounded-lg font-exo text-base md:text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <i className="fas fa-rocket mr-2"></i>
              EXPLORE PROJECTS
            </button>
            <Link
              to="/contact"
              className="px-6 md:px-8 py-3 md:py-4 border-2 border-pink-400 text-pink-400 font-exo text-base md:text-lg rounded-lg shadow-lg hover:bg-pink-400 hover:text-black transition-all duration-300 transform hover:scale-105 neon-border text-center"
            >
              <i className="fas fa-envelope mr-2"></i>
              GET IN TOUCH
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced About Me Section - Better mobile layout */}
      <section id="about" className="py-16 md:py-20 px-4 md:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-center gradient-text mb-12 md:mb-16 animate-fade-in-up">
            ABOUT_ME.EXE
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="glass-card p-6 md:p-8 rounded-2xl animate-slide-in-left card-3d order-2 lg:order-1">
              <p className="text-base md:text-lg font-exo text-gray-300 leading-relaxed mb-4 md:mb-6">
                As a <span className="text-pink-400 font-semibold">final-year Computer Science student</span>, I possess a strong foundation in 
                <span className="text-cyan-400 font-semibold"> Python, Rust, React.js, Flutter, and database management</span>. 
                My academic journey is complemented by hands-on experience in developing high-performance, secure, and scalable APIs.
              </p>
              <p className="text-base md:text-lg font-exo text-gray-300 leading-relaxed">
                I've gained practical experience through <span className="text-purple-400 font-semibold">freelance web development</span>, 
                where I've managed full project lifecycles. My involvement with 
                <span className="text-pink-400 font-semibold"> DevClub's development team</span> has further honed my collaborative skills using 
                <span className="text-cyan-400 font-semibold">Flutter and Firebase</span>. 
                I am eager to apply my technical expertise and passion for building innovative solutions.
              </p>
            </div>
            <div className="flex justify-center animate-slide-in-right order-1 lg:order-2">
              <div className="w-64 h-64 md:w-80 md:h-80 glass-card rounded-3xl flex items-center justify-center animate-float relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 animate-pulse"></div>
                <div className="text-center z-10">
                  <i className="fas fa-code text-6xl md:text-8xl text-pink-400 mb-4 animate-pulse-glow"></i>
                  <h3 className="text-xl md:text-2xl font-orbitron font-bold gradient-text">CODE WARRIOR</h3>
                  <p className="text-gray-400 mt-2 font-exo text-sm md:text-base">Building the future, one line at a time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Technical Skills Section */}
      <section id="skills" className="py-16 md:py-20 px-4 md:px-8 bg-gradient-to-br from-slate-900 to-purple-900/30 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-center gradient-text mb-12 md:mb-16 animate-fade-in-up">
            TECH_STACK.JSON
          </h2>
          
          {/* Skill Proficiency Bars */}
          <div className="glass-card p-6 md:p-8 rounded-3xl mb-8 md:mb-12 animate-fade-in-up">
            <h3 className="text-2xl md:text-3xl font-orbitron font-bold text-center gradient-text mb-6 md:mb-8">Proficiency Levels</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-4">
                <SkillBar skill="Python" level={90} color="pink" />
                <SkillBar skill="JavaScript" level={85} color="cyan" />
                <SkillBar skill="React.js" level={88} color="purple" />
                <SkillBar skill="Flutter" level={82} color="pink" />
              </div>
              <div className="space-y-4">
                <SkillBar skill="Rust" level={75} color="cyan" />
                <SkillBar skill="PostgreSQL" level={80} color="purple" />
                <SkillBar skill="Firebase" level={85} color="pink" />
                <SkillBar skill="Git" level={88} color="cyan" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "PROGRAMMING",
                icon: "fas fa-code",
                skills: ["Python", "JavaScript", "Rust"],
                color: "pink"
              },
              {
                title: "WEB_TECH",
                icon: "fas fa-globe",
                skills: ["React", "Node.js", "Django", "Flask"],
                color: "cyan"
              },
              {
                title: "MOBILE_DEV",
                icon: "fas fa-mobile-alt",
                skills: ["Flutter", "Dart"],
                color: "purple"
              },
              {
                title: "DATABASES",
                icon: "fas fa-database",
                skills: ["PostgreSQL", "MongoDB", "SQLite"],
                color: "pink"
              },
              {
                title: "CLOUD_SERVICES",
                icon: "fas fa-cloud",
                skills: ["Firebase", "Authentication", "Firestore"],
                color: "cyan"
              },
              {
                title: "TOOLS",
                icon: "fas fa-tools",
                skills: ["Git", "Docker"],
                color: "purple"
              },
              {
                title: "CONCEPTS",
                icon: "fas fa-brain",
                skills: ["OOP", "Algorithms", "RESTful APIs"],
                color: "pink"
              }
            ].map((category, index) => (
              <div key={index} className={`glass-card p-4 md:p-6 rounded-2xl card-3d animate-fade-in-up hover:scale-105 transition-all duration-300`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-center mb-4 md:mb-6">
                  <i className={`${category.icon} text-3xl md:text-4xl text-${category.color}-400 mb-3 md:mb-4 animate-pulse-glow`}></i>
                  <h3 className={`text-lg md:text-xl font-orbitron font-bold text-${category.color}-400 neon-text`}>
                    {category.title}
                  </h3>
                </div>
                <ul className="space-y-2 md:space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <li key={skillIndex} className="flex items-center font-exo text-gray-300 text-sm md:text-base">
                      <i className="fas fa-chevron-right text-pink-400 mr-2 md:mr-3 text-xs md:text-sm"></i>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-20 px-4 md:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-center gradient-text mb-12 md:mb-16 animate-fade-in-up">
            PROJECTS.EXE
          </h2>

          {/* Project 1 */}
          <div className="mb-12 md:mb-16 glass-card p-6 md:p-8 rounded-3xl card-3d animate-slide-in-left hover:scale-105 transition-all duration-500">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 md:mb-6">
              <h3 className="text-2xl md:text-3xl font-orbitron font-bold text-pink-400 neon-text mb-4 lg:mb-0">
                <i className="fas fa-rocket mr-2 md:mr-3"></i>
                HIGH-PERFORMANCE E-COMMERCE API
              </h3>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/AyushPandey510/Rust-Ecom-Api" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-pink-400 transition-colors duration-300"
                >
                  <i className="fab fa-github text-xl md:text-2xl"></i>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <div>
                <ul className="space-y-2 md:space-y-3 text-gray-300 font-exo text-sm md:text-base">
                  <li className="flex items-start">
                    <i className="fas fa-shield-alt text-cyan-400 mr-2 md:mr-3 mt-1 flex-shrink-0"></i>
                    Developed secure, fast, and scalable e-commerce backend API using <span className="text-pink-400">Rust and Actix-web</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-key text-purple-400 mr-2 md:mr-3 mt-1 flex-shrink-0"></i>
                    Implemented <span className="text-cyan-400">JWT authentication</span> with token verification
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-database text-pink-400 mr-2 md:mr-3 mt-1 flex-shrink-0"></i>
                    Integrated <span className="text-purple-400">PostgreSQL</span> with async queries using sqlx
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-cog text-cyan-400 mr-2 md:mr-3 mt-1 flex-shrink-0"></i>
                    Built middleware for authentication and request validation
                  </li>
                </ul>
              </div>
              <div className="flex justify-center lg:justify-end">
                <button
                  onClick={() => generateProjectElaboration(
                    "High-Performance E-commerce API",
                    "Developed a secure, fast, and scalable e-commerce backend API using Rust and Actix-web..."
                  )}
                  className="btn-anime px-4 md:px-6 py-2 md:py-3 rounded-lg font-exo shadow-lg transform hover:scale-105 transition-all duration-300 text-sm md:text-base"
                  disabled={isLoading}
                >
                  <i className="fas fa-magic mr-2"></i>
                  ELABORATE
                </button>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="glass-card p-6 md:p-8 rounded-3xl card-3d animate-slide-in-right hover:scale-105 transition-all duration-500">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 md:mb-6">
              <h3 className="text-2xl md:text-3xl font-orbitron font-bold text-cyan-400 neon-text mb-4 lg:mb-0">
                <i className="fas fa-calendar-alt mr-2 md:mr-3"></i>
                EVENT HANDLER API (ZETTABYTE)
              </h3>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/AyushPandey510/Zettabyte" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                >
                  <i className="fab fa-github text-xl md:text-2xl"></i>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <div>
                <ul className="space-y-2 md:space-y-3 text-gray-300 font-exo text-sm md:text-base">
                  <li className="flex items-start">
                    <i className="fas fa-layer-group text-pink-400 mr-2 md:mr-3 mt-1 flex-shrink-0"></i>
                    Full-stack Event Handler API using <span className="text-cyan-400">FastAPI and React</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-users text-purple-400 mr-2 md:mr-3 mt-1 flex-shrink-0"></i>
                    Event posting, registration, and <span className="text-pink-400">CRUD operations</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-qrcode text-cyan-400 mr-2 md:mr-3 mt-1 flex-shrink-0"></i>
                    Integrated <span className="text-purple-400">QR code generation</span> for event access
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-lock text-pink-400 mr-2 md:mr-3 mt-1 flex-shrink-0"></i>
                    Secure admin authentication with <span className="text-cyan-400">JWT tokens</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center lg:justify-end">
                <button
                  onClick={() => generateProjectElaboration(
                    "Event Handler API (Zettabyte)",
                    "Designed and implemented a full-stack Event Handler API using FastAPI and React..."
                  )}
                  className="btn-anime px-4 md:px-6 py-2 md:py-3 rounded-lg font-exo shadow-lg transform hover:scale-105 transition-all duration-300 text-sm md:text-base"
                  disabled={isLoading}
                >
                  <i className="fas fa-magic mr-2"></i>
                  ELABORATE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 md:py-20 px-4 md:px-8 bg-gradient-to-br from-slate-900 to-pink-900/20 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-center gradient-text mb-12 md:mb-16 animate-fade-in-up">
            EXPERIENCE.LOG
          </h2>

          <div className="space-y-8 md:space-y-12">
            <div className="glass-card p-6 md:p-8 rounded-3xl card-3d animate-slide-in-left hover:scale-105 transition-all duration-500">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 md:mb-6">
                <i className="fas fa-laptop-code text-3xl md:text-4xl text-pink-400 mr-0 sm:mr-4 mb-3 sm:mb-0 animate-pulse-glow"></i>
                <div>
                  <h3 className="text-xl md:text-2xl font-orbitron font-bold text-pink-400 neon-text">
                    FREELANCE WEB DEVELOPER
                  </h3>
                  <p className="text-cyan-400 font-exo text-sm md:text-base">Remote | July 2024 – Present</p>
                </div>
              </div>
              <ul className="space-y-2 md:space-y-3 text-gray-300 font-exo text-sm md:text-base">
                <li className="flex items-start">
                  <i className="fas fa-chevron-right text-pink-400 mr-2 md:mr-3 mt-1 flex-shrink-0"></i>
                  Collaborated with clients to deliver custom web solutions
                </li>
                <li className="flex items-start">
                  <i className="fas fa-chevron-right text-pink-400 mr-2 md:mr-3 mt-1 flex-shrink-0"></i>
                  Developed responsive e-commerce websites with full deployment
                </li>
                <li className="flex items-start">
                  <i className="fas fa-chevron-right text-pink-400 mr-2 md:mr-3 mt-1 flex-shrink-0"></i>
                  Managed complete project lifecycle ensuring client satisfaction
                </li>
              </ul>
            </div>

            <div className="glass-card p-6 md:p-8 rounded-3xl card-3d animate-slide-in-right hover:scale-105 transition-all duration-500">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 md:mb-6">
                <i className="fas fa-users text-3xl md:text-4xl text-cyan-400 mr-0 sm:mr-4 mb-3 sm:mb-0 animate-pulse-glow"></i>
                <div>
                  <h3 className="text-xl md:text-2xl font-orbitron font-bold text-cyan-400 neon-text">
                    DEVELOPMENT TEAM MEMBER
                  </h3>
                  <p className="text-purple-400 font-exo text-sm md:text-base">DevClub | Present</p>
                </div>
              </div>
              <ul className="space-y-2 md:space-y-3 text-gray-300 font-exo text-sm md:text-base">
                <li className="flex items-start">
                  <i className="fas fa-chevron-right text-cyan-400 mr-2 md:mr-3 mt-1 flex-shrink-0"></i>
                  Contributed to club projects using <span className="text-pink-400">Flutter and Firebase</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-chevron-right text-cyan-400 mr-2 md:mr-3 mt-1 flex-shrink-0"></i>
                  Participated in code reviews and sprint planning sessions
                </li>
                <li className="flex items-start">
                  <i className="fas fa-chevron-right text-cyan-400 mr-2 md:mr-3 mt-1 flex-shrink-0"></i>
                  Organized coding workshops and hackathons
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 md:py-20 px-4 md:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-center gradient-text mb-12 md:mb-16 animate-fade-in-up">
            EDUCATION.SQL
          </h2>

          <div className="space-y-8 md:space-y-12">
            <div className="glass-card p-6 md:p-8 rounded-3xl card-3d animate-fade-in-up hover:scale-105 transition-all duration-500">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 md:mb-6">
                <i className="fas fa-graduation-cap text-3xl md:text-4xl text-purple-400 mr-0 sm:mr-4 mb-3 sm:mb-0 animate-pulse-glow"></i>
                <div>
                  <h3 className="text-xl md:text-2xl font-orbitron font-bold text-purple-400 neon-text">
                    BACHELOR OF SCIENCE - COMPUTER SCIENCE
                  </h3>
                  <p className="text-gray-400 font-exo text-sm md:text-base">Thakur Ramnarayan College, Mumbai</p>
                  <p className="text-cyan-400 font-exo text-sm md:text-base">July 2023 – Expected May 2026</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 md:p-8 rounded-3xl card-3d animate-fade-in-up hover:scale-105 transition-all duration-500">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 md:mb-6">
                <i className="fas fa-school text-3xl md:text-4xl text-pink-400 mr-0 sm:mr-4 mb-3 sm:mb-0 animate-pulse-glow"></i>
                <div>
                  <h3 className="text-xl md:text-2xl font-orbitron font-bold text-pink-400 neon-text">
                    HIGHER SECONDARY EDUCATION (PCM + CS)
                  </h3>
                  <p className="text-gray-400 font-exo text-sm md:text-base">Green View Public School, Jalalpur Bhadohi</p>
                  <p className="text-cyan-400 font-exo text-sm md:text-base">Completed: May 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Achievements Section */}
      <section id="achievements" className="py-16 md:py-20 px-4 md:px-8 bg-gradient-to-br from-slate-900 to-purple-900/30 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-center gradient-text mb-12 md:mb-16 animate-fade-in-up">
            ACHIEVEMENTS.JSON
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="glass-card p-6 md:p-8 rounded-3xl card-3d animate-slide-in-left hover:scale-105 transition-all duration-500">
              <div className="text-center">
                <i className="fas fa-trophy text-5xl md:text-6xl text-yellow-400 mb-4 md:mb-6 animate-pulse-glow"></i>
                <h3 className="text-xl md:text-2xl font-orbitron font-bold text-yellow-400 neon-text mb-3 md:mb-4">
                  DEBUGGING CHAMPION
                </h3>
                <p className="text-gray-300 font-exo text-sm md:text-base">
                  Winner, Intercollegiate Debugging Competition<br/>
                  <span className="text-cyan-400">Thakur Ramnarayan College, 2023</span>
                </p>
              </div>
            </div>

            <div className="glass-card p-6 md:p-8 rounded-3xl card-3d animate-slide-in-right hover:scale-105 transition-all duration-500">
              <div className="text-center">
                <i className="fas fa-medal text-5xl md:text-6xl text-orange-400 mb-4 md:mb-6 animate-pulse-glow"></i>
                <h3 className="text-xl md:text-2xl font-orbitron font-bold text-orange-400 neon-text mb-3 md:mb-4">
                  ALGORITHM MASTER
                </h3>
                <p className="text-gray-300 font-exo text-sm md:text-base">
                  Winner, Algorithm Making Competition<br/>
                  <span className="text-cyan-400">Thakur Ramnarayan College, 2023</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section - Now links to contact page */}
      <section id="contact" className="py-16 md:py-20 px-4 md:px-8 bg-gradient-to-br from-pink-900/30 to-purple-900/30 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-center gradient-text mb-12 md:mb-16 animate-fade-in-up">
            CONTACT.EXE
          </h2>
          
          <div className="text-center space-y-8">
            <div className="glass-card p-8 md:p-12 rounded-3xl animate-fade-in-up">
              <h3 className="text-2xl md:text-3xl font-orbitron font-bold gradient-text mb-6">Ready to collaborate?</h3>
              <p className="text-lg md:text-xl font-exo text-gray-300 mb-8 leading-relaxed">
                Let's connect and build something amazing together!
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link
                  to="/contact"
                  className="btn-anime px-8 py-4 rounded-lg font-exo text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <i className="fas fa-envelope mr-2"></i>
                  Contact Me
                </Link>
                <a
                  href="mailto:ayushgauravpandey@gmail.com"
                  className="px-8 py-4 border-2 border-pink-400 text-pink-400 font-exo text-lg rounded-lg shadow-lg hover:bg-pink-400 hover:text-black transition-all duration-300 transform hover:scale-105 neon-border"
                >
                  <i className="fas fa-paper-plane mr-2"></i>
                  Quick Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-glass border-t border-pink-500/20 text-center p-6 md:p-8">
        <p className="font-exo text-gray-400 text-sm md:text-base">
          &copy; {new Date().getFullYear()} <span className="text-pink-400">AYUSH PANDEY</span>. All rights reserved.
          <br/>
          <span className="text-xs md:text-sm text-gray-500">Built with React & Tailwind CSS</span>
        </p>
      </footer>

      {/* Enhanced Modal - Fixed mobile issues */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="glass-card rounded-3xl p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative card-3d animate-scale-in">
            <button
              onClick={closeModal}
              className="absolute top-4 md:top-6 right-4 md:right-6 text-gray-400 hover:text-pink-400 text-2xl md:text-3xl font-bold transition-all duration-300 hover:scale-110 z-10"
            >
              <i className="fas fa-times"></i>
            </button>
            <h3 className="text-2xl md:text-3xl font-orbitron font-bold gradient-text mb-4 md:mb-6 pr-8">{modalContent.title}</h3>
            {isLoading ? (
              <div className="flex flex-col justify-center items-center h-32">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-gray-400 font-exo">Generating content...</p>
              </div>
            ) : error ? (
              <div className="text-center">
                <i className="fas fa-exclamation-triangle text-3xl md:text-4xl text-red-400 mb-4"></i>
                <p className="text-red-400 font-exo text-base md:text-lg">{error}</p>
              </div>
            ) : (
              <p className="text-gray-300 font-exo text-base md:text-lg leading-relaxed whitespace-pre-wrap">{modalContent.description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
