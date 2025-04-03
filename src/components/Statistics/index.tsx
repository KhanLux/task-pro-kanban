"use client";

import React, { useMemo } from 'react';
import { Board } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { IconChartPie, IconCheckbox, IconClock, IconList } from '@tabler/icons-react';

interface StatisticsProps {
  board: Board;
}

const Statistics: React.FC<StatisticsProps> = ({ board }) => {
  // Calculate statistics
  const stats = useMemo(() => {
    const allTasks = Object.values(board.tasks);
    const totalTasks = allTasks.length;

    // Find completed tasks (assuming the last column is "Completed" or "Done")
    const lastColumnId = board.columnOrder[board.columnOrder.length - 1];
    const completedTaskIds = board.columns[lastColumnId]?.taskIds || [];
    const completedTasks = completedTaskIds.length;

    // Find in-progress tasks (assuming the middle column is "In Progress")
    const middleColumnId = board.columnOrder.length > 1 ? board.columnOrder[1] : null;
    const inProgressTaskIds = middleColumnId ? board.columns[middleColumnId]?.taskIds || [] : [];
    const inProgressTasks = inProgressTaskIds.length;

    // Find to-do tasks (assuming the first column is "To Do")
    const firstColumnId = board.columnOrder[0];
    const todoTaskIds = board.columns[firstColumnId]?.taskIds || [];
    const todoTasks = todoTaskIds.length;

    // Calculate completion percentage
    const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    // Count tasks by priority
    const tasksByPriority = {
      high: allTasks.filter(task => task.priority === 'high').length,
      medium: allTasks.filter(task => task.priority === 'medium').length,
      low: allTasks.filter(task => task.priority === 'low').length,
    };

    // Count tasks by category
    const tasksByCategory = {
      feature: allTasks.filter(task => task.category === 'feature').length,
      bug: allTasks.filter(task => task.category === 'bug').length,
      task: allTasks.filter(task => task.category === 'task').length,
      improvement: allTasks.filter(task => task.category === 'improvement').length,
    };

    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      todoTasks,
      completionPercentage,
      tasksByPriority,
      tasksByCategory,
    };
  }, [board]);

  return (
    <div className="w-full animate-in">
      {/* Title is now in the page component */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Tasks Card */}
        <Card className="overflow-hidden border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <IconList className="h-5 w-5 text-primary" />
              Total de Tareas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalTasks}</p>
          </CardContent>
        </Card>

        {/* Completed Tasks Card */}
        <Card className="overflow-hidden border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <IconCheckbox className="h-5 w-5 text-green-500" />
              Tareas Completadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.completedTasks}</p>
          </CardContent>
        </Card>

        {/* In Progress Tasks Card */}
        <Card className="overflow-hidden border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <IconClock className="h-5 w-5 text-blue-500" />
              En Progreso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.inProgressTasks}</p>
          </CardContent>
        </Card>

        {/* To Do Tasks Card */}
        <Card className="overflow-hidden border-l-4 border-l-yellow-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <IconList className="h-5 w-5 text-yellow-500" />
              Por Hacer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.todoTasks}</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Progreso General</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Completado</span>
              <span className="text-sm font-medium">{Math.round(stats.completionPercentage)}%</span>
            </div>
            <Progress value={stats.completionPercentage} max={100} variant="success" className="h-2" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Por Hacer</h4>
                <Progress
                  value={stats.todoTasks}
                  max={stats.totalTasks}
                  variant="warning"
                  className="h-2 mb-1"
                />
                <p className="text-xs text-muted-foreground">
                  {stats.todoTasks} de {stats.totalTasks} tareas
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">En Progreso</h4>
                <Progress
                  value={stats.inProgressTasks}
                  max={stats.totalTasks}
                  variant="info"
                  className="h-2 mb-1"
                />
                <p className="text-xs text-muted-foreground">
                  {stats.inProgressTasks} de {stats.totalTasks} tareas
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Completadas</h4>
                <Progress
                  value={stats.completedTasks}
                  max={stats.totalTasks}
                  variant="success"
                  className="h-2 mb-1"
                />
                <p className="text-xs text-muted-foreground">
                  {stats.completedTasks} de {stats.totalTasks} tareas
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Distribution Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Priority Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <IconChartPie className="h-5 w-5" />
              Distribución por Prioridad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <div className="flex items-center">
                    <Badge variant="high" className="mr-2">Alta</Badge>
                    <span className="text-sm">Prioridad Alta</span>
                  </div>
                  <span className="text-sm font-medium">{stats.tasksByPriority.high}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${(stats.tasksByPriority.high / stats.totalTasks) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <div className="flex items-center">
                    <Badge variant="medium" className="mr-2">Media</Badge>
                    <span className="text-sm">Prioridad Media</span>
                  </div>
                  <span className="text-sm font-medium">{stats.tasksByPriority.medium}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${(stats.tasksByPriority.medium / stats.totalTasks) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <div className="flex items-center">
                    <Badge variant="low" className="mr-2">Baja</Badge>
                    <span className="text-sm">Prioridad Baja</span>
                  </div>
                  <span className="text-sm font-medium">{stats.tasksByPriority.low}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(stats.tasksByPriority.low / stats.totalTasks) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Simple Pie Chart */}
            {stats.totalTasks > 0 && (
              <div className="mt-6 flex justify-center">
                <div className="relative w-32 h-32">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* High Priority */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="var(--chart-1)"
                      strokeWidth="20"
                      strokeDasharray={`${(stats.tasksByPriority.high / stats.totalTasks) * 251.2} 251.2`}
                      transform="rotate(-90 50 50)"
                    />
                    {/* Medium Priority */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="var(--chart-2)"
                      strokeWidth="20"
                      strokeDasharray={`${(stats.tasksByPriority.medium / stats.totalTasks) * 251.2} 251.2`}
                      strokeDashoffset={`${-1 * (stats.tasksByPriority.high / stats.totalTasks) * 251.2}`}
                      transform="rotate(-90 50 50)"
                    />
                    {/* Low Priority */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="var(--chart-3)"
                      strokeWidth="20"
                      strokeDasharray={`${(stats.tasksByPriority.low / stats.totalTasks) * 251.2} 251.2`}
                      strokeDashoffset={`${-1 * ((stats.tasksByPriority.high + stats.tasksByPriority.medium) / stats.totalTasks) * 251.2}`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <IconChartPie className="h-5 w-5" />
              Distribución por Categoría
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <div className="flex items-center">
                    <Badge variant="feature" className="mr-2">Función</Badge>
                    <span className="text-sm">Nuevas Funciones</span>
                  </div>
                  <span className="text-sm font-medium">{stats.tasksByCategory.feature}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(stats.tasksByCategory.feature / stats.totalTasks) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <div className="flex items-center">
                    <Badge variant="bug" className="mr-2">Error</Badge>
                    <span className="text-sm">Corrección de Errores</span>
                  </div>
                  <span className="text-sm font-medium">{stats.tasksByCategory.bug}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${(stats.tasksByCategory.bug / stats.totalTasks) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <div className="flex items-center">
                    <Badge variant="task" className="mr-2">Tarea</Badge>
                    <span className="text-sm">Tareas Generales</span>
                  </div>
                  <span className="text-sm font-medium">{stats.tasksByCategory.task}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${(stats.tasksByCategory.task / stats.totalTasks) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <div className="flex items-center">
                    <Badge variant="improvement" className="mr-2">Mejora</Badge>
                    <span className="text-sm">Mejoras</span>
                  </div>
                  <span className="text-sm font-medium">{stats.tasksByCategory.improvement}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-indigo-500 h-2 rounded-full"
                    style={{ width: `${(stats.tasksByCategory.improvement / stats.totalTasks) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Simple Bar Chart */}
            {stats.totalTasks > 0 && (
              <div className="mt-6 h-32 flex items-end justify-between gap-2">
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 bg-blue-500 rounded-t-md transition-all duration-500"
                    style={{
                      height: `${(stats.tasksByCategory.feature / Math.max(...Object.values(stats.tasksByCategory))) * 100}%`
                    }}
                  ></div>
                  <span className="text-xs mt-1">Función</span>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 bg-red-500 rounded-t-md transition-all duration-500"
                    style={{
                      height: `${(stats.tasksByCategory.bug / Math.max(...Object.values(stats.tasksByCategory))) * 100}%`
                    }}
                  ></div>
                  <span className="text-xs mt-1">Error</span>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 bg-purple-500 rounded-t-md transition-all duration-500"
                    style={{
                      height: `${(stats.tasksByCategory.task / Math.max(...Object.values(stats.tasksByCategory))) * 100}%`
                    }}
                  ></div>
                  <span className="text-xs mt-1">Tarea</span>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 bg-indigo-500 rounded-t-md transition-all duration-500"
                    style={{
                      height: `${(stats.tasksByCategory.improvement / Math.max(...Object.values(stats.tasksByCategory))) * 100}%`
                    }}
                  ></div>
                  <span className="text-xs mt-1">Mejora</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Statistics;
