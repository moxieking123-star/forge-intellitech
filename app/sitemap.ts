import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';

  // Static pages
  const staticPages = [
    { route: '', priority: 1, changeFreq: 'daily' as const },
    { route: '/about', priority: 0.8, changeFreq: 'monthly' as const },
    { route: '/services', priority: 0.9, changeFreq: 'weekly' as const },
    { route: '/portfolio', priority: 0.8, changeFreq: 'weekly' as const },
    { route: '/blog', priority: 0.9, changeFreq: 'daily' as const },
    { route: '/contact', priority: 0.7, changeFreq: 'monthly' as const },
    { route: '/launchpad', priority: 0.8, changeFreq: 'monthly' as const },
    { route: '/privacy-policy', priority: 0.3, changeFreq: 'yearly' as const },
    { route: '/terms-of-service', priority: 0.3, changeFreq: 'yearly' as const },
  ];

  const staticSitemap: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page.route}`,
    lastModified: new Date(),
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }));

  // Dynamic blog posts (if you have a blog table)
  let blogSitemap: MetadataRoute.Sitemap = [];
  
  try {
    if (!supabase) {
      throw new Error('Supabase client is not initialized');
    }
    
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug, updated_at')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (posts) {
      blogSitemap = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  return [...staticSitemap, ...blogSitemap];
}