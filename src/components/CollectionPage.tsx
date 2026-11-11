import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { PromptItem, CollectionInfo } from '../types/prompt';
import { PromptCard } from './PromptCard';
import { Pagination } from './Pagination';
import { AdBanner } from './AdBanner';
import { ChatGptIcon, GeminiIcon } from './AiIcons';

interface CollectionPageProps {
  collection: CollectionInfo;
  allPrompts: PromptItem[];
  allCollections: CollectionInfo[];
  onBack: () => void;
  onSelectPrompt: (prompt: PromptItem) => void;
  onCopyPrompt: (promptText: string, promptId: string) => void;
  onSelectCollection: (col: CollectionInfo) => void;
}

const ITEMS_PER_PAGE = 8;

export const CollectionPage: React.FC<CollectionPageProps> = ({
  collection,
  allPrompts,
  allCollections,
  onBack,
  onSelectPrompt,
  onCopyPrompt,
  onSelectCollection,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Helper to extract timestamp for reliable date sorting
  const getPromptTimestamp = (p: PromptItem): number => {
    if (!p.createdAt) return 0;
    if (typeof p.createdAt === 'number') return p.createdAt;
    if (typeof p.createdAt === 'string') {
      const parsed = Date.parse(p.createdAt);
      return isNaN(parsed) ? 0 : parsed;
    }
    const anyCreated = p.createdAt as unknown as { toMillis?: () => number; seconds?: number };
    if (typeof anyCreated.toMillis === 'function') return anyCreated.toMillis();
    if (typeof anyCreated.seconds === 'number') return anyCreated.seconds * 1000;
    return 0;
  };

  // Filter prompts belonging strictly to this collection, sorted by newest first
  const collectionPrompts = useMemo(() => {
    const colId = collection.id.toLowerCase();
    const colCat = collection.cat.toLowerCase();

    const filtered = allPrompts.filter((p) => {
      const cat = p.category.toLowerCase();
      const title = p.title.toLowerCase();
      const promptText = p.prompt.toLowerCase();
      const tags = (p.tags || []).map((t) => t.toLowerCase());

      if (colId === 'diwali') {
        return (
          cat.includes('diwali') ||
          title.includes('diwali') ||
          promptText.includes('diwali') ||
          tags.some((t) => t.includes('diwali'))
        );
      }

      if (colId === 'boys') {
        return (
          cat === 'boys' ||
          tags.some((t) => t === 'boys' || t.includes('boy')) ||
          title.includes('boys')
        );
      }

      if (colId === 'trending') {
        return (
          Boolean(p.isPinned) ||
          tags.some((t) => t.includes('trending')) ||
          p.viewsCount > 1000
        );
      }

      return (
        cat === colCat ||
        tags.includes(colCat) ||
        title.toLowerCase().includes(colCat)
      );
    });

    // Newest posts first!
    return filtered.sort((a, b) => {
      const aTime = getPromptTimestamp(a);
      const bTime = getPromptTimestamp(b);
      if (aTime !== bTime) {
        return bTime - aTime;
      }
      const aPinned = a.isPinned ? 1 : 0;
      const bPinned = b.isPinned ? 1 : 0;
      return bPinned - aPinned;
    });
  }, [allPrompts, collection]);

  // Reset page when collection changes
  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update document title and meta for SEO
    document.title = `${collection.title} – Piktrio`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute('content', collection.description);
    }
  }, [collection]);

  // Pagination calculation
  const totalPages = Math.ceil(collectionPrompts.length / ITEMS_PER_PAGE);
  const paginatedPrompts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return collectionPrompts.slice(start, start + ITEMS_PER_PAGE);
  }, [collectionPrompts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 280, behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 animate-in fade-in duration-300">
      
      {/* 1. Top Breadcrumbs Navigation & Back Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:text-blue-600 border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto no-scrollbar">
          <button
            onClick={onBack}
            className="hover:text-blue-600 font-medium cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-slate-400">Collections</span>
          <span>/</span>
          <span className="font-bold text-slate-800 truncate max-w-[200px] sm:max-w-none">
            {collection.label}
          </span>
        </div>
      </div>

      {/* 2. Collection Hero Banner Header */}
      <div className="relative rounded-3xl bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-10 mb-8 shadow-xl overflow-hidden border border-blue-800/30">
        {/* Glow ambient background elements */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 text-xs font-bold mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Curated AI Collection</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-3">
            {collection.title}
          </h1>

          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed mb-6 max-w-2xl">
            {collection.description}
          </p>

          {/* Value Badges */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-semibold">
            <span className="px-3 py-1 rounded-lg bg-blue-600 text-white shadow-xs">
              {collectionPrompts.length} Verified Prompts
            </span>
            <span className="px-3 py-1 rounded-lg bg-white/15 backdrop-blur-md text-white border border-white/20 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Face Identity Lock</span>
            </span>
            <span className="px-3 py-1 rounded-lg bg-white/15 backdrop-blur-md text-white border border-white/20 flex items-center gap-1.5">
              <ChatGptIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <GeminiIcon className="w-3.5 h-3.5 text-blue-300 shrink-0" />
              <span>ChatGPT (GPT-4o) &amp; Gemini</span>
            </span>
          </div>
        </div>
      </div>

      {/* 3. Switch between other collections pill bar */}
      <div className="mb-8">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 px-1">
          Explore Other Collections:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {allCollections.map((col) => {
            const isSelected = col.id === collection.id;
            return (
              <button
                key={col.id}
                onClick={() => onSelectCollection(col)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-blue-500/25 ring-2 ring-blue-500/50'
                    : 'bg-white text-slate-700 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 hover:border-blue-300'
                }`}
              >
                {col.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Sponsored BengalAds Banner */}
      <div className="my-6 flex justify-center">
        <AdBanner format="300x250" label="Featured Partner" className="my-2" />
      </div>

      {/* 5. Main Prompts Gallery for this Collection */}
      <section className="mt-4 mb-12">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <h2 className="text-base sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <span>{collection.label}</span>
              {totalPages > 1 && (
                <span className="text-xs sm:text-sm font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-lg">
                  Page {currentPage} of {totalPages}
                </span>
              )}
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {collectionPrompts.length} Prompts
          </span>
        </div>

        {paginatedPrompts.length > 0 ? (
          <>
            {/* EXACT TWO COLUMNS ON MOBILE (grid-cols-2) & 3-4 COLUMNS ON DESKTOP */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {paginatedPrompts.map((prompt) => (
                <PromptCard
                  key={prompt.id}
                  prompt={prompt}
                  onViewDetails={onSelectPrompt}
                  onCopyPrompt={onCopyPrompt}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />

            {/* Bottom Sponsored Banner */}
            <div className="mt-8 flex justify-center">
              <AdBanner format="300x250" label="Sponsored Links" className="my-2" />
            </div>
          </>
        ) : (
          <div className="py-16 text-center max-w-sm mx-auto">
            <h3 className="font-bold text-slate-900 text-base mb-1">No Prompts Found in this Collection</h3>
            <p className="text-xs text-slate-600 mb-4">
              Try exploring other collections or return to the main gallery.
            </p>
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer shadow-sm"
            >
              Back to Home
            </button>
          </div>
        )}
      </section>

    </div>
  );
};
