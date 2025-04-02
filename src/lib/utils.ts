import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { v4 as uuidv4 } from 'uuid';
import { Board, Task, Column } from '@/types';
import { format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateId = (): string => uuidv4();

export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const createTask = (
  title: string,
  description: string,
  category: Task['category'],
  priority: Task['priority'],
  dueDate: string
): Task => {
  return {
    id: generateId(),
    title,
    description,
    category,
    priority,
    dueDate,
    createdAt: new Date().toISOString(),
  };
};

export const createColumn = (title: string): Column => {
  return {
    id: generateId(),
    title,
    taskIds: [],
  };
};

export const getInitialData = (): Board => {
  // Create columns
  const todoColumn: Column = {
    id: 'column-1',
    title: 'To Do',
    taskIds: ['task-1', 'task-2', 'task-3'],
  };

  const inProgressColumn: Column = {
    id: 'column-2',
    title: 'In Progress',
    taskIds: ['task-4'],
  };

  const doneColumn: Column = {
    id: 'column-3',
    title: 'Done',
    taskIds: ['task-5'],
  };

  // Create tasks
  const task1: Task = {
    id: 'task-1',
    title: 'Create project structure',
    description: 'Set up the initial project structure and dependencies',
    category: 'task',
    priority: 'high',
    dueDate: formatDate(new Date(Date.now() + 86400000)), // Tomorrow
    createdAt: new Date().toISOString(),
  };

  const task2: Task = {
    id: 'task-2',
    title: 'Design UI components',
    description: 'Create UI components for the Kanban board',
    category: 'feature',
    priority: 'medium',
    dueDate: formatDate(new Date(Date.now() + 2 * 86400000)), // Day after tomorrow
    createdAt: new Date().toISOString(),
  };

  const task3: Task = {
    id: 'task-3',
    title: 'Implement drag and drop',
    description: 'Add drag and drop functionality to the Kanban board',
    category: 'feature',
    priority: 'high',
    dueDate: formatDate(new Date(Date.now() + 3 * 86400000)),
    createdAt: new Date().toISOString(),
  };

  const task4: Task = {
    id: 'task-4',
    title: 'Fix responsive layout',
    description: 'Make the Kanban board responsive on all devices',
    category: 'bug',
    priority: 'medium',
    dueDate: formatDate(new Date(Date.now() + 1 * 86400000)),
    createdAt: new Date().toISOString(),
  };

  const task5: Task = {
    id: 'task-5',
    title: 'Add task filtering',
    description: 'Implement filtering tasks by category and priority',
    category: 'improvement',
    priority: 'low',
    dueDate: formatDate(new Date(Date.now() + 5 * 86400000)),
    createdAt: new Date().toISOString(),
  };

  return {
    tasks: {
      'task-1': task1,
      'task-2': task2,
      'task-3': task3,
      'task-4': task4,
      'task-5': task5,
    },
    columns: {
      'column-1': todoColumn,
      'column-2': inProgressColumn,
      'column-3': doneColumn,
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
  };
};