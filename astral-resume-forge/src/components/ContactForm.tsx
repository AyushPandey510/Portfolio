
import React, { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (submitted) {
    return (
      <div className="glass-card p-8 rounded-3xl text-center animate-fade-in-up">
        <i className="fas fa-check-circle text-4xl text-green-400 mb-4 animate-pulse-glow"></i>
        <h3 className="text-2xl font-orbitron font-bold text-green-400 mb-2">Message Sent!</h3>
        <p className="text-gray-300 font-exo">Its not working now, but definetly it will when i join you!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-8 rounded-3xl animate-fade-in-up">
      <h3 className="text-2xl font-orbitron font-bold gradient-text mb-6">Send me a message</h3>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-gray-300 font-exo mb-2">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-glass-dark border border-pink-500/30 rounded-lg text-white font-exo focus:border-pink-400 focus:outline-none transition-colors duration-300"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-300 font-exo mb-2">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-glass-dark border border-pink-500/30 rounded-lg text-white font-exo focus:border-pink-400 focus:outline-none transition-colors duration-300"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-gray-300 font-exo mb-2">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 bg-glass-dark border border-pink-500/30 rounded-lg text-white font-exo focus:border-pink-400 focus:outline-none transition-colors duration-300 resize-none"
            placeholder="Tell me about your project or opportunity..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-anime w-full px-6 py-3 rounded-lg font-exo text-lg shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner size="sm" className="mr-2" />
              Sending...
            </div>
          ) : (
            <>
              <i className="fas fa-paper-plane mr-2"></i>
              Send Message
            </>
          )}
        </button>
      </div>
    </form>
  );
};
