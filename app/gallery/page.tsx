import Image from "next/image";
import { ChapterWrapper } from "../../components/ChapterWrapper";
import { AnimatedSection } from "../../components/AnimatedSection";
import { GalleryGrid, type GalleryImage, type GalleryCategory } from "../../components/GalleryGrid";
import { CTASection } from "../../components/CTASection";

// Metadata for SEO
export const metadata = {
  title: "Gallery",
  description: "Moments that define our journey — from LaunchPad events to the daily work of building technology for Africa.",
};

// ============================================
// GALLERY DATA
// ============================================
// 
// To add images:
// 1. Add image files to: public/gallery/
// 2. Add entries to this array
// 3. Recommended: Use descriptive filenames like "launchpad-2024-winners.jpg"
//
// Image dimensions: Recommended 1200x900 or similar 4:3 ratio

const galleryImages: GalleryImage[] = [
  // ========== LAUNCHPAD 2024 ==========
  {
    id: "lp-1",
    src: "/gallery/launchpad-2024-stage.jpg",
    alt: "LaunchPad 2024 main stage presentation",
    category: "launchpad",
    caption: "LaunchPad 2024 — Where young ideas took flight",
  },
  {
    id: "lp-2",
    src: "/gallery/launchpad-2024-students.jpg",
    alt: "Students presenting their innovations at LaunchPad 2024",
    category: "launchpad",
    caption: "Young entrepreneurs pitching their visions",
  },
  {
    id: "lp-3",
    src: "/gallery/launchpad-2024-winners.jpg",
    alt: "LaunchPad 2024 winners celebration",
    category: "launchpad",
    caption: "Celebrating our 2024 winners and their achievements",
  },
  {
    id: "lp-4",
    src: "/gallery/launchpad-2024-mentors.jpg",
    alt: "Mentors guiding students at LaunchPad",
    category: "launchpad",
    caption: "Mentorship in action — guidance that shapes futures",
  },
  {
    id: "lp-5",
    src: "/gallery/launchpad-2024-mentors1.jpg",
    alt: "Mentors guiding students at LaunchPad",
    category: "launchpad",
    caption: "Mentorship in action — guidance that shapes futures",
  },
  {
    id: "lp-6",
    src: "/gallery/launchpad-2024-mentors2.jpg",
    alt: "Mentors guiding students at LaunchPad",
    category: "launchpad",
    caption: "Mentorship in action — guidance that shapes futures",
  },
  {
    id: "lp-7",
    src: "/gallery/launchpad-2024-mentors3.jpg",
    alt: "Mentors guiding students at LaunchPad",
    category: "launchpad",
    caption: "Mentorship in action — guidance that shapes futures",
  },
  {
    id: "lp-8",
    src: "/gallery/launchpad-2024-mentors4.jpg",
    alt: "Mentors guiding students at LaunchPad",
    category: "launchpad",
    caption: "Mentorship in action — guidance that shapes futures",
  },
  {
    id: "lp-9",
    src: "/gallery/launchpad-2024-mentors5.jpg",
    alt: "Mentors guiding students at LaunchPad",
    category: "launchpad",
    caption: "Mentorship in action — guidance that shapes futures",
  },
  {
    id: "lp-10",
    src: "/gallery/launchpad-2024-mentors6.jpg",
    alt: "Mentors guiding students at LaunchPad",
    category: "launchpad",
    caption: "Mentorship in action — guidance that shapes futures",
  },
  {
    id: "lp-11",
    src: "/gallery/launchpad-2024-mentors7.jpg",
    alt: "Mentors guiding students at LaunchPad",
    category: "launchpad",
    caption: "Mentorship in action — guidance that shapes futures",
  },
  {
    id: "lp-12",
    src: "/gallery/launchpad-2024-mentors8.jpg",
    alt: "Mentors guiding students at LaunchPad",
    category: "launchpad",
    caption: "Mentorship in action — guidance that shapes futures",
  },
  {
    id: "lp-13",
    src: "/gallery/launchpad-2024-mentors9.jpg",
    alt: "Mentors guiding students at LaunchPad",
    category: "launchpad",
    caption: "Mentorship in action — guidance that shapes futures",
  },
  {
    id: "lp-14",
    src: "/gallery/launchpad-2024-mentors10.jpg",
    alt: "Mentors guiding students at LaunchPad",
    category: "launchpad",
    caption: "Mentorship in action — guidance that shapes futures",
  },
  {
    id: "lp-15",
    src: "/gallery/launchpad-2024-mentors11.jpg",
    alt: "Mentors guiding students at LaunchPad",
    category: "launchpad",
    caption: "Mentorship in action — guidance that shapes futures",
  },
  {
    id: "lp-16",
    src: "/gallery/launchpad-2024-mentors12.jpg",
    alt: "Mentors guiding students at LaunchPad",
    category: "launchpad",
    caption: "Mentorship in action — guidance that shapes futures",
  },
  {
    id: "lp-17",
    src: "/gallery/launchpad-2024-mentors13.jpg",
    alt: "Mentors guiding students at LaunchPad",
    category: "launchpad",
    caption: "Mentorship in action — guidance that shapes futures",
  },
  {
    id: "lp-18",
    src: "/gallery/launchpad-2024-mentors14.jpg",
    alt: "Mentors guiding students at LaunchPad",
    category: "launchpad",
    caption: "Mentorship in action — guidance that shapes futures",
  },
  {
    id: "lp-19",
    src: "/gallery/launchpad-2024-mentors15.jpg",
    alt: "Mentors guiding students at LaunchPad",
    category: "launchpad",
    caption: "Mentorship in action — guidance that shapes futures",
  },
  {
    id: "lp-20",
    src: "/gallery/launchpad-2024-mentors.jpg",
    alt: "Mentors guiding students at LaunchPad",
    category: "launchpad",
    caption: "Mentorship in action — guidance that shapes futures",
  },
  
  // ========== EVENTS ==========
  {
    id: "events-1",
    src: "/gallery/events-collaboration.jpg",
    alt: "Forge team collaborating on a project",
    category: "events",
    caption: "Building Africa's future, one idea at a time",
  },
  {
    id: "events-2",
    src: "/gallery/events-planning.jpg",
    alt: "Team strategy session",
    category: "events",
    caption: "Planning our next milestone together",
  },
  {
    id: "events-3",
    src: "/gallery/events-planning1.jpg",
    alt: "Team strategy session",
    category: "events",
    caption: "Planning our next milestone together",
  },
  {
    id: "events-4",
    src: "/gallery/events-planning2.jpg",
    alt: "Team strategy session",
    category: "events",
    caption: "Planning our next milestone together",
  },
  
  // ========== TECHUP ==========
  {
    id: "TechUp-1",
    src: "/gallery/school-visit1.jpg",
    alt: "TechUp workshop in progress",
    category: "techup",
    caption: "Hands-on learning at a TechUp workshop",
  },
  {
    id: "TechUp-2",
    src: "/gallery/school-visit2.jpg",
    alt: "Forge team visiting a partner school",
    category: "techup",
    caption: "Connecting with schools across Nigeria",
  },
  {
    id: "TechUp-3",
    src: "/gallery/school-visit3.jpg",
    alt: "Forge team visiting a partner school",
    category: "techup",
    caption: "Connecting with schools across Nigeria",
  },
  {
    id: "TechUp-4",
    src: "/gallery/school-visit4.jpg",
    alt: "Forge team visiting a partner school",
    category: "techup",
    caption: "Connecting with schools across Nigeria",
  },
  {
    id: "TechUp-5",
    src: "/gallery/school-visit5.jpg",
    alt: "Forge team visiting a partner school",
    category: "techup",
    caption: "Connecting with schools across Nigeria",
  },
  {
    id: "TechUp-6",
    src: "/gallery/school-visit6.jpg",
    alt: "Forge team visiting a partner school",
    category: "techup",
    caption: "Connecting with schools across Nigeria",
  },
  {
    id: "TechUp-7",
    src: "/gallery/school-visit7.jpg",
    alt: "Forge team visiting a partner school",
    category: "techup",
    caption: "Connecting with schools across Nigeria",
  },
  {
    id: "TechUp-8",
    src: "/gallery/school-visit8.jpg",
    alt: "Forge team visiting a partner school",
    category: "techup",
    caption: "Connecting with schools across Nigeria",
  },
  {
    id: "TechUp-9",
    src: "/gallery/school-visit9.jpg",
    alt: "Forge team visiting a partner school",
    category: "techup",
    caption: "Connecting with schools across Nigeria",
  },
  {
    id: "TechUp-10",
    src: "/gallery/school-visit10.jpg",
    alt: "Forge team visiting a partner school",
    category: "techup",
    caption: "Connecting with schools across Nigeria",
  },
  {
    id: "TechUp-11",
    src: "/gallery/school-visit11.jpg",
    alt: "Forge team visiting a partner school",
    category: "techup",
    caption: "Connecting with schools across Nigeria",
  },
  {
    id: "TechUp-12",
    src: "/gallery/school-visit12jpg",
    alt: "Forge team visiting a partner school",
    category: "techup",
    caption: "Connecting with schools across Nigeria",
  },
  {
    id: "TechUp-13",
    src: "/gallery/school-visit13jpg",
    alt: "Forge team visiting a partner school",
    category: "techup",
    caption: "Connecting with schools across Nigeria",
  },
  {
    id: "TechUp-14",
    src: "/gallery/school-visit14jpg",
    alt: "Forge team visiting a partner school",
    category: "techup",
    caption: "Connecting with schools across Nigeria",
  },
  {
    id: "TechUp-15",
    src: "/gallery/school-visit15jpg",
    alt: "Forge team visiting a partner school",
    category: "techup",
    caption: "Connecting with schools across Nigeria",
  },
  {
    id: "TechUp-16",
    src: "/gallery/school-visit16jpg",
    alt: "Forge team visiting a partner school",
    category: "techup",
    caption: "Connecting with schools across Nigeria",
  },
  {
    id: "TechUp-17",
    src: "/gallery/school-visit17jpg",
    alt: "Forge team visiting a partner school",
    category: "techup",
    caption: "Connecting with schools across Nigeria",
  },
  {
    id: "TechUp-18",
    src: "/gallery/school-visit18jpg",
    alt: "Forge team visiting a partner school",
    category: "techup",
    caption: "Connecting with schools across Nigeria",
  },
  {
    id: "TechUp-19",
    src: "/gallery/school-visit19jpg",
    alt: "Forge team visiting a partner school",
    category: "techup",
    caption: "Connecting with schools across Nigeria",
  },
  {
    id: "TechUp-20",
    src: "/gallery/school-visit20jpg",
    alt: "Forge team visiting a partner school",
    category: "techup",
    caption: "Connecting with schools across Nigeria",
  },
  
  ];

