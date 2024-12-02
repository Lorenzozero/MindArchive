export async function generateSummary(content) {
  // Dividi il contenuto in frasi
  const sentences = content.match(/[^.!?]+[.!?]+/g) || [];
  
  // Seleziona le frasi più rilevanti (per ora prendiamo le prime 3)
  const summary = sentences.slice(0, 3).join(' ');
  
  return summary;
}