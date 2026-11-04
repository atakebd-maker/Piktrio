import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { PROMPTPIN_CATEGORIES } from '../data/initialPrompts';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (categoryName: string) => void;
}

const COLLECTIONS_LIST = [
  'Diwali AI Photo Prompts',
  'Trending AI Photo Prompts',
  'Couple AI Photo Prompts',
  'AI Photo Prompts for Girls',
  'AI Photo Prompts for Boys',
  'Raksha Bandhan AI Photo Prompts',
  '1980s AI Photo Prompts',
  'Car AI Photo Prompts for Boys',
  'Birthday AI Photo Prompts',
];

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
}) => {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full w-full sm:w-96 bg-white shadow-2xl flex flex-col z-10">
        
        {/* Drawer Header with Larger Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center">
            <img
              src="/assets/aistudio/1000050243-removebg-preview_62525162.png"
              alt="Piktrio"
              className="h-12 sm:h-14 w-auto max-w-[250px] object-contain"
            />
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Drawer Nav Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 text-gray-900 font-semibold text-lg">
          
          {/* Home */}
          <div>
            <button
              onClick={() => {
                onSelectCategory('All');
                onClose();
              }}
              className="w-full text-left py-2 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Home
            </button>
          </div>

          {/* Templates */}
          <div>
            <button
              onClick={() => {
                onSelectCategory('Templates');
                onClose();
              }}
              className="w-full text-left py-2 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Templates
            </button>
          </div>

          {/* Categories with Expandable Dropdown */}
          <div className="border-t border-gray-100 pt-3">
            <div 
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="flex items-center justify-between py-2 cursor-pointer hover:text-blue-600 transition-colors"
            >
              <span>Categories</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                {categoriesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>

            {categoriesOpen && (
              <div className="pl-3 pr-2 py-2 space-y-1.5 text-sm font-medium text-gray-600 bg-gray-50/70 rounded-xl my-2">
                {PROMPTPIN_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.name);
                      onClose();
                    }}
                    className="w-full text-left py-1.5 px-3 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer block"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Collections with Expandable Dropdown */}
          <div className="border-t border-gray-100 pt-3">
            <div 
              onClick={() => setCollectionsOpen(!collectionsOpen)}
              className="flex items-center justify-between py-2 cursor-pointer hover:text-blue-600 transition-colors"
            >
              <span>Collections</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                {collectionsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>

            {collectionsOpen && (
              <div className="pl-3 pr-2 py-2 space-y-1 text-xs font-medium text-gray-600 bg-gray-50/70 rounded-xl my-2">
                {COLLECTIONS_LIST.map((col) => (
                  <button
                    key={col}
                    onClick={() => {
                      onSelectCategory(col.includes('Girls') ? 'Girls' : col.includes('Boys') ? 'Boys' : col.includes('Couple') ? 'Couple' : 'All');
                      onClose();
                    }}
                    className="w-full text-left py-1.5 px-3 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer block"
                  >
                    {col}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* App */}
          <div className="border-t border-gray-100 pt-3">
            <button
              onClick={() => {
                alert('Piktrio Web App is enabled. Add to home screen via your browser menu!');
                onClose();
              }}
              className="w-full text-left py-2 hover:text-blue-600 transition-colors cursor-pointer flex items-center justify-between"
            >
              <span>App</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">Free</span>
            </button>
          </div>

          {/* About Us with Expandable Dropdown */}
          <div className="border-t border-gray-100 pt-3">
            <div 
              onClick={() => setAboutOpen(!aboutOpen)}
              className="flex items-center justify-between py-2 cursor-pointer hover:text-blue-600 transition-colors"
            >
              <span>About Us</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                {aboutOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>

            {aboutOpen && (
              <div className="pl-3 pr-2 py-2 space-y-1.5 text-sm font-medium text-gray-600 bg-gray-50/70 rounded-xl my-2">
                <p className="px-3 py-1.5 text-xs text-gray-500 leading-relaxed">
                  Piktrio curates the finest AI photo editing prompts for ChatGPT, Gemini, Flux, and Midjourney with 100% uncropped full visual reference.
                </p>
                <div className="border-t border-gray-200/60 pt-1">
                  <a href="#privacy" onClick={onClose} className="block px-3 py-1 text-xs text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                  <a href="#terms" onClick={onClose} className="block px-3 py-1 text-xs text-blue-600 hover:underline">
                    Terms & Conditions
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Contact Us */}
          <div className="border-t border-gray-100 pt-3">
            <a
              href="mailto:support@piktrio.com"
              onClick={onClose}
              className="block w-full text-left py-2 hover:text-blue-600 transition-colors"
            >
              Contact Us
            </a>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Piktrio. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
};
