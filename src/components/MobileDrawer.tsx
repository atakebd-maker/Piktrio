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
      <div className="absolute inset-y-0 right-0 max-w-full w-full sm:w-96 bg-[#0c081e] border-l border-[#241748] shadow-2xl flex flex-col z-10 text-gray-100">
        
        {/* Drawer Header with User's Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#21153f]">
          <div className="flex items-center">
            <img
              src="/assets/aistudio/1000050243-removebg-preview_62525162.png"
              alt="Piktrio"
              className="h-10 sm:h-12 w-auto max-w-[220px] object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.45)] drop-shadow-[0_2px_12px_rgba(59,130,246,0.4)]"
            />
          </div>

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
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
              className="w-full text-left py-2 hover:text-pink-400 transition-colors cursor-pointer flex items-center justify-between text-white"
            >
              <span>Home</span>
              <span className="text-xs font-normal text-purple-300/60">Main Gallery</span>
            </button>
          </div>

          {/* Featured Collections Section (With Diwali Prompts highlighted) */}
          <div className="border-t border-[#21153f] pt-3">
            <div 
              onClick={() => setCollectionsOpen(!collectionsOpen)}
              className="flex items-center justify-between py-2 cursor-pointer hover:text-pink-400 transition-colors select-none text-white"
            >
              <div className="flex items-center gap-2">
                <FolderHeart className="w-5 h-5 text-pink-400" />
                <span>Collections</span>
              </div>
              <div className="w-7 h-7 rounded-lg bg-[#181035] text-purple-300 flex items-center justify-center border border-[#2c1d53]">
                {collectionsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>

            {collectionsOpen && (
              <div className="pl-2 pr-1 py-2 space-y-1.5 text-xs font-medium bg-[#140e2e] rounded-2xl my-2 border border-[#271a4f]">
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
                          ? 'bg-amber-500/20 text-amber-300 font-bold hover:bg-amber-500/30 border border-amber-400/40'
                          : 'text-gray-300 hover:bg-[#201546] hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {isDiwali && <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                        <span>{col.label}</span>
                      </span>
                      {isDiwali && (
                        <span className="text-[10px] font-extrabold bg-amber-500 text-black px-1.5 py-0.2 rounded-full uppercase">
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
          <div className="border-t border-[#21153f] pt-3">
            <div 
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="flex items-center justify-between py-2 cursor-pointer hover:text-pink-400 transition-colors select-none text-white"
            >
              <span>Categories</span>
              <div className="w-7 h-7 rounded-lg bg-[#181035] text-purple-300 flex items-center justify-center border border-[#2c1d53]">
                {categoriesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>

            {categoriesOpen && (
              <div className="pl-2 pr-1 py-2 space-y-1 text-xs font-medium bg-[#140e2e] rounded-2xl my-2 border border-[#271a4f]">
                {PROMPTPIN_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.name);
                      onClose();
                    }}
                    className="w-full text-left py-2 px-3 rounded-xl text-gray-300 hover:bg-[#201546] hover:text-white transition-colors cursor-pointer block"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* About Us with Quick Action */}
          <div className="border-t border-[#21153f] pt-3">
            <button
              onClick={() => handleOpenInfoModal('about')}
              className="w-full text-left py-2 hover:text-pink-400 transition-colors cursor-pointer flex items-center justify-between text-gray-300"
            >
              <span>About Us</span>
              <span className="text-xs font-normal text-pink-400">Learn more &rarr;</span>
            </button>
          </div>

          {/* Contact Us */}
          <div className="border-t border-[#21153f] pt-3">
            <button
              onClick={() => handleOpenInfoModal('contact')}
              className="w-full text-left py-2 hover:text-pink-400 transition-colors cursor-pointer flex items-center justify-between text-gray-300"
            >
              <span>Contact Us</span>
              <span className="text-xs font-normal text-pink-400">Get in touch &rarr;</span>
            </button>
          </div>

          {/* Privacy Policy */}
          <div className="border-t border-[#21153f] pt-3">
            <button
              onClick={() => handleOpenInfoModal('privacy')}
              className="w-full text-left py-2 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>

          {/* Terms & Conditions */}
          <div className="border-t border-[#21153f] pt-3">
            <button
              onClick={() => handleOpenInfoModal('terms')}
              className="w-full text-left py-2 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-5 border-t border-[#21153f] bg-[#090518] text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Piktrio. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
};
