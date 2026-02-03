import Link from "next/link";
import SectionHeader from "../../components/SectionHeader";
import { ChapterWrapper } from "../../components/ChapterWrapper";
import { AnimatedSection } from "../../components/AnimatedSection";

// Metadata for SEO
export const metadata = {
  title: "Blog",
  description: "Insights, updates, and stories from Forge Intellitech. Explore our thoughts on African technology, education, and innovation.",
};

// Blog categories
const categories = [
  { name: "All", slug: "all" },
  { name: "Company News", slug: "news" },
  { name: "Technology", slug: "technology" },
  { name: "Education", slug: "education" },
  { name: "Innovation", slug: "innovation" },
  { name: "Impact Stories", slug: "impact" },
];

// Sample blog posts (will be replaced with MongoDB data later)
const blogPosts = [
  {
    slug: "launching-forge-intellitech",
    title: "Launching Forge Intellitech: Building Technology That Understands Africa",
    excerpt: "Today, we officially introduce Forge Intellitech to the world. This is not just a company launch — it's the beginning of a movement to reshape how technology serves Africa.",
    author: "Forge Team",
    date: "January 15, 2025",
    category: "Company News",
    readTime: "5 min read",
    featured: true,
    image: null,
  },
  {
    slug: "why-africa-needs-homegrown-tech",
    title: "Why Africa Needs Homegrown Technology Solutions",
    excerpt: "For too long, African markets have relied on solutions designed elsewhere. Here's why building from within is not just preferable — it's essential.",
    author: "Forge Team",
    date: "January 20, 2025",
    category: "Technology",
    readTime: "7 min read",
    featured: false,
    image: null,
  },
  {
    slug: "introducing-techup-program",
    title: "Introducing TechUp: Digital Skills Education for Nigerian Schools",
    excerpt: "We're excited to announce TechUp, our flagship education program designed to equip secondary school students with practical, future-ready digital skills.",
    author: "Forge Team",
    date: "February 1, 2025",
    category: "Education",
    readTime: "6 min read",
    featured: false,
    image: null,
  },
  {
    slug: "launchpad-2025-success-story",
    title: "LaunchPad 2024: How 11 Students Proved the Power of Youth Innovation",
    excerpt: "Our inaugural LaunchPad program brought together 11 brilliant students from two schools. Here's what happened when we gave them the tools to dream big.",
    author: "Forge Team",
    date: "February 10, 2025",
    category: "Impact Stories",
    readTime: "8 min read",
    featured: false,
    image: null,
  },
  {
    slug: "ai-in-african-education",
    title: "The Role of AI in African Education: Opportunity or Threat?",
    excerpt: "Artificial intelligence is transforming education globally. How can African schools harness its power while avoiding its pitfalls?",
    author: "Forge Team",
    date: "February 15, 2025",
    category: "Technology",
    readTime: "10 min read",
    featured: false,
    image: null,
  },
  {
    slug: "partnership-with-ikosi-isheri",
    title: "Partnering with Ikosi-Isheri LCDA: A Model for Government Collaboration",
    excerpt: "Our partnership with Ikosi-Isheri LCDA shows what's possible when government and private sector align on youth development.",
    author: "Forge Team",
    date: "February 20, 2025",
    category: "Company News",
    readTime: "5 min read",
    featured: false,
    image: null,
  },
];

// Get featured post
const featuredPost = blogPosts.find(post => post.featured);
const regularPosts = blogPosts.filter(post => !post.featured);

