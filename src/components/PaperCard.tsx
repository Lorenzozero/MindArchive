import React from 'react';
import { Calendar, FileText, Link as LinkIcon, FileVideo, ExternalLink } from 'lucide-react';
import { LedEffect } from './ui/LedEffect';
import type { PaperCardProps } from '../types';

export const PaperCard: React.FC<PaperCardProps> = ({ paper, onClick }) => {
  const getSourceIcon = () => {
    switch (paper.source.type) {
      case 'link':
        return <LinkIcon className="w-6 h-6 text-cyan-400" />;
      case 'video':
        return <FileVideo className="w-6 h-6 text-cyan-400" />;
      default:
        return <FileText className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <div
      className="relative group bg-gray-900 rounded-lg p-6 overflow-hidden transition-all duration-500
        hover:transform hover:scale-[1.02] hover:-translate-y-1 border border-gray-800
        hover:border-cyan-400/30"
    >
      <LedEffect active={false} className="group-hover:opacity-20" pulse={true} />
      
      <div className="flex items-start justify-between mb-4">
        <div className="group-hover:scale-110 transition-transform duration-300">
          {getSourceIcon()}
        </div>
        <span className="px-3 py-1 text-xs rounded-full bg-gray-800 text-cyan-400 
          group-hover:bg-cyan-400/10 transition-colors duration-300">
          {paper.category}
        </span>
      </div>
      
      <div onClick={() => onClick(paper)} className="cursor-pointer">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
          {paper.title}
        </h3>
        <p className="text-gray-400 line-clamp-2 mb-4 group-hover:text-gray-300 transition-colors">
          {paper.content}
        </p>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center text-gray-500 text-sm">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{new Date(paper.createdAt).toLocaleDateString('it-IT')}</span>
        </div>
        
        <a
          href={paper.source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-sm mr-1">Fonte</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};