"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { useBoard } from '@/hooks/useBoard';
import { IconArrowLeft, IconChartBar } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';

// Use dynamic import to avoid SSR issues with localStorage
const Statistics = dynamic(() => import('@/components/Statistics'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ),
});

export default function StatisticsPage() {
  const { board, loading } = useBoard();

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
            <IconChartBar className="h-6 w-6" />
            Estadísticas de Tareas
          </h1>
          <p className="text-muted-foreground">
            Visualiza el progreso y distribución de tus tareas
          </p>
        </div>

        <Statistics board={board} />
      </div>
    </PageLayout>
  );
}
