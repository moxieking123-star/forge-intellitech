/**
 * Gallery Page for Forge Intellitech
 * 
 * Architecture:
 * - Uses Next.js Image component for optimization
 * - Responsive grid layout (1 col mobile, 2 col tablet, 3 col desktop)
 * - Lightbox modal for full-size viewing
 * - Category filtering
 * - Lazy loading for performance
 * 
 * Image source: public/gallery/
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChapterWrapper } from "../../components/ChapterWrapper";
import { AnimatedSection } from "../../components/AnimatedSection";

// ============================================
// TYPE DEFINITIONS
// ============================================

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "team" | "events" | "products" | "office" | "launchpad";
  caption?: string;
}

// ============================================
// GALLERY DATA
// ============================================
// 
// INSTRUCTIONS FOR DEVELOPER:
// 1. Add your images to: public/gallery/
// 2. Update this array with your actual image file names
// 3. Each image needs: id, src, alt, category
// 4. Optional: Add a caption for each image
//
// Naming convention for images:
//   team-001.jpg, event-launchpad-2024.jpg, office-workspace.jpg

const galleryImages: GalleryImage[] = [
  // ========== TEAM PHOTOS ==========
  {
    id: "team-1",
    src: "/gallery/team-collaboration.jpg",
    alt: "Forge team collaborating on a project",
    category: "team",
    caption: "Building the future together",
  },
  {
    id: "team-2",
    src: "/gallery/team-meeting.jpg",
    alt: "Team strategy meeting",
    category: "team",
    caption: "Planning our next milestone",
  },
  
  // ========== LAUNCHPAD EVENTS ==========
  {
    id: "launchpad-1",
    src: "/gallery/launchpad-2024-stage.jpg",
    alt: "LaunchPad 2024 main stage",
    category: "launchpad",
    caption: "LaunchPad 2024 - Where ideas took flight",
  },
  {
    id: "launchpad-2",
    src: "/gallery/launchpad-2024-students.jpg",
    alt: "Students pitching at LaunchPad 2024",
    category: "launchpad",
    caption: "Young entrepreneurs presenting their innovations",
  },
  {
    id: "launchpad-3",
    src: "/gallery/launchpad-2024-winners.jpg",
    alt: "LaunchPad 2024 winners celebration",
    category: "launchpad",
    caption: "Celebrating our 2024 winners",
  },
  
  // ========== OFFICE ==========
  {
    id: "office-1",
    src: "/gallery/office-workspace.jpg",
    alt: "Forge office workspace",
    category: "office",
    caption: "Where innovation happens daily",
  },
  
  // ========== EVENTS ==========
  {
    id: "event-1",
    src: "/gallery/event-workshop.jpg",
    alt: "TechUp workshop session",
    category: "events",
    caption: "TechUp AI workshop for students",
  },
  
  // ========== PRODUCTS ==========
  {
    id: "product-1",
    src: "/gallery/product-techup-demo.jpg",
    alt: "TechUp platform demonstration",
    category: "products",
    caption: "TechUp in action",
  },
];

// Category filter options
const categories = [
  { value: "all", label: "All Photos", icon: "📸" },
  { value: "launchpad", label: "LaunchPad", icon: "🚀" },
  { value: "team", label: "Team", icon: "👥" },
  { value: "events", label: "Events", icon: "🎯" },
  { value: "products", label: "Products", icon: "💡" },
  { value: "office", label: "Office", icon: "🏢" },
] as const;

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
  // Handle keyboard navigation
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Counter */}
      <div className="absolute top-4 left-4 text-white/70 text-sm">
        {currentIndex + 1} / {totalImages}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-3 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
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
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
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
          <p className="text-center text-white/90 mt-6 text-lg max-w-2xl">
            {image.caption}
          </p>
        )}
      </div>

      {/* Next button */}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
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
// GALLERY IMAGE CARD COMPONENT
// ============================================

interface ImageCardProps {
  image: GalleryImage;
  onClick: () => void;
  index: number;
}

function ImageCard({ image, onClick, index }: ImageCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl bg-env-surface border border-env-border hover-lift hover-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent aspect-[4/3]"
      aria-label={`View ${image.alt}`}
      style={{ animationDelay: `${index * 50}ms` }}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-env-tertiary">Image not found</p>
          </div>
        </div>
      ) : (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className={`object-cover transition-all duration-500 group-hover:scale-110 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      )}

      {/* Overlay with caption */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-white font-medium text-lg mb-2">{image.caption || image.alt}</p>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs bg-white/20 text-white rounded-full capitalize backdrop-blur-sm">
            {categories.find(c => c.value === image.category)?.icon} {image.category}
          </span>
        </div>
      </div>

      {/* Zoom icon */}
      <div className="absolute top-4 right-4 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
      </div>
    </button>
  );
}

// ============================================
// MAIN GALLERY PAGE COMPONENT
// ============================================

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Filter images based on selected category
  const filteredImages = selectedCategory === "all"
    ? galleryImages
    : galleryImages.filter((img) => img.category === selectedCategory);

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

  return (
    <ChapterWrapper chapter="forge">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Hero background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/gallery/hero-gallery.jpg"
            alt="Gallery hero background"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-env-bg-primary via-env-bg-primary/80 to-env-bg-primary" />
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-chapter-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chapter-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container-forge relative z-10">
          <AnimatedSection animation="fade-up">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-chapter-accent-soft text-chapter-accent rounded-full border border-chapter-accent/20">
                Our Story in Pictures
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-env-primary">
                Gallery
              </h1>
              <p className="text-xl text-env-secondary max-w-2xl mx-auto leading-relaxed">
                Moments that define our journey — from LaunchPad events 
                to the daily work of building technology for Africa.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== FILTER SECTION ==================== */}
      <section className="py-6 bg-env-secondary border-y border-env-border sticky top-16 md:top-20 z-30">
        <div className="container-forge">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.value
                    ? "bg-chapter-accent text-white shadow-glow"
                    : "bg-env-surface text-env-secondary hover:text-env-primary hover:bg-env-surface-hover border border-env-border"
                }`}
                aria-pressed={selectedCategory === category.value}
              >
                <span>{category.icon}</span>
                {category.label}
                {selectedCategory === category.value && (
                  <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    {category.value === "all" ? galleryImages.length : filteredImages.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== GALLERY GRID ==================== */}
      <section className="section-padding bg-env-primary">
        <div className="container-forge">
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <AnimatedSection 
                  key={image.id} 
                  animation="fade-up" 
                  delay={index * 50}
                >
                  <ImageCard
                    image={image}
                    onClick={() => setSelectedImage(image)}
                    index={index}
                  />
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <svg className="w-20 h-20 mx-auto text-env-tertiary mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-env-secondary text-xl mb-2">No photos in this category yet</p>
              <p className="text-env-tertiary">Check back soon for updates!</p>
            </div>
          )}
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="py-20 bg-env-secondary">
        <div className="container-forge text-center">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-env-primary">
              Want to be part of our story?
            </h2>
            <p className="text-env-secondary mb-8 max-w-xl mx-auto text-lg">
              Join our team or partner with us to build technology that serves Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-chapter-accent text-white font-medium rounded-xl hover:bg-chapter-accent-hover transition-all duration-300 hover-lift shadow-glow"
              >
                Get in Touch
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="/launchpad"
                className="inline-flex items-center justify-center px-8 py-4 bg-env-surface text-env-primary font-medium rounded-xl border border-env-border hover:bg-env-surface-hover transition-all duration-300 hover-lift"
              >
                View LaunchPad
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== LIGHTBOX ==================== */}
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
      
    </ChapterWrapper>
  );
}