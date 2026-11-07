import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { MobileDrawer } from './components/MobileDrawer';
import { HeroSearch } from './components/HeroSearch';
import { CategoryBar } from './components/CategoryBar';
import { FeaturedSlider } from './components/FeaturedSlider';
import { PromptCard } from './components/PromptCard';
import { PromptDetailPage } from './components/PromptDetailPage';
import { LightboxModal } from './components/LightboxModal';
import { Pagination } from './components/Pagination';
import { Footer } from './components/Footer';
import { InfoModal, ModalType } from './components/InfoModal';
import { PromptItem, CategoryItem } from './types/prompt';
import { PROMPTPIN_CATEGORIES, STORE_PROMPTS } from './data/initialPrompts';
import {
  subscribeToPrompts,
  subscribeToCategories,
  recordPromptCopy,
  recordPromptView,
  seedCategoriesIfEmpty,
} from './services/promptService';
import { testConnection } from './services/firebase';
import { CheckCircle2, SearchX, Sparkles } from 'lucide-react';

const ITEMS_PER_PAGE = 8; // Optimal for 2-column mobile and 4-column desktop layout

export default function App() {
  const [prompts, setPrompts] = useState<PromptItem[]>(STORE_PROMPTS);
  const [categories, setCategories] = useState<CategoryItem[]>(PROMPTPIN_CATEGORIES);
  const [isLoading, setIsLoading] = useState(true);
  
  // Navigation & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  // Dedicated Prompt Details Page State
  const [selectedPrompt, setSelectedPrompt] = useState<PromptItem | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);

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

    const syncRouteFromLocation = (items: PromptItem[]) => {
      const searchParams = new URLSearchParams(window.location.search);
      const promptParam = searchParams.get('prompt') || searchParams.get('p');
      const catParam = searchParams.get('category') || searchParams.get('c');
      const hash = window.location.hash;

      const targetPromptId = promptParam || (hash.startsWith('#prompt/') ? hash.replace('#prompt/', '') : null);

      if (targetPromptId) {
        const match = items.find((p) => p.id === targetPromptId) || STORE_PROMPTS.find((p) => p.id === targetPromptId);
        if (match) {
          setSelectedPrompt(match);
          document.title = `${match.title} – Piktrio`;
        }
      } else {
        setSelectedPrompt(null);
        document.title = 'Piktrio – AI Photo Editing Prompts for ChatGPT & Gemini';
      }

      if (catParam) {
        const formattedCat = catParam.charAt(0).toUpperCase() + catParam.slice(1).toLowerCase();
        setSelectedCategory(formattedCat);
      }
    };

    const unsubPrompts = subscribeToPrompts(
      (items) => {
        const activeItems = items.length > 0 ? items : STORE_PROMPTS;
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
      const order = ['trending', 'all', 'diwali', 'retro', 'boys', 'couple'];
      const sorted = order
        .map((id) => cats.find((c) => c.id.toLowerCase() === id) || PROMPTPIN_CATEGORIES.find((c) => c.id.toLowerCase() === id))
        .filter((c): c is CategoryItem => Boolean(c));
      if (sorted.length > 0) {
        setCategories(sorted);
      } else {
        setCategories(PROMPTPIN_CATEGORIES);
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

  // Filter prompts by Search Query and Selected Category / Collection
  const filteredPrompts = useMemo(() => {
    return prompts.filter((p) => {
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

        // Check if user selected Retro / 90s collection
        const isRetroFilter = sel.includes('retro') || sel.includes('vintage') || sel.includes('90s');
        const matchesRetro = isRetroFilter && (
          cat.includes('retro') ||
          cat.includes('vintage') ||
          title.includes('retro') ||
          title.includes('vintage') ||
          title.includes('90s') ||
          p.tags?.some((t) => {
            const tag = t.toLowerCase();
            return tag.includes('retro') || tag.includes('vintage') || tag.includes('90s');
          })
        );

        // Standard category matching
        const matchesStandard =
          cat === sel ||
          p.tags?.some((t) => {
            const tag = t.toLowerCase();
            return tag === sel || sel.includes(tag) || tag.includes(sel);
          }) ||
          sel.includes(cat);

        if (!matchesDiwali && !matchesRetro && !matchesStandard) {
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
  };

  // Open prompt on dedicated page
  const handleViewPrompt = (prompt: PromptItem) => {
    setSelectedPrompt(prompt);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('prompt', prompt.id);
    window.history.pushState({ promptId: prompt.id }, '', `?${searchParams.toString()}`);
    document.title = `${prompt.title} – Piktrio`;
    recordPromptView(prompt.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back to gallery
  const handleBackToGallery = () => {
    setSelectedPrompt(null);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('prompt');
    const newSearch = searchParams.toString();
    const newUrl = window.location.pathname + (newSearch ? `?${newSearch}` : '');
    window.history.pushState({}, '', newUrl);
    document.title = 'Piktrio – AI Photo Editing Prompts for ChatGPT & Gemini';
    window.scrollTo({ top: 240, behavior: 'smooth' });
  };

  // Copy prompt action
  const handleCopyPrompt = (_promptText: string, promptId: string) => {
    recordPromptCopy(promptId);
    showToast('Prompt Copied Successfully!');
  };

  // Category selection with clean URL query params (no hash fragments) for SEO
  const handleSelectCategory = (catName: string) => {
    setSelectedPrompt(null);
    setSelectedCategory(catName);
    setSearchQuery('');
    setCurrentPage(1);

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('prompt');
    searchParams.delete('p');
    if (catName.toLowerCase() === 'all') {
      searchParams.delete('category');
      searchParams.delete('c');
    } else {
      searchParams.set('category', catName.toLowerCase());
    }
    const newSearch = searchParams.toString();
    const newUrl = window.location.pathname + (newSearch ? `?${newSearch}` : '');
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
    setSelectedCategory('All');
    setSearchQuery('');
    setCurrentPage(1);
    window.history.pushState({}, '', window.location.pathname);
    window.location.hash = '';
    document.title = 'Piktrio – AI Photo Editing Prompts for ChatGPT & Gemini';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      
      {/* 1. Header (Sticky, clean white, logo left, hamburger right) */}
      <Header
        onOpenMenu={() => setIsMenuOpen(true)}
        onHomeClick={handleHomeClick}
        onSelectCategory={handleSelectCategory}
        onOpenModal={(type) => setActiveModal(type)}
      />

      {/* Mobile Drawer Navigation (Matching Screenshot 1) */}
      <MobileDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectCategory={(catName) => {
          handleSelectCategory(catName);
          window.scrollTo({ top: 240, behavior: 'smooth' });
        }}
        onOpenModal={(type) => setActiveModal(type)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        
        {/* CONDITIONAL RENDERING: Dedicated Prompt Details Page OR Home Gallery */}
        {selectedPrompt ? (
          /* DEDICATED PROMPT DETAILS PAGE (Opened upon clicking any image) */
          <PromptDetailPage
            prompt={selectedPrompt}
            onBack={handleBackToGallery}
            onOpenLightbox={(url, title) => setLightboxImage({ url, title })}
            onCopyPrompt={handleCopyPrompt}
            onSelectPrompt={handleViewPrompt}
            allPrompts={prompts}
          />
        ) : (
          /* HOMEPAGE GALLERY VIEW */
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            {/* 2. Homepage Heading & Search (Matching Screenshots 5 & 6) */}
            <HeroSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* 3. Horizontal Category Navigation (Single Line) */}
            <CategoryBar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />

            {/* 4. Long Horizontal Featured Banner Slider below categories */}
            <FeaturedSlider
              onSelectCategory={(name) => {
                handleSelectCategory(name);
                window.scrollTo({ top: 340, behavior: 'smooth' });
              }}
            />

            {/* 5. Two-Column Image Gallery on Mobile / Multi-column on Desktop */}
            <section className="mt-4 mb-8">
              {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center space-y-3">
                  <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs font-medium text-gray-400">Loading prompts...</p>
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

                  {/* 5. Pagination (Matching Screenshot 3) */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : prompts.length === 0 ? (
                /* Store empty state - Ready for user's fresh uploads */
                <div className="py-20 text-center max-w-md mx-auto px-4">
                  <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 shadow-xs">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Ready for New Prompts</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    All previous prompts have been cleared. Send your images, titles, and prompts in chat anytime, and they will be published directly to Piktrio!
                  </p>
                  <span className="inline-block px-3.5 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 rounded-full border border-blue-200/60">
                    0 Prompts • Ready to Upload
                  </span>
                </div>
              ) : (
                /* Filter / search empty state */
                <div className="py-16 text-center max-w-sm mx-auto">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                    <SearchX className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-1">No Prompts Found</h3>
                  <p className="text-xs text-gray-500 mb-4">
                    No prompts matched your search query. Try another keyword or explore other categories.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </section>
          </div>
        )}

      </main>

      {/* 6. Footer (Matching Screenshots 2, 3, 4 with MENU, COLLECTIONS, FOLLOW US) */}
      <Footer
        onSelectCategory={(catName) => {
          handleSelectCategory(catName);
          window.scrollTo({ top: 220, behavior: 'smooth' });
        }}
        onOpenModal={(type) => setActiveModal(type)}
      />

      {/* 7. Lightbox for 100% Full Uncropped Image Preview */}
      <LightboxModal
        imageUrl={lightboxImage ? lightboxImage.url : null}
        title={lightboxImage ? lightboxImage.title : ''}
        onClose={() => setLightboxImage(null)}
      />

      {/* 8. Informational & Legal Modal (About Us, Contact Us, Privacy, Terms) */}
      <InfoModal
        type={activeModal}
        onClose={() => setActiveModal(null)}
      />

      {/* Floating Success Toast: "Prompt Copied Successfully!" */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-gray-900 text-white text-xs font-semibold shadow-2xl border border-gray-800 animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
