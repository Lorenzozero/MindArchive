import React from 'react';

interface LedEffectProps {
  active?: boolean;
  color?: string;
  className?: string;
  pulse?: boolean;
}

export const LedEffect: React.FC<LedEffectProps> = ({
  active = true,
  color = '#00ff9d',
  className = '',
  pulse = false,
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none transition-all duration-500 
        ${active ? 'opacity-20' : 'opacity-0'} 
        ${pulse ? 'animate-pulse' : ''} 
        ${className}`}
      style={{
        boxShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}`,
        background: `linear-gradient(45deg, transparent, ${color}22)`,
      }}
    />
  );
};