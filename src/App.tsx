import React, { useState } from 'react';
import { Header } from './components/Header';
import { PaperCard } from './components/PaperCard';
import { CategoryFilter } from './components/CategoryFilter';
import { EditModal } from './components/EditModal';
import { PieChart } from './components/PieChart';
import { StatsPanel } from './components/StatsPanel';
import { usePapers } from './hooks/usePapers';
import type { Paper } from './types';

function App() {
  const {
    papers,
    categories,
    categoryStats,
    selectedCategories,
    dateRange,
    handleCategorySelect,
    setDateRange,
    updatePaper,
  } = usePapers();

  const [editingPaper, setEditingPaper] = useState<Paper | null>(null);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onSelectCategory={handleCategorySelect}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />

        <StatsPanel 
          papers={papers}
          selectedCategories={selectedCategories}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {papers.map((paper) => (
                <PaperCard
                  key={paper.id}
                  paper={paper}
                  onClick={setEditingPaper}
                />
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <PieChart data={categoryStats} />
          </div>
        </div>

        <EditModal
          paper={editingPaper}
          isOpen={!!editingPaper}
          onClose={() => setEditingPaper(null)}
          onSave={(paper) => {
            updatePaper(paper);
            setEditingPaper(null);
          }}
        />
      </main>
    </div>
  );
}

export default App;