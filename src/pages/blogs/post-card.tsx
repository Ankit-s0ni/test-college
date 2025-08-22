// "use client";

// import Link from "next/link";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { ArrowRight, Share2 } from "lucide-react";
// import type { BlogPost } from "@/types/blog";

// function MetaPill({ text }: { text: string }) {
//   return (
//     <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[11px] leading-none text-muted-foreground">
//       {text}
//     </span>
//   );
// }

// export default function PostCard({ post }: { post: BlogPost }) {
//   return (
//     <Card className="overflow-hidden shadow-sm hover:shadow-md transition">
//       <CardContent className="p-3">
//         <div className="flex gap-3">
//           {/* Left text */}
//           <div className="min-w-0 flex-1">
//             <div className="flex items-center justify-between gap-2">
//               <Badge variant="secondary" className="rounded-full whitespace-nowrap">
//                 {post.tag.label}
//               </Badge>
//               <button
//                 aria-label="Share"
//                 className="text-muted-foreground hover:text-foreground"
//                 type="button"
//               >
//                 <Share2 className="h-4 w-4" />
//               </button>
//             </div>

//             <Link href={`/blog/${post.slug}`} className="mt-2 block">
//               <h3 className="font-semibold text-[15px] leading-snug line-clamp-2">
//                 {post.title}
//               </h3>
//             </Link>

//             <div className="mt-2 hidden sm:block text-xs text-muted-foreground line-clamp-3">
//               {post.excerpt}
//             </div>

//             {/* tiny meta/badges row */}
//             {post.badges && post.badges.length > 0 && (
//               <div className="mt-2 flex flex-wrap gap-1">
//                 {post.badges.map((b, i) => (
//                   <MetaPill key={i} text={b} />
//                 ))}
//               </div>
//             )}

//             <div className="mt-3 flex items-center text-xs text-muted-foreground">
//               <Link
//                 href={`/blog/${post.slug}`}
//                 className="inline-flex items-center text-primary hover:underline underline-offset-4"
//               >
//                 Read More <ArrowRight className="ml-1 h-3.5 w-3.5" />
//               </Link>
//               <span className="ml-2">·</span>
//               <span className="ml-2">
//                 {new Date(post.publishedAt).toLocaleDateString("en-IN", {
//                   day: "2-digit",
//                   month: "short",
//                   year: "numeric",
//                 })}
//               </span>
//             </div>
//           </div>

//           {/* Right cover placeholder */}
//           <div className="relative w-28 sm:w-32 md:w-36 shrink-0">
//             <div className="h-full w-full rounded-lg border bg-gradient-to-br from-indigo-50 via-white to-indigo-100" />
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

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
        {/* left gradient label area */}

        {/* curved orange stripe between gradient & image */}
        {/* <div
          className="
            pointer-events-none absolute inset-y-0
            left-[60%] w-14
          "
        >
          <div className="absolute inset-y-0 -left-7 w-28
            bg-[conic-gradient(at_60%_50%,#fb923c_0_30%,#f59e0b_30%_48%,transparent_48%_100%)]
          " />
        </div> */}

        {/* right image */}
        <div className="absolute inset-y-0 right-0 w-full rounded-tr-xl overflow-hidden">
          <Image
            src={post.cover || '/assets/images/blog-post.png'}
            alt={post.title}
            // fill
            // sizes="(max-width: 640px) 100vw, 420px"
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
