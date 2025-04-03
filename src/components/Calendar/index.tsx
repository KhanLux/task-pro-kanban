"use client";

import React, { useState, useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Board, Task } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IconFilter, IconPlus } from '@tabler/icons-react';

// Define filter types
type FilterType = 'all' | 'priority' | 'category' | 'status';
type FilterValue = string | null;

interface CalendarProps {
  board: Board;
  onAddTask: (columnId: string) => void;
  onEditTask: (taskId: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ board, onAddTask, onEditTask }) => {
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [filterValue, setFilterValue] = useState<FilterValue>(null);

  // Convert tasks to calendar events
  const events = useMemo(() => {
    const allTasks = Object.values(board.tasks);

    // Apply filters
    let filteredTasks = allTasks;

    if (filterType === 'priority' && filterValue) {
      filteredTasks = allTasks.filter(task => task.priority === filterValue);
    } else if (filterType === 'category' && filterValue) {
      filteredTasks = allTasks.filter(task => task.category === filterValue);
    } else if (filterType === 'status' && filterValue) {
      // Find column by status
      const columnId = Object.keys(board.columns).find(
        id => board.columns[id].title.toLowerCase() === filterValue.toLowerCase()
      );

      if (columnId) {
        const taskIds = board.columns[columnId].taskIds;
        filteredTasks = allTasks.filter(task => taskIds.includes(task.id));
      }
    }

    // Convert tasks to calendar events
    return filteredTasks.map(task => {
      const dueDate = parseISO(task.dueDate);

      // Find which column contains this task
      const columnId = Object.keys(board.columns).find(id =>
        board.columns[id].taskIds.includes(task.id)
      );

      const status = columnId ? board.columns[columnId].title : 'Unknown';

      return {
        id: task.id,
        title: task.title,
        start: dueDate,
        end: dueDate,
        allDay: true,
        resource: {
          ...task,
          status
        },
      };
    });
  }, [board, filterType, filterValue]);

  // Get column options for filtering
  const columnOptions = useMemo(() => {
    return board.columnOrder.map(columnId => ({
      value: board.columns[columnId].title.toLowerCase(),
      label: board.columns[columnId].title
    }));
  }, [board]);

  // Handle adding a new task
  const handleAddTask = () => {
    // Default to first column (To Do)
    const firstColumnId = board.columnOrder[0];
    onAddTask(firstColumnId);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddTask}
            className="flex items-center gap-1"
          >
            <IconPlus className="h-4 w-4" />
            Nueva Tarea
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1">
            <IconFilter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filtrar por:</span>
          </div>

          <Select
            value={filterType}
            onValueChange={(value) => {
              setFilterType(value as FilterType);
              setFilterValue(null);
            }}
          >
            <SelectTrigger className="w-[120px] h-9">
              <SelectValue placeholder="Tipo de filtro" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="priority">Prioridad</SelectItem>
              <SelectItem value="category">Categoría</SelectItem>
              <SelectItem value="status">Estado</SelectItem>
            </SelectContent>
          </Select>

          {filterType === 'priority' && (
            <Select
              value={filterValue || ''}
              onValueChange={(value) => setFilterValue(value)}
            >
              <SelectTrigger className="w-[120px] h-9">
                <SelectValue placeholder="Prioridad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="medium">Media</SelectItem>
                <SelectItem value="low">Baja</SelectItem>
              </SelectContent>
            </Select>
          )}

          {filterType === 'category' && (
            <Select
              value={filterValue || ''}
              onValueChange={(value) => setFilterValue(value)}
            >
              <SelectTrigger className="w-[120px] h-9">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="feature">Función</SelectItem>
                <SelectItem value="bug">Error</SelectItem>
                <SelectItem value="task">Tarea</SelectItem>
                <SelectItem value="improvement">Mejora</SelectItem>
              </SelectContent>
            </Select>
          )}

          {filterType === 'status' && (
            <Select
              value={filterValue || ''}
              onValueChange={(value) => setFilterValue(value)}
            >
              <SelectTrigger className="w-[120px] h-9">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                {columnOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {filterType !== 'all' && filterValue && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setFilterType('all');
                setFilterValue(null);
              }}
              className="h-9"
            >
              Limpiar filtros
            </Button>
          )}
        </div>
      </div>

      <Card className="flex-grow p-4 overflow-hidden">
        <div className="h-[calc(100vh-240px)]">
          <div className="bg-card p-4 rounded-lg border border-border h-full overflow-auto">
            <h3 className="text-lg font-medium mb-4">Tareas Programadas</h3>

            {events.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <p>No hay tareas programadas en este período</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddTask}
                  className="mt-4"
                >
                  Añadir una tarea
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Group events by date */}
                {Object.entries(
                  events.reduce((acc, event) => {
                    const dateKey = format(event.start, 'yyyy-MM-dd');
                    if (!acc[dateKey]) {
                      acc[dateKey] = [];
                    }
                    acc[dateKey].push(event);
                    return acc;
                  }, {} as Record<string, typeof events>)
                )
                  .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
                  .map(([dateKey, dateEvents]) => (
                    <div key={dateKey} className="border border-border rounded-lg overflow-hidden">
                      <div className="bg-secondary p-2 font-medium">
                        {format(parseISO(dateKey), "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                      </div>
                      <div className="divide-y divide-border">
                        {dateEvents.map(event => {
                          const task = event.resource;

                          // Find which column contains this task
                          const columnId = Object.keys(board.columns).find(id =>
                            board.columns[id].taskIds.includes(task.id)
                          );

                          // Determine color based on status
                          let statusColor = '';
                          if (columnId) {
                            const columnIndex = board.columnOrder.indexOf(columnId);
                            if (columnIndex === 0) statusColor = 'border-l-yellow-500';
                            else if (columnIndex === board.columnOrder.length - 1) statusColor = 'border-l-green-500';
                            else statusColor = 'border-l-blue-500';
                          }

                          return (
                            <div
                              key={event.id}
                              className={`p-3 border-l-4 ${statusColor} hover:bg-accent/20 cursor-pointer transition-colors`}
                              onClick={() => onEditTask(event.id)}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{task.title}</h4>
                                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                    {task.description}
                                  </p>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                  <Badge variant={task.priority}>
                                    {task.priority}
                                  </Badge>
                                  <Badge variant={task.category}>
                                    {task.category}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                                <span>Fecha límite: {format(event.start, 'dd/MM/yyyy')}</span>
                                <span>Estado: {task.status}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Calendar;
