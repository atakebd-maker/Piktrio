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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      {/* Horizontally scrollable container matching screenshots */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar scroll-smooth">
        {categories.map((cat) => {
          const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();

          return (
            <button
              key={cat.id || cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'bg-white text-gray-700 hover:text-blue-600 border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
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
