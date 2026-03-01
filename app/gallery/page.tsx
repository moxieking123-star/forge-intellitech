"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChapterWrapper } from "../../components/ChapterWrapper";
import { AnimatedSection } from "../../components/AnimatedSection";
import { CTASection } from "../../components/CTASection";

// Metadata handled separately for client component

// ============================================
// GALLERY DATA - ORGANIZED BY EVENTS/STORIES
// ============================================

interface GalleryEvent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  location: string;
  stats: { label: string; value: string }[];
  coverImage: string;
  images: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  color: string;
  icon: string;
}

const galleryEvents: GalleryEvent[] = [
  {
    id: "launchpad-2025",
    title: "LaunchPad 2025",
    subtitle: "Where Young Ideas Take Flight",
    description: "Our inaugural innovation competition brought together brilliant young minds from across Lagos. Two winners walked away with ₦100,000 each to kickstart their dreams.",
    date: "July 4, 2025",
    location: "Ikosi-Isheri LCDA Council Hall",
    stats: [
      { label: "Participants", value: "20+" },
      { label: "Schools", value: "2" },
      { label: "Total Grants", value: "₦200K" },
    ],
    coverImage: "/gallery/launchpad-2024-stage.jpg",
    images: [
      { src: "/gallery/launchpad-2024-stage.jpg", alt: "LaunchPad 2025 main stage", caption: "The main stage at Ikosi-Isheri" },
      { src: "/gallery/launchpad-2024-students.jpg", alt: "Students presenting", caption: "Young entrepreneurs pitching their visions" },
      { src: "/gallery/launchpad-2024-winners.jpg", alt: "Winners celebration", caption: "Celebrating our winners" },
      { src: "/gallery/launchpad-2024-mentors.jpg", alt: "Mentorship session", caption: "Mentors guiding the next generation" },
      { src: "/gallery/launchpad-2024-mentors1.jpg", alt: "Team discussions", caption: "Collaborative brainstorming" },
      { src: "/gallery/launchpad-2024-mentors2.jpg", alt: "Pitch preparation", caption: "Final pitch preparations" },
      { src: "/gallery/launchpad-2024-mentors3.jpg", alt: "Award ceremony", caption: "The moment of triumph" },
      { src: "/gallery/launchpad-2024-mentors4.jpg", alt: "Group photo", caption: "The LaunchPad 2025 family" },
    ],
    color: "from-orange-500 to-red-500",
    icon: "🚀",
  },
  {
    id: "techup-schools",
    title: "TechUp in Schools",
    subtitle: "Building Digital Builders",
    description: "TechUp brings practical digital skills directly into classrooms. From design thinking to basic coding, we're preparing students for the future economy.",
    date: "Ongoing",
    location: "Schools Across Lagos",
    stats: [
      { label: "Schools", value: "10+" },
      { label: "Students", value: "2,500+" },
      { label: "Workshops", value: "30+" },
    ],
    coverImage: "/gallery/school-visit1.jpg",
    images: [
      { src: "/gallery/school-visit1.jpg", alt: "TechUp workshop", caption: "Hands-on learning in action" },
      { src: "/gallery/school-visit2.jpg", alt: "School visit", caption: "Connecting with partner schools" },
      { src: "/gallery/school-visit3.jpg", alt: "Student engagement", caption: "Students exploring digital tools" },
      { src: "/gallery/school-visit4.jpg", alt: "Classroom session", caption: "Interactive classroom sessions" },
      { src: "/gallery/school-visit5.jpg", alt: "Group work", caption: "Collaborative learning" },
      { src: "/gallery/school-visit6.jpg", alt: "Teacher training", caption: "Empowering educators" },
    ],
    color: "from-emerald-500 to-teal-500",
    icon: "🎓",
  },
  {
    id: "community-events",
    title: "Community Outreach",
    subtitle: "Tech Beyond the Classroom",
    description: "We take digital literacy to community halls, churches, and civic centers — ensuring technology education reaches everyone.",
    date: "Various",
    location: "Community Centers, Lagos",
    stats: [
      { label: "Events", value: "4+" },
      { label: "Attendees", value: "500+" },
      { label: "Partners", value: "3+" },
    ],
    coverImage: "/gallery/events-collaboration.jpg",
    images: [
      { src: "/gallery/events-collaboration.jpg", alt: "Community collaboration", caption: "Building together" },
      { src: "/gallery/events-planning.jpg", alt: "Event planning", caption: "Behind the scenes" },
      { src: "/gallery/events-planning1.jpg", alt: "Team strategy", caption: "Strategic planning sessions" },
      { src: "/gallery/events-planning2.jpg", alt: "Partner meetings", caption: "Growing our network" },
    ],
    color: "from-purple-500 to-pink-500",
    icon: "🤝",
  },
];

// ============================================
// LIGHTBOX COMPONENT
// ============================================

