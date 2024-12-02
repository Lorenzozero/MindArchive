export const BOT_CONFIG = {
  // Limiti di dimensione file
  maxFileSize: 20 * 1024 * 1024, // 20MB
  maxVideoSize: 50 * 1024 * 1024, // 50MB

  // Formati supportati
  supportedFileTypes: ['.pdf', '.doc', '.docx', '.txt'],
  supportedVideoTypes: ['.mp4', '.mov', '.avi', '.mkv'],

  // Messaggi di risposta
  messages: {
    welcome: 'Benvenuto nel sistema di gestione paper! 🤖\n\n' +
            'Comandi disponibili:\n' +
            '/start - Mostra questo messaggio\n' +
            '/stats - Visualizza statistiche\n\n' +
            'Puoi inviarmi:\n' +
            '- Link a articoli o risorse 🔗\n' +
            '- File PDF o documenti 📄\n' +
            '- Video informativi 🎥\n\n' +
            'Analizzerò il contenuto e creerò un paper strutturato.',
    
    processing: '🔄 Sto analizzando il contenuto...',
    
    success: (paper) => 
      `✅ Paper generato e salvato con successo!\n\n` +
      `📝 Titolo: ${paper.title}\n` +
      `🏷️ Categoria: ${paper.category}\n\n` +
      `🌐 Puoi visualizzarlo e modificarlo nella dashboard web.`,
    
    error: '❌ Si è verificato un errore nel processare il contenuto.\n' +
           'Per favore, verifica che il formato sia corretto e riprova.',
    
    invalidFormat: '❌ Per favore, invia un link valido, un file o un video.\n' +
                  'Questi sono gli unici formati che posso processare.',
    
    statsError: '❌ Si è verificato un errore nel recupero delle statistiche.\n' +
                'Per favore, riprova più tardi.'
  }
};