import Image from 'next/image';
import React from 'react';

type BlogDetailsHeroProps = {
  title?: string;
  excerpt?: string;
  coverImage?: string;
};

const BlogDetailsHero = ({ title, excerpt, coverImage }: BlogDetailsHeroProps) => {
  // Fallback to default values if not provided
  const displayTitle = title || 'How Long is a PhD?';
  const displaySubtitle = excerpt || 'Duration Breakdown for India & Abroad';
  const displayImage = coverImage || '/assets/images/blog-details-hero.png';

  return (
    <section className="bg-white">
      <div
        className="
          container mx-auto
          grid grid-cols-1 items-center gap-6 px-4 py-6
          md:grid-cols-[minmax(0,1fr)_minmax(460px,620px)] md:gap-10 md:py-10
        "
      >
        {/* LEFT: label + pill only */}
        <div className="order-2 md:order-1">
          {/* site label */}
          <div className="text-sm font-medium text-[#2B6CE5]">Collegecosmos.com</div>

          {/* blue pill main title */}
          <div className="mt-3 inline-block rounded-md bg-[#1465FF] px-4 py-2 shadow-sm">
            <span className="text-white text-lg sm:text-xl font-semibold">{displayTitle}</span>
          </div>
        </div>

        {/* RIGHT: hero illustration */}
        <div className="order-1 md:order-2">
          <div className="relative mx-auto w-full overflow-hidden rounded-2xl">
            <Image
              src={displayImage}
              alt={`${displayTitle} — hero`}
              width={1027}
              height={313}
              priority
              className="w-full h-auto object-contain"
              sizes="(min-width: 1024px) 620px, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsHero;
