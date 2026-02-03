/**
 * Forge Theme System
 * 
 * This file defines the available themes (chapters) and modes.
 * Each chapter represents an emotional stage in the Forge narrative.
 * 
 * Architecture:
 * - Mode (light/dark): Global environment, user preference
 * - Chapter: Page identity, content-driven
 */

/* ============================================
   TYPE DEFINITIONS
   ============================================ */

export type ThemeMode = 'light' | 'dark' | 'system';

export type Chapter = 
  | 'forge'       // Default — the making, Forge blue
  | 'ignition'    // The spark — warm orange
  | 'rise'        // Growth — vibrant purple  
  | 'expand'      // Reaching outward — teal
  | 'foundation'; // Solid ground — warm neutral

export interface ChapterMeta {
  name: string;
  description: string;
  /** 
   * Primary accent color (for reference only — 
   * actual colors are in CSS variables)
   */
  accent: string;
}

/* ============================================
   CHAPTER METADATA
   ============================================ */

export const chapters: Record<Chapter, ChapterMeta> = {
  forge: {
    name: 'Forge',
    description: 'The making — where ideas take shape through heat and pressure',
    accent: '#3b82f6',
  },
  ignition: {
    name: 'Ignition',
    description: 'The spark — the moment an idea catches fire',
    accent: '#f97316',
  },
  rise: {
    name: 'Rise',
    description: 'Growth — emerging stronger, reaching higher',
    accent: '#a855f7',
  },
  expand: {
    name: 'Expand',
    description: 'Reaching outward — connecting, scaling, impacting',
    accent: '#14b8a6',
  },
  foundation: {
    name: 'Foundation',
    description: 'Solid ground — the bedrock on which everything is built',
    accent: '#78716c',
  },
};

/* ============================================
   RECOMMENDED PAGE CHAPTERS
   ============================================
   These are suggestions — pages can override.
   The mapping reflects the narrative journey.
*/

export const pageChapters: Record<string, Chapter> = {
  '/': 'forge',           // Home — the core identity
  '/about': 'foundation', // About — who we are at our core
  '/products': 'forge',   // Products — what we're making
  '/techup': 'ignition',  // TechUp — sparking education
  '/launchpad': 'rise',   // LaunchPad — helping ideas rise
  '/blog': 'forge',       // Blog — thoughts from the forge
  '/contact': 'expand',   // Contact — reaching out
  '/join': 'ignition',    // Join — catching the fire
};

/* ============================================
   HELPER FUNCTIONS
   ============================================ */

/**
 * Get the recommended chapter for a given pathname
 */
export function getChapterForPath(pathname: string): Chapter {
  // Exact match
  if (pageChapters[pathname]) {
    return pageChapters[pathname];
  }
  
  // Check for nested routes (e.g., /blog/post-slug → blog)
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0) {
    const parentPath = `/${segments[0]}`;
    if (pageChapters[parentPath]) {
      return pageChapters[parentPath];
    }
  }
  
  // Default to forge
  return 'forge';
}

/**
 * Storage key for persisting theme mode
 */
export const THEME_STORAGE_KEY = 'forge-theme-mode';