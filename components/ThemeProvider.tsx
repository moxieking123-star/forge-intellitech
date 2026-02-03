'use client';

import { 
  createContext, 
  useContext, 
  useEffect, 
  useState, 
  useCallback,
  type ReactNode 
} from 'react';
import { ThemeMode, Chapter, THEME_STORAGE_KEY } from '@/lib/themes';

/* ============================================
   CONTEXT DEFINITION
   ============================================ */

interface ThemeContextValue {
  /** Current resolved mode (never 'system') */
  mode: 'light' | 'dark';
  /** User's preference (may be 'system') */
  preference: ThemeMode;
  /** Current chapter (page identity) */
  chapter: Chapter;
  /** Toggle between light and dark */
  toggleMode: () => void;
  /** Set specific mode */
  setMode: (mode: ThemeMode) => void;
  /** Set chapter (called by page wrappers) */
  setChapter: (chapter: Chapter) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/* ============================================
   HELPER: Get system preference
   ============================================ */

function getSystemPreference(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches 
    ? 'dark' 
    : 'light';
}

/* ============================================
   HELPER: Resolve mode from preference
   ============================================ */

function resolveMode(preference: ThemeMode): 'light' | 'dark' {
  if (preference === 'system') {
    return getSystemPreference();
  }
  return preference;
}

/* ============================================
   PROVIDER COMPONENT
   ============================================ */

interface ThemeProviderProps {
  children: ReactNode;
  /** Default mode if no preference saved */
  defaultMode?: ThemeMode;
  /** Default chapter */
  defaultChapter?: Chapter;
}

export function ThemeProvider({ 
  children, 
  defaultMode = 'dark',
  defaultChapter = 'forge',
}: ThemeProviderProps) {
  // Track user's preference (may be 'system')
  const [preference, setPreference] = useState<ThemeMode>(defaultMode);
  // Track resolved mode (never 'system')
  const [mode, setModeState] = useState<'light' | 'dark'>(
    resolveMode(defaultMode)
  );
  // Track current chapter
  const [chapter, setChapter] = useState<Chapter>(defaultChapter);
  // Track if we've hydrated
  const [isHydrated, setIsHydrated] = useState(false);

  /* ----------------------------------------
     Initialize from localStorage on mount
     ---------------------------------------- */
  useEffect(() => {
    // Read saved preference
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    const initialPreference = saved || defaultMode;
    
    setPreference(initialPreference);
    setModeState(resolveMode(initialPreference));
    setIsHydrated(true);
  }, [defaultMode]);

  /* ----------------------------------------
     Apply mode to document
     ---------------------------------------- */
  useEffect(() => {
    if (!isHydrated) return;
    
    // Set data attribute on html element
    document.documentElement.setAttribute('data-mode', mode);
    
    // Also set color-scheme for native elements
    document.documentElement.style.colorScheme = mode;
  }, [mode, isHydrated]);

  /* ----------------------------------------
     Apply chapter to document
     ---------------------------------------- */
  useEffect(() => {
    document.documentElement.setAttribute('data-chapter', chapter);
  }, [chapter]);

  /* ----------------------------------------
     Listen for system preference changes
     ---------------------------------------- */
  useEffect(() => {
    if (preference !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setModeState(e.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [preference]);

  /* ----------------------------------------
     Mode setters
     ---------------------------------------- */
  const setMode = useCallback((newPreference: ThemeMode) => {
    setPreference(newPreference);
    setModeState(resolveMode(newPreference));
    localStorage.setItem(THEME_STORAGE_KEY, newPreference);
  }, []);

  const toggleMode = useCallback(() => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
  }, [mode, setMode]);

  /* ----------------------------------------
     Context value
     ---------------------------------------- */
  const value: ThemeContextValue = {
    mode,
    preference,
    chapter,
    toggleMode,
    setMode,
    setChapter,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/* ============================================
   HOOK: Use theme context
   ============================================ */

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/* ============================================
   COMPONENT: Theme Toggle Button
   ============================================ */

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { mode, toggleMode } = useTheme();

  return (
    <button
      onClick={toggleMode}
      className={`
        relative p-2 rounded-lg
        bg-env-surface hover:bg-env-surface-hover
        border border-env-border
        transition-smooth
        ${className}
      `}
      aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Sun icon */}
      <svg 
        className={`
          w-5 h-5 transition-all duration-300
          ${mode === 'dark' 
            ? 'opacity-100 rotate-0 scale-100' 
            : 'opacity-0 rotate-90 scale-0 absolute'
          }
        `}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
        />
      </svg>
      
      {/* Moon icon */}
      <svg 
        className={`
          w-5 h-5 transition-all duration-300
          ${mode === 'light' 
            ? 'opacity-100 rotate-0 scale-100' 
            : 'opacity-0 -rotate-90 scale-0 absolute'
          }
        `}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
        />
      </svg>
    </button>
  );
}
