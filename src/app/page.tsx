'use client';

import { useEffect } from 'react';
import { SectionLibrary } from './components/SectionLibrary';
import { Preview } from './components/Preview';
import { Controls } from './components/Controls';
import { useBuilderStore } from './store/builder';
import { Toaster } from 'react-hot-toast';

export default function Home() {
  const { loadFromLocalStorage } = useBuilderStore();

  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  return (
    <>
      <Toaster position="top-right" />
      <main className="min-h-screen flex flex-col md:flex-row p-4 gap-4 bg-gray-50">
        <div className="w-full md:w-1/4 space-y-4">
          <SectionLibrary />
          <Controls />
        </div>
        <div className="w-full md:w-3/4">
          <Preview />
        </div>
      </main>
    </>
  );
}