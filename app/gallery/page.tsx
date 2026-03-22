// app/gallery/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChapterWrapper } from "../../components/ChapterWrapper";
import AnimatedSection from "../../components/AnimatedSection";
import GalleryHero from "../../components/GalleryHero";
import { CTASection } from "../../components/CTASection";
import {
  IconLaunch,
  IconLearn,
  IconCommunity,
  IconCamera,
  IconArrowRight,
  IconLocation,
} from "../../components/icons/ForgeIcons";

// Gallery Events Data
interface GalleryEvent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  location: string;
  stats: { label: string; value: string }[];
  coverImage: string;
  images: { src: string; alt: string; caption?: string }[];
  color: string;
  icon: typeof IconLaunch;
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
    ],
    color: "#FF8C42",
    icon: IconLaunch,
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
    ],
    color: "#14B8B8",
    icon: IconLearn,
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
    ],
    color: "#A855F7",
    icon: IconCommunity,
  },
];

// Lightbox Component
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
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
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
          />
        </div>
        
        {currentImage.caption && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
            <p className="text-white text-center text-lg">{currentImage.caption}</p>
            <p className="text-white/60 text-center text-sm mt-1">
              {currentIndex + 1} of {images.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Event Card Component
interface EventCardProps {
  event: GalleryEvent;
  onImageClick: (eventId: string, imageIndex: number) => void;
}

function EventCard({ event, onImageClick }: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayImages = isExpanded ? event.images : event.images.slice(0, 4);
  const Icon = event.icon;
  
  return (
    <div 
      className="rounded-3xl overflow-hidden bg-env-surface border-2 transition-all duration-300"
      style={{ borderColor: event.color + '30' }}
    >
      {/* Header with Cover Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src={event.coverImage}
          alt={event.title}
          fill
          className="object-cover"
        />
        <div 
          className="absolute inset-0 opacity-60 mix-blend-multiply"
          style={{ background: `linear-gradient(135deg, ${event.color}, ${event.color}88)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--env-surface)] via-transparent to-transparent" />
        
        {/* Event Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                >
                  <Icon size={24} color="white" />
                </div>
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
              <p 
                className="text-xl md:text-2xl font-bold"
                style={{ color: event.color }}
              >
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
          <IconLocation size={16} color={event.color} />
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
                  <IconCamera size={20} color="white" />
                </div>
              </div>
            </button>
          ))}
        </div>
        
        {/* View More Button */}
        {event.images.length > 4 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full mt-4 py-3 text-center font-medium rounded-xl transition-all hover:bg-env-bg-primary"
            style={{ color: event.color }}
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
  );
}

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
  
  return (
    <ChapterWrapper chapter="forge">
      
      {/* ==================== ANIMATED HERO ==================== */}
      <GalleryHero />

      {/* ==================== EVENT COLLECTIONS ==================== */}
      <section className="section-padding bg-env-bg-primary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl font-bold text-env-primary">Event Collections</h2>
              <div className="flex-1 h-px bg-env-border" />
            </div>
          </AnimatedSection>
          
          <div className="space-y-12">
            {galleryEvents.map((event, index) => (
              <AnimatedSection key={event.id} animation="fade-up" delay={index * 150}>
                <EventCard
                  event={event}
                  onImageClick={openLightbox}
                />
              </AnimatedSection>
            ))}
          </div>
          
        </div>
      </section>

      {/* ==================== BEHIND THE SCENES ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <AnimatedSection animation="fade-up">
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#FF8C42] bg-[#FF8C42]/10 rounded-full border border-[#FF8C42]/20">
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
                  href="/blog"
                  className="inline-flex items-center gap-2 text-[#FF8C42] font-semibold hover:underline"
                >
                  Read our stories on the blog
                  <IconArrowRight size={18} color="#FF8C42" />
                </Link>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-up" delay={200}>
              <div className="relative">
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
                
                <div 
                  className="absolute -bottom-4 -right-4 px-6 py-3 rounded-xl shadow-lg"
                  style={{ backgroundColor: '#FF8C42' }}
                >
                  <p className="font-bold text-[#1A1A1A]">2,500+ Students Impacted</p>
                </div>
              </div>
            </AnimatedSection>
            
          </div>
          
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <CTASection
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