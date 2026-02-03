'use client';

import { useEffect, type ReactNode } from 'react';
import { useTheme } from './ThemeProvider';
import { Chapter } from '@/lib/themes';

/* ============================================
   CHAPTER WRAPPER
   ============================================
   
   Wraps page content and sets the chapter theme.
   This component:
   - Sets the chapter in ThemeContext
   - Optionally adds animation classes
   - Provides a clean page container
   
   Usage:
   <ChapterWrapper chapter="ignition">
     <YourPageContent />
   </ChapterWrapper>
   
============================================ */

interface ChapterWrapperProps {
  /** The chapter theme for this page */
  chapter: Chapter;
  /** Page content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Enable page entrance animation */
  animate?: boolean;
}

export function ChapterWrapper({ 
  chapter, 
  children, 
  className = '',
  animate = true,
}: ChapterWrapperProps) {
  const { setChapter } = useTheme();

  // Set chapter on mount and when it changes
  useEffect(() => {
    setChapter(chapter);
  }, [chapter, setChapter]);

  return (
    <div 
      className={`
        chapter-wrapper
        ${animate ? 'animate-fade-in' : ''}
        ${className}
      `}
      data-chapter={chapter}
    >
      {children}
    </div>
  );
}

/* ============================================
   CHAPTER SECTION
   ============================================
   
   A section within a page that can have its
   own chapter theme. Useful for multi-chapter
   pages like the homepage.
   
============================================ */

interface ChapterSectionProps {
  /** The chapter theme for this section */
  chapter: Chapter;
  /** Section content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Section ID for navigation */
  id?: string;
}

export function ChapterSection({ 
  chapter, 
  children, 
  className = '',
  id,
}: ChapterSectionProps) {
  return (
    <section 
      id={id}
      className={className}
      data-chapter={chapter}
      style={{
        // Section-level chapter variables
        // These override the page-level chapter
        '--chapter-accent': `var(--section-${chapter}-accent, var(--chapter-accent))`,
      } as React.CSSProperties}
    >
      {children}
    </section>
  );
}