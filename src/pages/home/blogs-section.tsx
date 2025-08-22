import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

const BlogsSection = () => {
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
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
            >
              {/* <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500"></div> */}
              <Image
                src={
                  'https://images.unsplash.com/photo-1545048702-79362596cdc9?q=80&w=1400&auto=format&fit=crop'
                }
                alt={`blog`}
                className="p-6 pb-0 rounded w-full object-cover h-48 bg-gradient-to-r from-blue-500 to-purple-500"
                loading="lazy"
                width={472}
                height={306}
              />
              <div className="p-6">
                <h3 className="font-semibold mb-2">
                  Mastering Online Exams In India; A comprehensive...
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Accelerate your career with confidence. Learn by doing, build your portfolio, and
                  enhance your skills with AI tools that every modern PM needs to know.
                </p>
                <Button variant="outline" size="sm">
                  See all details →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsSection;
