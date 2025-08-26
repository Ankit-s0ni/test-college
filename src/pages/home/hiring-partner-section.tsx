import { HiringPartners } from '@/app/universities/[slug]/page';
import React from 'react';

const getPartnerNameFromSrc = (src: string) =>
  src.split('/').pop()?.split('.')[0]?.replace(/[-_]/g, ' ') ?? '';

const Card = ({ src }: { src: string }) => {
  const name = getPartnerNameFromSrc(src);
  return (
    <div className="w-full rounded-md bg-white border border-border overflow-hidden text-center">
      <div className="h-16 sm:h-20 flex items-center justify-center p-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`${name || 'partner'} logo`}
          title={name}
          loading="lazy"
          className="max-h-12 sm:max-h-14 max-w-[80%] object-contain"
        />
      </div>
      <div className="bg-[#004AFF] text-white text-[11px] sm:text-xs py-1 px-2 truncate">
        {name}
      </div>
    </div>
  );
};

const HiringPartnerSection = ({ data }: { data: HiringPartners }) => {
  return (
    <section id="partners" className="space-y-4 p-4 sm:p-6 rounded-lg col-span-full w-full">
      <h2 className="text-lg sm:text-xl font-semibold">{data.title}</h2>
      <p className="text-sm text-muted-foreground">{data.description}</p>

      {/* Mobile: one full-width card per swipe */}
      <div className="sm:hidden -mx-4 px-4">
        <div
          className="
            flex max-w-[248px] sm:max-w-full overflow-x-auto scroll-smooth gap-3 pb-2
            snap-x snap-mandatory
            [-ms-overflow-style:none] [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {data.images.map((src, i) => (
            <div key={i} className="flex-none basis-full snap-center">
              <Card src={src} />
            </div>
          ))}
        </div>
      </div>

      {/* ≥sm: grid */}
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {data.images.map((src, i) => (
          <Card key={i} src={src} />
        ))}
      </div>
    </section>
  );
};

export default HiringPartnerSection;
