'use client';

import * as React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Image from 'next/image';

type University = {
  college_img: string;
  college_logo: string;
  college_name: string;
  college_link: string; // slug used in URL
};

export const UNIVERSITIES: University[] = [
  {
    college_img:
      'https://images.unsplash.com/photo-1545048702-79362596cdc9?q=80&w=1400&auto=format&fit=crop',
    college_logo:
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=200&auto=format&fit=crop',
    college_name: 'Amity University',
    college_link: 'amity-university-online',
  },
  {
    college_img:
      'https://images.unsplash.com/photo-1545048702-79362596cdc9?q=80&w=1400&auto=format&fit=crop',
    college_logo:
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=200&auto=format&fit=crop',
    college_name: 'DPU University',
    college_link: 'dpu-university-online',
  },
  {
    college_img:
      'https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1400&auto=format&fit=crop',
    college_logo:
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=200&auto=format&fit=crop',
    college_name: 'Lovely University',
    college_link: 'lovely-university-online',
  },
  {
    college_img:
      'https://images.unsplash.com/photo-1545048702-79362596cdc9?q=80&w=1400&auto=format&fit=crop',
    college_logo:
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=200&auto=format&fit=crop',
    college_name: 'Sharda University',
    college_link: 'sharda-university-online',
  },
];

export default function UniversitiesSection() {
  return (
    <section id="universities" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Discover Leading Universities</h2>

        {/* Horizontal scroll row using ShadCN ScrollArea */}
        <ScrollArea className="w-full" aria-label="Leading universities">
          <div
            className="
              flex gap-6 pb-4
              snap-x snap-mandatory
              px-1
              "
          >
            {UNIVERSITIES.map((u) => (
              <Card
                key={u.college_link}
                className="
                px-6
                  snap-start
                  flex-shrink-0
                  w-[85%] sm:w-[60%] md:w-[45%] lg:w-[24%]
                  overflow-hidden
                "
              >
                <CardContent className="p-0">
                  <div className="relative h-44">
                    <Image
                      src={u.college_img}
                      alt={`${u.college_name} campus`}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                      width={320}
                      height={240}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/30 to-black/80" />

                    {/* Logo + name overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-white/95 ring-1 ring-black/5 overflow-hidden flex items-center justify-center">
                        <Image
                          src={u.college_logo}
                          alt={`${u.college_name} logo`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          width={64}
                          height={64}
                        />
                      </div>
                      <div className="text-white">
                        <p className="font-semibold leading-tight">{u.college_name}</p>
                        <p className="text-xs opacity-90 leading-tight">Online</p>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-4">
                  <Button size="sm" className="w-full" asChild>
                    <Link href={`/universities/${u.college_link}`}>Explore The Courses →</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
}
