"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

const items: Testimonial[] = [
  {
    quote:
      "College Cosmos helped me shortlist colleges with transparent reviews — I felt confident applying and finally chose a program that matches my goals.",
    name: "Ankita Sharma",
    role: "BBA - Graduated 2023",
    avatar: "/assets/images/amity.png",
  },
  {
    quote:
      "The reviews and placement information were the deciding factor — I could compare colleges and make an informed choice quickly.",
    name: "Rohit Verma",
    role: "MCA - Current Student",
    avatar: "/assets/images/lpu.png",
  },
  {
    quote:
      "I used the placement and faculty details to shortlist a research-friendly college — College Cosmos made the search painless.",
    name: "Pooja Rao",
    role: "M.Tech - Alumni",
    avatar: "/assets/images/manipal-logo.jpg",
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isPausedRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate the items so the scroll can loop seamlessly
  const displayItems = [...items, ...items];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const el = containerRef.current;
    if (!el) return;

    const speed = 40; // pixels per second
    const startRef = { current: performance.now() } as { current: number };
    let pausedOffset: number | null = null;

    // Start position
    el.scrollLeft = 0;

    const resizeObserver = new ResizeObserver(() => {
      if (el.scrollWidth) el.scrollLeft = el.scrollLeft % (el.scrollWidth / 2);
    });
    resizeObserver.observe(el);

    let rafId: number | null = null;

    function step(now: number) {
      if (!el) return;
      const half = el.scrollWidth / 2 || 1;

      if (isPausedRef.current) {
        if (pausedOffset === null) pausedOffset = el.scrollLeft;
        el.scrollLeft = pausedOffset;
      } else {
        if (pausedOffset !== null) {
          // resume from paused offset
          startRef.current = now - (pausedOffset / speed) * 1000;
          pausedOffset = null;
        }

        const elapsed = now - startRef.current;
        const distance = (elapsed / 1000) * speed;
        el.scrollLeft = distance % half;
      }

      rafId = requestAnimationFrame(step);
    }

    rafId = requestAnimationFrame(step);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div>
      <div
        ref={containerRef}
        className="overflow-hidden w-full"
        onMouseEnter={() => {
          setIsPaused(true);
          isPausedRef.current = true;
        }}
        onMouseLeave={() => {
          setIsPaused(false);
          isPausedRef.current = false;
        }}
        onFocus={() => {
          setIsPaused(true);
          isPausedRef.current = true;
        }}
        onBlur={() => {
          setIsPaused(false);
          isPausedRef.current = false;
        }}
      >
        <div className="flex gap-6 py-6">
          {displayItems.map((t, idx) => (
            <article
              key={`${t.name}-${idx}`}
              className="inline-block w-[320px] min-w-[320px] p-6 border rounded-lg bg-white relative border-b-4 border-b-blue-500"
              tabIndex={0}
              aria-label={`Testimonial by ${t.name}`}
            >
              <div>
                <p className="text-gray-700 italic break-words leading-relaxed whitespace-normal">“{t.quote}”</p>
              </div>

              <div className="mt-4 flex items-center">
                <Image src={t.avatar} alt={t.name} width={48} height={48} className="rounded-full object-cover" />
                <div className="ml-3">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </div>

              {/* blue bottom border handled by Tailwind border-b classes for consistent display */}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
