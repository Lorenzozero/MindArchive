import type { Paper } from '../types';

export const mockPapers: Paper[] = [
  {
    id: '1',
    title: 'Intelligenza Artificiale nel 2024',
    content: 'Analisi approfondita delle tendenze AI nel 2024 e le loro applicazioni nel mondo reale. Scopri come le aziende stanno implementando soluzioni innovative.',
    category: 'Tecnologia',
    createdAt: '2024-01-12T10:00:00Z',
    updatedAt: '2024-01-12T10:00:00Z',
    source: {
      type: 'link',
      url: 'https://example.com/ai-2024'
    }
  },
  {
    id: '2',
    title: 'Machine Learning Applicato',
    content: 'Studio pratico sulle applicazioni del machine learning in ambito industriale. Casi studio e implementazioni reali.',
    category: 'Ricerca',
    createdAt: '2024-01-11T15:30:00Z',
    updatedAt: '2024-01-11T15:30:00Z',
    source: {
      type: 'file',
      url: 'https://example.com/ml-study.pdf'
    }
  },
  {
    id: '3',
    title: 'Robotica Avanzata',
    content: 'Panoramica sugli ultimi sviluppi nel campo della robotica e dell\'automazione industriale.',
    category: 'Tecnologia',
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-10T09:15:00Z',
    source: {
      type: 'video',
      url: 'https://example.com/robotics-video'
    }
  }
];