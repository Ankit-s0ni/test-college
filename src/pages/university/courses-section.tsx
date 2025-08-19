import { CoursesHero } from '@/app/universities/[slug]/page';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import ManipalLogoImg from "../../../public/assets/images/manipal-logo.jpg"
import { Download } from 'lucide-react';


const CoursesSection = ({ items }: { items: CoursesHero[] }) => {
   return (
    <section id="courses" className="space-y-4 bg-transparent p-6 rounded-lg">
      <h2 className="text-xl font-semibold">Courses</h2>

      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-4">
          {items.map((c, i) => (
            <div
              key={i}
              className="w-[300px] sm:w-[360px] flex-shrink-0 overflow-hidden bg-white shadow-sm"
            >
              <div className="relative h-40">
                <Image
                  src={c.image}
                  alt="course"
                  fill
                  className="object-cover"
                />
                {/* University logo overlay */}
                <div className="absolute top-2 left-2 bg-white/80 px-2 py-1">
                  <Image
                    src={ManipalLogoImg}
                    alt="logo"
                    className="h-6 w-auto"
                    width={24}
                    height={24}
                  />
                </div>
              </div>

              <div className="p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">Manipal Online University</h3>
                  <span className="text-sm font-medium">4/5 ⭐</span>
                </div>

                <p className="text-xs text-muted-foreground">
                  AICTE, NAAC, NBA, QS, UGC
                </p>

                <Link
                    href={c.prospectusLink}
                    className="mt-2 inline-flex items-center gap-1 rounded-none bg-[#E8F8EF] text-[#17733B] text-xs px-3 py-1"
                >
                    <Download className="h-3 w-3" />
                    Download Prospectus
                </Link>
              </div>

              <Button
                size="lg"
                className="w-full rounded-none bg-[#004AFF] hover:bg-[#003cd6]"
                asChild
              >
                <Link href={c.detailsLink}>View Details</Link>
              </Button>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}

export default CoursesSection