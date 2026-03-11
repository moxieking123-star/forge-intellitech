import Image from "next/image";
import Link from "next/link";
import { ChapterWrapper } from "../../components/ChapterWrapper";
import { AnimatedSection } from "../../components/AnimatedSection";
import { CTASection } from "../../components/CTASection";

// Metadata for SEO
export const metadata = {
  title: "Blog - Forge Intellitech",
  description: "Insights, updates, and stories from Forge Intellitech. Explore our thoughts on African technology, education, and innovation.",
};

// Blog categories
const categories = [
  { name: "All", slug: "all", active: true },
  { name: "Company News", slug: "news", active: false },
  { name: "EdTech", slug: "edtech", active: false },
  { name: "Education Policy", slug: "policy", active: false },
  { name: "Impact Stories", slug: "impact", active: false },
  { name: "Events", slug: "events", active: false },
  { name: "African Leadership", slug: "leadership", active: false },
];

// Blog posts data
const blogPosts = [
  {
    slug: "iran-self-reliance-lessons-for-africa",
    title: "What Africa Can Learn From Iran's Self-Reliance: Building From Within, Not From Handouts",
    excerpt: "We're not picking sides in global politics. But there's a lesson in watching a nation build advanced technology under crushing sanctions — while Africa, with all its freedom and resources, still waits for help from abroad. The lesson isn't about missiles. It's about will.",
    author: "Forge Team",
    date: "March 15, 2026",
    category: "African Leadership",
    readTime: "12 min read",
    featured: true,
    image: "/images/blog/africa-self-reliance.jpg",
  },
  {
    slug: "launchpad-2026-announcement",
    title: "LaunchPad 2026 is Coming: ₦10 Million Up for Grabs — And We Need You",
    excerpt: "Mark your calendars! August 28th, 2026. Twenty young visionaries. Ten million naira in grants and gifts. This is bigger than anything we've done before — and we're calling on Nigeria to join us.",
    author: "Forge Team",
    date: "March 1, 2026",
    category: "Events",
    readTime: "6 min read",
    featured: false,
    image: "/images/blog/launchpad-2026.jpg",
  },
  {
    slug: "launchpad-2025-winners-story",
    title: "When Young Nigerians Dream Out Loud: The Story of LaunchPad 2025",
    excerpt: "On July 4th, 2025, something beautiful happened at Ikosi-Isheri. Two young women walked away with ₦100,000 each to chase their dreams. Here's the story of that unforgettable day.",
    author: "Forge Team",
    date: "July 10, 2025",
    category: "Impact Stories",
    readTime: "8 min read",
    featured: false,
    image: "/images/blog/launchpad-2025.jpg",
  },
  {
    slug: "ict-to-digital-technology-opportunity",
    title: "From ICT to Digital Technology: The Curriculum Change Nigeria Has Been Waiting For",
    excerpt: "The Federal Government didn't just rename a subject — they opened a door. For EdTech companies, schools, and young Nigerians, this is the moment we've been preparing for.",
    author: "Forge Team",
    date: "August 29, 2025",
    category: "Education Policy",
    readTime: "10 min read",
    featured: false,
    image: "/images/blog/curriculum-change.jpg",
  },
  {
    slug: "edtech-revolution-nigeria",
    title: "The EdTech Revolution Nigeria Needs: Why Now Is the Time to Act",
    excerpt: "Something is shifting in Nigerian education. Between policy changes, youth unemployment, and digital transformation — the conditions are perfect for EdTech to truly matter.",
    author: "Forge Team",
    date: "September 11, 2025",
    category: "EdTech",
    readTime: "9 min read",
    featured: false,
    image: "/images/blog/edtech-revolution.jpg",
  },
];

// Get featured post
const featuredPost = blogPosts.find(post => post.featured);
const regularPosts = blogPosts.filter(post => !post.featured);

