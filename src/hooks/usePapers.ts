import { useState, useMemo } from 'react';
import type { Paper, DateRange } from '../types';
import { mockPapers } from '../data/mockData';

export const usePapers = () => {
  const [papers, setPapers] = useState<Paper[]>(mockPapers);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: '',
    endDate: '',
  });

  const categories = useMemo(() => 
    Array.from(new Set(papers.map(paper => paper.category))),
    [papers]
  );

  const categoryStats = useMemo(() => {
    return papers.reduce((acc, paper) => {
      acc[paper.category] = (acc[paper.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [papers]);

  const filteredPapers = useMemo(() => {
    return papers.filter(paper => {
      const matchesCategories = selectedCategories.length === 0 || 
        selectedCategories.includes(paper.category);
      
      const paperDate = new Date(paper.createdAt);
      const matchesDateRange = (!dateRange.startDate || paperDate >= new Date(dateRange.startDate)) &&
        (!dateRange.endDate || paperDate <= new Date(dateRange.endDate));
      
      return matchesCategories && matchesDateRange;
    });
  }, [papers, selectedCategories, dateRange]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const updatePaper = (updatedPaper: Paper) => {
    setPapers(prev => prev.map(p => 
      p.id === updatedPaper.id ? updatedPaper : p
    ));
  };

  return {
    papers: filteredPapers,
    categories,
    categoryStats,
    selectedCategories,
    dateRange,
    handleCategorySelect,
    setDateRange,
    updatePaper,
  };
};