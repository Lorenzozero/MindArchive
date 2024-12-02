import { openDB } from 'idb';

const DB_NAME = 'papersDB';
const STORE_NAME = 'papers';
const DB_VERSION = 1;

let db = null;

async function initDB() {
  if (db) return db;

  db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('category', 'category');
        store.createIndex('createdAt', 'createdAt');
        store.createIndex('updatedAt', 'updatedAt');
      }
    },
  });

  return db;
}

export async function saveToDatabase(paper) {
  try {
    const db = await initDB();
    await db.put(STORE_NAME, {
      ...paper,
      updatedAt: new Date().toISOString()
    });
    
    // Emetti un evento per notificare l'UI
    window.dispatchEvent(new CustomEvent('paperUpdated', { detail: paper }));
    
    return true;
  } catch (error) {
    console.error('Errore nel salvataggio del paper:', error);
    throw error;
  }
}

export async function getAllPapers() {
  try {
    const db = await initDB();
    return await db.getAll(STORE_NAME);
  } catch (error) {
    console.error('Errore nel recupero dei paper:', error);
    throw error;
  }
}

export async function getPaperById(id) {
  try {
    const db = await initDB();
    return await db.get(STORE_NAME, id);
  } catch (error) {
    console.error('Errore nel recupero del paper:', error);
    throw error;
  }
}

export async function updatePaper(paper) {
  try {
    const db = await initDB();
    const updatedPaper = {
      ...paper,
      updatedAt: new Date().toISOString()
    };
    await db.put(STORE_NAME, updatedPaper);
    
    // Emetti un evento per notificare l'UI
    window.dispatchEvent(new CustomEvent('paperUpdated', { detail: updatedPaper }));
    
    return true;
  } catch (error) {
    console.error('Errore nell\'aggiornamento del paper:', error);
    throw error;
  }
}

export async function getPapersByCategory(category) {
  try {
    const db = await initDB();
    const index = db.transaction(STORE_NAME).store.index('category');
    return await index.getAll(category);
  } catch (error) {
    console.error('Errore nel recupero dei paper per categoria:', error);
    throw error;
  }
}

export async function getPapersByDateRange(startDate, endDate) {
  try {
    const db = await initDB();
    const papers = await db.getAll(STORE_NAME);
    return papers.filter(paper => {
      const paperDate = new Date(paper.createdAt);
      return paperDate >= new Date(startDate) && paperDate <= new Date(endDate);
    });
  } catch (error) {
    console.error('Errore nel recupero dei paper per data:', error);
    throw error;
  }
}