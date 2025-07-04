'use client';

import { sections } from '@/app/data/sections';
import { useBuilderStore } from '@/app/store/builder';

export const SectionLibrary = () => {
  const addSection = useBuilderStore((state) => state.addSection);

  return (
    <div className="bg-white p-4 shadow-md rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">Section Library</h2>
      <div className="space-y-2">
        {sections.map((section) => (
          <button
            key={section.type}
            onClick={() => addSection(section)}
            className="w-full text-left px-4 py-2 bg-blue-100 hover:bg-blue-200 transition rounded-lg"
          >
            ➕ {section.name}
          </button>
        ))}
      </div>
    </div>
  );
};
