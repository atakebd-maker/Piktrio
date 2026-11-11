import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { MobileDrawer } from './components/MobileDrawer';
import { HeroSearch } from './components/HeroSearch';
import { CategoryBar } from './components/CategoryBar';
import { FeaturedSlider } from './components/FeaturedSlider';
import { PromptCard } from './components/PromptCard';
import { PromptDetailPage } from './components/PromptDetailPage';
import { Pagination } from './components/Pagination';
import { Footer } from './components/Footer';
import { InfoModal, ModalType } from './components/InfoModal';
import { AdBanner } from './components/AdBanner';
import { StickyBottomAd } from './components/StickyBottomAd';
import { InterstitialAdModal } from './components/InterstitialAdModal';
import { FAQSection } from './components/FAQSection';
import { CollectionPage } from './components/CollectionPage';
import { PromptItem, CategoryItem, CollectionInfo } from './types/prompt';
import { PROMPTPIN_CATEGORIES, STORE_PROMPTS, COLLECTIONS_LIST, ensureIdentityPromptSuffix } from './data/initialPrompts';
import {
  subscribeToPrompts,
  subscribeToCategories,
  recordPromptCopy,
  recordPromptView,
  seedCategoriesIfEmpty,
  seedPromptsIfEmpty,
} from './services/promptService';
import { testConnection } from './services/firebase';
import { CheckCircle2, SearchX, Sparkles, Layers } from 'lucide-react';

const ITEMS_PER_PAGE = 8; // Optimal for 2-column mobile and 4-column desktop layout

const resetHomeMeta = () => {
  document.title = 'Piktrio – AI Photo Editing Prompts for ChatGPT & Gemini';
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', 'Piktrio: Discover, copy, and create stunning AI photo editing prompts for ChatGPT, Gemini, Flux, and Midjourney with 100% uncropped original gallery previews.');
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', `${window.location.origin}/`);
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', 'Piktrio – AI Photo Editing Prompts for ChatGPT & Gemini');
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', `${window.location.origin}/`);
};

