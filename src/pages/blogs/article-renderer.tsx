// import { ArticleBlock } from '@/app/blog/blog-articles'
// import { Card, CardContent } from '@/components/ui/card';
// import Image from 'next/image';
// import React from 'react'

// const ArticleRenderer = ({ blocks }: { blocks: ArticleBlock[] }) => {
//    return (
//     <article className="prose prose-neutral dark:prose-invert max-w-none prose-p:leading-7 prose-img:rounded-xl prose-li:marker:text-muted-foreground">
//       {blocks.map((b, i) => {
//         switch (b.type) {
//           case "h2":
//             return (
//               <h2 key={i} className="scroll-mt-24">
//                 {b.text}
//               </h2>
//             );
//           case "h3":
//             return (
//               <h3 key={i} className="scroll-mt-24">
//                 {b.text}
//               </h3>
//             );
//           case "p":
//             return <p key={i}>{b.text}</p>;
//           case "ul":
//             return (
//               <ul key={i}>
//                 {b.items.map((it, idx) => (
//                   <li key={idx}>{it}</li>
//                 ))}
//               </ul>
//             );
//           case "image":
//             return (
//               <figure key={i} className="not-prose my-6">
//                 {/* Using a remote Unsplash-style URL so you don’t need local assets */}
//                 <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted">
//                   <Image src={b.src} alt={b.alt ?? ""} fill className="object-cover" />
//                 </div>
//                 {b.caption && (
//                   <figcaption className="mt-2 text-center text-sm text-muted-foreground">
//                     {b.caption}
//                   </figcaption>
//                 )}
//               </figure>
//             );
//           case "callout":
//             return (
//               <Card key={i} className="my-6 border-amber-300/50 bg-amber-50 dark:bg-amber-950/20">
//                 <CardContent className="p-4">
//                   <div className="text-sm leading-6">{b.text}</div>
//                 </CardContent>
//               </Card>
//             );
//           case "comparison":
//             return (
//               <div key={i} className="not-prose my-8">
//                 <h3 className="mb-4 text-xl font-semibold">{b.title}</h3>
//                 <div className="relative grid gap-4 rounded-2xl border p-4 sm:grid-cols-2">
//                   {/* left */}
//                   <div>
//                     <div className="mb-2 font-medium">India</div>
//                     <ul className="space-y-1 text-sm">
//                       {b.india.map((it, idx) => (
//                         <li key={idx} className="leading-6">• {it}</li>
//                       ))}
//                     </ul>
//                   </div>
//                   {/* right */}
//                   <div>
//                     <div className="mb-2 font-medium">International</div>
//                     <ul className="space-y-1 text-sm">
//                       {b.abroad.map((it, idx) => (
//                         <li key={idx} className="leading-6">• {it}</li>
//                       ))}
//                     </ul>
//                   </div>
//                   {/* VS pill */}
//                   <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
//                     <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow">
//                       VS
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           case "benefits":
//             return (
//               <div key={i} className="not-prose my-8">
//                 <h3 className="mb-4 text-xl font-semibold">Benefits</h3>
//                 <div className="grid gap-4 sm:grid-cols-2">
//                   <Card>
//                     <CardContent className="p-4">
//                       <div className="mb-2 font-medium">India</div>
//                       <ul className="space-y-1 text-sm">
//                         {b.india.map((it, idx) => (
//                           <li key={idx}>• {it}</li>
//                         ))}
//                       </ul>
//                     </CardContent>
//                   </Card>
//                   <Card>
//                     <CardContent className="p-4">
//                       <div className="mb-2 font-medium">Abroad</div>
//                       <ul className="space-y-1 text-sm">
//                         {b.abroad.map((it, idx) => (
//                           <li key={idx}>• {it}</li>
//                         ))}
//                       </ul>
//                     </CardContent>
//                   </Card>
//                 </div>
//               </div>
//             );
//           default:
//             return null;
//         }
//       })}
//     </article>
//   );
// }

// export default ArticleRenderer

import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';
import type { ArticleBlock } from '@/app/blog/blog-articles';

