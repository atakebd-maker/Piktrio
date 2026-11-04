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
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 pb-1">
      {/* 
        Single-line enclosed category pill bar matching PromptPin screenshot:
        Fits All, Trending, Boys, Girls, Couple cleanly on one line 
      */}
      <div className="bg-gray-100/90 p-1 sm:p-1.5 rounded-2xl border border-gray-200 flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
        {categories.map((cat) => {
          const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();

          return (
            <button
              key={cat.id || cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className={`flex-1 text-center py-2 px-2 sm:px-5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-white/80'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
