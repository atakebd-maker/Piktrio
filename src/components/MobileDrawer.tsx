import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp, Sparkles, FolderHeart } from 'lucide-react';
import { PROMPTPIN_CATEGORIES, COLLECTIONS_LIST } from '../data/initialPrompts';
import { ModalType } from './InfoModal';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (categoryName: string) => void;
  onOpenModal?: (type: ModalType) => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  onOpenModal,
}) => {
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [collectionsOpen, setCollectionsOpen] = useState(true);
  const [aboutOpen, setAboutOpen] = useState(false);

  if (!isOpen) return null;

  const handleOpenInfoModal = (type: ModalType) => {
    onClose();
    onOpenModal?.(type);
  };

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
            aria-label="Close menu"
            className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Drawer Nav Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 text-gray-900 font-semibold text-base sm:text-lg">
          
          {/* Home */}
          <div>
            <button
              onClick={() => {
                onSelectCategory('All');
                onClose();
              }}
              className="w-full text-left py-2 hover:text-blue-600 transition-colors cursor-pointer flex items-center justify-between"
            >
              <span>Home</span>
              <span className="text-xs font-normal text-gray-400">Main Gallery</span>
            </button>
          </div>

          {/* Featured Collections Section (With Diwali Prompts highlighted) */}
          <div className="border-t border-gray-100 pt-3">
            <div 
              onClick={() => setCollectionsOpen(!collectionsOpen)}
              className="flex items-center justify-between py-2 cursor-pointer hover:text-blue-600 transition-colors select-none"
            >
              <div className="flex items-center gap-2">
                <FolderHeart className="w-5 h-5 text-blue-600" />
                <span>Collections</span>
              </div>
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                {collectionsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>

            {collectionsOpen && (
              <div className="pl-2 pr-1 py-2 space-y-1.5 text-xs font-medium text-gray-700 bg-gray-50/80 rounded-2xl my-2 border border-gray-100">
                {COLLECTIONS_LIST.map((col) => {
                  const isDiwali = col.label.toLowerCase().includes('diwali');
                  return (
                    <button
                      key={col.label}
                      onClick={() => {
                        onSelectCategory(col.cat);
                        onClose();
                      }}
                      className={`w-full text-left py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                        isDiwali
                          ? 'bg-amber-100/80 text-amber-900 font-bold hover:bg-amber-200/90 shadow-2xs border border-amber-200'
                          : 'hover:bg-blue-100/70 hover:text-blue-700'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {isDiwali && <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                        <span>{col.label}</span>
                      </span>
                      {isDiwali && (
                        <span className="text-[10px] font-extrabold bg-amber-600 text-white px-1.5 py-0.2 rounded-full uppercase">
                          New
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Categories with Expandable Dropdown */}
          <div className="border-t border-gray-100 pt-3">
            <div 
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="flex items-center justify-between py-2 cursor-pointer hover:text-blue-600 transition-colors select-none"
            >
              <span>Categories</span>
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                {categoriesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>

            {categoriesOpen && (
              <div className="pl-2 pr-1 py-2 space-y-1 text-xs font-medium text-gray-700 bg-gray-50/80 rounded-2xl my-2 border border-gray-100">
                {PROMPTPIN_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.name);
                      onClose();
                    }}
                    className="w-full text-left py-1.5 px-3 rounded-xl hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer block"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* About Us with Quick Action */}
          <div className="border-t border-gray-100 pt-3">
            <button
              onClick={() => handleOpenInfoModal('about')}
              className="w-full text-left py-2 hover:text-blue-600 transition-colors cursor-pointer flex items-center justify-between"
            >
              <span>About Us</span>
              <span className="text-xs font-normal text-blue-600">Learn more &rarr;</span>
            </button>
          </div>

          {/* Contact Us */}
          <div className="border-t border-gray-100 pt-3">
            <button
              onClick={() => handleOpenInfoModal('contact')}
              className="w-full text-left py-2 hover:text-blue-600 transition-colors cursor-pointer flex items-center justify-between"
            >
              <span>Contact Us</span>
              <span className="text-xs font-normal text-blue-600">Get in touch &rarr;</span>
            </button>
          </div>

          {/* Privacy Policy */}
          <div className="border-t border-gray-100 pt-3">
            <button
              onClick={() => handleOpenInfoModal('privacy')}
              className="w-full text-left py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>

          {/* Terms & Conditions */}
          <div className="border-t border-gray-100 pt-3">
            <button
              onClick={() => handleOpenInfoModal('terms')}
              className="w-full text-left py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-5 border-t border-gray-100 bg-gray-50 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Piktrio. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
};
