export interface PromptItem {
  id: string;
  title: string;
  prompt: string;
  negativePrompt?: string;
  description: string;
  category: string;
  tags: string[];
  imageUrl: string;
  model: string;
  aspectRatio: string;
  likesCount: number;
  viewsCount: number;
  copyCount: number;
  featured?: boolean;
  isPopular?: boolean;
  isPinned?: boolean;     // 📌 Pinned badge
  isTemplate?: boolean;   // 📌 Template badge
  createdAt: string;
  updatedAt?: string;
  author?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  iconName?: string;
  count?: number;
}

export type SortOption = 'latest' | 'popular' | 'most-copied' | 'title';

export interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  selectedModel: string;
  sortBy: SortOption;
}

export interface CollectionInfo {
  id: string;
  label: string;
  slug: string;
  cat: string;
  title: string;
  description: string;
}

export interface BlogFAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  author: string;
  coverImageUrl: string;
  keywords: string[];
  introParagraphs: string[];
  perPromptNotes: Record<
    string,
    {
      headline?: string;
      summary: string;
      howToSteps: string[];
      proTip: string;
    }
  >;
  masterHowToSteps: {
    stepNumber: number;
    title: string;
    detail: string;
  }[];
  faqs: BlogFAQItem[];
}
