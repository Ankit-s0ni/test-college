'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

type T = {
  name: string;
  date: string;
  initial: string;
  color: string; // e.g. 'bg-red-500'
  text: string;
  rating?: number;
};

const TESTIMONIALS: T[] = [
  {
    name: 'Raghav Singh',
    date: 'July 27, 2023',
    initial: 'R',
    color: 'bg-orange-500',
    text:
      "The level of customer support we received from Slate was exceptional. Their team was responsive, knowledgeable and went above.",
  },
  {
    name: 'Sumit Kumar',
    date: 'July 27, 2023',
    initial: 'S',
    color: 'bg-red-500',
    text:
      "The level of customer support we received from Slate was exceptional. Their team was responsive, knowledgeable and went above.",
  },
  {
    name: 'Shweta Shrivastav',
    date: 'July 27, 2023',
    initial: 'S',
    color: 'bg-violet-600',
    text:
      "The level of customer support we received from Slate was exceptional. Their team was responsive, knowledgeable and went above.",
  },
  {
    name: 'Ramandeep Singh',
    date: 'July 27, 2023',
    initial: 'R',
    color: 'bg-orange-500',
    text:
      "The level of customer support we received from Slate was exceptional. Their team was responsive, knowledgeable and went above.",
  },
  // add more to test scrolling
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      {/* pastel background */}
      <div className="absolute inset-0 -z-10 bg-[#F5EEFF]" />
      {/* top-left wave */}
      <svg
        className="pointer-events-none absolute -top-24 -left-40 w-[1200px] h-[420px] -z-10 text-[#E8DBFF]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          d="M0,192L80,192C160,192,320,192,480,170.7C640,149,800,107,960,106.7C1120,107,1280,149,1360,170.7L1440,192L1440,0L0,0Z"
          fill="currentColor"
        />
      </svg>
      {/* bottom-right wave */}
      <svg
        className="pointer-events-none absolute -bottom-40 -right-64 w-[1500px] h-[520px] -z-10 text-[#E0CFFF]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          d="M0,288L120,282.7C240,277,480,267,720,229.3C960,192,1200,128,1320,96L1440,64V320H0Z"
          fill="currentColor"
        />
      </svg>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl font-bold mb-2">Testimonial</h2>
          <p className="text-muted-foreground">
            Hear it from the people for yourself
          </p>
        </div>

        {/* horizontal scroll like the mock */}
        <ScrollArea className="w-full">
          <div className="flex gap-6 pb-4 snap-x snap-mandatory">
            {TESTIMONIALS.map((t, idx) => (
              <Card
                key={idx}
                className="snap-start w-[85%] xs:w-[360px] sm:w-[420px] lg:w-[360px] rounded-2xl border border-border/80 bg-card/90 backdrop-blur"
              >
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`h-10 w-10 ${t.color} rounded-full text-gray-300 ring-1 border font-semibold grid place-items-center`}
                    >
                      {t.initial}
                    </div>
                    <div>
                      <p className="font-semibold leading-tight">{t.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {t.date}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-6">
                    “{t.text}”
                  </p>

                  <div className="mt-auto flex gap-1 text-yellow-400">
                    {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
                      <span key={i} aria-hidden>
                        ★
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
}