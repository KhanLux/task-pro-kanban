"use client";

import dynamic from 'next/dynamic';

// Use dynamic import to disable SSR for the Board component
// This is necessary because the DragDropContext from @hello-pangea/dnd
// uses browser-specific APIs that aren't available during server-side rendering
const Board = dynamic(() => import('@/components/Board'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ),
});

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Board />
    </div>
  );
}
