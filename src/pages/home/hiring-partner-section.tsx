import { HiringPartners } from '@/app/universities/[slug]/page';
import React from 'react'

const getPartnerNameFromSrc = (src: string) =>
  src.split('/').pop()?.split('.')[0] ?? '';

const HiringPartnerSection = ({ data }: { data: HiringPartners }) => {
  return (
    <section id="partners" className="space-y-4 p-6 rounded-lg">
      <h2 className="text-xl font-semibold">{data.title}</h2>
      <p className="text-sm text-muted-foreground">{data.description}</p>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {data.images.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-32 rounded-md bg-white border border-border overflow-hidden text-center"
          >
            <div className="h-16 flex items-center justify-center">
              <img src={src} alt="partner" className="max-h-12 object-contain" />
            </div>
            <div className="bg-[#004AFF] text-white text-xs py-1">
              {/** Replace with actual company name if available */}
              {getPartnerNameFromSrc(src)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HiringPartnerSection