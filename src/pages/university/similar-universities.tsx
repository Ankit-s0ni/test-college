'use client';

import { Section13 } from '@/app/universities/[slug]/page';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ManipalLogoImg from '../../../public/assets/images/manipal-logo.jpg';

const SimilarUniversities = ({ data }: { data: Section13 }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  const getStep = () => {
    const el = scrollRef.current;
    if (!el) return 300;
    // Scroll one “page” on mobile; near a full viewport on larger screens
    return Math.max(240, Math.floor(el.clientWidth * 0.95));
  };

  const updateArrows = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 0);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 1);
  }, []);

  const scrollBy = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -getStep() : getStep(), behavior: 'smooth' });
  };

  React.useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => updateArrows();
    const onResize = () => updateArrows();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    const id = window.setTimeout(updateArrows, 120);

    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.clearTimeout(id);
    };
  }, [updateArrows]);

  return (
    <section id="similar-universities" className="space-y-4 p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold">{data?.title}</h2>
      <p className="text-sm text-muted-foreground">{data?.description}</p>

      <div className="relative">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-6 sm:w-8 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-6 sm:w-8 bg-gradient-to-l from-background to-transparent" />

        {/* arrows (show from sm+) */}
        <button
          type="button"
          aria-label="Scroll left"
          className={`hidden sm:flex absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 transition-opacity ${
            canPrev ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => scrollBy('left')}
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        {/* scroller */}
        <div
          ref={scrollRef}
          className="
            w-full max-w-[248px] sm:max-w-full flex overflow-x-auto scroll-smooth
            gap-0 sm:gap-4 pb-2
            snap-x snap-mandatory
            [-ms-overflow-style:none] [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') scrollBy('left');
            if (e.key === 'ArrowRight') scrollBy('right');
          }}
        >
          {data.data.map((it, i) => (
            <div
              key={i}
              className="
                snap-center
                flex-none basis-full sm:basis-[280px] md:basis-[300px]
                overflow-hidden bg-white shadow-sm rounded-md border
              "
            >
              <div className="relative h-40">
                <Image src={it.image} alt={it.name} fill className="object-cover" />
                <div className="absolute top-2 left-2 bg-white/80 px-2 py-1 rounded-md">
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
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-sm truncate">{it.name}</p>
                  <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                    {it.rating}/5 ⭐
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">{it.affiliation}</p>

                <Link
                  href={it.prospectusLink}
                  className="inline-flex items-center gap-1 rounded-full bg-[#E8F8EF] text-[#17733B] text-[11px] sm:text-xs px-3 py-1 mt-2"
                >
                  <Download className="h-3 w-3" />
                  Download Prospectus
                </Link>
              </div>

              <Button
                asChild
                size="sm"
                className="w-full rounded-none bg-[#004AFF] hover:bg-[#003cd6]"
              >
                <Link href={it.viewDetailsLink}>View Details</Link>
              </Button>
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Scroll right"
          className={`hidden sm:flex absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 transition-opacity ${
            canNext ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => scrollBy('right')}
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
};

export default SimilarUniversities;
