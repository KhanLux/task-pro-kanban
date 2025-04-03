"use client";

import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Task as TaskType } from '@/types';
import { format, parseISO } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TaskProps {
  task: TaskType;
  index: number;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

// We'll use the Badge component with variants instead of these functions

const Task: React.FC<TaskProps> = ({ task, index, onEdit, onDelete }) => {
  const formatDueDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            "p-3 sm:p-4 mb-2 rounded-lg shadow-sm border transition-all duration-300",
            snapshot.isDragging
              ? "bg-accent shadow-md scale-105 rotate-1 z-10"
              : "bg-card hover:bg-card/80 hover:shadow-md hover:-translate-y-1",
            "animate-in",
            "active:scale-95"
          )}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-card-foreground text-sm sm:text-base break-words max-w-[180px] sm:max-w-[200px]">{task.title}</h3>
            <div className="flex space-x-1 ml-2 flex-shrink-0">
              <button
                onClick={() => onEdit(task.id)}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Editar tarea"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="text-muted-foreground hover:text-destructive transition-colors"
                aria-label="Eliminar tarea"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 line-clamp-2">
            {task.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-2">
            <Badge variant={task.category}>
              {task.category}
            </Badge>
            <Badge variant={task.priority}>
              {task.priority}
            </Badge>
          </div>

          <div className="text-xs text-muted-foreground">
            Fecha límite: {formatDueDate(task.dueDate)}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
