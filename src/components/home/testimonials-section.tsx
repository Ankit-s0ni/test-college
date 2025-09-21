"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

type T = {
  name: string;
  date: string;
  initial: string;
  color: string; // e.g. 'bg-red-500'
  text: string;
  rating?: number;
};

// 12 genuine-looking reviews (replace or extend with real ones if available)
const TESTIMONIALS: T[] = [
  {
    name: 'Aisha Khan',
    date: 'Aug 3, 2025',
    initial: 'A',
    color: 'bg-orange-500',
    text: 'I found my top-choice college using this site — comparing courses and campus info made my decision so much easier.',
    rating: 5,
  },
  {
    name: 'Rohit Mehra',
    date: 'Jun 12, 2025',
    initial: 'R',
    color: 'bg-violet-600',
    text: 'Saved me hours of research. The filters helped me shortlist colleges for my preferred course quickly.',
    rating: 5,
  },
  {
    name: 'Sneha Patel',
    date: 'May 8, 2025',
    initial: 'S',
    color: 'bg-sky-500',
    text: 'Loved the comparison view — I could compare fees, placements and course structure side-by-side before applying.',
    rating: 5,
  },
  {
    name: 'Karan Singh',
    date: 'Apr 20, 2025',
    initial: 'K',
    color: 'bg-rose-500',
    text: 'The student reviews and campus photos helped me decide which colleges to visit. Very trustworthy platform.',
    rating: 5,
  },
  {
    name: 'Neha Verma',
    date: 'Mar 14, 2025',
    initial: 'N',
    color: 'bg-emerald-500',
    text: 'I discovered course alternatives I hadn\'t considered and applied to a better-fit program thanks to the site.',
    rating: 5,
  },
  {
    name: 'Amit Desai',
    date: 'Feb 28, 2025',
    initial: 'A',
    color: 'bg-indigo-500',
    text: 'Application deadlines, fees and entrance info were clearly shown — helped me submit on time.',
    rating: 5,
  },
  {
    name: 'Priya Rao',
    date: 'Jan 10, 2025',
    initial: 'P',
    color: 'bg-yellow-500',
    text: 'The saved-colleges feature let me compare shortlisted options and choose the best fit for my budget.',
    rating: 5,
  },
  {
    name: 'Vikram Joshi',
    date: 'Dec 5, 2024',
    initial: 'V',
    color: 'bg-fuchsia-500',
    text: 'Real student feedback and placement stats were the deciding factor for me — transparent and useful.',
    rating: 5,
  },
  {
    name: 'Nina Kapoor',
    date: 'Nov 2, 2024',
    initial: 'N',
    color: 'bg-pink-500',
    text: 'Easy to filter by location and course type. Found a nearby college with a program I loved.',
    rating: 5,
  },
  {
    name: 'Omar Shaikh',
    date: 'Oct 18, 2024',
    initial: 'O',
    color: 'bg-amber-500',
    text: 'The comparison tools helped me pick between engineering specializations — very detailed listings.',
    rating: 5,
  },
  {
    name: 'Zara Ali',
    date: 'Sep 9, 2024',
    initial: 'Z',
    color: 'bg-lime-500',
    text: 'I scheduled campus visits after reading reviews here — the profiles were accurate and helpful.',
    rating: 5,
  },
  {
    name: 'Manish Gupta',
    date: 'Aug 1, 2024',
    initial: 'M',
    color: 'bg-cyan-500',
    text: 'Great resource for comparing colleges; it helped me find a college that matched my career goals.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  // responsive column count: 1 on mobile, 2 on tablet, 3 on desktop
  const [colCount, setColCount] = useState<number>(3);

  // refs to column containers so we can measure their scrollers and set CSS vars
  const colsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const updateCols = () => {
      const w = window.innerWidth;
      if (w >= 1024) setColCount(3);
      else if (w >= 768) setColCount(2);
      else setColCount(1);
    };
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, []);

  // distribute testimonials evenly into `colCount` columns (round-robin)
  const columns: T[][] = Array.from({ length: colCount }, () => []);
  TESTIMONIALS.forEach((t, i) => {
    columns[i % colCount].push(t);
  });

  const configs = columns.map((items, i) => ({
    items,
    // keep differing durations/directions for visual variety
    duration: 28 + (i % 3) * 2,
    direction: i % 2 === 0 ? 'up' : 'down',
  }));

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observers: ResizeObserver[] = [];
    const listeners: Array<() => void> = [];

    configs.forEach((cfg, i) => {
      const colEl = colsRef.current[i];
      if (!colEl) return;
      const scroller = colEl.querySelector('.scroller') as HTMLElement | null;
      if (!scroller) return;

      const compute = () => {
        // scroller.scrollHeight includes the duplicated list; we want to move by half
        const total = scroller.scrollHeight;
        const distance = total / 2 || 0;
        // choose a comfortable pixels-per-second speed so duration scales with content
        const speed = 30; // px per second
        const duration = Math.max(8, Math.round((distance / speed) * 10) / 10); // seconds

        // use unsigned distance (positive px). We'll animate translateY(-distance) for upward motion.
        scroller.style.setProperty('--scroll-distance', `${distance}px`);
        scroller.style.setProperty('--anim-duration', `${duration}s`);
      };

      // initial compute
      compute();

      // pause/resume helpers: pause scroller animation and all child float animations
      const pause = () => {
        scroller.style.animationPlayState = 'paused';
        scroller.querySelectorAll<HTMLElement>('[style]').forEach((el) => {
          // pause inline animations (float)
          el.style.animationPlayState = 'paused';
        });
      };
      const resume = () => {
        scroller.style.animationPlayState = 'running';
        scroller.querySelectorAll<HTMLElement>('[style]').forEach((el) => {
          el.style.animationPlayState = 'running';
        });
      };

      colEl.addEventListener('pointerenter', pause);
      colEl.addEventListener('pointerleave', resume);
      listeners.push(() => {
        colEl.removeEventListener('pointerenter', pause);
        colEl.removeEventListener('pointerleave', resume);
      });

      // respond to size changes (images, font scaling, window resize)
      const ro = new ResizeObserver(() => compute());
      ro.observe(scroller);
      observers.push(ro);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
      listeners.forEach((fn) => fn());
    };
    // re-run when configs change (colCount changes will regenerate configs)
  }, [configs.length]);

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
          <h2 className="text-3xl font-bold mb-2">Check What Students Think Of Us</h2>
          <div className="flex items-center justify-center gap-2">
            {/* small blue trusted feedback with icon */}
            <span className="text-sm text-blue-500 font-medium inline-flex items-center gap-2">
              <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M2 12C4 12 6 10 6 8C6 6 4 4 2 4C0 4 0 6 0 8C0 10 0 12 2 12ZM12 12C14 12 16 10 16 8C16 6 14 4 12 4C10 4 10 6 10 8C10 10 10 12 12 12Z" fill="#2B8AF6"/>
              </svg>
              Trusted feedback
            </span>
          </div>
          <p className="text-muted-foreground mt-2">Students share real experiences while using our site to discover colleges and courses (similar to College Duniya, Learning Routes).</p>
        </div>

        {/* responsive columns: 1 on small, 2 on tablet, 3 on desktop */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {configs.map((col, cidx) => (
              <div
                key={cidx}
                ref={(el) => { colsRef.current[cidx] = el; /* ensure ref array matches current columns */ }}
                className="col relative overflow-hidden rounded-2xl border border-border/80"
                aria-hidden={false}
              >
                {/* mobile-first heights: compact on phone, taller on tablet and desktop */}
                <div className="h-[360px] md:h-[420px] lg:h-[520px] p-6">
                  <div
                    className={`scroller flex flex-col gap-4`}
                    style={{
                      // use CSS var set at runtime; fallback to the original duration
                      animation: `scroll var(--anim-duration, ${col.duration}s) linear infinite`,
                      animationDirection: col.direction === 'down' ? 'reverse' : 'normal',
                    }}
                  >
                    {/* duplicated list for seamless looping; use animationDirection to reverse visual motion for 'down' columns */}
                    {(() => {
                      const renderItems = col.items;
                      return [...renderItems, ...renderItems].map((t, idx) => (
                      <Card
                        key={idx}
                        className="rounded-xl border border-border/70"
                        style={{
                          // subtle textured pattern and a gentle float per tile
                          backgroundImage:
                            'repeating-linear-gradient(135deg, rgba(0,0,0,0.03) 0 1px, rgba(255,255,255,0.01) 1px 6px)',
                          animation: `float ${6 + (idx % 4)}s ease-in-out infinite alternate`,
                          animationDelay: `${(idx % 4) * 0.18}s`,
                          willChange: 'transform',
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className={`${t.color} h-9 w-9 rounded-full grid place-items-center text-white font-semibold ring-1`}
                            >
                              {t.initial}
                            </div>
                            <div>
                              <p className="font-semibold leading-tight text-sm">{t.name}</p>
                              <p className="text-xs text-muted-foreground">{t.date}</p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">“{t.text}”</p>
                        </CardContent>
                      </Card>
                      ));
                    })()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        /* smoother scroll: use measured --scroll-distance and --anim-duration */
        /* single scroll animation: move upward by the measured distance (duplicate list ensures seamless loop) */
        @keyframes scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(calc(var(--scroll-distance, 0px) * -1)); }
        }

        .col { --gap: 1rem; }
        .scroller { display: flex; flex-direction: column; }

        /* pause only the hovered or focused column */
        .col:hover .scroller,
        .col:focus-within .scroller { animation-play-state: paused; }

        /* prefer reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .scroller { animation: none !important; }
        }

        /* make sure duplicated content doesn't wrap awkwardly */
        .scroller > :global(*) { flex-shrink: 0; }

        /* spacing tweaks */
        .scroller { gap: 1rem; padding-right: 4px; }

        /* subtle gradient overlay to soften loop seam (columns are transparent now) */
        .col::before,
        .col::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 48px;
          pointer-events: none;
        }
        .col::before { top: 0; background: linear-gradient(to bottom, rgba(245,238,255,0.95), rgba(245,238,255,0)); }
        .col::after { bottom: 0; background: linear-gradient(to top, rgba(245,238,255,0.95), rgba(245,238,255,0)); }

        /* subtle float for each card */
        @keyframes float {
          from { transform: translateY(0); }
          to { transform: translateY(-6px); }
        }

        /* ensure float doesn't affect the scroller translate stacking context */
        .scroller > :global(*) { transform: translateZ(0); }
      `}</style>
    </section>
  );
}
