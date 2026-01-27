import Link from "next/link";
import SectionHeader from "../../components/SectionHeader";

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
    title: "LaunchPad 2025: How 11 Students Proved the Power of Youth Innovation",
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
    <div>
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          <div className="max-w-3xl">
            
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20">
              Our Blog
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-forge-light mb-6">
              Insights & Stories
            </h1>
            
            <p className="text-xl text-forge-muted leading-relaxed">
              Thoughts on African technology, education, innovation, and our journey 
              building solutions that understand and serve our continent.
            </p>
            
          </div>
        </div>
      </section>

      {/* ==================== CATEGORIES ==================== */}
      <section className="pb-8">
        <div className="container-forge">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.slug}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-smooth ${
                  category.slug === "all"
                    ? "bg-primary-600 text-white"
                    : "bg-white/5 text-forge-muted hover:bg-white/10 hover:text-forge-light border border-forge-border"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURED POST ==================== */}
      {featuredPost && (
        <section className="pb-16">
          <div className="container-forge">
            
            <Link href={`/blog/${featuredPost.slug}`} className="block group">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary-500/10 via-accent-500/5 to-primary-500/10 border border-primary-500/20 hover:border-primary-500/40 transition-smooth">
                
                {/* Featured Image Placeholder */}
                <div className="aspect-video rounded-xl bg-white/5 border border-forge-border flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    <span className="text-6xl block mb-4">📰</span>
                    <p className="text-forge-muted text-sm">[Featured post image]</p>
                  </div>
                </div>
                
                {/* Featured Content */}
                <div className="flex flex-col justify-center">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-400 bg-primary-500/20 rounded-full">
                      Featured
                    </span>
                    <span className="px-3 py-1 text-xs font-medium text-forge-muted bg-white/5 rounded-full">
                      {featuredPost.category}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-forge-light mb-4 group-hover:text-primary-400 transition-smooth">
                    {featuredPost.title}
                  </h2>
                  
                  <p className="text-forge-muted leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-forge-muted">
                      <span>{featuredPost.author}</span>
                      <span>•</span>
                      <span>{featuredPost.date}</span>
                      <span>•</span>
                      <span>{featuredPost.readTime}</span>
                    </div>
                    
                    <span className="flex items-center text-primary-400 group-hover:text-primary-300 font-medium text-sm">
                      Read more
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
                
              </div>
            </Link>
            
          </div>
        </section>
      )}

      {/* ==================== BLOG POSTS GRID ==================== */}
      <section className="section-padding bg-forge-darker">
        <div className="container-forge">
          
          <h2 className="text-2xl font-bold text-forge-light mb-8">Latest Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <Link 
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <article className="h-full flex flex-col rounded-xl bg-white/5 border border-forge-border hover:border-primary-500/30 transition-smooth overflow-hidden">
                  
                  {/* Post Image Placeholder */}
                  <div className="aspect-video bg-white/5 flex items-center justify-center">
                    <span className="text-4xl">📝</span>
                  </div>
                  
                  {/* Post Content */}
                  <div className="flex-grow p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="px-2 py-1 text-xs font-medium text-primary-400 bg-primary-500/10 rounded">
                        {post.category}
                      </span>
                      <span className="text-xs text-forge-muted">{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-forge-light mb-3 group-hover:text-primary-400 transition-smooth line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-forge-muted text-sm leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center text-sm text-forge-muted mt-auto">
                      <span>{post.author}</span>
                      <span className="mx-2">•</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                  
                </article>
              </Link>
            ))}
          </div>
          
          {/* Load More Button (placeholder) */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-white/5 hover:bg-white/10 text-forge-light font-medium rounded-lg border border-forge-border transition-smooth">
              Load More Articles
            </button>
          </div>
          
        </div>
      </section>

      {/* ==================== NEWSLETTER SECTION ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <div className="max-w-2xl mx-auto text-center">
            
            <span className="text-4xl block mb-4">📬</span>
            
            <h2 className="text-2xl md:text-3xl font-bold text-forge-light mb-4">
              Stay Updated
            </h2>
            
            <p className="text-forge-muted mb-8">
              Subscribe to our newsletter for the latest insights, program updates, 
              and stories from the Forge community.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 bg-white/5 border border-forge-border rounded-lg text-forge-light placeholder:text-forge-muted focus:outline-none focus:border-primary-500 transition-smooth"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-smooth whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            
            <p className="text-forge-muted text-sm mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
            
          </div>
          
        </div>
      </section>
      
    </div>
  );
}
