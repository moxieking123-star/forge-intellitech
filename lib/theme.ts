// lib/themes.ts

/**
 * Forge Intellitech Theme System
 */

export type ThemeMode = 'light' | 'dark' | 'system';

export const THEME_MODES: ThemeMode[] = ['light', 'dark', 'system'];

export const THEME_STORAGE_KEY = 'forge-theme-mode';

export type Chapter = 
  | 'forge'      // Core brand identity (Indigo)
  | 'ignition'   // Innovation, products (Amber/Orange)
  | 'rise'       // Education, youth (Vibrant Purple)
  | 'expand'     // Mobility, infrastructure (Teal)
  | 'foundation'; // About, stability (Clay/Amber)

export const CHAPTERS: Chapter[] = [
  'forge',
  'ignition', 
  'rise',
  'expand',
  'foundation',
];

/**
 * Chapter metadata for UI and documentation
 */
export const CHAPTER_META: Record<Chapter, {
  name: string;
  description: string;
  color: string;
  icon: string;
}> = {
  forge: {
    name: 'Forge',
    description: 'The core — where ideas are shaped into reality',
    color: '#3D5A80', // Deep Indigo
    icon: '🔷',
  },
  ignition: {
    name: 'Ignition',
    description: 'The spark — where innovation begins',
    color: '#E07B39', // Sahel Amber
    icon: '🔥',
  },
  rise: {
    name: 'Rise',
    description: 'The growth — education, youth, and potential',
    color: '#8B5CF6', // Vibrant Purple
    icon: '🚀',
  },
  expand: {
    name: 'Expand',
    description: 'The reach — mobility and connection',
    color: '#14B8A6', // Teal
    icon: '🌍',
  },
  foundation: {
    name: 'Foundation',
    description: 'The ground — stability and trust',
    color: '#B45309', // Clay Amber
    icon: '🏛️',
  },
};

/**
 * Maps pages to their chapter identities
 */
export const PAGE_CHAPTERS: Record<string, Chapter> = {
  '/': 'forge',
  '/about': 'foundation',
  '/products': 'ignition',
  '/techup': 'ignition',      // Orange for innovation/education product
  '/launchpad': 'rise',       // Purple for youth/growth
  '/gallery': 'forge',
  '/blog': 'forge',
  '/contact': 'forge',
  '/join': 'expand',
};

/**
 * Get chapter for a given path
 */
export function getChapterForPath(path: string): Chapter {
  if (PAGE_CHAPTERS[path]) {
    return PAGE_CHAPTERS[path];
  }
  
  for (const [route, chapter] of Object.entries(PAGE_CHAPTERS)) {
    if (path.startsWith(route) && route !== '/') {
      return chapter;
    }
  }
  
  return 'forge';
}