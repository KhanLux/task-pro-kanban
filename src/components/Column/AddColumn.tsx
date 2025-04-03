"use client";

import React from 'react';
import { IconPlus, IconLayoutColumns } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

interface AddColumnProps {
  onAddColumn: () => void;
}

const AddColumn: React.FC<AddColumnProps> = ({ onAddColumn }) => {
  return (
    <button
      onClick={onAddColumn}
      className={cn(
        "w-[280px] sm:w-72 h-[200px] flex-shrink-0 rounded-lg border border-dashed border-border",
        "flex flex-col items-center justify-center gap-3 p-4 text-muted-foreground",
        "transition-all duration-300 hover:border-primary/50 hover:text-primary hover:shadow-md",
        "group animate-in"
      )}
      aria-label="Añadir columna"
    >
      <div className="relative">
        <IconLayoutColumns
          className="h-10 w-10 transition-all duration-300 group-hover:scale-110"
          stroke={1.5}
        />
        <div className="absolute -right-1 -bottom-1 bg-background rounded-full border border-border group-hover:border-primary">
          <IconPlus
            className="h-5 w-5 text-muted-foreground group-hover:text-primary"
            stroke={2}
          />
        </div>
      </div>
      <div className="text-center">
        <p className="font-medium">Añadir Columna</p>
        <p className="text-xs mt-1 opacity-70">Crea una nueva columna para organizar tus tareas</p>
      </div>
    </button>
  );
};

export default AddColumn;
