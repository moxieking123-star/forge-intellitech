"use client";

import { useEffect, type ReactNode } from "react";
import { useTheme } from "./ThemeProvider";
import { Chapter } from "@/lib/themes";

interface ChapterWrapperProps {
  /** The chapter identity for this page */
  chapter: Chapter;
  /** Page content */
  children: ReactNode;
  /** Optional additional classes */
  className?: string;
}

/**
 * ChapterWrapper
 * 
 * Wraps page content and sets the chapter theme.
 * Each page should use this to establish its color identity.
 * 
 * @example
 * <ChapterWrapper chapter="rise">
 *   <YourPageContent />
 * </ChapterWrapper>
 */
export function ChapterWrapper({ 
  chapter, 
  children, 
  className = "" 
}: ChapterWrapperProps) {
  const { setChapter } = useTheme();

  // Set chapter on mount and when chapter prop changes
  useEffect(() => {
    setChapter(chapter);
    
    // Cleanup: reset to default when unmounting
    // (optional - remove if you want chapter to persist)
    return () => {
      // setChapter('forge');
    };
  }, [chapter, setChapter]);

  return (
    <div 
      className={`min-h-screen ${className}`}
      data-page-chapter={chapter}
    >
      {children}
    </div>
  );
}

export default ChapterWrapper;