import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { LedEffect } from './ui/LedEffect';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import type { EditModalProps, Paper } from '../types';

export const EditModal: React.FC<EditModalProps> = ({
  paper,
  isOpen,
  onClose,
  onSave,
}) => {
  const [editedPaper, setEditedPaper] = useState<Paper | null>(null);

  useEffect(() => {
    setEditedPaper(paper);
  }, [paper]);

  if (!isOpen || !editedPaper) return null;

  const handleSave = () => {
    if (editedPaper) {
      onSave({
        ...editedPaper,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-gray-900 rounded-lg p-6 m-4 animate-in fade-in duration-300">
        <LedEffect color="#00a3ff" className="opacity-5" />
        
        <Button
          variant="secondary"
          onClick={onClose}
          className="absolute top-4 right-4 p-2"
        >
          <X className="w-6 h-6" />
        </Button>

        <h2 className="text-xl font-bold mb-6 text-white">Modifica Paper</h2>
        
        <div className="space-y-4">
          <Input
            label="Titolo"
            value={editedPaper.title}
            onChange={(e) => setEditedPaper({ ...editedPaper, title: e.target.value })}
          />

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Contenuto
            </label>
            <textarea
              value={editedPaper.content}
              onChange={(e) => setEditedPaper({ ...editedPaper, content: e.target.value })}
              rows={6}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg 
                text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
            />
          </div>

          <Input
            label="Categoria"
            value={editedPaper.category}
            onChange={(e) => setEditedPaper({ ...editedPaper, category: e.target.value })}
          />

          <div className="flex justify-end space-x-3 mt-6">
            <Button onClick={onClose}>
              Annulla
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Salva
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};