import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  category?: string;
  author?: string;
  date: string;
  readTime?: string;
  featured?: boolean;
}

const BlogCard = ({
  slug,
  title,
  excerpt,
  coverImage,
  category,
  author,
  date,
  readTime,
  featured = false,
}: BlogCardProps) => {
  return (
    <Link href={`/blog/${slug}`} className="group block h-full">
      <article 
        className={`
          h-full rounded-2xl overflow-hidden
          bg-env-surface border border-env-border
          transition-all duration-500 ease-out
          hover:border-[#FF8C42]/40 hover:shadow-xl hover:shadow-[#FF8C42]/5
          hover:-translate-y-1
          ${featured ? 'md:flex md:flex-row' : 'flex flex-col'}
        `}
      >
        {/* Image Container */}
        <div className={`
          relative overflow-hidden
          ${featured ? 'md:w-1/2 aspect-video md:aspect-auto' : 'aspect-video'}
        `}>
          {coverImage ? (
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF8C42]/20 to-[#14B8B8]/20 flex items-center justify-center">
              <span className="text-6xl opacity-30">✦</span>
            </div>
          )}
          
          {/* Category Badge */}
          {category && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FF8C42] text-[#1A1A1A]">
                {category}
              </span>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className={`
          p-6 flex flex-col justify-between
          ${featured ? 'md:w-1/2 md:p-8' : ''}
        `}>
          <div>
            {/* Title */}
            <h2 className={`
              font-heading font-bold text-env-primary leading-tight mb-3
              group-hover:text-[#FF8C42] transition-colors duration-300
              ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}
            `}>
              {title}
            </h2>

            {/* Excerpt */}
            <p className={`
              text-env-secondary leading-relaxed mb-4
              ${featured ? 'text-base md:text-lg' : 'text-sm line-clamp-3'}
            `}>
              {excerpt}
            </p>
          </div>

          {/* Meta */}
          <div className="flex items-center justify-between text-sm text-env-tertiary pt-4 border-t border-env-border">
            <div className="flex items-center gap-3">
              {author && (
                <>
                  <span className="font-medium text-env-secondary">{author}</span>
                  <span>·</span>
                </>
              )}
              <span>{date}</span>
            </div>
            {readTime && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {readTime}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;