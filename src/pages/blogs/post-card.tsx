'use client';

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
    <Card className="overflow-hidden rounded-xl shadow-sm border p-0 gap-4">
      {/* HEADER (matches the reference) */}
      <div className="relative h-[218px] w-full">
        {/* right image */}
        <div className="absolute inset-y-0 right-0 w-full rounded-tr-xl overflow-hidden">
          <Image
            src={post.cover || '/assets/images/blog-post.png'}
            alt={post.title}
            width={366}
            height={218}
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* BODY */}
      <CardContent className="relative p-4 sm:p-5 pt-0 sm:pt-0">
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
            className="text-[#1d4ed8] font-medium underline underline-offset-4"
          >
            Read More
          </Link>

          <button type="button" aria-label="Share" className="text-slate-600 hover:text-slate-900">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
