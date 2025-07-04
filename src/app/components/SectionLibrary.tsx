'use client';

import { useBuilderStore } from '@/app/store/builder';

const sectionTemplates = [
  {
    name: 'Hero Section',
    template: {
      title: 'Welcome to Our Website',
      description: 'This is a hero section with a compelling headline and description.',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop',
    },
  },
  {
    name: 'Feature Section',
    template: {
      title: 'Amazing Features',
      description: 'Discover what makes our product special and unique.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    },
  },
  {
    name: 'About Section',
    template: {
      title: 'About Us',
      description: 'Learn more about our company and our mission.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    },
  },
  {
    name: 'Contact Section',
    template: {
      title: 'Get In Touch',
      description: 'Ready to start your project? Contact us today.',
      image: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=800&h=400&fit=crop',
    },
  },
];

export const SectionLibrary = () => {
  const { addSection } = useBuilderStore();

  const handleAddTemplate = (template: any) => {
    addSection(template);
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">Section Library</h2>
      <div className="space-y-2">
        {sectionTemplates.map((section, index) => (
          <button
            key={index}
            onClick={() => handleAddTemplate(section.template)}
            className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="font-medium text-sm">{section.name}</div>
            <div className="text-xs text-gray-500 mt-1">{section.template.title}</div>
          </button>
        ))}
        
        <div className="border-t pt-2 mt-4">
          <button
            onClick={() => addSection({ title: '', description: '', image: '' })}
            className="w-full bg-indigo-500 text-white rounded p-2 hover:bg-indigo-600 transition-colors text-sm"
          >
            ➕ Add Blank Section
          </button>
        </div>
      </div>
    </div>
  );
};
export interface SectionType {
  id: string;
  title: string;
  description: string;
  image: string;
}