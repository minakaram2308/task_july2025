'use client';

import { useBuilderStore } from '@/app/store/builder';
import { SectionType } from '@/types';

export const SectionRenderer = ({
  section,
  index,
}: {
  section: SectionType;
  index: number;
}) => {
  const updateSection = useBuilderStore((state) => state.updateSection);
  const removeSection = useBuilderStore((state) => state.removeSection);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSection(index, {
      ...section,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-2">
      <input
        name="title"
        className="w-full border rounded p-2"
        placeholder="Title"
        value={section.title || ''}
        onChange={handleChange}
      />
      <input
        name="description"
        className="w-full border rounded p-2"
        placeholder="Description"
        value={section.description || ''}
        onChange={handleChange}
      />
      <input
        name="image"
        className="w-full border rounded p-2"
        placeholder="Image URL"
        value={section.image || ''}
        onChange={handleChange}
      />
      <button
        onClick={() => removeSection(index)}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        Remove Section
      </button>
    </div>
  );
};
