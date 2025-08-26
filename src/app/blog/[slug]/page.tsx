'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/app/blog/blog-list';

import { ArrowLeft } from 'lucide-react';
import { BLOG_ARTICLES } from '@/app/blog/blog-articles';
import BlogDetailsHero from '@/pages/blogs/blog-details-hero';
import ArticleRenderer from '@/pages/blogs/article-renderer';
import BlogDetailsIntro from '@/pages/blogs/blog-details-intro';
import FooterSection from '@/pages/home/footer-section';

export default function BlogPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  const article = BLOG_ARTICLES[params.slug];
  if (!article) {
    // If you haven’t authored content for this slug yet, 404 (or render a simple stub)
    return notFound();
  }

  return (
    <div className="bg-background">
      {/* hero */}
      <BlogDetailsHero />
      <BlogDetailsIntro
        title={article.title ?? post.title}
        author={post.author}
        authorHref={post.authorHref}
        publishedAt={post.publishedAt}
      />

      {/* main content */}
      <section className="container mx-auto grid gap-10 px-4 pb-12 md:grid-cols-[minmax(0,1fr)] md:gap-12 pt-16">
        <ArticleRenderer blocks={article.blocks} />

        {/* back to blog */}
        <div className="mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-muted-foreground hover:underline"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
