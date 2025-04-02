export type Priority = 'low' | 'medium' | 'high';

export type Category = 'feature' | 'bug' | 'task' | 'improvement';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: Category;
  priority: Priority;
  dueDate: string; // ISO date string
  createdAt: string; // ISO date string
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface Board {
  tasks: {
    [key: string]: Task;
  };
  columns: {
    [key: string]: Column;
  };
  columnOrder: string[];
}
