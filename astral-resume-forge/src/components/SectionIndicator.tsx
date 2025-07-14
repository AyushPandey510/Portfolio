
import React from 'react';

interface SectionIndicatorProps {
  sections: string[];
  activeSection: string;
  onSectionClick: (section: string) => void;
}

export const SectionIndicator: React.FC<SectionIndicatorProps> = ({
  sections,
  activeSection,
  onSectionClick
}) => {
  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <div className="space-y-4">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => onSectionClick(section)}
            className={`block w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
              activeSection === section 
                ? 'bg-pink-400 animate-pulse-glow shadow-lg shadow-pink-400/50' 
                : 'bg-gray-600 hover:bg-gray-400'
            }`}
            title={section.charAt(0).toUpperCase() + section.slice(1)}
          />
        ))}
      </div>
    </div>
  );
};
