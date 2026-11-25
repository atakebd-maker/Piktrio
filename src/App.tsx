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
import { WelcomeSliderModal } from './components/WelcomeSliderModal';
import { FAQSection } from './components/FAQSection';
import { CollectionPage } from './components/CollectionPage';
import { BlogPage } from './components/BlogPage';
import { PromptItem, CategoryItem, CollectionInfo, BlogPost } from './types/prompt';
import { PROMPTPIN_CATEGORIES, STORE_PROMPTS, COLLECTIONS_LIST, HIDDEN_PROMPT_IDS, ensureIdentityPromptSuffix, promptMatchesCategory } from './data/initialPrompts';
import { BLOG_POSTS } from './data/blogs';
import {
  subscribeToPrompts,
  subscribeToCategories,
  recordPromptCopy,
  recordPromptView,
  seedCategoriesIfEmpty,
  seedPromptsIfEmpty,
} from './services/promptService';
import { testConnection } from './services/firebase';
import { CheckCircle2, SearchX, Sparkles, Layers, BookOpen, ArrowRight } from 'lucide-react';

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
  const [categories, setCategories] = useState<CategoryItem[]>(PROMPTPIN_CATEGORIES);
  const [isLoading, setIsLoading] = useState(false);
  
  // Navigation & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  // Dedicated Prompt Details Page & Collection & Blog State
  const [selectedPrompt, setSelectedPrompt] = useState<PromptItem | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<CollectionInfo | null>(null);
  const [isBlogView, setIsBlogView] = useState<boolean>(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  // Interstitial Full-Screen Ad Modal triggered on photo click (10s -> 5s -> 2s -> 10s...)
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState<PromptItem | null>(null);

  // Opening centered popup slider with newest photos + natural ads on initial site load
  const [isWelcomePopupOpen, setIsWelcomePopupOpen] = useState<boolean>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const hasDirectRoute =
        Boolean(params.get('prompt') || params.get('p') || params.get('blog')) ||
        window.location.pathname.startsWith('/prompt/') ||
        window.location.pathname.startsWith('/blog') ||
        window.location.hash.startsWith('#prompt/');
      return !hasDirectRoute;
    } catch {
      return true;
    }
  });

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

      const blogParam = searchParams.get('blog');
      const isBlogPath = pathname === '/blog' || pathname.startsWith('/blog/');
      let targetBlog: BlogPost | null = null;
      if (blogParam) {
        targetBlog =
          BLOG_POSTS.find(
            (b) => b.slug.toLowerCase() === blogParam.toLowerCase() || b.id.toLowerCase() === blogParam.toLowerCase()
          ) || null;
      } else if (pathname.startsWith('/blog/')) {
        const slug = decodeURIComponent(pathname.replace('/blog/', '').replace(/\/$/, ''));
        targetBlog =
          BLOG_POSTS.find(
            (b) => b.slug.toLowerCase() === slug.toLowerCase() || b.id.toLowerCase() === slug.toLowerCase()
          ) || null;
      }

      if (targetPromptId && !HIDDEN_PROMPT_IDS.has(targetPromptId)) {
        const match = items.find((p) => p.id === targetPromptId) || STORE_PROMPTS.find((p) => p.id === targetPromptId);
        if (match) {
          setSelectedPrompt(match);
          setIsBlogView(false);
          document.title = `${match.title} – Piktrio`;
        }
      } else if (isBlogPath || blogParam) {
        setSelectedPrompt(null);
        setSelectedCollection(null);
        setIsBlogView(true);
        setSelectedBlog(targetBlog);
      } else {
        setSelectedPrompt(null);
        setIsBlogView(false);
        setSelectedBlog(null);
        if (targetCollection) {
          setSelectedCollection(targetCollection);
          document.title = `${targetCollection.title} – Piktrio`;
        } else {
          setSelectedCollection(null);
          resetHomeMeta();
        }
      }

      if (catParam) {
        const matchedCat = PROMPTPIN_CATEGORIES.find(
          (c) =>
            c.id.toLowerCase() === catParam.toLowerCase() ||
            c.name.toLowerCase() === catParam.toLowerCase()
        );
        const formattedCat = matchedCat
          ? matchedCat.name
          : catParam.charAt(0).toUpperCase() + catParam.slice(1).toLowerCase();
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
          if (HIDDEN_PROMPT_IDS.has(p.id)) return;
          const local = map.get(p.id);
          const merged = local
            ? {
                ...p,
                ...local,
                likesCount: Math.max(p.likesCount || 0, local.likesCount || 0),
                viewsCount: Math.max(p.viewsCount || 0, local.viewsCount || 0),
                copyCount: Math.max(p.copyCount || 0, local.copyCount || 0),
              }
            : { ...p };
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
      // Strictly preserve PROMPTPIN_CATEGORIES (all categories backed by actual posts, never empty)
      const merged = PROMPTPIN_CATEGORIES.map(
        (base) => cats.find((c) => c.id.toLowerCase() === base.id.toLowerCase()) || base
      );
      setCategories(merged.length > 0 ? merged : PROMPTPIN_CATEGORIES);
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

  // Ensure zero empty categories or collections ever appear in UI
  const visibleCategories = useMemo(() => {
    return categories.filter(
      (cat) => cat.id === 'all' || prompts.some((p) => promptMatchesCategory(p, cat.id))
    );
  }, [categories, prompts]);

  const visibleCollections = useMemo(() => {
    return COLLECTIONS_LIST.filter((col) =>
      prompts.some((p) => promptMatchesCategory(p, col.cat || col.id))
    );
  }, [prompts]);

  // Filter & Sort prompts: Pinned posts first, then newest posts first
  const filteredPrompts = useMemo(() => {
    const list = prompts.filter((p) => {
      // Category & Collection filter
      if (selectedCategory && selectedCategory.toLowerCase() !== 'all') {
        const matchedCat = PROMPTPIN_CATEGORIES.find(
          (c) =>
            c.name.toLowerCase() === selectedCategory.toLowerCase().trim() ||
            c.id.toLowerCase() === selectedCategory.toLowerCase().trim()
        );
        if (!promptMatchesCategory(p, matchedCat ? matchedCat.id : selectedCategory)) {
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

  // Open prompt via full-screen Interstitial Ad Modal (10s -> 5s -> 2s -> 10s...)
  const handleViewPrompt = (prompt: PromptItem) => {
    setIsWelcomePopupOpen(false);
    setPendingPrompt(prompt);
    setIsAdModalOpen(true);
  };

  // Successfully completed countdown and clicked Skip Ad
  const handleUnlockSuccess = () => {
    if (pendingPrompt) {
      navigateToPrompt(pendingPrompt);
      setPendingPrompt(null);
    }
  };

  // Directly navigate to collection dedicated page
  const navigateToCollection = (col: CollectionInfo) => {
    setSelectedPrompt(null);
    setIsBlogView(false);
    setSelectedBlog(null);
    setSelectedCollection(col);
    const newUrl = `/collection/${encodeURIComponent(col.slug)}`;
    window.history.pushState({ collectionSlug: col.slug }, '', newUrl);
    document.title = `${col.title} – Piktrio`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to Blog Index or specific Blog Article
  const navigateToBlog = (blog: BlogPost | null = null) => {
    setSelectedPrompt(null);
    setSelectedCollection(null);
    setIsBlogView(true);
    setSelectedBlog(blog);
    const newUrl = blog ? `/blog/${encodeURIComponent(blog.slug)}` : '/blog';
    window.history.pushState({ blogSlug: blog?.slug || null }, '', newUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back from collection to homepage
  const handleBackFromCollection = () => {
    setSelectedCollection(null);
    window.history.pushState({}, '', '/');
    resetHomeMeta();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back from blog to homepage
  const handleBackFromBlog = () => {
    setIsBlogView(false);
    setSelectedBlog(null);
    window.history.pushState({}, '', '/');
    resetHomeMeta();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back to gallery (or back to collection/blog if viewing from collection/blog)
  const handleBackToGallery = () => {
    setSelectedPrompt(null);
    if (isBlogView) {
      const newUrl = selectedBlog ? `/blog/${encodeURIComponent(selectedBlog.slug)}` : '/blog';
      window.history.pushState({ blogSlug: selectedBlog?.slug || null }, '', newUrl);
    } else if (selectedCollection) {
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
    setIsBlogView(false);
    setSelectedBlog(null);
    setSelectedCategory(catName);
    setSearchQuery('');
    setCurrentPage(1);

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('prompt');
    searchParams.delete('p');
    searchParams.delete('collection');
    searchParams.delete('blog');
    if (catName.toLowerCase() === 'all') {
      searchParams.delete('category');
      searchParams.delete('c');
    } else {
      const catObj = visibleCategories.find(
        (c) => c.name.toLowerCase() === catName.toLowerCase() || c.id.toLowerCase() === catName.toLowerCase()
      );
      searchParams.set('category', catObj ? catObj.id : catName.toLowerCase());
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
    setIsBlogView(false);
    setSelectedBlog(null);
    setSelectedCategory('All');
    setSearchQuery('');
    setCurrentPage(1);
    window.history.pushState({}, '', '/');
    window.location.hash = '';
    resetHomeMeta();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-950 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      
      {/* 1. Header (Clean White & Black, strictly NO app button) */}
      <Header
        onOpenMenu={() => setIsMenuOpen(true)}
        onHomeClick={handleHomeClick}
        onBlogClick={() => navigateToBlog(null)}
        onSelectCategory={handleSelectCategory}
        onSelectCollection={navigateToCollection}
        onOpenModal={(type) => setActiveModal(type)}
      />

      {/* Mobile Drawer Navigation */}
      <MobileDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        categories={visibleCategories}
        collections={visibleCollections}
        onSelectCategory={(catName) => {
          handleSelectCategory(catName);
          window.scrollTo({ top: 240, behavior: 'smooth' });
        }}
        onSelectCollection={navigateToCollection}
        onBlogClick={() => navigateToBlog(null)}
        onOpenModal={(type) => setActiveModal(type)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        
        {/* CONDITIONAL RENDERING: Dedicated Prompt Details Page OR Blog Page OR Collection Page OR Home Gallery */}
        {selectedPrompt ? (
          /* DEDICATED PROMPT DETAILS PAGE (Opened upon clicking any image) */
          <PromptDetailPage
            key={selectedPrompt.id}
            prompt={selectedPrompt}
            onBack={handleBackToGallery}
            onCopyPrompt={handleCopyPrompt}
            onSelectPrompt={handleViewPrompt}
            allPrompts={prompts}
          />
        ) : isBlogView ? (
          /* DEDICATED SEO BLOG SECTION (/blog or /blog/:slug) */
          <BlogPage
            blogs={BLOG_POSTS}
            selectedBlog={selectedBlog}
            allPrompts={prompts}
            onBackHome={handleBackFromBlog}
            onSelectBlog={(blog) => navigateToBlog(blog)}
            onSelectPrompt={handleViewPrompt}
            onCopyPrompt={handleCopyPrompt}
          />
        ) : selectedCollection ? (
          /* DEDICATED COLLECTION PAGE (Opened upon clicking any collection in Footer/Drawer/Header) */
          <CollectionPage
            key={selectedCollection.id}
            collection={selectedCollection}
            allPrompts={prompts}
            allCollections={visibleCollections}
            onBack={handleBackFromCollection}
            onSelectPrompt={handleViewPrompt}
            onCopyPrompt={handleCopyPrompt}
            onSelectCollection={navigateToCollection}
          />
        ) : (
          /* HOMEPAGE GALLERY VIEW (Matching Clean White & Blue) */
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            
            {/* Top Single Small Banner below Logo above Hero */}
            <div className="mt-3 mb-2 flex flex-col items-center">
              <AdBanner format="320x50" label="" className="my-0" priorityPrimary />
            </div>

            {/* 2. Hero Section: Clean White & Blue */}
            <HeroSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onTagClick={(tag) => handleSelectCategory(tag)}
              onCopySuccess={(msg) => showToast(msg)}
            />

            {/* Small Banner Only Above Categories (No Large Ad Here) */}
            <div className="my-3 flex flex-col items-center">
              <AdBanner format="320x50" label="" className="my-0" />
            </div>

            {/* 3. Horizontal Category Navigation */}
            <CategoryBar
              categories={visibleCategories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />

            {/* Small Banner Only Below Categories (No Large Ad Here) */}
            <div className="my-3 flex flex-col items-center">
              <AdBanner format="320x50" label="Sponsored Ad" className="my-0" />
            </div>

            {/* 4. Beautiful Pinned Photos Slider below categories */}
            <FeaturedSlider
              prompts={prompts}
              onSelectPrompt={handleViewPrompt}
              onSelectCategory={handleSelectCategory}
            />

            {/* Banners between Slider and Showcase Gallery (1x 320x50 + 1x 300x250) */}
            <div className="my-4 flex flex-col items-center gap-2.5">
              <AdBanner format="320x50" label="" className="my-0" />
              <AdBanner format="300x250" label="Sponsored Ad" className="my-0" />
            </div>

            {/* 5. MAIN PROMPTS GALLERY (Strictly 2 columns on mobile: grid-cols-2) */}
            <section className="mt-4 mb-12">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-200">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-600" />
                  <h2 className="text-base sm:text-xl font-black text-zinc-950 flex items-center flex-wrap gap-2">
                    <span>
                      {searchQuery ? `Search Results: "${searchQuery}"` : `${selectedCategory} Prompts Gallery`}
                    </span>
                    {totalPages > 1 && (
                      <span className="text-xs sm:text-sm font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-lg">
                        Page {currentPage} of {totalPages}
                      </span>
                    )}
                  </h2>
                </div>
                <span className="text-xs font-semibold text-zinc-500">
                  {filteredPrompts.length} Prompts
                </span>
              </div>

              {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center space-y-3">
                  <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs font-medium text-zinc-500">Loading prompts...</p>
                </div>
              ) : paginatedPrompts.length > 0 ? (
                <>
                  {/* EXACT TWO COLUMNS ON MOBILE (grid-cols-2) & 3-4 COLUMNS ON DESKTOP */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                    {paginatedPrompts.slice(0, 4).map((prompt) => (
                      <PromptCard
                        key={prompt.id}
                        prompt={prompt}
                        onViewDetails={handleViewPrompt}
                        onCopyPrompt={handleCopyPrompt}
                      />
                    ))}
                  </div>

                  {/* Mid-Gallery Ads */}
                  {paginatedPrompts.length > 4 && (
                    <>
                      <div className="my-5 flex flex-col items-center gap-2.5">
                        <AdBanner format="320x50" label="" className="my-0" />
                        <AdBanner format="300x250" label="Sponsored Partner" className="my-0" />
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                        {paginatedPrompts.slice(4).map((prompt) => (
                          <PromptCard
                            key={prompt.id}
                            prompt={prompt}
                            onViewDetails={handleViewPrompt}
                            onCopyPrompt={handleCopyPrompt}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Ads directly below gallery cards before pagination */}
                  <div className="mt-5 mb-2 flex flex-col items-center gap-2.5">
                    <AdBanner format="320x50" label="" className="my-0" />
                    <AdBanner format="300x250" label="Sponsored Ad" className="my-0" />
                  </div>

                  {/* Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : prompts.length === 0 ? (
                /* Store empty state */
                <div className="py-20 text-center max-w-md mx-auto px-4">
                  <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border border-blue-200">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-zinc-950 text-lg mb-2">Ready for Prompts</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                    Send your images, titles, and prompts in chat anytime to publish them directly!
                  </p>
                </div>
              ) : (
                /* Filter / search empty state */
                <div className="py-16 text-center max-w-sm mx-auto">
                  <div className="w-12 h-12 rounded-full bg-zinc-100 text-zinc-600 flex items-center justify-center mx-auto mb-3 border border-zinc-200">
                    <SearchX className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-zinc-950 text-base mb-1">No Prompts Found</h3>
                  <p className="text-xs text-zinc-600 mb-4">
                    No prompts matched your search query. Try another keyword or explore other categories.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-semibold hover:bg-blue-600 transition-colors cursor-pointer shadow-sm"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </section>

            {/* Banners above Blog & FAQ Section */}
            <div className="my-4 flex flex-col items-center gap-2.5">
              <AdBanner format="320x50" label="" className="my-0" />
              <AdBanner format="300x250" label="Sponsored Ad" className="my-0" />
            </div>

            {/* Featured SEO Blog Section Spotlight */}
            {BLOG_POSTS.length > 0 && (
              <section
                aria-label="Featured SEO Blog Guide"
                className="my-8 bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden p-5 sm:p-7"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-zinc-100">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
                      <BookOpen className="w-4 h-4" />
                    </span>
                    <div>
                      <h2 className="text-base sm:text-xl font-black text-zinc-950">
                        Daily Prompt
                      </h2>
                      <p className="text-[11px] sm:text-xs text-zinc-500">
                        All prompts from a category in one guide with copy buttons &amp; step-by-step tutorials
                      </p>
                    </div>
                  </div>
                  <a
                    href="/blog"
                    onClick={(e) => {
                      if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                        e.preventDefault();
                        navigateToBlog(null);
                      }
                    }}
                    className="text-xs font-bold text-blue-600 hover:underline no-underline"
                  >
                    View All Blogs &rarr;
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  <a
                    href={`/blog/${encodeURIComponent(BLOG_POSTS[0].slug)}`}
                    onClick={(e) => {
                      if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                        e.preventDefault();
                        navigateToBlog(BLOG_POSTS[0]);
                      }
                    }}
                    className="md:col-span-4 bg-zinc-50 rounded-2xl border border-zinc-200 p-2.5 flex items-center justify-center no-underline"
                  >
                    <img
                      src={BLOG_POSTS[0].coverImageUrl}
                      alt={BLOG_POSTS[0].title}
                      referrerPolicy="no-referrer"
                      style={{ objectFit: 'contain' }}
                      className="max-h-[220px] w-auto object-contain rounded-xl"
                    />
                  </a>

                  <div className="md:col-span-8 space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 text-white font-bold">
                        {BLOG_POSTS[0].categoryName} Guide
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                        Complete Category Blog
                      </span>
                      <span className="text-zinc-500 font-medium">{BLOG_POSTS[0].readTime}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-zinc-950 leading-snug">
                      <a
                        href={`/blog/${encodeURIComponent(BLOG_POSTS[0].slug)}`}
                        onClick={(e) => {
                          if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                            e.preventDefault();
                            navigateToBlog(BLOG_POSTS[0]);
                          }
                        }}
                        className="text-inherit hover:text-blue-600 transition-colors no-underline"
                      >
                        {BLOG_POSTS[0].title}
                      </a>
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      {BLOG_POSTS[0].excerpt}
                    </p>

                    <a
                      href={`/blog/${encodeURIComponent(BLOG_POSTS[0].slug)}`}
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                          e.preventDefault();
                          navigateToBlog(BLOG_POSTS[0]);
                        }
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-blue-600 text-white text-xs sm:text-sm font-bold transition-colors no-underline shadow-xs"
                    >
                      <span>Read Diwali Blog &amp; Copy All Prompts</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </section>
            )}

            {/* 6. Comprehensive Search-Friendly AI Prompts FAQ Section */}
            <FAQSection />

            {/* Bottom Banners above Footer (1x 320x50 + 1x 300x250) */}
            <div className="mt-4 mb-8 flex flex-col items-center gap-2.5">
              <AdBanner format="320x50" label="" className="my-0" />
              <AdBanner format="300x250" label="Sponsored Partner" className="my-0" />
            </div>

          </div>
        )}

      </main>

      {/* 7. Footer */}
      <Footer
        collections={visibleCollections}
        onSelectCategory={(catName) => {
          handleSelectCategory(catName);
          window.scrollTo({ top: 220, behavior: 'smooth' });
        }}
        onSelectCollection={navigateToCollection}
        onBlogClick={() => navigateToBlog(null)}
        onOpenModal={(type) => setActiveModal(type)}
      />


      {/* 9. Informational & Legal Modal (About Us, Contact Us, Privacy, Terms) */}
      <InfoModal
        type={activeModal}
        onClose={() => setActiveModal(null)}
      />

      {/* Opening Centered Popup with Newest Photos Slider & Natural Ads */}
      <WelcomeSliderModal
        isOpen={isWelcomePopupOpen && !selectedPrompt && !isBlogView && !isAdModalOpen}
        prompts={prompts}
        onClose={() => setIsWelcomePopupOpen(false)}
        onSelectPrompt={handleViewPrompt}
      />

      {/* Full-Screen Interstitial Ad Modal (10s -> 5s -> 2s -> 10s cycle) with Skip button */}
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
        <div className="fixed bottom-16 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full bg-zinc-900 text-white text-xs sm:text-sm font-bold shadow-2xl border border-zinc-700 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
