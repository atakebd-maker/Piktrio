import { CategoryItem, PromptItem } from '../types/prompt';

export const PROMPTPIN_CATEGORIES: CategoryItem[] = [
  { id: 'all', name: 'All', description: 'All AI Photo editing prompts' },
  { id: 'boys', name: 'Boys', description: 'AI photo editing prompts for boys and men' },
  { id: 'girls', name: 'Girls', description: 'AI photo editing prompts for girls and women' },
  { id: 'couple', name: 'Couple', description: 'Romantic and aesthetic couple AI photo prompts' },
  { id: 'templates', name: 'Templates', description: 'Trending CapCut and VN video editing templates' },
  { id: 'anime', name: 'Anime', description: 'Anime style and aesthetic artwork prompts' },
  { id: 'cinematic', name: 'Cinematic', description: 'Moody cinematic film aesthetics and widescreen frames' },
  { id: 'portraits', name: 'Portraits', description: 'Close-up studio portraits and realistic lighting' },
  { id: 'trending', name: 'Trending', description: 'Viral and popular AI image editing prompts' },
];

// Cleared so only user-uploaded prompts appear
export const STORE_PROMPTS: PromptItem[] = [];
