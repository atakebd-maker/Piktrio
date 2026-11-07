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
        Single-line enclosed category pill bar matching dark theme:
        Fits All, Trending, Boys, Diwali, Retro cleanly
      */}
      <div className="bg-[#120c29] p-1 sm:p-1.5 rounded-2xl border border-[#2b1b50] flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto no-scrollbar shadow-lg shadow-purple-950/20">
        {categories.map((cat) => {
          const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();

          return (
            <button
              key={cat.id || cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className={`flex-1 text-center py-2 px-2.5 sm:px-5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-pink-600/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
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
