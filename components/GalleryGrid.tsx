"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

// ============================================
// TYPES
// ============================================

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface GalleryCategory {
  value: string;
  label: string;
  icon?: string;
}

// ============================================
// LIGHTBOX COMPONENT
// ============================================

interface LightboxProps {
  image: GalleryImage;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  currentIndex: number;
  totalImages: number;
}

function Lightbox({
  image,
  onClose,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
  currentIndex,
  totalImages,
}: LightboxProps) {
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && hasNext) onNext();
      if (e.key === "ArrowLeft" && hasPrevious) onPrevious();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose, onNext, onPrevious, hasNext, hasPrevious]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Counter */}
      <div className="absolute top-4 left-4 text-white/60 text-sm font-medium z-10">
        {currentIndex + 1} / {totalImages}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white/60 hover:text-white rounded-full hover:bg-white/10 transition-colors"
        aria-label="Close lightbox"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Previous button */}
      {hasPrevious && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrevious(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/60 hover:text-white rounded-full hover:bg-white/10 transition-colors z-10"
          aria-label="Previous image"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Image container */}
      <div
        className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[70vh]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        </div>
        {image.caption && (
          <p className="text-center text-white/80 mt-6 text-lg max-w-2xl px-4">
            {image.caption}
          </p>
        )}
      </div>

      {/* Next button */}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/60 hover:text-white rounded-full hover:bg-white/10 transition-colors z-10"
          aria-label="Next image"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}

// ============================================
// IMAGE CARD COMPONENT
// ============================================

interface ImageCardProps {
  image: GalleryImage;
  onClick: () => void;
  priority?: boolean;
}

function ImageCard({ image, onClick, priority = false }: ImageCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <button
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-2xl bg-env-surface border border-env-border focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent aspect-[4/3] hover-lift transition-all duration-500"
      aria-label={`View ${image.alt}`}
    >
      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-env-surface animate-pulse" />
      )}

      {/* Error state */}
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-env-surface">
          <div className="text-center p-4">
            <svg className="w-12 h-12 mx-auto text-env-tertiary mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-env-tertiary">Image not found</p>
          </div>
        </div>
      ) : (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className={`object-cover transition-all duration-700 group-hover:scale-110 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white font-medium text-lg mb-2 line-clamp-2">
            {image.caption || image.alt}
          </p>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs bg-white/20 text-white rounded-full capitalize backdrop-blur-sm">
            {image.category}
          </span>
        </div>
      </div>

      {/* Zoom icon */}
      <div className="absolute top-4 right-4 p-2.5 bg-black/40 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
      </div>
    </button>
  );
}

// ============================================
// MAIN GALLERY GRID COMPONENT
// ============================================

interface GalleryGridProps {
  images: GalleryImage[];
  categories?: GalleryCategory[];
  showFilters?: boolean;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function GalleryGrid({
  images,
  categories = [],
  showFilters = true,
  columns = 3,
  className = "",
}: GalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Filter images
  const filteredImages = selectedCategory === "all"
    ? images
    : images.filter((img) => img.category === selectedCategory);

  // Lightbox navigation
  const currentIndex = selectedImage
    ? filteredImages.findIndex((img) => img.id === selectedImage.id)
    : -1;

  const handleNext = useCallback(() => {
    if (currentIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentIndex + 1]);
    }
  }, [currentIndex, filteredImages]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setSelectedImage(filteredImages[currentIndex - 1]);
    }
  }, [currentIndex, filteredImages]);

  // Column classes
  const columnClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div className={className}>
      {/* Category Filters */}
      {showFilters && categories.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === "all"
                ? "bg-chapter-accent text-white shadow-glow"
                : "bg-env-surface text-env-secondary hover:text-env-primary border border-env-border hover:border-chapter-accent/30"
            }`}
          >
            📸 All
            {selectedCategory === "all" && (
              <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                {images.length}
              </span>
            )}
          </button>
          
          {categories.map((category) => {
            const count = images.filter((img) => img.category === category.value).length;
            if (count === 0) return null;
            
            return (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.value
                    ? "bg-chapter-accent text-white shadow-glow"
                    : "bg-env-surface text-env-secondary hover:text-env-primary border border-env-border hover:border-chapter-accent/30"
                }`}
              >
                {category.icon && <span>{category.icon}</span>}
                {category.label}
                {selectedCategory === category.value && (
                  <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Image Grid */}
      {filteredImages.length > 0 ? (
        <div className={`grid ${columnClasses[columns]} gap-4 md:gap-6`}>
          {filteredImages.map((image, index) => (
            <ImageCard
              key={image.id}
              image={image}
              onClick={() => setSelectedImage(image)}
              priority={index < 6}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-env-surface flex items-center justify-center">
            <svg className="w-10 h-10 text-env-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-env-secondary text-lg mb-2">No photos in this category yet</p>
          <p className="text-env-tertiary">Check back soon for updates!</p>
        </div>
      )}

      {/* Lightbox */}
      {selectedImage && (
        <Lightbox
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onNext={handleNext}
          onPrevious={handlePrevious}
          hasNext={currentIndex < filteredImages.length - 1}
          hasPrevious={currentIndex > 0}
          currentIndex={currentIndex}
          totalImages={filteredImages.length}
        />
      )}
    </div>
  );
}

export default GalleryGrid;