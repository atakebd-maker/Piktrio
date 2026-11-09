import React from 'react';
import { CategoryItem } from '../types/prompt';

interface CategoryBarProps {
  categories: CategoryItem[];
  selectedCategory: string;
  onSelectCategory: (name: string) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 pb-2">
      {/* 
        Single-line enclosed category pill bar matching clean white & blue theme:
        Fits Trending, All, Boys cleanly
      */}
      <div className="bg-white p-1 sm:p-1.5 rounded-2xl border border-slate-200 flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto no-scrollbar shadow-xs">
        {categories.map((cat) => {
          const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();

          return (
            <a
              key={cat.id || cat.name}
              href={`/?category=${encodeURIComponent(cat.id || cat.name.toLowerCase())}`}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                  e.preventDefault();
                  onSelectCategory(cat.name);
                }
              }}
              className={`flex-1 text-center py-2 px-2.5 sm:px-5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap no-underline ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat.name}
            </a>
          );
        })}
      </div>
    </div>
  );
};
