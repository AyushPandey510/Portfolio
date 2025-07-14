
import React from 'react';

interface SkillBarProps {
  skill: string;
  level: number;
  color: string;
}

export const SkillBar: React.FC<SkillBarProps> = ({ skill, level, color }) => {
  const colorClasses = {
    pink: 'from-pink-400 to-pink-600',
    cyan: 'from-cyan-400 to-cyan-600',
    purple: 'from-purple-400 to-purple-600'
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-gray-300 font-exo">{skill}</span>
        <span className="text-gray-400 text-sm">{level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className={`bg-gradient-to-r ${colorClasses[color] || colorClasses.pink} h-2 rounded-full transition-all duration-1000 ease-out animate-fade-in`}
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
};