export default function App() {
  const [prompts, setPrompts] = useState<PromptItem[]>(STORE_PROMPTS);
  const [categories, setCategories] = useState<CategoryItem[]>(
    PROMPTPIN_CATEGORIES.filter((c) => c.id !== 'diwali')
  );
  const [isLoading, setIsLoading] = useState(true);
  
  // Navigation & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  // Dedicated Prompt Details Page State
  const [selectedPrompt, setSelectedPrompt] = useState<PromptItem | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<CollectionInfo | null>(null);

  // Interstitial Ad Modal State triggered strictly on photo click
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState<PromptItem | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((curr) => (curr === message ? null : curr));
    }, 2800);
  };

  // Connect to Firestore & subscribe to prompts in real-time
  useEffect(() => {
    testConnection();
    seedCategoriesIfEmpty();
    seedPromptsIfEmpty();

    const syncRouteFromLocation = (items: PromptItem[]) => {
      const searchParams = new URLSearchParams(window.location.search);
      const promptParam = searchParams.get('prompt') || searchParams.get('p');
      const catParam = searchParams.get('category') || searchParams.get('c');
      const hash = window.location.hash;
      const pathname = window.location.pathname;

      let targetPromptId = promptParam || (hash.startsWith('#prompt/') ? hash.replace('#prompt/', '') : null);

      if (!targetPromptId && pathname.startsWith('/prompt/')) {
        targetPromptId = decodeURIComponent(pathname.replace('/prompt/', '').replace(/\/$/, ''));
      }

      let targetCollection: CollectionInfo | null = null;
      const collectionParam = searchParams.get('collection');
      if (collectionParam) {
        targetCollection = COLLECTIONS_LIST.find(
          (c) => c.id.toLowerCase() === collectionParam.toLowerCase() || c.slug.toLowerCase() === collectionParam.toLowerCase()
        ) || null;
      } else if (pathname.startsWith('/collection/')) {
        const slug = decodeURIComponent(pathname.replace('/collection/', '').replace(/\/$/, ''));
        targetCollection = COLLECTIONS_LIST.find(
          (c) => c.slug.toLowerCase() === slug.toLowerCase() || c.id.toLowerCase() === slug.toLowerCase()
        ) || null;
      }

      if (targetPromptId) {
        const match = items.find((p) => p.id === targetPromptId) || STORE_PROMPTS.find((p) => p.id === targetPromptId);
        if (match) {
          setSelectedPrompt(match);
          document.title = `${match.title} – Piktrio`;
        }
      } else {
        setSelectedPrompt(null);
        if (targetCollection) {
          setSelectedCollection(targetCollection);
          document.title = `${targetCollection.title} – Piktrio`;
        } else {
          setSelectedCollection(null);
          resetHomeMeta();
        }
      }

      if (catParam) {
        const formattedCat = catParam.charAt(0).toUpperCase() + catParam.slice(1).toLowerCase();
        setSelectedCategory(formattedCat);
      }

      const pageParam = searchParams.get('page');
      if (pageParam) {
        const parsedPage = parseInt(pageParam, 10);
        if (!isNaN(parsedPage) && parsedPage >= 1) {
          setCurrentPage(parsedPage);
        }
      }
    };

    const unsubPrompts = subscribeToPrompts(
      (items) => {
        const map = new Map<string, PromptItem>();
        STORE_PROMPTS.forEach((p) => map.set(p.id, p));
        items.forEach((p) => {
          const local = map.get(p.id);
          const merged = { ...(local || {}), ...p };
          merged.prompt = ensureIdentityPromptSuffix(merged.prompt);
          map.set(p.id, merged);
        });
        const activeItems = Array.from(map.values());
        setPrompts(activeItems);
        setIsLoading(false);
        syncRouteFromLocation(activeItems);
      },
      (err) => {
        console.warn('Firestore subscription notice (using local fallback):', err.message);
        setPrompts(STORE_PROMPTS);
        setIsLoading(false);
        syncRouteFromLocation(STORE_PROMPTS);
      }
    );

    const unsubCategories = subscribeToCategories((cats) => {
      // Top category bar strictly has: 'trending', 'all', 'boys' (Diwali is in collections)
      const order = ['trending', 'all', 'boys'];
      const filteredCats = cats.filter(
        (c) => c.id.toLowerCase() !== 'couple' && c.id.toLowerCase() !== 'girls' && c.id.toLowerCase() !== 'diwali'
      );
      const sorted = order
        .map((id) => filteredCats.find((c) => c.id.toLowerCase() === id) || PROMPTPIN_CATEGORIES.find((c) => c.id.toLowerCase() === id))
        .filter((c): c is CategoryItem => Boolean(c));
      if (sorted.length > 0) {
        setCategories(sorted);
      } else {
        setCategories(PROMPTPIN_CATEGORIES.filter((c) => c.id !== 'diwali'));
      }
    });

    const handleLocationChange = () => {
      setPrompts((current) => {
        syncRouteFromLocation(current);
        return current;
      });
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      unsubPrompts();
      unsubCategories();
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Helper to extract timestamp for reliable date sorting
  const getPromptTimestamp = (p: PromptItem): number => {
    if (!p.createdAt) return 0;
    if (typeof p.createdAt === 'number') return p.createdAt;
    if (typeof p.createdAt === 'string') {
      const parsed = Date.parse(p.createdAt);
      return isNaN(parsed) ? 0 : parsed;
    }
    // Firestore Timestamp
    const anyCreated = p.createdAt as unknown as { toMillis?: () => number; seconds?: number };
    if (typeof anyCreated.toMillis === 'function') {
      return anyCreated.toMillis();
    }
    if (typeof anyCreated.seconds === 'number') {
      return anyCreated.seconds * 1000;
    }
    return 0;
  };

  // Filter & Sort prompts: Pinned posts first, then newest posts first
  const filteredPrompts = useMemo(() => {
    const list = prompts.filter((p) => {
      // Category & Collection filter
      if (selectedCategory && selectedCategory.toLowerCase() !== 'all') {
        const sel = selectedCategory.toLowerCase().trim();
        const cat = p.category.toLowerCase().trim();
        const title = p.title.toLowerCase().trim();
        const promptText = p.prompt.toLowerCase();

        // Check if user selected Diwali or Diwali AI photo editing prompt collection
        const isDiwaliFilter = sel.includes('diwali');
        const matchesDiwali = isDiwaliFilter && (
          cat.includes('diwali') ||
          title.includes('diwali') ||
          promptText.includes('diwali') ||
          p.tags?.some((t) => t.toLowerCase().includes('diwali'))
        );

        // Standard category matching
        const matchesStandard =
          cat === sel ||
          p.tags?.some((t) => {
            const tag = t.toLowerCase();
            return tag === sel || sel.includes(tag) || tag.includes(sel);
          }) ||
          sel.includes(cat);

        if (!matchesDiwali && !matchesStandard) {
          return false;
        }
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = p.title.toLowerCase().includes(q);
        const inPrompt = p.prompt.toLowerCase().includes(q);
        const inCategory = p.category.toLowerCase().includes(q);
        const inDesc = p.description.toLowerCase().includes(q);
        const inTags = p.tags?.some((t) => t.toLowerCase().includes(q));

        if (!inTitle && !inPrompt && !inCategory && !inDesc && !inTags) {
          return false;
        }
      }

      return true;
    });

    // 1) Newest posts first (timestamp descending), 2) Pinned priority for same timestamp
    return list.sort((a, b) => {
      const aTime = getPromptTimestamp(a);
      const bTime = getPromptTimestamp(b);
      if (aTime !== bTime) {
        return bTime - aTime; // Newest posts first!
      }
      const aPinned = a.isPinned ? 1 : 0;
      const bPinned = b.isPinned ? 1 : 0;
      return bPinned - aPinned;
    });
  }, [prompts, selectedCategory, searchQuery]);

  // Reset page to 1 when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredPrompts.length / ITEMS_PER_PAGE);
  const paginatedPrompts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPrompts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPrompts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 220, behavior: 'smooth' });

    const searchParams = new URLSearchParams(window.location.search);
    if (page > 1) {
      searchParams.set('page', page.toString());
      document.title = `Page ${page} – ${selectedCategory} AI Prompts – Piktrio`;
    } else {
      searchParams.delete('page');
      if (selectedCategory !== 'All') {
        document.title = `${selectedCategory} AI Prompts – Piktrio`;
      } else {
        resetHomeMeta();
      }
    }
    const newSearch = searchParams.toString();
    const newUrl = window.location.pathname + (newSearch ? `?${newSearch}` : '');
    window.history.pushState({}, '', newUrl);
  };

  // Directly navigate to prompt
  const navigateToPrompt = (prompt: PromptItem) => {
    setSelectedPrompt(prompt);
    const newUrl = `/prompt/${encodeURIComponent(prompt.id)}`;
    window.history.pushState({ promptId: prompt.id }, '', newUrl);
    document.title = `${prompt.title} – Piktrio`;
    recordPromptView(prompt.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open prompt on dedicated page: triggered immediately upon clicking any photo
  const handleViewPrompt = (prompt: PromptItem) => {
    setPendingPrompt(prompt);
    setIsAdModalOpen(true);
  };

  // Successfully watched ad (10s) and unlocked
  const handleUnlockSuccess = () => {
    if (pendingPrompt) {
      navigateToPrompt(pendingPrompt);
      setPendingPrompt(null);
    }
  };

  // Directly navigate to collection dedicated page
  const navigateToCollection = (col: CollectionInfo) => {
    setSelectedPrompt(null);
    setSelectedCollection(col);
    const newUrl = `/collection/${encodeURIComponent(col.slug)}`;
    window.history.pushState({ collectionSlug: col.slug }, '', newUrl);
    document.title = `${col.title} – Piktrio`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back from collection to homepage
  const handleBackFromCollection = () => {
    setSelectedCollection(null);
    window.history.pushState({}, '', '/');
    resetHomeMeta();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back to gallery (or back to collection if viewing from collection)
  const handleBackToGallery = () => {
    setSelectedPrompt(null);
    if (selectedCollection) {
      const newUrl = `/collection/${encodeURIComponent(selectedCollection.slug)}`;
      window.history.pushState({ collectionSlug: selectedCollection.slug }, '', newUrl);
      document.title = `${selectedCollection.title} – Piktrio`;
    } else {
      window.history.pushState({}, '', '/');
      resetHomeMeta();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Copy prompt action
  const handleCopyPrompt = (_promptText: string, promptId: string) => {
    recordPromptCopy(promptId);
    showToast('Prompt Copied Successfully!');
  };

  // Category selection with clean URL query params (no hash fragments) for SEO
  const handleSelectCategory = (catName: string) => {
    setSelectedPrompt(null);
    setSelectedCollection(null);
    setSelectedCategory(catName);
    setSearchQuery('');
    setCurrentPage(1);

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('prompt');
    searchParams.delete('p');
    searchParams.delete('collection');
    if (catName.toLowerCase() === 'all') {
      searchParams.delete('category');
      searchParams.delete('c');
    } else {
      searchParams.set('category', catName.toLowerCase());
    }
    const newSearch = searchParams.toString();
    const newUrl = '/' + (newSearch ? `?${newSearch}` : '');
    window.history.pushState({}, '', newUrl);
    window.location.hash = '';

    if (catName.toLowerCase() !== 'all') {
      document.title = `${catName} AI Prompts – Piktrio`;
    } else {
      document.title = 'Piktrio – AI Photo Editing Prompts for ChatGPT & Gemini';
    }
  };

  // Home navigation
  const handleHomeClick = () => {
    setSelectedPrompt(null);
    setSelectedCollection(null);
    setSelectedCategory('All');
    setSearchQuery('');
    setCurrentPage(1);
    window.history.pushState({}, '', '/');
    window.location.hash = '';
    resetHomeMeta();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      
      {/* 1. Header (Clean White & Blue, strictly NO app button) */}
      <Header
        onOpenMenu={() => setIsMenuOpen(true)}
        onHomeClick={handleHomeClick}
        onSelectCategory={handleSelectCategory}
        onSelectCollection={navigateToCollection}
        onOpenModal={(type) => setActiveModal(type)}
      />

      {/* Mobile Drawer Navigation */}
      <MobileDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectCategory={(catName) => {
          handleSelectCategory(catName);
          window.scrollTo({ top: 240, behavior: 'smooth' });
        }}
        onSelectCollection={navigateToCollection}
        onOpenModal={(type) => setActiveModal(type)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        
        {/* CONDITIONAL RENDERING: Dedicated Prompt Details Page OR Collection Page OR Home Gallery */}
        {selectedPrompt ? (
          /* DEDICATED PROMPT DETAILS PAGE (Opened upon clicking any image) */
          <PromptDetailPage
            prompt={selectedPrompt}
            onBack={handleBackToGallery}
            onCopyPrompt={handleCopyPrompt}
            onSelectPrompt={handleViewPrompt}
            allPrompts={prompts}
          />
        ) : selectedCollection ? (
          /* DEDICATED COLLECTION PAGE (Opened upon clicking any collection in Footer/Drawer/Header) */
          <CollectionPage
            collection={selectedCollection}
            allPrompts={prompts}
            allCollections={COLLECTIONS_LIST}
            onBack={handleBackFromCollection}
            onSelectPrompt={handleViewPrompt}
            onCopyPrompt={handleCopyPrompt}
            onSelectCollection={navigateToCollection}
          />
        ) : (
          /* HOMEPAGE GALLERY VIEW (Matching Clean White & Blue) */
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            
            {/* 2. Hero Section: Clean White & Blue */}
            <HeroSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onTagClick={(tag) => handleSelectCategory(tag)}
              onCopySuccess={(msg) => showToast(msg)}
            />

            {/* 3. Horizontal Category Navigation */}
            <CategoryBar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />

            {/* 4. Beautiful Pinned Photos Slider below categories */}
            <FeaturedSlider
              prompts={prompts}
              onSelectPrompt={handleViewPrompt}
              onSelectCategory={handleSelectCategory}
            />

            {/* Sponsored Banner between Slider and Showcase */}
            <AdBanner format="300x250" label="Featured Partner" className="my-4" />

            {/* 5. MAIN PROMPTS GALLERY (Strictly 2 columns on mobile: grid-cols-2) */}
            <section className="mt-4 mb-12">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-600" />
                  <h2 className="text-base sm:text-xl font-black text-slate-900 flex items-center flex-wrap gap-2">
                    <span>
                      {searchQuery ? `Search Results: "${searchQuery}"` : `${selectedCategory} Prompts Gallery`}
                    </span>
                    {totalPages > 1 && (
                      <span className="text-xs sm:text-sm font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-lg">
                        Page {currentPage} of {totalPages}
                      </span>
                    )}
                  </h2>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {filteredPrompts.length} Prompts
                </span>
              </div>

              {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center space-y-3">
                  <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs font-medium text-slate-500">Loading prompts...</p>
                </div>
              ) : paginatedPrompts.length > 0 ? (
                <>
                  {/* EXACT TWO COLUMNS ON MOBILE (grid-cols-2) & 3-4 COLUMNS ON DESKTOP */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                    {paginatedPrompts.map((prompt) => (
                      <PromptCard
                        key={prompt.id}
                        prompt={prompt}
                        onViewDetails={handleViewPrompt}
                        onCopyPrompt={handleCopyPrompt}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />

                  {/* Sponsored Banner below gallery pagination */}
                  <AdBanner label="Sponsored Links" className="mt-6 mb-2" />
                </>
              ) : prompts.length === 0 ? (
                /* Store empty state */
                <div className="py-20 text-center max-w-md mx-auto px-4">
                  <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border border-blue-200">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">Ready for Prompts</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    Send your images, titles, and prompts in chat anytime to publish them directly!
                  </p>
                </div>
              ) : (
                /* Filter / search empty state */
                <div className="py-16 text-center max-w-sm mx-auto">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3 border border-blue-200">
                    <SearchX className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">No Prompts Found</h3>
                  <p className="text-xs text-slate-600 mb-4">
                    No prompts matched your search query. Try another keyword or explore other categories.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer shadow-sm"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </section>

            {/* 6. Comprehensive Search-Friendly AI Prompts FAQ Section */}
            <FAQSection />

          </div>
        )}

      </main>

      {/* 7. Footer (Dark theme matching AIPROMPTS.BUZZ) */}
      <Footer
        onSelectCategory={(catName) => {
          handleSelectCategory(catName);
          window.scrollTo({ top: 220, behavior: 'smooth' });
        }}
        onSelectCollection={navigateToCollection}
        onOpenModal={(type) => setActiveModal(type)}
      />


      {/* 9. Informational & Legal Modal (About Us, Contact Us, Privacy, Terms) */}
      <InfoModal
        type={activeModal}
        onClose={() => setActiveModal(null)}
      />

      {/* Interstitial Pop-up Ad with 10s Countdown Timer triggered strictly on photo click */}
      <InterstitialAdModal
        isOpen={isAdModalOpen}
        onClose={() => {
          setIsAdModalOpen(false);
          setPendingPrompt(null);
        }}
        onUnlockSuccess={handleUnlockSuccess}
      />

      {/* Floating Sticky Mobile/Desktop Bottom Ad Banner */}
      <StickyBottomAd />

      {/* Floating Success Toast: "Prompt Copied Successfully!" */}
      {toastMessage && (
        <div className="fixed bottom-16 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full bg-slate-900/95 text-white text-xs sm:text-sm font-bold shadow-2xl border border-slate-700/80 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