const ArticleRenderer = ({ blocks }: { blocks: ArticleBlock[] }) => {
  return (
    <article
      className="
        prose prose-sm sm:prose-base prose-neutral dark:prose-invert max-w-none
        prose-h2:mt-8 prose-h2:mb-2 prose-h2:text-lg sm:prose-h2:text-xl prose-h2:font-semibold
        prose-h3:mt-6 prose-h3:mb-2 prose-h3:text-base sm:prose-h3:text-lg prose-h3:font-semibold
        prose-p:leading-7
        prose-li:marker:text-muted-foreground
      "
    >
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'h2':
            return (
              <h2 key={i} className="scroll-mt-24 font-medium text-[32px] mb-5">
                {b.text}
              </h2>
            );

          case 'h3':
            return (
              <h3 key={i} className="scroll-mt-24 mb-5">
                {b.text}
              </h3>
            );

          case 'p':
            return (
              <p key={i} className="text-base font-normal mb-5">
                {b.text}
              </p>
            );

          case 'ul':
            return (
              <ul key={i} className="space-y-1 mb-5">
                {b.items.map((it, idx) => (
                  <li key={idx}>{it}</li>
                ))}
              </ul>
            );

          /* NEW: ordered list support to match 1–4, 1–5 etc. in the screenshot */
          case 'ol':
            return (
              <ol key={i} className="list-decimal pl-5 space-y-1 mb-5">
                {b.items.map((it, idx) => (
                  <li key={idx} className="text-base font-normal">
                    {it}
                  </li>
                ))}
              </ol>
            );

          case 'image':
            return (
              <figure key={i} className="not-prose my-4 sm:my-6 mb-5">
                <div className="relative w-full overflow-hidden rounded-xl bg-muted">
                  {/* keep 16:9 but use object-cover so it feels editorial */}
                  <div className="aspect-[16/9]">
                    <Image src={b.src} alt={b.alt ?? ''} fill className="object-cover rounded-xl" />
                  </div>
                </div>
                {b.caption && (
                  <figcaption className="mt-2 text-left text-[13px] text-muted-foreground">
                    {b.caption}
                  </figcaption>
                )}
              </figure>
            );

          case 'callout':
            return (
              <Card key={i} className="my-6 border-amber-300/50 bg-amber-50 dark:bg-amber-950/20">
                <CardContent className="p-4 sm:p-5">
                  <div className="text-sm leading-6">{b.text}</div>
                </CardContent>
              </Card>
            );

          /* refined comparison: banner optional + split columns with labels */
          case 'comparison':
            return (
              <div key={i} className="not-prose my-8">
                <h3 className="mb-3 text-lg font-semibold sm:text-xl">{b.title}</h3>

                {b.banner && (
                  <div className="relative mb-3 overflow-hidden rounded-xl">
                    <Image
                      src={b.banner.src}
                      alt={b.banner.alt ?? ''}
                      width={1200}
                      height={400}
                      className="h-auto w-full object-cover"
                      priority={false}
                    />
                    <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 sm:flex">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow">
                        VS
                      </div>
                    </div>
                  </div>
                )}

                {/* labels under banner like the reference */}
                <div className="mb-2 grid grid-cols-2 text-center text-sm font-medium text-muted-foreground">
                  <div>India</div>
                  <div>International</div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <ul className="space-y-1 text-sm sm:text-[15px]">
                      {b.india.map((it, idx) => (
                        <li key={idx}>• {it}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-1 text-sm sm:text-[15px]">
                      {b.abroad.map((it, idx) => (
                        <li key={idx}>• {it}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );

          case 'benefits':
            return (
              <div key={i} className="not-prose my-8">
                <h3 className="mb-3 text-lg font-semibold sm:text-xl">Benefits</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card>
                    <CardContent className="p-4">
                      <div className="mb-2 font-medium">India</div>
                      <ul className="space-y-1 text-sm sm:text-[15px]">
                        {b.india.map((it, idx) => (
                          <li key={idx}>• {it}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="mb-2 font-medium">Abroad</div>
                      <ul className="space-y-1 text-sm sm:text-[15px]">
                        {b.abroad.map((it, idx) => (
                          <li key={idx}>• {it}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );

          case 'faqs':
            return (
              <div key={i} className="my-8">
                <h2 className="mb-3 text-xl font-semibold sm:text-2xl">
                  {b.title ?? 'Frequently Asked Questions (FAQs)'}
                </h2>
                <ol className="list-decimal pl-5 space-y-4">
                  {b.items.map((it, idx) => (
                    <li key={idx}>
                      <p className="font-semibold">{it.q}</p>
                      <p className="mt-1">{it.a}</p>
                    </li>
                  ))}
                </ol>
              </div>
            );

          default:
            return null;
        }
      })}
    </article>
  );
};

export default ArticleRenderer;
