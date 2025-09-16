'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { blogsAPI } from '@/lib/api';
import { BlogAPI } from '@/types/blog';

import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import BlogDetailsHero from '@/components/blogs/blog-details-hero';
import FooterSection from '@/components/home/footer-section';

export default function BlogPage({ params }: { params: { slug: string } }) {
  const [blog, setBlog] = useState<BlogAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        
        // First, get all blogs to find the one with matching slug
        const blogsResponse = await blogsAPI.getAll();
        const matchingBlog = blogsResponse.data.find((blog: BlogAPI) => blog.slug === params.slug);
        
        if (!matchingBlog) {
          setError('Blog not found');
          return;
        }

        // Now get the full blog content by ID
        const blogDetailResponse = await blogsAPI.getById(matchingBlog.id.toString());
        setBlog(blogDetailResponse.data);
        
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to load blog');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <BlogDetailsHero />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-background">
        <BlogDetailsHero />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Blog Not Found</h1>
          <p className="text-gray-600 mb-8">Error: {error || 'Blog not found'}</p>
          <p className="text-sm text-gray-500 mb-4">Slug: {params.slug}</p>
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Format the published date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Convert markdown content to HTML (basic conversion)
  const renderContent = (content: string) => {
    return content
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-6 text-gray-900">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mb-4 mt-8 text-gray-900">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mb-3 mt-6 text-gray-900">$1</h3>')
      .replace(/^\- (.*$)/gim, '<li class="mb-2">$1</li>')
      .replace(/^\* (.*$)/gim, '<li class="mb-2">$1</li>')
      .replace(/^(\d+)\. (.*$)/gim, '<li class="mb-2">$1. $2</li>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .split('\n\n')
      .map(paragraph => {
        if (paragraph.includes('<h') || paragraph.includes('<li>')) {
          return paragraph;
        }
        return paragraph.trim() ? `<p class="mb-4 text-gray-700 leading-relaxed">${paragraph}</p>` : '';
      })
      .join('\n');
  };

  return (
    <div className="bg-background">
      {/* Hero */}
      <BlogDetailsHero />

      {/* Blog Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Back to Blog Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>

        {/* Blog Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>
          
          {blog.excerpt && (
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {blog.excerpt}
            </p>
          )}

          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-b border-gray-200 pb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(blog.publishedAt)}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{blog.readTimeMin} min read</span>
            </div>

            {blog.featured && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                Featured
              </span>
            )}
          </div>
        </header>

        {/* Blog Content */}
        <article className="prose prose-lg max-w-none">
          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ 
              __html: renderContent(blog.content || 'No content available.')
            }}
          />
        </article>

        {/* Back to Blog Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Articles
          </Link>
        </div>
      </div>

      <FooterSection />
    </div>
  );
}