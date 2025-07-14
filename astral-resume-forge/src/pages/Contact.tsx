
import React from 'react';
import { ContactForm } from '../components/ContactForm';

const Contact = () => {
  return (
    <div className="min-h-screen bg-slate-900 font-rajdhani text-white relative overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-glass backdrop-blur-lg p-4 md:px-8 flex justify-between items-center border-b border-pink-500/20">
        <div className="text-2xl font-orbitron font-bold gradient-text animate-pulse-glow">
          AYUSH PANDEY
        </div>
        
        <a 
          href="/"
          className="px-6 py-2 border-2 border-pink-400 text-pink-400 font-exo rounded-lg hover:bg-pink-400 hover:text-black transition-all duration-300 neon-border"
        >
          <i className="fas fa-home mr-2"></i>
          Back to Portfolio
        </a>
      </nav>

      {/* Contact Content */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-pink-900/30 to-purple-900/30 relative min-h-screen flex items-center justify-center">
        <div className="max-w-6xl mx-auto w-full">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-center gradient-text mb-16 animate-fade-in-up">
            GET IN TOUCH
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="glass-card p-8 rounded-3xl animate-slide-in-left">
              <h2 className="text-3xl font-orbitron font-bold gradient-text mb-8">Let's Connect</h2>
              <p className="text-xl font-exo text-gray-300 mb-8 leading-relaxed">
                Ready to build the future together?<br/>
                <span className="text-pink-400 neon-text">Let's create something amazing!</span>
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-envelope text-xl text-white"></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-orbitron font-bold text-pink-400">Email</h3>
                    <a 
                      href="mailto:ayushgauravpandey@gmail.com" 
                      className="text-gray-300 hover:text-pink-400 transition-colors duration-300 font-exo break-all"
                    >
                      ayushgauravpandey@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-phone text-xl text-white"></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-orbitron font-bold text-cyan-400">Phone</h3>
                    <p className="text-gray-300 font-exo">+91 7007257841</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-map-marker-alt text-xl text-white"></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-orbitron font-bold text-purple-400">Location</h3>
                    <p className="text-gray-300 font-exo">Mumbai, India</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-6 mt-8">
                <a 
                  href="https://www.linkedin.com/in/ayush-pandey-097027242" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white hover:scale-125 transition-all duration-300 animate-pulse-glow"
                >
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a 
                  href="https://github.com/AyushPandey510" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center text-white hover:scale-125 transition-all duration-300 animate-pulse-glow"
                >
                  <i className="fab fa-github text-xl"></i>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-slide-in-right">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