export default function BlogPage() {
  return (
    <ChapterWrapper chapter="forge">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/blog/blog-hero.jpg"
            alt="Forge Intellitech Blog"
            fill
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-env-bg-primary via-env-bg-primary/90 to-env-bg-primary/70" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-chapter-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container-forge relative z-10 py-20">
          <AnimatedSection animation="fade-up">
            <div className="max-w-2xl">
              
              <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent/10 rounded-full border border-chapter-accent/20">
                Our Blog
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-env-primary mb-6 leading-tight">
                Stories From <span className="text-chapter-accent">the Field</span>
              </h1>
              
              <p className="text-xl text-env-secondary leading-relaxed">
                Real stories about building Africa's future. 
                No corporate speak — just honest thoughts on education, leadership, 
                and what it takes to build from within.
              </p>
              
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== CATEGORIES ==================== */}
      <section className="py-8 bg-env-bg-primary border-b border-env-border">
        <div className="container-forge">
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category.slug}
                  className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                    category.active
                      ? "bg-chapter-accent text-white shadow-lg shadow-chapter-accent/25"
                      : "bg-env-surface text-env-secondary hover:bg-env-surface-hover hover:text-env-primary border border-env-border hover:border-chapter-accent/30"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== FEATURED POST ==================== */}
      {featuredPost && (
        <section className="py-16 bg-env-bg-primary">
          <div className="container-forge">
            
            <AnimatedSection animation="fade-up" delay={150}>
              <Link href={`/blog/${featuredPost.slug}`} className="block group">
                <div className="relative rounded-3xl overflow-hidden bg-env-surface border border-env-border hover:border-chapter-accent/40 transition-all duration-500 hover:shadow-2xl hover:shadow-chapter-accent/10">
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    
                    {/* Featured Image */}
                    <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[400px] overflow-hidden">
                      <Image
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-env-surface" />
                      
                      {/* Featured Badge - Mobile */}
                      <div className="absolute top-4 left-4 lg:hidden">
                        <span className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-chapter-accent rounded-full shadow-lg">
                          Featured
                        </span>
                      </div>
                    </div>
                    
                    {/* Featured Content */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      
                      <div className="flex items-center gap-3 mb-6">
                        <span className="hidden lg:inline-block px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-chapter-accent bg-chapter-accent/10 rounded-full border border-chapter-accent/20">
                          Featured
                        </span>
                        <span className="px-3 py-1.5 text-xs font-medium text-env-secondary bg-env-bg-primary rounded-full">
                          {featuredPost.category}
                        </span>
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-env-primary mb-4 leading-tight group-hover:text-chapter-accent transition-colors duration-300">
                        {featuredPost.title}
                      </h2>
                      
                      <p className="text-lg text-env-secondary leading-relaxed mb-8">
                        {featuredPost.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-env-border">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-chapter-accent/10 flex items-center justify-center">
                            <span className="text-sm">✍️</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-env-primary">{featuredPost.author}</p>
                            <p className="text-xs text-env-tertiary">{featuredPost.date} · {featuredPost.readTime}</p>
                          </div>
                        </div>
                        
                        <span className="flex items-center text-chapter-accent font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                          Read Article
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                      
                    </div>
                    
                  </div>
                  
                </div>
              </Link>
            </AnimatedSection>
            
          </div>
        </section>
      )}

      {/* ==================== BLOG POSTS GRID ==================== */}
      <section className="py-20 bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold text-env-primary">More Articles</h2>
              <div className="hidden sm:block h-px flex-1 mx-8 bg-env-border" />
              <span className="text-sm text-env-tertiary">{regularPosts.length} articles</span>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <AnimatedSection key={post.slug} animation="fade-up" delay={index * 100}>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="block group h-full"
                >
                  <article className="h-full flex flex-col rounded-2xl bg-env-surface border border-env-border hover:border-chapter-accent/30 transition-all duration-500 overflow-hidden hover:shadow-xl hover:shadow-chapter-accent/5 hover:-translate-y-1">
                    
                    {/* Post Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-xs font-semibold text-white bg-black/50 backdrop-blur-sm rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Post Content */}
                    <div className="flex-grow p-6 flex flex-col">
                      
                      <h3 className="text-xl font-bold text-env-primary mb-3 leading-snug group-hover:text-chapter-accent transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-env-secondary leading-relaxed line-clamp-3 mb-6 flex-grow">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-env-border">
                        <div className="flex items-center gap-2 text-sm text-env-tertiary">
                          <span>{post.date}</span>
                          <span>·</span>
                          <span>{post.readTime}</span>
                        </div>
                        
                        <svg className="w-5 h-5 text-chapter-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      
                    </div>
                    
                  </article>
                </Link>
              </AnimatedSection>
            ))}
          </div>
          
        </div>
      </section>

      {/* ==================== NEWSLETTER SECTION ==================== */}
      <section className="py-20 bg-env-bg-primary">
        <div className="container-forge">
          <AnimatedSection animation="fade-up">
            <div className="max-w-2xl mx-auto text-center">
              
              <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent/10 rounded-full border border-chapter-accent/20">
                Stay Updated
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                Get insights in your inbox
              </h2>
              
              <p className="text-lg text-env-secondary mb-8">
                Subscribe for the latest insights, program updates, and stories from the field. 
                No spam, ever.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-4 bg-env-surface border border-env-border rounded-xl text-env-primary placeholder:text-env-tertiary focus:outline-none focus:border-chapter-accent/50 focus:ring-2 focus:ring-chapter-accent/20 transition-all"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-chapter-accent hover:bg-chapter-accent-hover text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-chapter-accent/25"
                >
                  Subscribe
                </button>
              </form>
              
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <CTASection
        badge="Join Us"
        headline="Ready to build Africa's future"
        highlightedText="together?"
        description="Whether you're a school, sponsor, or supporter — let's connect and explore how we can work together."
        primaryAction={{
          label: "Get In Touch",
          href: "/contact",
        }}
        secondaryAction={{
          label: "Explore TechUp",
          href: "/techup",
        }}
        backgroundImage="/images/cta/blog-cta.jpg"
        overlayOpacity={85}
      />
      
    </ChapterWrapper>
  );
}
