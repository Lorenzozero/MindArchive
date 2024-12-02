import axios from 'axios';
import { JSDOM } from 'jsdom';
import { convert } from 'html-to-text';
import { BOT_CONFIG } from '../bot/config.js';

export async function extractContent(source, type, fileName = '') {
  try {
    switch (type) {
      case 'link':
        return await extractFromUrl(source);
      case 'file':
        return await extractFromFile(source, fileName);
      case 'video':
        return await extractFromVideo(source, fileName);
      default:
        throw new Error('Tipo di contenuto non supportato');
    }
  } catch (error) {
    console.error('Errore nell\'estrazione del contenuto:', error);
    throw error;
  }
}

async function extractFromUrl(url) {
  try {
    const response = await axios.get(url);
    const dom = new JSDOM(response.data);
    
    // Cerca il contenuto principale
    const mainContent = dom.window.document.querySelector('article, main, [role="main"]') || 
                       dom.window.document.body;
    
    // Rimuovi elementi non necessari
    const elementsToRemove = mainContent.querySelectorAll(
      'nav, footer, header, script, style, iframe, .ad, .advertisement, .social-share'
    );
    elementsToRemove.forEach(el => el.remove());
    
    // Estrai il testo
    const text = convert(mainContent.innerHTML, {
      wordwrap: 130,
      ignoreHref: true,
      ignoreImage: true,
      preserveNewlines: true,
      selectors: [
        { selector: 'img', format: 'skip' },
        { selector: 'a', options: { ignoreHref: true } }
      ]
    });
    
    return cleanText(text);
  } catch (error) {
    console.error('Errore nell\'estrazione del contenuto dall\'URL:', error);
    throw error;
  }
}

async function extractFromFile(buffer, fileName) {
  try {
    const fileExt = fileName.toLowerCase().slice(fileName.lastIndexOf('.'));
    
    // Gestione diversi tipi di file
    switch (fileExt) {
      case '.pdf':
        // Implementa estrazione PDF
        return 'Contenuto PDF estratto';
      case '.txt':
        return buffer.toString('utf-8');
      case '.doc':
      case '.docx':
        // Implementa estrazione DOC/DOCX
        return 'Contenuto DOC estratto';
      default:
        throw new Error('Formato file non supportato');
    }
  } catch (error) {
    console.error('Errore nell\'estrazione del contenuto dal file:', error);
    throw error;
  }
}

async function extractFromVideo(buffer, fileName) {
  try {
    // Per ora restituiamo un placeholder
    // In futuro si potrebbe implementare l'estrazione di metadati o trascrizione
    return `Video analizzato: ${fileName}`;
  } catch (error) {
    console.error('Errore nell\'estrazione del contenuto dal video:', error);
    throw error;
  }
}

function cleanText(text) {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\n\s*\n/g, '\n')
    .trim();
}