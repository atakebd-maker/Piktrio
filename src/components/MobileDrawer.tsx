import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp, Sparkles, FolderHeart } from 'lucide-react';
import { PROMPTPIN_CATEGORIES, COLLECTIONS_LIST } from '../data/initialPrompts';
import { CategoryItem, CollectionInfo } from '../types/prompt';
import { ModalType } from './InfoModal';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories?: CategoryItem[];
  collections?: CollectionInfo[];
  onSelectCategory: (categoryName: string) => void;
  onSelectCollection?: (collection: CollectionInfo) => void;
  onOpenModal?: (type: ModalType) => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  categories = PROMPTPIN_CATEGORIES,
  collections = COLLECTIONS_LIST,
  onSelectCategory,
  onSelectCollection,
  onOpenModal,
}) => {
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [collectionsOpen, setCollectionsOpen] = useState(true);

  if (!isOpen) return null;

  const handleOpenInfoModal = (type: ModalType) => {
    onClose();
    onOpenModal?.(type);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full w-full sm:w-96 bg-white border-l border-zinc-200 shadow-2xl flex flex-col z-10 text-zinc-950">
        
        {/* Drawer Header: Seamless pure white bar matching main header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-white border-b border-zinc-200">
          <div className="flex items-center">
            <img
              src="/assets/aistudio/1000050956-removebg-preview_1d3a3740.png"
              alt="Piktrio - Discover. Copy. Create."
              className="h-10 sm:h-12 w-auto max-w-[220px] object-contain"
            />
          </div>

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded-xl text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Drawer Nav Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 font-semibold text-base">
          
          {/* Home */}
          <div>
            <button
              onClick={() => {
                onSelectCategory('All');
                onClose();
              }}
              className="w-full text-left py-2 hover:text-blue-600 transition-colors cursor-pointer flex items-center justify-between text-zinc-950"
            >
              <span>Home</span>
              <span className="text-xs font-medium text-zinc-400">Main Gallery</span>
            </button>
          </div>

          {/* Featured Collections Section */}
          <div className="border-t border-zinc-100 pt-3">
            <div 
              onClick={() => setCollectionsOpen(!collectionsOpen)}
              className="flex items-center justify-between py-2 cursor-pointer hover:text-blue-600 transition-colors select-none text-zinc-950"
            >
              <div className="flex items-center gap-2">
                <FolderHeart className="w-5 h-5 text-blue-600" />
                <span>Collections</span>
              </div>
              <div className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-700 flex items-center justify-center border border-zinc-200">
                {collectionsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>

            {collectionsOpen && (
              <div className="pl-2 pr-1 py-2 space-y-1.5 text-xs font-medium bg-zinc-50 rounded-2xl my-2 border border-zinc-200">
                {collections.map((col) => {
                  const isDiwali = col.label.toLowerCase().includes('diwali');
                  return (
                    <button
                      key={col.label}
                      onClick={() => {
                        if (onSelectCollection) {
                          onSelectCollection(col);
                        } else {
                          onSelectCategory(col.cat);
                        }
                        onClose();
                      }}
                      className={`w-full text-left py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                        isDiwali
                          ? 'bg-zinc-900 text-white font-bold hover:bg-zinc-800 border border-zinc-900'
                          : 'text-zinc-800 hover:bg-blue-600 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {isDiwali && <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                        <span>{col.label}</span>
                      </span>
                      {isDiwali && (
                        <span className="text-[10px] font-extrabold bg-amber-400 text-zinc-950 px-1.5 py-0.2 rounded-full uppercase">
                          Hot
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Categories with Expandable Dropdown */}
          <div className="border-t border-zinc-100 pt-3">
            <div 
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="flex items-center justify-between py-2 cursor-pointer hover:text-blue-600 transition-colors select-none text-zinc-950"
            >
              <span>Categories</span>
              <div className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-700 flex items-center justify-center border border-zinc-200">
                {categoriesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>

            {categoriesOpen && (
              <div className="pl-2 pr-1 py-2 space-y-1 text-xs font-medium bg-zinc-50 rounded-2xl my-2 border border-zinc-200">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.name);
                      onClose();
                    }}
                    className="w-full text-left py-2 px-3 rounded-xl text-zinc-800 hover:bg-zinc-900 hover:text-white transition-colors cursor-pointer block"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* About Us with Quick Action */}
          <div className="border-t border-zinc-100 pt-3">
            <button
              onClick={() => handleOpenInfoModal('about')}
              className="w-full text-left py-2 hover:text-blue-600 transition-colors cursor-pointer flex items-center justify-between text-zinc-950"
            >
              <span>About Us</span>
              <span className="text-xs font-medium text-blue-600">Learn more &rarr;</span>
            </button>
          </div>

          {/* Contact Us */}
          <div className="border-t border-zinc-100 pt-3">
            <button
              onClick={() => handleOpenInfoModal('contact')}
              className="w-full text-left py-2 hover:text-blue-600 transition-colors cursor-pointer flex items-center justify-between text-zinc-950"
            >
              <span>Contact Us</span>
              <span className="text-xs font-medium text-blue-600">Get in touch &rarr;</span>
            </button>
          </div>

          {/* Privacy Policy */}
          <div className="border-t border-zinc-100 pt-3">
            <button
              onClick={() => handleOpenInfoModal('privacy')}
              className="w-full text-left py-2 text-sm text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>

          {/* Terms & Conditions */}
          <div className="border-t border-zinc-100 pt-3">
            <button
              onClick={() => handleOpenInfoModal('terms')}
              className="w-full text-left py-2 text-sm text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-5 border-t border-zinc-200 bg-zinc-50 text-center">
          <p className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} Piktrio. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
};
