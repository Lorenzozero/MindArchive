import React from 'react';
import { BarChart, PieChart, Activity } from 'lucide-react';
import { LedEffect } from './ui/LedEffect';
import type { Paper } from '../types';

interface StatsPanelProps {
  papers: Paper[];
  selectedCategories: string[];
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ papers, selectedCategories }) => {
  const stats = React.useMemo(() => {
    const total = papers.length;
    const byCategory = papers.reduce((acc, paper) => {
      acc[paper.category] = (acc[paper.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byType = papers.reduce((acc, paper) => {
      acc[paper.source.type] = (acc[paper.source.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const recentActivity = papers
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5);

    return { total, byCategory, byType, recentActivity };
  }, [papers]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Totale Paper */}
      <div className="relative bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-cyan-400/30 transition-all group">
        <LedEffect color="#00fff2" className="opacity-5 group-hover:opacity-20" />
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Totale Paper</h3>
          <BarChart className="w-6 h-6 text-cyan-400" />
        </div>
        <p className="text-4xl font-bold text-cyan-400">{stats.total}</p>
        <p className="text-gray-400 mt-2">
          {selectedCategories.length > 0
            ? `Filtrati: ${papers.length} paper`
            : 'Tutti i paper'}
        </p>
      </div>

      {/* Distribuzione per Tipo */}
      <div className="relative bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-cyan-400/30 transition-all group">
        <LedEffect color="#00fff2" className="opacity-5 group-hover:opacity-20" />
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Per Tipo</h3>
          <PieChart className="w-6 h-6 text-cyan-400" />
        </div>
        <div className="space-y-2">
          {Object.entries(stats.byType).map(([type, count]) => (
            <div key={type} className="flex items-center justify-between">
              <span className="text-gray-400 capitalize">{type}</span>
              <span className="text-cyan-400 font-semibold">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Attività Recente */}
      <div className="relative bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-cyan-400/30 transition-all group">
        <LedEffect color="#00fff2" className="opacity-5 group-hover:opacity-20" />
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Attività Recente</h3>
          <Activity className="w-6 h-6 text-cyan-400" />
        </div>
        <div className="space-y-3">
          {stats.recentActivity.map((paper) => (
            <div key={paper.id} className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-300 truncate">{paper.title}</p>
                <p className="text-xs text-gray-500">
                  {new Date(paper.updatedAt).toLocaleDateString('it-IT')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};