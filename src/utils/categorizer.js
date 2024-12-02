// Categorie predefinite
const categories = [
  'Tecnologia',
  'Ricerca',
  'Sviluppo',
  'Innovazione',
  'AI',
  'Web',
  'Mobile',
  'Cloud'
];

// Parole chiave per categoria
const categoryKeywords = {
  'Tecnologia': ['tech', 'tecnologia', 'software', 'hardware', 'digital'],
  'Ricerca': ['ricerca', 'studio', 'analisi', 'paper', 'pubblicazione'],
  'Sviluppo': ['sviluppo', 'programmazione', 'coding', 'developer'],
  'Innovazione': ['innovazione', 'startup', 'futuro', 'novità'],
  'AI': ['ai', 'artificial intelligence', 'machine learning', 'deep learning'],
  'Web': ['web', 'internet', 'browser', 'website', 'app'],
  'Mobile': ['mobile', 'app', 'android', 'ios', 'smartphone'],
  'Cloud': ['cloud', 'aws', 'azure', 'saas', 'paas']
};

export async function categorizeContent(content) {
  const contentLower = content.toLowerCase();
  
  // Conta le occorrenze delle parole chiave per ogni categoria
  const scores = {};
  
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    scores[category] = keywords.reduce((score, keyword) => {
      const regex = new RegExp(keyword, 'gi');
      const matches = contentLower.match(regex);
      return score + (matches ? matches.length : 0);
    }, 0);
  }
  
  // Trova la categoria con il punteggio più alto
  const bestCategory = Object.entries(scores).reduce((best, [category, score]) => {
    return score > best.score ? { category, score } : best;
  }, { category: 'Altro', score: 0 });
  
  return bestCategory.score > 0 ? bestCategory.category : 'Altro';
}