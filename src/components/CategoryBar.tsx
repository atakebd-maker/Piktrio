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
      <div className="bg-white p-1.5 sm:p-2 rounded-2xl border border-neutral-200 flex items-center md:flex-wrap md:justify-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar shadow-xs">
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
              className={`shrink-0 text-center py-2 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap no-underline ${
                isSelected
                  ? 'bg-black text-white shadow-sm'
                  : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
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
