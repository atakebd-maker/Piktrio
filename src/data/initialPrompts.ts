import { CategoryItem, PromptItem } from '../types/prompt';

/**
 * Standard categories strictly requested by the user:
 * - All
 * - Trending
 * - Boys
 * - Girls
 * - Couple
 */
export const PROMPTPIN_CATEGORIES: CategoryItem[] = [
  { id: 'all', name: 'All', description: 'All AI Photo editing prompts' },
  { id: 'trending', name: 'Trending', description: 'Viral and popular AI image editing prompts' },
  { id: 'boys', name: 'Boys', description: 'AI photo editing prompts for boys and men' },
  { id: 'girls', name: 'Girls', description: 'AI photo editing prompts for girls and women' },
  { id: 'couple', name: 'Couple', description: 'Romantic and aesthetic couple AI photo prompts' },
];

// Cleared so only user-uploaded prompts appear
export const STORE_PROMPTS: PromptItem[] = [];