// Category filters
const categories: GalleryCategory[] = [
  { value: "launchpad", label: "LaunchPad", icon: "🚀" },
  { value: "events", label: "Events", icon: "👥" },
  { value: "techup", label: "TechUp", icon: "🎯" },
  
];

// ============================================
// PAGE COMPONENT
// ============================================

export default function GalleryPage() {
  return (
    <ChapterWrapper chapter="forge">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-chapter-accent/5 via-transparent to-purple-500/5" />
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-chapter-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container-forge relative z-10">
          <AnimatedSection animation="fade-up">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                Our Story in Pictures
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-env-primary mb-6">
                Gallery
              </h1>
              
              <p className="text-xl text-env-secondary leading-relaxed">
                Moments that define our journey — from LaunchPad events 
                to the daily work of building technology for Africa.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== FEATURED HIGHLIGHT ==================== */}
      <section className="py-8 bg-env-secondary border-y border-env-border">
        <div className="container-forge">
          <AnimatedSection animation="fade-up">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
              <span className="text-3xl">🚀</span>
              <div>
                <p className="text-env-primary font-medium">
                  LaunchPad 2024 was a landmark moment
                </p>
                <p className="text-env-secondary text-sm">
                  50+ students, 15 schools, ₦1M+ in prizes awarded
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== GALLERY GRID ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          <AnimatedSection animation="fade-up">
            <GalleryGrid
              images={galleryImages}
              categories={categories}
              showFilters={true}
              columns={3}
            />
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <CTASection
        badge="Be Part of Our Story"
        headline="Want to be in our next gallery?"
        highlightedText=""
        description="Join our team, partner with us, or participate in our programs. Every photo here started with someone taking the first step."
        primaryAction={{
          label: "Get in Touch",
          href: "/contact",
        }}
        secondaryAction={{
          label: "View LaunchPad",
          href: "/launchpad",
        }}
        backgroundImage="/images/cta/gallery-cta.jpg"
        overlayOpacity={85}
      />
      
    </ChapterWrapper>
  );
}