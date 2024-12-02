import React from 'react';
import { Bot, Layout } from 'lucide-react';
import { LedEffect } from './ui/LedEffect';

export const Header: React.FC = () => {
  return (
    <header className="relative bg-gray-900 border-b border-gray-800">
      <LedEffect color="#00a3ff" className="opacity-10" />
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="w-8 h-8 text-cyan-400" />
            <h1 className="text-xl font-bold text-white">Sistema di Gestione Paper</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors">
              <Layout className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};