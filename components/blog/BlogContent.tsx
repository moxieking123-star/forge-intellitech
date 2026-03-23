"use client";

import { ReactNode } from 'react';

interface BlogContentProps {
  children: ReactNode;
}

const BlogContent = ({ children }: BlogContentProps) => {
  return (
    <article className="blog-content prose prose-lg max-w-none">
      {children}
      
      <style jsx global>{`
        .blog-content {
          /* Base Typography */
          font-family: var(--font-opensans), Georgia, serif;
          font-size: 1.125rem;
          line-height: 1.9;
          color: var(--env-text-primary);
          letter-spacing: 0.01em;
          word-spacing: 0.05em;
        }

        /* ===== DROP CAP ===== */
        .blog-content > p:first-of-type::first-letter {
          float: left;
          font-family: Georgia, serif;
          font-size: 4.5rem;
          line-height: 0.8;
          font-weight: 700;
          margin-right: 0.15em;
          margin-top: 0.1em;
          color: #FF8C42;
          text-shadow: 2px 2px 0 rgba(255, 140, 66, 0.1);
        }

        /* ===== HEADINGS ===== */
        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4 {
          font-family: var(--font-poppins), system-ui, sans-serif;
          color: var(--env-text-primary);
          font-weight: 700;
          line-height: 1.3;
          margin-top: 2.5em;
          margin-bottom: 0.8em;
          letter-spacing: -0.02em;
        }

        .blog-content h1 {
          font-size: 2.5rem;
          background: linear-gradient(135deg, #FF8C42, #FFD54F);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .blog-content h2 {
          font-size: 2rem;
          padding-bottom: 0.5em;
          border-bottom: 2px solid rgba(255, 140, 66, 0.2);
        }

        .blog-content h3 {
          font-size: 1.5rem;
          color: #14B8B8;
        }

        .blog-content h4 {
          font-size: 1.25rem;
          color: var(--env-text-secondary);
        }

        /* ===== PARAGRAPHS ===== */
        .blog-content p {
          margin-bottom: 1.75em;
          text-align: justify;
          hyphens: auto;
        }

        /* ===== LINKS ===== */
        .blog-content a {
          color: #FF8C42;
          text-decoration: none;
          border-bottom: 1px solid rgba(255, 140, 66, 0.3);
          transition: all 0.3s ease;
        }

        .blog-content a:hover {
          color: #FFD54F;
          border-bottom-color: #FFD54F;
        }

        /* ===== BLOCKQUOTES ===== */
        .blog-content blockquote {
          position: relative;
          margin: 2.5em 0;
          padding: 2em 2.5em;
          background: linear-gradient(135deg, rgba(255, 140, 66, 0.08), rgba(20, 184, 184, 0.05));
          border-left: 4px solid #FF8C42;
          border-radius: 0 1rem 1rem 0;
          font-style: italic;
          font-size: 1.2rem;
          line-height: 1.8;
          color: var(--env-text-primary);
        }

        .blog-content blockquote::before {
          content: '"';
          position: absolute;
          top: -0.3em;
          left: 0.3em;
          font-size: 5rem;
          font-family: Georgia, serif;
          color: rgba(255, 140, 66, 0.15);
          line-height: 1;
        }

        .blog-content blockquote p {
          margin-bottom: 0;
        }

        .blog-content blockquote cite {
          display: block;
          margin-top: 1em;
          font-size: 0.9rem;
          font-style: normal;
          color: var(--env-text-tertiary);
        }

        .blog-content blockquote cite::before {
          content: '— ';
        }

        /* ===== LISTS ===== */
        .blog-content ul,
        .blog-content ol {
          margin: 1.5em 0;
          padding-left: 1.5em;
        }

        .blog-content ul {
          list-style: none;
        }

        .blog-content ul li {
          position: relative;
          margin-bottom: 0.75em;
          padding-left: 1.5em;
        }

        .blog-content ul li::before {
          content: '◆';
          position: absolute;
          left: 0;
          color: #FF8C42;
          font-size: 0.6em;
          top: 0.5em;
        }

        .blog-content ol {
          counter-reset: list-counter;
          list-style: none;
        }

        .blog-content ol li {
          position: relative;
          margin-bottom: 0.75em;
          padding-left: 2em;
          counter-increment: list-counter;
        }

        .blog-content ol li::before {
          content: counter(list-counter);
          position: absolute;
          left: 0;
          width: 1.5em;
          height: 1.5em;
          background: rgba(255, 140, 66, 0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8em;
          font-weight: 700;
          color: #FF8C42;
        }

        /* ===== CODE ===== */
        .blog-content code {
          font-family: 'Fira Code', monospace;
          font-size: 0.9em;
          padding: 0.2em 0.5em;
          background: rgba(20, 184, 184, 0.1);
          border-radius: 0.3em;
          color: #14B8B8;
        }

        .blog-content pre {
          margin: 2em 0;
          padding: 1.5em;
          background: #1a1a2e;
          border-radius: 1rem;
          overflow-x: auto;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .blog-content pre code {
          background: transparent;
          padding: 0;
          color: #e0e0e0;
        }

        /* ===== IMAGES ===== */
        .blog-content img {
          width: 100%;
          height: auto;
          border-radius: 1rem;
          margin: 2em 0;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .blog-content figure {
          margin: 2.5em 0;
        }

        .blog-content figcaption {
          text-align: center;
          font-size: 0.9rem;
          color: var(--env-text-tertiary);
          margin-top: 0.75em;
          font-style: italic;
        }

        /* ===== HORIZONTAL RULE ===== */
        .blog-content hr {
          border: none;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(255, 140, 66, 0.5), transparent);
          margin: 3em 0;
        }

        /* ===== TABLES ===== */
        .blog-content table {
          width: 100%;
          margin: 2em 0;
          border-collapse: collapse;
          font-size: 0.95rem;
        }

        .blog-content th,
        .blog-content td {
          padding: 1em;
          text-align: left;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .blog-content th {
          background: rgba(255, 140, 66, 0.1);
          font-weight: 700;
          color: #FF8C42;
        }

        .blog-content tr:hover {
          background: rgba(255, 255, 255, 0.02);
        }

        /* ===== CALLOUTS / NOTES ===== */
        .blog-content .callout {
          padding: 1.5em 2em;
          margin: 2em 0;
          border-radius: 1rem;
          border-left: 4px solid;
        }

        .blog-content .callout-info {
          background: rgba(20, 184, 184, 0.1);
          border-color: #14B8B8;
        }

        .blog-content .callout-warning {
          background: rgba(255, 213, 79, 0.1);
          border-color: #FFD54F;
        }

        .blog-content .callout-success {
          background: rgba(82, 183, 136, 0.1);
          border-color: #52B788;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .blog-content {
            font-size: 1rem;
            line-height: 1.8;
          }

          .blog-content > p:first-of-type::first-letter {
            font-size: 3.5rem;
          }

          .blog-content h1 { font-size: 2rem; }
          .blog-content h2 { font-size: 1.5rem; }
          .blog-content h3 { font-size: 1.25rem; }

          .blog-content blockquote {
            padding: 1.5em;
            font-size: 1.1rem;
          }
        }
      `}</style>
    </article>
  );
};

export default BlogContent;