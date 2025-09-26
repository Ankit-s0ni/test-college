import { HiringPartners } from '@/app/universities/[slug]/page';
import React from 'react';

const getPartnerNameFromSrc = (src: string) =>
  src.split('/').pop()?.split('.')[0]?.replace(/[-_]/g, ' ') ?? '';

const Card = ({ src, name }: { src?: string; name?: string }) => {
  const computed = src ? getPartnerNameFromSrc(src) : (name || 'partner');
  return (
    <div className="w-full rounded-md bg-white border border-border overflow-hidden text-center">
      <div className="h-16 sm:h-20 flex items-center justify-center p-2">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={`${computed || 'partner'} logo`}
            title={computed}
            loading="lazy"
            className="max-h-12 sm:max-h-14 max-w-[80%] object-contain"
          />
        ) : (
          <div className="text-sm text-muted-foreground">{computed}</div>
        )}
      </div>
      <div className="bg-[#004AFF] text-white text-[11px] sm:text-xs py-1 px-2 truncate">
        {computed}
      </div>
    </div>
  );
};

const HiringPartnerSection = ({ data }: { data: HiringPartners }) => {
  const itemsCount = Math.max(data.images?.length || 0, data.names?.length || 0);
  const items = Array.from({ length: itemsCount }, (_, i) => ({
    src: data.images?.[i],
    name: data.names?.[i],
  }));

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
          {items.length > 0 ? (
            items.map((it, i) => (
              <div key={i} className="flex-none basis-full snap-center">
                <Card src={it.src} name={it.name} />
              </div>
            ))
          ) : (
            <div className="text-sm text-muted-foreground">No hiring partners listed.</div>
          )}
        </div>
      </div>

      {/* ≥sm: grid */}
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {items.length > 0 ? (
          items.map((it, i) => <Card key={i} src={it.src} name={it.name} />)
        ) : (
          <div className="text-sm text-muted-foreground">No hiring partners listed.</div>
        )}
      </div>
    </section>
  );
};

export default HiringPartnerSection;
