"use client";

import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import Task from '@/components/Task';
import { Column as ColumnType, Task as TaskType } from '@/types';

interface ColumnProps {
  column: ColumnType;
  tasks: TaskType[];
  index: number;
  onAddTask: (columnId: string) => void;
  onEditTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onDeleteColumn: (columnId: string) => void;
}

const Column: React.FC<ColumnProps> = ({
  column,
  tasks,
  index,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onDeleteColumn,
}) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="w-[280px] sm:w-72 flex-shrink-0 bg-card/50 rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-md group animate-in" style={{ animationDelay: `${index * 100}ms` }}
        >
          <div
            {...provided.dragHandleProps}
            className="p-3 flex justify-between items-center bg-secondary rounded-t-lg transition-colors duration-300 group-hover:bg-secondary/80"
          >
            <h2 className="font-semibold text-secondary-foreground">{column.title}</h2>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => onAddTask(column.id)}
                className="p-1 text-muted-foreground hover:text-primary rounded transition-all duration-200 hover:scale-110 active:scale-95"
                aria-label="Add task"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
              <button
                onClick={() => onDeleteColumn(column.id)}
                className="p-1 text-muted-foreground hover:text-destructive rounded transition-all duration-200 hover:scale-110 active:scale-95"
                aria-label="Delete column"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`p-2 min-h-[180px] sm:min-h-[200px] ${
                  snapshot.isDraggingOver ? 'bg-accent/50' : ''
                } transition-colors duration-200 h-full max-h-[calc(100vh-180px)] sm:max-h-[calc(100vh-200px)] overflow-y-auto`}
              >
                {tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    task={task}
                    index={index}
                    onEdit={onEditTask}
                    onDelete={onDeleteTask}
                  />
                ))}
                {provided.placeholder}
                {tasks.length === 0 && (
                  <div className="text-center py-6 text-muted-foreground text-sm animate-in opacity-70 italic">
                    <div className="mb-2 opacity-50">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    No tasks yet
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
