import { generatePaper } from '../utils/paperGenerator.js';
import { saveToDatabase } from '../utils/database.js';
import { downloadFile } from './fileHandler.js';
import { BOT_CONFIG } from './config.js';

export async function processMessage(bot, msg, type) {
  const chatId = msg.chat.id;

  try {
    // Invia messaggio di elaborazione
    const processingMsg = await bot.sendMessage(
      chatId,
      BOT_CONFIG.messages.processing
    );

    let sourceUrl;
    let content;
    let fileName = '';

    // Gestione dei diversi tipi di contenuto
    switch (type) {
      case 'link':
        sourceUrl = msg.text;
        content = await downloadFile(sourceUrl, type);
        break;
        
      case 'file':
        fileName = msg.document.file_name;
        sourceUrl = await bot.getFileLink(msg.document.file_id);
        content = await downloadFile(sourceUrl, type, fileName);
        break;
        
      case 'video':
        fileName = msg.video.file_name;
        sourceUrl = await bot.getFileLink(msg.video.file_id);
        content = await downloadFile(sourceUrl, type, fileName);
        break;
        
      default:
        throw new Error('Tipo di contenuto non supportato');
    }

    // Genera e salva il paper
    const paper = await generatePaper(content, type, sourceUrl);
    await saveToDatabase(paper);

    // Aggiorna il messaggio con il risultato
    await bot.editMessageText(
      BOT_CONFIG.messages.success(paper),
      {
        chat_id: chatId,
        message_id: processingMsg.message_id,
        parse_mode: 'HTML',
      }
    );
  } catch (error) {
    console.error('Errore nel processare il messaggio:', error);
    
    // Gestione errori specifici
    let errorMessage = BOT_CONFIG.messages.error;
    if (error.message.includes('non supportato')) {
      errorMessage = `❌ ${error.message}.\nFormati supportati:\n` +
        `📄 File: ${BOT_CONFIG.supportedFileTypes.join(', ')}\n` +
        `🎥 Video: ${BOT_CONFIG.supportedVideoTypes.join(', ')}`;
    }
    
    bot.sendMessage(chatId, errorMessage);
  }
}