export default function BlogPage() {
  return (
    <ChapterWrapper chapter="forge">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          <AnimatedSection animation="fade-up">
            <div className="max-w-3xl">
              
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                Our Blog
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-env-primary mb-6">
                Insights & Stories
              </h1>
              
              <p className="text-xl text-env-secondary leading-relaxed">
                Thoughts on African technology, education, innovation, and our journey 
                building solutions that understand and serve our continent.
              </p>
              
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== CATEGORIES ==================== */}
      <section className="pb-8">
        <div className="container-forge">
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <button
                  key={category.slug}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-smooth ${
                    category.slug === "all"
                      ? "bg-chapter-accent text-env-text-inverse"
                      : "bg-env-surface text-env-secondary hover:bg-env-surface-hover hover:text-env-primary border border-env-border"
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
        <section className="pb-16">
          <div className="container-forge">
            
            <AnimatedSection animation="fade-up" delay={150}>
              <Link href={`/blog/${featuredPost.slug}`} className="block group">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-chapter-accent-soft via-chapter-accent-softer to-chapter-accent-soft border border-chapter-accent/20 hover:border-chapter-accent/40 transition-smooth hover-lift">
                  
                  {/* Featured Image Placeholder */}
                  <div className="aspect-video rounded-xl bg-env-surface border border-env-border flex items-center justify-center overflow-hidden">
                    <div className="text-center p-8">
                      <span className="text-6xl block mb-4">📰</span>
                      <p className="text-env-tertiary text-sm">[Featured post image]</p>
                    </div>
                  </div>
                  
                  {/* Featured Content */}
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full">
                        Featured
                      </span>
                      <span className="px-3 py-1 text-xs font-medium text-env-secondary bg-env-surface rounded-full">
                        {featuredPost.category}
                      </span>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-env-primary mb-4 group-hover:text-chapter-accent transition-smooth">
                      {featuredPost.title}
                    </h2>
                    
                    <p className="text-env-secondary leading-relaxed mb-6">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-env-tertiary">
                        <span>{featuredPost.author}</span>
                        <span>•</span>
                        <span>{featuredPost.date}</span>
                        <span>•</span>
                        <span>{featuredPost.readTime}</span>
                      </div>
                      
                      <span className="flex items-center text-chapter-accent group-hover:translate-x-1 font-medium text-sm transition-transform">
                        Read more
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  
                </div>
              </Link>
            </AnimatedSection>
            
          </div>
        </section>
      )}

      {/* ==================== BLOG POSTS GRID ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <h2 className="text-2xl font-bold text-env-primary mb-8">Latest Articles</h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post, index) => (
              <AnimatedSection key={post.slug} animation="fade-up" delay={index * 75}>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="block group h-full"
                >
                  <article className="h-full flex flex-col rounded-xl bg-env-surface border border-env-border hover:border-chapter-accent/30 transition-smooth overflow-hidden hover-lift">
                    
                    {/* Post Image Placeholder */}
                    <div className="aspect-video bg-env-bg-tertiary flex items-center justify-center">
                      <span className="text-4xl group-hover:scale-110 transition-transform">📝</span>
                    </div>
                    
                    {/* Post Content */}
                    <div className="flex-grow p-6 flex flex-col">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="px-2 py-1 text-xs font-medium text-chapter-accent bg-chapter-accent-soft rounded">
                          {post.category}
                        </span>
                        <span className="text-xs text-env-tertiary">{post.readTime}</span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-env-primary mb-3 group-hover:text-chapter-accent transition-smooth line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-env-secondary text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center text-sm text-env-tertiary mt-auto">
                        <span>{post.author}</span>
                        <span className="mx-2">•</span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                    
                  </article>
                </Link>
              </AnimatedSection>
            ))}
          </div>
          
          {/* Load More Button (placeholder) */}
          <AnimatedSection animation="fade-up" delay={300}>
            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-env-surface hover:bg-env-surface-hover text-env-primary font-medium rounded-lg border border-env-border transition-smooth hover-lift">
                Load More Articles
              </button>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== NEWSLETTER SECTION ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-2xl mx-auto text-center">
              
              <span className="text-4xl block mb-4">📬</span>
              
              <h2 className="text-2xl md:text-3xl font-bold text-env-primary mb-4">
                Stay Updated
              </h2>
              
              <p className="text-env-secondary mb-8">
                Subscribe to our newsletter for the latest insights, program updates, 
                and stories from the Forge community.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 bg-env-surface border border-env-border rounded-lg text-env-primary placeholder:text-env-tertiary focus:outline-none focus:border-chapter-accent transition-smooth"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-chapter-accent hover:bg-chapter-accent-hover text-env-text-inverse font-medium rounded-lg transition-smooth whitespace-nowrap hover-lift"
                >
                  Subscribe
                </button>
              </form>
              
              <p className="text-env-tertiary text-sm mt-4">
                No spam, ever. Unsubscribe anytime.
              </p>
              
            </div>
          </AnimatedSection>
          
        </div>
      </section>
      
    </ChapterWrapper>
  );
}