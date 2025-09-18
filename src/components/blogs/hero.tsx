// "use client";

// import { Button } from "@/components/ui/button";
// import { GraduationCap, PhoneCall } from "lucide-react";

// export default function BlogHero() {
//   return (
//     <section className="relative overflow-hidden border-b">
//       <div className="absolute inset-0 -z-10 bg-[radial-gradient(80rem_80rem_at_110%_-10%,theme(colors.indigo.100/.6),transparent_60%)]" />
//       <div className="container max-w-7xl mx-auto px-4 py-10 md:py-14">
//         <div className="grid md:grid-cols-2 gap-10 items-center">
//           <div>
//             <div className="text-sm text-muted-foreground mb-2">Blogs</div>
//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
//               Explore latest career opportunities, <br className="hidden sm:block" />
//               Stay updated for online education, <br className="hidden sm:block" />
//               online universities, &amp; more
//             </h1>

//             <div className="mt-6 flex flex-wrap items-center gap-3">
//               <Button className="rounded-full">
//                 <PhoneCall className="mr-2 h-4 w-4" />
//                 Talk to Our Expert
//               </Button>
//               <Button variant="outline" className="rounded-full">
//                 Schedule 1:1 Call
//               </Button>
//             </div>
//           </div>

//           {/* Right illustration block (pure CSS, no image needed) */}
//           <div className="relative">
//             <div className="relative w-full aspect-[4/3] md:aspect-[5/4]">
//               <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-100 via-white to-indigo-50 border" />
//               <div className="absolute -right-2 -top-2 w-24 h-24 rounded-full bg-indigo-200/60 blur-xl" />
//               <div className="absolute right-3 top-3 size-14 rounded-full bg-indigo-500/10 grid place-items-center">
//                 <GraduationCap className="h-7 w-7 text-indigo-600" />
//               </div>
//               <div className="absolute inset-6 rounded-2xl border border-dashed border-indigo-200" />
//               <div className="absolute bottom-2 right-4 text-xs text-muted-foreground">
//                 collegecosmos.com
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import StudentLeadModal from '@/components/student-lead-modal';

export default function BlogHero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* LEFT ORANGE ARCS */}
      <Image
        src="/assets/images/blog-hero-left.png"
        alt=""
        width={300}
        height={640}
        priority
        className="pointer-events-none select-none absolute left-0 top-0 h-full w-auto"
      />

      <div className="container max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid md:grid-cols-[700px_1fr] gap-8 lg:gap-12 items-center py-10 md:py-16">
          {/* TEXT */}
          <div className="relative z-10">
            <a
              href="#"
              className="text-base font-normal text-[#1d4ed8] hover:underline underline-offset-4"
            >
              Collegecosmos.com
            </a>

            <div className="text-[13px] text-muted-foreground mt-1">Blogs</div>

            <h1 className="mt-2 text-[26px] leading-[1.2] sm:text-[30px] md:text-[36px] lg:text-[40px] font-semibold tracking-tight text-[#1d4ed8]">
              Explore latest career opportunities,
              <br className="hidden sm:block" />
              Stay updated for online education,
              <br className="hidden sm:block" />
              online universities, &amp; more
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <StudentLeadModal
                universityName="College Cosmos"
                triggerContent={
                  <>
                    Talk To Our Expert
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </>
                }
                modalTitle="Talk To Our Expert"
                triggerClassName="h-9 rounded-md px-4 text-[13px] font-medium bg-[#0247D2] hover:bg-blue-700 text-white"
              />
              <StudentLeadModal
                universityName="College Cosmos"
                triggerContent={
                  <>
                    Talk to our expert
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </>
                }
                modalTitle="Talk to our expert"
                triggerClassName="h-9 rounded-md px-4 text-[13px] font-medium border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50"
              />
            </div>
          </div>

          {/* ILLUSTRATION */}
          <div className="relative h-[240px] sm:h-[300px] md:h-[340px] lg:h-[380px]">
            {/* dotted blue halo background */}
            <Image
              src="/assets/images/blog-hero-back.png"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 320px, 520px"
              className="object-contain object-right"
            />

            {/* main graduate image */}
            <Image
              src="/assets/images/blog-hero.png"
              alt="Graduate"
              width={420}
              height={420}
              priority
              className="absolute right-2 sm:right-6 bottom-0 sm:bottom-2 lg:bottom-0 w-[210px] sm:w-[260px] md:w-[300px] lg:w-[330px] h-auto"
            />

            {/* small desk/base under books (subtle) */}
            <div className="absolute right-[18%] bottom-1 md:bottom-2 h-3 w-40 md:w-48 rounded-full bg-neutral-200/90 blur-[1px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
