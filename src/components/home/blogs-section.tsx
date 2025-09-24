'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { blogsAPI } from '@/lib/api';
import { SITE_BASE_URL } from '@/lib/config';
import { BlogAPI } from '@/types/blog';

// Fallback data for loading state or error
const FALLBACK_BLOGS = [
  {
    id: '1',
    title: 'Mastering Online Exams In India; A comprehensive...',
    excerpt: 'Accelerate your career with confidence. Learn by doing, build your portfolio, and enhance your skills with AI tools that every modern PM needs to know.',
    slug: 'mastering-online-exams',
    cover: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?q=80&w=1400&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Mastering Online Exams In India; A comprehensive...',
    excerpt: 'Accelerate your career with confidence. Learn by doing, build your portfolio, and enhance your skills with AI tools that every modern PM needs to know.',
    slug: 'mastering-online-exams-2',
    cover: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?q=80&w=1400&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Mastering Online Exams In India; A comprehensive...',
    excerpt: 'Accelerate your career with confidence. Learn by doing, build your portfolio, and enhance your skills with AI tools that every modern PM needs to know.',
    slug: 'mastering-online-exams-3',
    cover: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?q=80&w=1400&auto=format&fit=crop',
  },
];

const BlogsSection = () => {
  const [blogs, setBlogs] = useState<BlogAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await blogsAPI.getAll();
        
        // Get first 3 blogs for the home page, prioritize featured ones
        const displayBlogs = response.data
          .sort((a, b) => {
            // Sort by featured first, then by publishedAt (newest first)
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
          })
          .slice(0, 3);
        
        setBlogs(displayBlogs);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Transform API data to display format
  const getDisplayBlogs = () => {
    if (loading || error || blogs.length === 0) {
      return FALLBACK_BLOGS;
    }

  // Base URL for the API / site (use env-configured value)
  const API_BASE_URL = SITE_BASE_URL;

    return blogs.map(blog => ({
      id: blog.documentId || blog.id.toString(),
      title: blog.title,
      excerpt: blog.excerpt || 'Read this interesting article to learn more.',
      slug: blog.slug,
      cover: blog.cover?.url 
        ? `${API_BASE_URL}${blog.cover.url}` 
        : FALLBACK_BLOGS[0].cover,
    }));
  };

  const displayBlogs = getDisplayBlogs();

  return (
    <div id="blog" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Blog</h2>
          <p className="text-muted-foreground">
            We explore how all the institutions are pushing the boundaries of science and
            technologies.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayBlogs.map((blog, index) => (
            <div
              key={blog.id}
              className="bg-card rounded-lg overflow-hidden border border-border transform transition duration-300 hover:shadow-lg hover:-translate-y-1 group relative bg-transparent"
            >
              <Image
                src={blog.cover}
                alt={blog.title}
                className="p-6 pb-0 rounded w-full object-cover h-48 bg-gradient-to-r from-blue-500 to-purple-500"
                loading="lazy"
                width={472}
                height={306}
              />
              <div className="p-6 transition-colors duration-300 relative z-30 overflow-hidden">
                {/* overlay inside content only so image is not tinted */}
                <div
                  className="absolute left-0 right-0 bottom-0 h-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-10"
                  style={{ backgroundColor: 'var(--color-action)' }}
                  aria-hidden
                />
                <div
                  className="absolute left-0 right-0 bottom-0 h-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out opacity-0 group-hover:opacity-40 z-10"
                  style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                  aria-hidden
                />

                <h3 className="font-semibold mb-2 relative z-20 transition-colors duration-300 group-hover:text-white">
                  {blog.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 relative z-20 transition-colors duration-300 group-hover:text-white/90">
                  {blog.excerpt}
                </p>
                <Button variant="outline" size="sm" className="relative z-20">
                  <Link href={`/blog/${blog.slug}`} className="inline-flex items-center gap-2 no-underline">
                    <span>See all details</span>
                    <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-2 group-hover:rotate-12">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-current"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center items-center mt-8">
          <Link href="/blog">
            <Button variant="outline" className="cursor-pointer">
              Browse all blogs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogsSection;
