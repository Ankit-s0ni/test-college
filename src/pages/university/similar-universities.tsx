import { Section13 } from '@/app/universities/[slug]/page'
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import ManipalLogoImg from "../../../public/assets/images/manipal-logo.jpg"


const SimilarUniversities = ({ data }: { data: Section13 }) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += offset;
    }
  };
  return (
    <section id="similar-universities" className="space-y-4  p-6">
      <h2 className="text-xl font-semibold">{data.title}</h2>
      <p className="text-sm text-muted-foreground">{data.description}</p>

      <div className="relative">
        {/* left arrow */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-1"
          onClick={() => scroll(-300)}
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2"
        >
          {data.data.map((it, i) => (
            <div
              key={i}
              className="w-[300px] flex-shrink-0 overflow-hidden bg-white shadow-sm"
            >
              <div className="relative h-40">
                <Image src={it.image} alt={it.name} fill className="object-cover"  />
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
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm">{it.name}</p>
                  <span className="text-sm font-medium">
                    {it.rating}/5 ⭐
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{it.affiliation}</p>

                <Link
                  href={it.prospectusLink}
                  className="inline-flex items-center gap-1 rounded-full bg-[#E8F8EF] text-[#17733B] text-xs px-3 py-1 mt-2"
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

        {/* right arrow */}
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-1"
          onClick={() => scroll(300)}
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

export default SimilarUniversities