import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { processMessage } from './messageHandler.js';
import { validateUrl } from '../utils/validators.js';
import { BOT_CONFIG } from './config.js';
import { getStats } from './statsHandler.js';

dotenv.config();

let botInstance = null;

export function initBot() {
  if (botInstance) {
    return botInstance;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    throw new Error('Token Telegram non configurato');
  }

  botInstance = new TelegramBot(token, { 
    polling: {
      interval: 300,
      autoStart: true,
      params: {
        timeout: 10
      }
    },
    filepath: false
  });

  // Comando /start
  botInstance.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    botInstance.sendMessage(chatId, BOT_CONFIG.messages.welcome);
  });

  // Comando /stats - Mostra statistiche
  botInstance.onText(/\/stats/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      const stats = await getStats();
      const message = formatStatsMessage(stats);
      await botInstance.sendMessage(chatId, message, { parse_mode: 'HTML' });
    } catch (error) {
      console.error('Errore nel recupero delle statistiche:', error);
      await botInstance.sendMessage(chatId, BOT_CONFIG.messages.statsError);
    }
  });

  // Gestione messaggi
  botInstance.on('message', async (msg) => {
    const chatId = msg.chat.id;

    // Ignora i comandi
    if (msg.text?.startsWith('/')) return;

    try {
      if (msg.text && validateUrl(msg.text)) {
        await processMessage(botInstance, msg, 'link');
      } else if (msg.document) {
        const fileSize = msg.document.file_size;
        if (fileSize > BOT_CONFIG.maxFileSize) {
          throw new Error('File troppo grande');
        }
        await processMessage(botInstance, msg, 'file');
      } else if (msg.video) {
        const videoSize = msg.video.file_size;
        if (videoSize > BOT_CONFIG.maxVideoSize) {
          throw new Error('Video troppo grande');
        }
        await processMessage(botInstance, msg, 'video');
      } else if (msg.text) {
        botInstance.sendMessage(chatId, BOT_CONFIG.messages.invalidFormat);
      }
    } catch (error) {
      console.error('Errore nel processare il messaggio:', error);
      botInstance.sendMessage(
        chatId,
        error.message === 'File troppo grande' || error.message === 'Video troppo grande'
          ? `❌ ${error.message}. Dimensione massima: ${formatSize(BOT_CONFIG.maxFileSize)}`
          : BOT_CONFIG.messages.error
      );
    }
  });

  // Gestione errori di polling
  botInstance.on('polling_error', (error) => {
    console.error('Errore di polling:', error);
    if (error.code === 'ETELEGRAM' && error.message.includes('Conflict')) {
      console.log('Rilevato conflitto di polling. Riavvio del bot...');
      botInstance.stopPolling().then(() => {
        botInstance = null;
        setTimeout(initBot, 5000);
      });
    }
  });

  return botInstance;
}

function formatStatsMessage(stats) {
  return `📊 <b>Statistiche Paper</b>\n\n` +
    `📝 <b>Totale Paper:</b> ${stats.total}\n\n` +
    `🏷️ <b>Per Categoria:</b>\n${formatCategoryStats(stats.byCategory)}\n\n` +
    `📎 <b>Per Tipo:</b>\n${formatTypeStats(stats.byType)}\n\n` +
    `🔄 <b>Ultimi Aggiornamenti:</b>\n${formatRecentActivity(stats.recentActivity)}`;
}

function formatCategoryStats(categories) {
  return Object.entries(categories)
    .map(([category, count]) => `- ${category}: ${count}`)
    .join('\n');
}

function formatTypeStats(types) {
  return Object.entries(types)
    .map(([type, count]) => `- ${type}: ${count}`)
    .join('\n');
}

function formatRecentActivity(activities) {
  return activities
    .map(paper => `- ${paper.title} (${new Date(paper.updatedAt).toLocaleDateString('it-IT')})`)
    .join('\n');
}

function formatSize(bytes) {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)}MB`;
}

// Avvio del bot
if (import.meta.url === new URL(import.meta.url).href) {
  try {
    console.log('Avvio del bot Telegram...');
    initBot();
  } catch (error) {
    console.error('Errore nell\'avvio del bot:', error);
    process.exit(1);
  }
}