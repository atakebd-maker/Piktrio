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

