'use client';

import { useState, useEffect } from 'react';
import { blogsAPI } from '@/lib/api';
import { BlogAPI } from '@/types/blog';
import { transformBlogsData } from '@/lib/transformers';
import FeaturedStrip from '@/components/blogs/featured-strip';
import BlogHero from '@/components/blogs/hero';
import PostCard from '@/components/blogs/post-card';
import FooterSection from '@/components/home/footer-section';
import React from 'react';

const BlogListingPage = () => {
  const [apiBlogs, setApiBlogs] = useState<BlogAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await blogsAPI.getAll();
        setApiBlogs(response.data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Transform API data to frontend format
  const blogs = transformBlogsData(apiBlogs);
  const latest = blogs.filter((p) => !p.featured);

  if (loading) {
    return (
      <div className="bg-background">
        <BlogHero />
        <div className="container max-w-7xl mx-auto px-4 py-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading blogs...</p>
            </div>
          </div>
        </div>
        <FooterSection />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background">
        <BlogHero />
        <div className="container max-w-7xl mx-auto px-4 py-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="bg-background">
      <BlogHero />
      <FeaturedStrip blogs={apiBlogs} />

      <section className="container max-w-7xl mx-auto px-4 py-10 md:py-14">
        <h2 className="text-xl md:text-2xl font-semibold">Latest Posts</h2>

        <div className="mt-6 grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* TODO: Pagination */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span className="rounded-full border px-3 py-1.5">1</span>
            <span className="rounded-full border px-3 py-1.5 bg-muted/40">2</span>
            <span className="rounded-full border px-3 py-1.5">3</span>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default BlogListingPage;
