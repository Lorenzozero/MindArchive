import { extractContent } from './contentExtractor.js';
import { categorizeContent } from './categorizer.js';
import { generateSummary } from './summarizer.js';

export async function generatePaper(content, type, sourceUrl) {
  try {
    // Estrai il contenuto in base al tipo
    const extractedContent = await extractContent(content, type);
    
    // Categorizza il contenuto
    const category = await categorizeContent(extractedContent);
    
    // Genera un riassunto
    const summary = await generateSummary(extractedContent);
    
    // Crea il paper
    const paper = {
      id: generateUniqueId(),
      title: generateTitle(extractedContent),
      content: summary,
      category: category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      source: {
        type,
        url: sourceUrl
      }
    };
    
    return paper;
  } catch (error) {
    console.error('Errore nella generazione del paper:', error);
    throw error;
  }
}

function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function generateTitle(content) {
  // Implementazione semplice: prendi le prime parole del contenuto
  const words = content.split(' ').slice(0, 5).join(' ');
  return words + '...';
}