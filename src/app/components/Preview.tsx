
// File: components/Preview.tsx
'use client';

import { useBuilderStore } from '@/app/store/builder';
import { SectionRenderer } from './SectionRenderer';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableSection } from './SortableSection';

export const Preview = () => {
  const { sections, reorderSections } = useBuilderStore();
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      reorderSections(oldIndex, newIndex);
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md h-full">
      <h2 className="text-xl font-semibold mb-4">Preview</h2>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sections.map((s) => s.id!)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {sections.map((section, index) => (
              <SortableSection key={section.id} id={section.id!}>
                <div className="border rounded-xl p-4 bg-gray-50 shadow-sm transition hover:shadow">
                  <SectionRenderer section={section} index={index} />
                </div>
              </SortableSection>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};
