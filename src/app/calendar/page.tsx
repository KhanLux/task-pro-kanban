"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useBoard } from '@/hooks/useBoard';
import { IconArrowLeft, IconCalendar } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';
import TaskModal from '@/components/Modal/TaskModal';
import { Task } from '@/types';

// Use dynamic import to avoid SSR issues with localStorage and the calendar component
const Calendar = dynamic(() => import('@/components/Calendar'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ),
});

export default function CalendarPage() {
  const { board, loading, addTask, updateTask } = useBoard();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [currentColumnId, setCurrentColumnId] = useState<string | null>(null);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);

  const handleAddTask = (columnId: string) => {
    setCurrentColumnId(columnId);
    setCurrentTaskId(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (taskId: string) => {
    setCurrentTaskId(taskId);
    setIsTaskModalOpen(true);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <PageLayout>
      <div className="p-4">
        <div className="mb-4">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <IconArrowLeft className="h-4 w-4" />
              Volver al Tablero
            </Button>
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <IconCalendar className="h-6 w-6" />
            Calendario de Tareas
          </h1>
          <p className="text-muted-foreground">
            Visualiza y gestiona tus tareas en formato de calendario
          </p>
        </div>

        <Calendar 
          board={board} 
          onAddTask={handleAddTask} 
          onEditTask={handleEditTask} 
        />

        {isTaskModalOpen && (
          <TaskModal
            isOpen={isTaskModalOpen}
            onClose={() => setIsTaskModalOpen(false)}
            onSubmit={handleTaskSubmit}
            task={currentTaskId ? board.tasks[currentTaskId] : undefined}
          />
        )}
      </div>
    </PageLayout>
  );
}
