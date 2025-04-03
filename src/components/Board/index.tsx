"use client";

import React, { useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import Column from '@/components/Column';
import AddColumn from '@/components/Column/AddColumn';
import TaskModal from '@/components/Modal/TaskModal';
import ColumnModal from '@/components/Modal/ColumnModal';
import DeleteConfirmationModal from '@/components/Modal/DeleteConfirmationModal';
import { useBoard } from '@/hooks/useBoard';
import { Task } from '@/types';
import PageLayout from '@/components/layout/PageLayout';

const Board: React.FC = () => {
  const {
    board,
    loading,
    handleDragEnd,
    addTask,
    updateTask,
    deleteTask,
    addColumn,
    deleteColumn,
  } = useBoard();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentColumnId, setCurrentColumnId] = useState<string | null>(null);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [deleteType, setDeleteType] = useState<'task' | 'column'>('task');

  const handleAddTask = (columnId: string) => {
    setCurrentColumnId(columnId);
    setCurrentTaskId(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (taskId: string) => {
    setCurrentTaskId(taskId);
    setIsTaskModalOpen(true);
  };

  const handleDeleteTaskClick = (taskId: string) => {
    setCurrentTaskId(taskId);
    setDeleteType('task');
    setIsDeleteModalOpen(true);
  };

  const handleDeleteColumnClick = (columnId: string) => {
    setCurrentColumnId(columnId);
    setDeleteType('column');
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteType === 'task' && currentTaskId) {
      deleteTask(currentTaskId);
    } else if (deleteType === 'column' && currentColumnId) {
      deleteColumn(currentColumnId);
    }
    setIsDeleteModalOpen(false);
  };

  const handleTaskSubmit = (
    title: string,
    description: string,
    category: Task['category'],
    priority: Task['priority'],
    dueDate: string
  ) => {
    if (currentTaskId) {
      // Update existing task
      updateTask(currentTaskId, title, description, category, priority, dueDate);
    } else if (currentColumnId) {
      // Add new task
      addTask(currentColumnId, title, description, category, priority, dueDate);
    }
    setIsTaskModalOpen(false);
  };

  const handleColumnSubmit = (title: string) => {
    addColumn(title);
    setIsColumnModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <PageLayout>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex gap-3 sm:gap-4 p-2 sm:p-4 overflow-x-auto h-[calc(100vh-140px)] pb-4 touch-pan-x flex-grow"
            >
              {board.columnOrder.map((columnId, index) => {
                const column = board.columns[columnId];
                const tasks = column.taskIds.map(
                  (taskId) => board.tasks[taskId]
                );

                return (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    index={index}
                    onAddTask={handleAddTask}
                    onEditTask={handleEditTask}
                    onDeleteTask={handleDeleteTaskClick}
                    onDeleteColumn={handleDeleteColumnClick}
                  />
                );
              })}
              <AddColumn onAddColumn={() => setIsColumnModalOpen(true)} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {isTaskModalOpen && (
        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          onSubmit={handleTaskSubmit}
          task={currentTaskId ? board.tasks[currentTaskId] : undefined}
        />
      )}

      {isColumnModalOpen && (
        <ColumnModal
          isOpen={isColumnModalOpen}
          onClose={() => setIsColumnModalOpen(false)}
          onSubmit={handleColumnSubmit}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          type={deleteType}
          itemName={
            deleteType === 'task' && currentTaskId
              ? board.tasks[currentTaskId]?.title
              : deleteType === 'column' && currentColumnId
              ? board.columns[currentColumnId]?.title
              : ''
          }
        />
      )}
    </PageLayout>
  );
};

export default Board;