interface LightboxProps {
  images: { src: string; alt: string; caption?: string }[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

function Lightbox({ images, currentIndex, onClose, onNext, onPrev }: LightboxProps) {
  const currentImage = images[currentIndex];
  
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      {/* Navigation */}
      <button 
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Image */}
      <div 
        className="relative w-full max-w-5xl mx-4 md:mx-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="object-contain"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>
        
        {/* Caption */}
        {currentImage.caption && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
            <p className="text-white text-center text-lg">{currentImage.caption}</p>
            <p className="text-white/60 text-center text-sm mt-1">
              {currentIndex + 1} of {images.length}
            </p>
          </div>
        )}
      </div>
      
      {/* Thumbnails */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => { e.stopPropagation(); }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================
// EVENT CARD COMPONENT
// ============================================

interface EventCardProps {
  event: GalleryEvent;
  onImageClick: (eventId: string, imageIndex: number) => void;
  index: number;
}

function EventCard({ event, onImageClick, index }: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayImages = isExpanded ? event.images : event.images.slice(0, 4);
  
  return (
    <AnimatedSection animation="fade-up" delay={index * 150}>
      <div className="relative rounded-3xl overflow-hidden bg-env-surface border border-env-border">
        
        {/* Header with Cover Image */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            className="object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${event.color} opacity-60 mix-blend-multiply`} />
          <div className="absolute inset-0 bg-gradient-to-t from-env-surface via-transparent to-transparent" />
          
          {/* Event Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{event.icon}</span>
                  <span className="px-3 py-1 text-xs font-semibold text-white bg-white/20 backdrop-blur-sm rounded-full">
                    {event.date}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {event.title}
                </h3>
                <p className="text-white/80">{event.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 md:p-8">
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-env-bg-primary/50">
            {event.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className={`text-xl md:text-2xl font-bold bg-gradient-to-r ${event.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
                <p className="text-xs text-env-tertiary uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
          
          {/* Description */}
          <p className="text-env-secondary leading-relaxed mb-6">
            {event.description}
          </p>
          
          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-env-tertiary mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
          </div>
          
          {/* Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {displayImages.map((image, imageIndex) => (
              <button
                key={imageIndex}
                onClick={() => onImageClick(event.id, imageIndex)}
                className="group relative aspect-square rounded-xl overflow-hidden bg-env-bg-primary"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          {/* View More / Less Button */}
          {event.images.length > 4 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full mt-4 py-3 text-center text-chapter-accent font-medium hover:bg-chapter-accent/5 rounded-xl transition-all"
            >
              {isExpanded ? (
                <span className="flex items-center justify-center gap-2">
                  Show Less
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  View All {event.images.length} Photos
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              )}
            </button>
          )}
          
        </div>
        
      </div>
    </AnimatedSection>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentEventId, setCurrentEventId] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const currentEvent = galleryEvents.find(e => e.id === currentEventId);
  
  const openLightbox = (eventId: string, imageIndex: number) => {
    setCurrentEventId(eventId);
    setCurrentImageIndex(imageIndex);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };
  
  const nextImage = () => {
    if (currentEvent) {
      setCurrentImageIndex((prev) => 
        prev === currentEvent.images.length - 1 ? 0 : prev + 1
      );
    }
  };
  
  const prevImage = () => {
    if (currentEvent) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? currentEvent.images.length - 1 : prev - 1
      );
    }
  };
  
  // Calculate total stats
  const totalPhotos = galleryEvents.reduce((acc, event) => acc + event.images.length, 0);
  
  return (
    <ChapterWrapper chapter="forge">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-env-bg-primary" />
          
          {/* Floating gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-chapter-accent/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
          
          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="container-forge relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            
            <AnimatedSection animation="fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium text-chapter-accent bg-chapter-accent/10 rounded-full border border-chapter-accent/20">
                <span className="w-2 h-2 rounded-full bg-chapter-accent animate-pulse" />
                Our Journey in Frames
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-up" delay={100}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-env-primary mb-6 leading-tight">
                Moments That
                <span className="block bg-gradient-to-r from-chapter-accent via-purple-500 to-emerald-500 bg-clip-text text-transparent">
                  Define Our Mission
                </span>
              </h1>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-up" delay={200}>
              <p className="text-xl text-env-secondary leading-relaxed max-w-2xl mx-auto mb-12">
                Every image tells a story of young Nigerians discovering their potential, 
                communities embracing technology, and a vision becoming reality.
              </p>
            </AnimatedSection>
            
            {/* Quick Stats */}
            <AnimatedSection animation="fade-up" delay={300}>
              <div className="inline-flex items-center gap-8 px-8 py-4 bg-env-surface/50 backdrop-blur-sm rounded-2xl border border-env-border">
                <div className="text-center">
                  <p className="text-2xl font-bold text-chapter-accent">{galleryEvents.length}</p>
                  <p className="text-xs text-env-tertiary uppercase tracking-wider">Collections</p>
                </div>
                <div className="w-px h-10 bg-env-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-chapter-accent">{totalPhotos}+</p>
                  <p className="text-xs text-env-tertiary uppercase tracking-wider">Photos</p>
                </div>
                <div className="w-px h-10 bg-env-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-chapter-accent">2025</p>
                  <p className="text-xs text-env-tertiary uppercase tracking-wider">Since</p>
                </div>
              </div>
            </AnimatedSection>
            
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <AnimatedSection animation="fade-up" delay={500}>
            <div className="flex flex-col items-center text-env-tertiary">
              <span className="text-xs uppercase tracking-widest mb-2">Explore</span>
              <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== EVENT COLLECTIONS ==================== */}
      <section className="py-20 bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl font-bold text-env-primary">Event Collections</h2>
              <div className="flex-1 h-px bg-env-border" />
            </div>
          </AnimatedSection>
          
