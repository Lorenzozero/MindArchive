import React from 'react';
import { LedEffect } from './LedEffect';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = "px-4 py-2 rounded-lg transition-all duration-300 relative";
  const variants = {
    primary: "bg-cyan-500 text-white hover:bg-cyan-400",
    secondary: "border border-gray-700 text-gray-300 hover:bg-gray-800",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {variant === 'primary' && (
        <LedEffect color="#00fff2" className="opacity-20" />
      )}
      {children}
    </button>
  );
};