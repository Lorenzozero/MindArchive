import axios from 'axios';
import { validateFileType, validateVideoType } from '../utils/validators.js';
import { extractContent } from '../utils/contentExtractor.js';

export async function downloadFile(fileUrl, fileType, fileName) {
  try {
    // Valida il tipo di file
    if (fileType === 'file' && !validateFileType(fileName)) {
      throw new Error('Tipo di file non supportato');
    }
    if (fileType === 'video' && !validateVideoType(fileName)) {
      throw new Error('Tipo di video non supportato');
    }

    // Scarica il file
    const response = await axios({
      method: 'GET',
      url: fileUrl,
      responseType: 'arraybuffer'
    });

    // Estrai il contenuto in base al tipo
    const content = await extractContent(response.data, fileType, fileName);
    
    return content;
  } catch (error) {
    console.error('Errore nel download o elaborazione del file:', error);
    throw error;
  }
}