          <div className="space-y-12">
            {galleryEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                onImageClick={openLightbox}
                index={index}
              />
            ))}
          </div>
          
        </div>
      </section>

      {/* ==================== HIGHLIGHT REEL ==================== */}
      <section className="py-20 bg-env-bg-primary overflow-hidden">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-chapter-accent bg-chapter-accent/10 rounded-full border border-chapter-accent/20">
                Highlight Reel
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary">
                The Moments We Cherish Most
              </h2>
            </div>
          </AnimatedSection>
          
          {/* Horizontal Scrolling Gallery */}
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="relative -mx-4 px-4">
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                {galleryEvents.flatMap(event => 
                  event.images.slice(0, 2).map((image, i) => (
                    <button
                      key={`${event.id}-${i}`}
                      onClick={() => openLightbox(event.id, i)}
                      className="group relative flex-shrink-0 w-72 md:w-96 aspect-[4/3] rounded-2xl overflow-hidden snap-center"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white font-medium">{event.title}</p>
                        <p className="text-white/70 text-sm">{image.caption}</p>
                      </div>
                    </button>
                  ))
                )}
              </div>
              
              {/* Scroll hint gradient */}
              <div className="absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-env-bg-primary to-transparent pointer-events-none" />
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== BEHIND THE SCENES ==================== */}
      <section className="py-20 bg-env-secondary">
        <div className="container-forge">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <AnimatedSection animation="fade-right">
              <div>
                <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-chapter-accent bg-chapter-accent/10 rounded-full border border-chapter-accent/20">
                  Behind The Scenes
                </span>
                
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                  Every Photo Has a Story
                </h2>
                
                <p className="text-lg text-env-secondary leading-relaxed mb-6">
                  These aren't just pictures — they're proof of transformation. Every nervous pitch, 
                  every moment of realization, every smile of achievement captured here represents 
                  a young Nigerian discovering their potential.
                </p>
                
                <p className="text-lg text-env-secondary leading-relaxed mb-8">
                  When you see a student presenting at LaunchPad, you're seeing courage. 
                  When you see a classroom full of TechUp learners, you're seeing the future 
                  of Nigerian tech taking shape.
                </p>
                
                <Link
                  href="/blog/launchpad-2025-winners-story"
                  className="inline-flex items-center text-chapter-accent font-semibold hover:gap-3 gap-2 transition-all"
                >
                  Read the full LaunchPad 2025 story
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-left" delay={200}>
              <div className="relative">
                {/* Stacked images effect */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden transform rotate-2 shadow-2xl">
                  <Image
                    src="/gallery/launchpad-2024-winners.jpg"
                    alt="LaunchPad winners"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute top-4 left-4 right-4 bottom-4 rounded-2xl overflow-hidden transform -rotate-2 -z-10 shadow-xl">
                  <Image
                    src="/gallery/launchpad-2024-students.jpg"
                    alt="Students presenting"
                    fill
                    className="object-cover opacity-80"
                  />
                </div>
                <div className="absolute top-8 left-8 right-8 bottom-8 rounded-2xl overflow-hidden transform rotate-1 -z-20 shadow-lg">
                  <Image
                    src="/gallery/school-visit1.jpg"
                    alt="TechUp session"
                    fill
                    className="object-cover opacity-60"
                  />
                </div>
                
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 px-6 py-3 bg-chapter-accent text-white rounded-xl shadow-lg">
                  <p className="font-bold">2,500+ Students Impacted</p>
                </div>
              </div>
            </AnimatedSection>
            
          </div>
          
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <CTASection
        badge="Be Part of Our Story"
        headline="Want to see your school in our"
        highlightedText="next gallery?"
        description="Every photo here started with someone taking the first step. Join our community as a partner, sponsor, or participant."
        primaryAction={{
          label: "Partner With Us",
          href: "/contact",
        }}
        secondaryAction={{
          label: "Explore TechUp",
          href: "/techup",
        }}
        backgroundImage="/images/cta/gallery-cta.jpg"
        overlayOpacity={85}
      />
      
      {/* ==================== LIGHTBOX ==================== */}
      {lightboxOpen && currentEvent && (
        <Lightbox
          images={currentEvent.images}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
      
    </ChapterWrapper>
  );
}