"use client";

import { create } from "zustand";
import { nanoid } from "nanoid";
import { SectionType } from "@/types";
import toast from "react-hot-toast";

interface BuilderState {
  sections: SectionType[];
  addSection: (section: SectionType) => void;
  updateSection: (index: number, section: SectionType) => void;
  removeSection: (index: number) => void;
  reorderSections: (start: number, end: number) => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  exportJSON: () => void;
  importJSON: (data: string) => void;
}

export const useBuilderStore = create<BuilderState>((set, get) => ({
  sections: [],

  addSection: (section) =>
    set((state) => ({
      sections: [...state.sections, { ...section, id: nanoid() }],
    })),

  updateSection: (index, section) =>
    set((state) => {
      const updated = [...state.sections];
      updated[index] = section;
      return { sections: updated };
    }),

  removeSection: (index) =>
    set((state) => {
      const updated = [...state.sections];
      updated.splice(index, 1);
      return { sections: updated };
    }),

  reorderSections: (start, end) =>
    set((state) => {
      const updated = [...state.sections];
      const [removed] = updated.splice(start, 1);
      updated.splice(end, 0, removed);
      return { sections: updated };
    }),

  saveToLocalStorage: () => {
    try {
      const state = get();
      localStorage.setItem("site-builder", JSON.stringify(state.sections));
      toast.success("💾 Saved to local storage");
    } catch (err) {
      toast.error("❌ Failed to save");
    }
  },

  loadFromLocalStorage: () => {
    try {
      const data = localStorage.getItem("site-builder");
      if (data) {
        set({ sections: JSON.parse(data) });
        toast.success("📂 Loaded from local storage");
      } else {
        toast.error("❌ No saved data found");
      }
    } catch (err) {
      toast.error("❌ Failed to load from local storage");
    }
  },

  exportJSON: () => {
    try {
      const json = JSON.stringify(get().sections, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "site-builder.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("📤 Exported successfully");
    } catch (err) {
      toast.error("❌ Failed to export JSON");
    }
  },

  importJSON: (data) => {
    try {
      const parsed = JSON.parse(data);
      set({ sections: parsed });
      toast.success("✅ JSON imported successfully");
    } catch (err) {
      toast.error("❌ Invalid JSON format");
    }
  },
}));
