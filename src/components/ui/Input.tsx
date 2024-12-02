import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg 
          text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 
          transition-all ${className}`}
        {...props}
      />
    </div>
  );
};