"use client";

import React, { useState } from 'react';
// Using a simpler modal approach for now
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
}

const ColumnModal: React.FC<ColumnModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title);
    setTitle('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-md border">
        <div className="p-4 sm:p-6">
          <h2 className="text-xl font-semibold mb-4 text-card-foreground">
            Crear Nueva Columna
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-card-foreground">
                Título
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="ej., Por Hacer, En Progreso, Terminado"
                required
              />
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">
                Crear
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ColumnModal;
