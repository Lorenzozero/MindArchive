import { getAllPapers } from '../utils/database.js';

export async function getStats() {
  try {
    const papers = await getAllPapers();
    
    const total = papers.length;
    
    const byCategory = papers.reduce((acc, paper) => {
      acc[paper.category] = (acc[paper.category] || 0) + 1;
      return acc;
    }, {});
    
    const byType = papers.reduce((acc, paper) => {
      acc[paper.source.type] = (acc[paper.source.type] || 0) + 1;
      return acc;
    }, {});
    
    const recentActivity = papers
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5);
    
    return {
      total,
      byCategory,
      byType,
      recentActivity
    };
  } catch (error) {
    console.error('Errore nel recupero delle statistiche:', error);
    throw error;
  }
}