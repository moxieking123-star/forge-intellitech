import Link from "next/link";
import { notFound } from "next/navigation";

// Sample blog posts data (same as listing page - will be centralized later)
const blogPosts = [
  {
    slug: "launching-forge-intellitech",
    title: "Launching Forge Intellitech: Building Technology That Understands Africa",
    excerpt: "Today, we officially introduce Forge Intellitech to the world. This is not just a company launch — it's the beginning of a movement to reshape how technology serves Africa.",
    content: `
      <p>Today marks a significant milestone in our journey. We are officially launching Forge Intellitech — not just as a technology company, but as a movement to transform how technology serves Africa.</p>
      
      <h2>The Question That Started It All</h2>
      <p>What if technology truly understood Africa? Not adapted solutions from elsewhere. Not localized versions of foreign products. But technology built from the ground up by those who understand the unique challenges, opportunities, and realities of our continent.</p>
      <p>This question has driven us from day one, and it continues to guide every decision we make.</p>
      
      <h2>Why We're Building Forge</h2>
      <p>For too long, Africa has been on the receiving end of technology. Solutions designed in distant boardrooms by people who've never experienced our realities. Products that work perfectly in stable power grids and high-speed internet environments, but struggle in our markets.</p>
      <p>We believe Africa deserves better. We believe the best solutions for African problems will come from African minds. And we're building the company to prove it.</p>
      
      <h2>What We're Building</h2>
      <p>Forge Intellitech is building a suite of products that address critical gaps in African infrastructure:</p>
      <ul>
        <li><strong>TechUp</strong> — Digital skills education for secondary schools</li>
        <li><strong>LaunchPad</strong> — Youth entrepreneurship and innovation program</li>
        <li><strong>BiteBank</strong> — Food security and vendor connectivity platform</li>
        <li><strong>Trego</strong> — Cross-border trade simplification</li>
      </ul>
      <p>Each product is designed with African realities at its core — not as an afterthought.</p>
      
      <h2>Join the Movement</h2>
      <p>We're just getting started, and we want you to be part of this journey. Whether you're a potential partner, investor, or simply someone who believes in Africa's potential — we'd love to connect.</p>
      <p>The future of African technology is being written now. Let's write it together.</p>
    `,
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
    content: `
      <p>Every day, millions of Africans interact with technology that wasn't designed for them. Apps that assume stable internet. Payment systems that don't understand informal economies. Educational tools that ignore local languages and contexts.</p>
      
      <h2>The Adaptation Problem</h2>
      <p>When foreign solutions are "adapted" for African markets, they often carry assumptions that don't translate. The result? Products that work, but never quite fit. Features that solve problems we don't have, while ignoring problems we do.</p>
      
      <h2>Understanding Context</h2>
      <p>Building for Africa requires understanding Africa. Not from reports and market research, but from lived experience. Understanding why mobile money works better than banking apps. Why offline-first isn't a nice-to-have but a necessity. Why community trust matters more than brand recognition.</p>
      
      <h2>The Opportunity</h2>
      <p>The opportunity isn't just about fixing problems — it's about leapfrogging. Africa has done it before with mobile phones, skipping landlines entirely. We can do it again with technology built specifically for our realities.</p>
      
      <h2>Our Commitment</h2>
      <p>At Forge Intellitech, we're committed to building technology that doesn't just work in Africa — but works <em>for</em> Africa. Technology that understands our context, respects our cultures, and serves our communities.</p>
      <p>The future is being built. Let's build it ourselves.</p>
    `,
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
    content: `
      <p>Today, we're excited to officially introduce TechUp — our flagship education program designed to transform how Nigerian secondary school students learn digital skills.</p>
      
      <h2>The Problem We're Solving</h2>
      <p>Traditional computer education in Nigerian schools often stops at basic computer awareness. Students learn to use Microsoft Word and Excel, but rarely develop skills that translate to real economic opportunity.</p>
      <p>Meanwhile, the digital economy is creating opportunities that require practical skills — web development, digital design, AI literacy, and more.</p>
      
      <h2>What TechUp Offers</h2>
      <p>TechUp is a structured, six-year program for students from JSS1 to SS3. Unlike traditional computer studies, TechUp focuses on practical, industry-relevant skills:</p>
      <ul>
        <li>Web development fundamentals</li>
        <li>Digital design and creativity</li>
        <li>AI-assisted productivity</li>
        <li>Digital entrepreneurship</li>
        <li>Portfolio development</li>
      </ul>
      
      <h2>For Schools</h2>
      <p>We partner with schools to deliver the program through their existing infrastructure, with teacher training and ongoing support. Schools become talent incubation spaces, producing graduates ready for the digital economy.</p>
      
      <h2>Get Involved</h2>
      <p>We're currently piloting TechUp with select partner schools. If you're a school administrator, government official, or potential sponsor interested in bringing TechUp to your community, we'd love to hear from you.</p>
    `,
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
    content: `
      <p>When we launched the first LaunchPad program in 2025, we had high hopes but uncertain expectations. What we witnessed exceeded everything we imagined.</p>
      
      <h2>The Setup</h2>
      <p>With support from Ikosi-Isheri LCDA and sponsorship from Chief Alaka (Lagos State President, NAPPS), we brought together 11 students from two partner schools. The venue was provided by Chairman Princess Samiat Bada — remarkably, during an election period.</p>
      
      <h2>What Students Learned</h2>
      <p>Over the program, students learned to identify real problems in their communities, develop business solutions, use AI tools for research and ideation, and pitch their ideas with confidence.</p>
      
      <h2>The Pitches</h2>
      <p>The final pitching event was electric. Students presented ideas ranging from agricultural technology to educational services to community solutions. The quality of thinking was remarkable — these were ideas that could genuinely work.</p>
      
      <h2>The Winners</h2>
      <p>First place took home ₦300,000, with second place receiving ₦200,000. But honestly, every student who participated was a winner — they left with skills, confidence, and a new understanding of their potential.</p>
      
      <h2>What's Next</h2>
      <p>LaunchPad 2026 is already in planning. We're expanding to 26 students and seeking partnerships at the Lagos State Government level. The movement is growing.</p>
    `,
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
    content: `
      <p>Artificial intelligence is reshaping education around the world. For African schools, this presents both tremendous opportunity and significant risk. Getting it right matters.</p>
      
      <h2>The Opportunity</h2>
      <p>AI can democratize access to quality education. It can provide personalized learning at scale, assist teachers with administrative burdens, and help students learn at their own pace. For resource-constrained African schools, these benefits are particularly compelling.</p>
      
      <h2>The Risks</h2>
      <p>But there are real risks. Over-reliance on AI could undermine critical thinking. Students might learn to use AI without understanding underlying concepts. And AI systems trained on non-African data might perpetuate biases or miss context.</p>
      
      <h2>Our Approach at TechUp</h2>
      <p>In the TechUp program, we teach AI literacy — not just how to use AI tools, but how to understand their limitations and use them responsibly. Students learn that AI is a tool, not a replacement for thinking.</p>
      
      <h2>The Path Forward</h2>
      <p>African education can harness AI's power while maintaining what makes human learning valuable. The key is intentionality — using AI deliberately, not defaulting to it. Teaching with AI, not just teaching AI.</p>
      <p>The future will belong to those who can work with AI while thinking beyond it. Let's prepare our students for that future.</p>
    `,
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
    content: `
      <p>When we approached Ikosi-Isheri LCDA about partnering on LaunchPad 2025, we weren't sure what to expect. Government partnerships can be complex. What we found was a local government genuinely committed to youth development.</p>
      
      <h2>Finding the Right Partner</h2>
      <p>Chairman Princess Samiat Bada understood immediately what we were trying to achieve. She didn't just approve the partnership — she actively supported it, providing the council hall as venue even during the busy election period.</p>
      
      <h2>Why This Model Works</h2>
      <p>Government-private sector partnerships work when both parties share genuine commitment to outcomes. Ikosi-Isheri LCDA wasn't looking for photo opportunities — they wanted real impact for their young constituents.</p>
      
      <h2>Scaling the Model</h2>
      <p>This partnership shows what's possible at the local government level. Our goal is to replicate this model across Lagos State, eventually partnering at the state government level to reach more students.</p>
      
      <h2>A Call to Other LGAs</h2>
      <p>To other local governments across Lagos and Nigeria: this is possible in your community too. If you're committed to youth development and innovation, we'd love to explore partnership opportunities.</p>
      <p>The success of Ikosi-Isheri shows the way forward.</p>
    `,
    author: "Forge Team",
    date: "February 20, 2025",
    category: "Company News",
    readTime: "5 min read",
    featured: false,
    image: null,
  },
];

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  
  return {
    title: post.title,
    description: post.excerpt,
  };
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  
  // If post not found, show 404
  if (!post) {
    notFound();
  }
  
  // Find related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);

  return (
    <div>
      
      {/* ==================== ARTICLE HEADER ==================== */}
      <section className="section-padding pb-8">
        <div className="container-forge">
          <div className="max-w-3xl mx-auto">
            
            {/* Back link */}
            <Link 
              href="/blog"
              className="inline-flex items-center text-forge-muted hover:text-primary-400 transition-smooth mb-8"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
            
            {/* Category and read time */}
            <div className="flex items-center space-x-3 mb-4">
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20">
                {post.category}
              </span>
              <span className="text-forge-muted text-sm">{post.readTime}</span>
            </div>
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-forge-light mb-6 leading-tight">
              {post.title}
            </h1>
            
            {/* Excerpt */}
            <p className="text-xl text-forge-muted leading-relaxed mb-8">
              {post.excerpt}
            </p>
            
            {/* Author and date */}
            <div className="flex items-center space-x-4 pb-8 border-b border-forge-border">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500/30 to-accent-500/30 flex items-center justify-center">
                <span className="text-lg">✍️</span>
              </div>
              <div>
                <p className="font-medium text-forge-light">{post.author}</p>
                <p className="text-sm text-forge-muted">{post.date}</p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* ==================== FEATURED IMAGE ==================== */}
      <section className="pb-12">
        <div className="container-forge">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-2xl bg-white/5 border border-forge-border flex items-center justify-center">
              <div className="text-center p-8">
                <span className="text-6xl block mb-4">📰</span>
                <p className="text-forge-muted">[Article featured image]</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ARTICLE CONTENT ==================== */}
      <section className="pb-16">
        <div className="container-forge">
          <div className="max-w-3xl mx-auto">
            
            {/* Article content with prose styling */}
            <article 
              className="prose prose-invert prose-lg max-w-none
                prose-headings:text-forge-light prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-p:text-forge-muted prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-forge-light prose-strong:font-semibold
                prose-em:text-forge-light prose-em:italic
                prose-ul:text-forge-muted prose-ul:my-6
                prose-li:my-2 prose-li:leading-relaxed
                prose-blockquote:border-l-primary-500 prose-blockquote:bg-white/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
          </div>
        </div>
      </section>

      {/* ==================== SHARE & TAGS ==================== */}
      <section className="pb-16">
        <div className="container-forge">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 p-6 rounded-xl bg-white/5 border border-forge-border">
              
              {/* Tags */}
              <div className="flex items-center space-x-2">
                <span className="text-forge-muted text-sm">Tags:</span>
                <span className="px-3 py-1 text-xs font-medium text-forge-muted bg-white/5 rounded-full">
                  {post.category}
                </span>
              </div>
              
              {/* Share buttons */}
              <div className="flex items-center space-x-4">
                <span className="text-forge-muted text-sm">Share:</span>
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://forgeintelli.com/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-forge-muted hover:text-primary-400 transition-smooth"
                  aria-label="Share on Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://forgeintelli.com/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-forge-muted hover:text-primary-400 transition-smooth"
                  aria-label="Share on LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* ==================== RELATED POSTS ==================== */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-forge-darker">
          <div className="container-forge">
            
            <h2 className="text-2xl font-bold text-forge-light mb-8 text-center">
              Related Articles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="block group"
                >
                  <article className="h-full p-6 rounded-xl bg-white/5 border border-forge-border hover:border-primary-500/30 transition-smooth">
                    <span className="px-2 py-1 text-xs font-medium text-primary-400 bg-primary-500/10 rounded mb-3 inline-block">
                      {relatedPost.category}
                    </span>
                    <h3 className="text-lg font-semibold text-forge-light mb-2 group-hover:text-primary-400 transition-smooth">
                      {relatedPost.title}
                    </h3>
                    <p className="text-forge-muted text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </article>
                </Link>
              ))}
            </div>
            
          </div>
        </section>
      )}

      {/* ==================== CTA SECTION ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-forge-light mb-4">
              Want to stay updated?
            </h2>
            <p className="text-forge-muted mb-8">
              Subscribe to our newsletter for the latest articles, program updates, and Forge news.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blog"
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-forge-light font-medium rounded-lg border border-forge-border transition-smooth"
              >
                Read More Articles
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-smooth"
              >
                Get In Touch
              </Link>
            </div>
          </div>
          
        </div>
      </section>
      
    </div>
  );
}
