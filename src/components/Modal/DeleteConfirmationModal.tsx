"use client";

import React from 'react';
// Using a simpler modal approach for now
import { Button } from '@/components/ui/button';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: 'task' | 'column';
  itemName: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  type,
  itemName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-md border">
        <div className="p-4 sm:p-6">
          <h2 className="text-xl font-semibold mb-2 text-card-foreground">
            Confirmar Eliminación
          </h2>
          <p className="text-muted-foreground mb-4">
            ¿Estás seguro de que quieres eliminar {type === 'task' ? 'esta tarea' : 'esta columna'}
            {itemName ? `: "${itemName}"` : ''}? Esta acción no se puede deshacer.
          </p>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="button" variant="destructive" onClick={onConfirm}>
              Eliminar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
