import { BLOG_POSTS } from '@/app/blog/blog-list';
import FeaturedStrip from '@/pages/blogs/featured-strip';
import BlogHero from '@/pages/blogs/hero';
import PostCard from '@/pages/blogs/post-card';
import FooterSection from '@/pages/home/footer-section';
import React from 'react';

const BlogListingPage = () => {
  const latest = BLOG_POSTS.filter((p) => !p.featured);

  return (
    <div className="bg-background">
      <BlogHero />
      <FeaturedStrip />

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
