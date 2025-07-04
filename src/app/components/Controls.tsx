'use client';

import { useBuilderStore } from '@/app/store/builder';

export const Controls = () => {
  const {
    saveToLocalStorage,
    loadFromLocalStorage,
    exportJSON,
    importJSON,
  } = useBuilderStore();

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      importJSON(result);
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-2xl space-y-2">
      <h2 className="text-xl font-semibold mb-4">Controls</h2>

      <button
        onClick={saveToLocalStorage}
        className="w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition-colors"
      >
        💾 Save
      </button>

      <button
        onClick={loadFromLocalStorage}
        className="w-full bg-green-500 text-white rounded p-2 hover:bg-green-600 transition-colors"
      >
        📂 Load
      </button>

      <button
        onClick={exportJSON}
        className="w-full bg-purple-500 text-white rounded p-2 hover:bg-purple-600 transition-colors"
      >
        📤 Export JSON
      </button>

      <input
        type="file"
        accept=".json"
        onChange={handleImport}
        className="w-full"
      />
    </div>
  );
};
