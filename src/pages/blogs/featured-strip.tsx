'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Share2, SquareArrowOutUpRight } from 'lucide-react';
import { BLOG_POSTS } from '@/app/blog/blog-list';

export default function FeaturedStrip() {
  const featured = BLOG_POSTS.find((p) => p.featured);
  if (!featured) return null;

  const pub = new Date(featured.publishedAt).toLocaleDateString('en-IN', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="bg-[#F7EEFD]">
      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-10">
        <div className="overflow-hidden rounded-2xl bg-[#F7EEFD]">
          <div className="relative p-0">
            {/* CONTENT GRID */}
            <div className="grid gap-6 sm:gap-8 sm:grid-cols-[1.35fr_.9fr] p-5 sm:p-6 md:p-8">
              {/* LEFT: TEXT */}
              <div className="min-w-0">
                <h2 className="text-[26px] md:text-[34px] font-semibold leading-[1.15] text-slate-900">
                  {featured.title}
                </h2>

                <div className="mt-2 text-[13px]">
                  by{' '}
                  <Link
                    href={featured.authorHref || '#'}
                    className="text-[#1d4ed8] font-medium hover:underline underline-offset-4"
                  >
                    {featured.author}
                  </Link>
                  <span className="text-muted-foreground"> - {pub}</span>
                </div>

                <p className="mt-6 text-[15px] text-muted-foreground max-w-[62ch]">
                  {featured.excerpt}
                </p>

                {featured.badges?.length ? (
                  <div className="mt-6">
                    <div className="text-sm font-semibold">7 Major Changes</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {featured.badges.map((b, i) => (
                        <Badge key={i} variant="secondary" className="rounded-full">
                          {b}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="mt-7 flex items-center gap-5">
                  <Button className="h-10 rounded-full px-5">Read more</Button>

                  {/* small calendar + read time */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />~{featured.readTimeMin} min read
                  </div>

                  {/* inline share (optional; remove if not needed) */}
                  <button
                    type="button"
                    aria-label="Share"
                    className="ml-2 inline-flex items-center justify-center rounded-full border bg-white text-slate-600 hover:text-slate-900 hover:shadow px-2.5 h-8"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* RIGHT: POSTER IMAGE */}
              <div className="relative">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-md">
                  <Image
                    src="/assets/images/featured-blog.png"
                    alt="UGC poster"
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 540px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* floating bottom-right share/external button (now guaranteed visible) */}
            <button
              type="button"
              aria-label="Open featured"
              className="absolute bottom-4 right-4 grid size-9 place-items-center rounded-md border border-amber-200 bg-amber-50 text-amber-600 shadow-sm hover:shadow transition"
            >
              <SquareArrowOutUpRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
