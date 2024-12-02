import React from 'react';
import { Filter, Calendar as CalendarIcon } from 'lucide-react';
import { LedEffect } from './ui/LedEffect';
import type { CategoryFilterProps } from '../types';

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategories,
  onSelectCategory,
  dateRange,
  onDateRangeChange,
}) => {
  return (
    <div className="mb-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-semibold text-white">Filtri</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-400">Categorie</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`relative px-4 py-2 rounded-full border transition-all duration-300
                  ${selectedCategories.includes(category)
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-gray-700 text-gray-400 hover:border-gray-600'}`}
              >
                {selectedCategories.includes(category) && (
                  <LedEffect color="#00fff2" className="opacity-10" />
                )}
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-400">Intervallo Date</h3>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) =>
                  onDateRangeChange({ ...dateRange, startDate: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
              />
            </div>
            <span className="text-gray-400">a</span>
            <div className="relative flex-1">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) =>
                  onDateRangeChange({ ...dateRange, endDate: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};