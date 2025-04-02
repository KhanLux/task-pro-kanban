"use client";

import { useState, useEffect } from 'react';
import { Board, Task, Column } from '@/types';
import { getInitialData, createTask, generateId } from '@/lib/utils';
import { DropResult } from '@hello-pangea/dnd';

export const useBoard = () => {
  const [board, setBoard] = useState<Board>(getInitialData());
  const [loading, setLoading] = useState<boolean>(true);

  // Load board data from localStorage on initial render
  useEffect(() => {
    const savedBoard = localStorage.getItem('kanban-board');
    if (savedBoard) {
      setBoard(JSON.parse(savedBoard));
    }
    setLoading(false);
  }, []);

  // Save board data to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('kanban-board', JSON.stringify(board));
    }
  }, [board, loading]);

  // Handle drag and drop
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    // If there's no destination, do nothing
    if (!destination) return;

    // If the item was dropped in the same position, do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If we're dragging columns
    if (type === 'column') {
      const newColumnOrder = Array.from(board.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setBoard({
        ...board,
        columnOrder: newColumnOrder,
      });
      return;
    }

    // Source and destination columns
    const startColumn = board.columns[source.droppableId];
    const finishColumn = board.columns[destination.droppableId];

    // If the task was moved within the same column
    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      setBoard({
        ...board,
        columns: {
          ...board.columns,
          [newColumn.id]: newColumn,
        },
      });
      return;
    }

    // If the task was moved to a different column
    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStartColumn = {
      ...startColumn,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = {
      ...finishColumn,
      taskIds: finishTaskIds,
    };

    setBoard({
      ...board,
      columns: {
        ...board.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    });
  };

  // Add a new task
  const addTask = (
    columnId: string,
    title: string,
    description: string,
    category: Task['category'],
    priority: Task['priority'],
    dueDate: string
  ) => {
    const newTask = createTask(title, description, category, priority, dueDate);
    const column = board.columns[columnId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.push(newTask.id);

    setBoard({
      ...board,
      tasks: {
        ...board.tasks,
        [newTask.id]: newTask,
      },
      columns: {
        ...board.columns,
        [columnId]: {
          ...column,
          taskIds: newTaskIds,
        },
      },
    });

    return newTask;
  };

  // Update an existing task
  const updateTask = (
    taskId: string,
    title: string,
    description: string,
    category: Task['category'],
    priority: Task['priority'],
    dueDate: string
  ) => {
    const task = board.tasks[taskId];
    const updatedTask = {
      ...task,
      title,
      description,
      category,
      priority,
      dueDate,
    };

    setBoard({
      ...board,
      tasks: {
        ...board.tasks,
        [taskId]: updatedTask,
      },
    });

    return updatedTask;
  };

  // Delete a task
  const deleteTask = (taskId: string) => {
    // Find which column contains the task
    const columnId = Object.keys(board.columns).find((id) =>
      board.columns[id].taskIds.includes(taskId)
    );

    if (!columnId) return;

    const column = board.columns[columnId];
    const newTaskIds = column.taskIds.filter((id) => id !== taskId);

    // Create a copy of tasks and delete the task
    const newTasks = { ...board.tasks };
    delete newTasks[taskId];

    setBoard({
      ...board,
      tasks: newTasks,
      columns: {
        ...board.columns,
        [columnId]: {
          ...column,
          taskIds: newTaskIds,
        },
      },
    });
  };

  // Add a new column
  const addColumn = (title: string) => {
    const newColumnId = `column-${generateId()}`;
    const newColumn: Column = {
      id: newColumnId,
      title,
      taskIds: [],
    };

    setBoard({
      ...board,
      columns: {
        ...board.columns,
        [newColumnId]: newColumn,
      },
      columnOrder: [...board.columnOrder, newColumnId],
    });

    return newColumn;
  };

  // Delete a column
  const deleteColumn = (columnId: string) => {
    // Get all task IDs in the column
    const taskIds = board.columns[columnId].taskIds;

    // Create a copy of columns and tasks
    const newColumns = { ...board.columns };
    const newTasks = { ...board.tasks };

    // Delete the column
    delete newColumns[columnId];

    // Delete all tasks in the column
    taskIds.forEach((taskId) => {
      delete newTasks[taskId];
    });

    // Update column order
    const newColumnOrder = board.columnOrder.filter((id) => id !== columnId);

    setBoard({
      tasks: newTasks,
      columns: newColumns,
      columnOrder: newColumnOrder,
    });
  };

  return {
    board,
    loading,
    handleDragEnd,
    addTask,
    updateTask,
    deleteTask,
    addColumn,
    deleteColumn,
  };
};
