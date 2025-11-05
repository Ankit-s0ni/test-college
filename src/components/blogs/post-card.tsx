 'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { BlogPost } from '@/types/blog';
import { Share2 } from 'lucide-react';

export default function PostCard({ post }: { post: BlogPost }) {
  const date = new Date(post.publishedAt).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Card className="overflow-hidden rounded-xl shadow-sm border p-0 gap-4 transition-transform duration-300 hover:scale-101 hover:shadow-md group relative bg-white">
  {/* no color overlays here — keep hover lift and shadow only */}
      {/* HEADER (matches the reference) */}
      <div className="relative h-[218px] w-full rounded-tr-xl overflow-hidden z-20 bg-white">
        <Image
          src={post.cover || '/assets/images/blog-post.png'}
          alt={post.title}
          width={366}
          height={218}
          className="object-cover w-full h-full"
          priority
        />
      </div>

      {/* BODY */}
      <CardContent className="relative p-4 sm:p-5 pt-0 sm:pt-0 z-20">
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-[20px] sm:text-[22px] font-semibold leading-snug text-slate-900">
            {post.title}
          </h3>
        </Link>

        <div className="mt-2 text-[14px] text-slate-500">
          by{' '}
          <Link
            href={post.authorHref || '#'}
            className="text-[#1d4ed8] hover:underline underline-offset-2"
          >
            {post.author}
          </Link>{' '}
          — {date}
        </div>

        <p className="mt-4 text-[15px] leading-7 text-slate-600 line-clamp-3">{post.excerpt}</p>

        {/* footer row */}
        <div className="mt-6 flex items-center justify-between">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-[#1d4ed8] font-medium no-underline"
          >
            <span className="underline underline-offset-4">Read More</span>
            <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-2 group-hover:rotate-12">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#1d4ed8]"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </Link>

          <button
            type="button"
            aria-label="Share"
            className="text-slate-600 hover:text-slate-900"
            onClick={useCallback(() => {
              try {
                const origin = window.location?.origin || '';
                const url = `${origin}/blog/${post.slug}`;
                const title = post.title || '';

                if (navigator.share) {
                  // Use native share sheet when available
                  navigator.share({ title, url }).catch(() => {
                    // ignored
                  });
                  return;
                }

                // Fallback: open Twitter share intent in a new window
                const twitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  title,
                )}&url=${encodeURIComponent(url)}`;
                const win = window.open(twitter, '_blank', 'noopener,noreferrer');
                if (!win) {
                  // If popup blocked, copy to clipboard as last resort
                  if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(url).then(() => {
                      // best-effort user feedback: small alert
                      // keep minimal to avoid adding UI deps
                      alert('Link copied to clipboard');
                    });
                  }
                }
              } catch (err) {
                // Silent fail to avoid breaking the UI; best-effort copy
                try {
                  const origin = window.location?.origin || '';
                  const url = `${origin}/blog/${post.slug}`;
                  if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(url);
                  }
                } catch (_e) {
                  // give up
                }
              }
            }, [post.slug, post.title])}
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
