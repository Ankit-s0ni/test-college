import Image from 'next/image';
import React from 'react';

const BlogDetailsHero = () => {
  return (
    <section className="bg-white">
      <div
        className="
          container mx-auto
          grid grid-cols-1 items-center gap-6 px-4 py-6
          md:grid-cols-[minmax(0,1fr)_minmax(460px,620px)] md:gap-10 md:py-10
        "
      >
        {/* LEFT: label + pill + subtitle */}
        <div className="order-2 md:order-1">
          {/* site label */}
          <div className="text-sm font-medium text-[#2B6CE5]">Collegecosmos.com</div>

          {/* blue pill main title */}
          <div className="mt-3 inline-block rounded-md bg-[#1465FF] px-4 py-2 shadow-sm">
            <span className="text-white text-lg sm:text-xl font-semibold">How Long is a PhD?</span>
          </div>

          {/* big subtitle */}
          <h1
            className="
              mt-3 font-semibold text-[#0F172A]
              text-[28px] leading-[1.2]
              sm:text-[34px] sm:leading-[1.2]
              md:text-[40px] md:leading-[1.15]
            "
          >
            Duration Breakdown for
            <br className="hidden sm:block" />
            India &amp; Abroad
          </h1>
        </div>

        {/* RIGHT: hero illustration */}
        <div className="order-1 md:order-2">
          <div className="relative mx-auto w-full overflow-hidden rounded-2xl">
            {/* image placed in /public/assets/images/blog-details-hero.png */}
            <Image
              src="/assets/images/blog-details-hero.png"
              alt="How Long is a PhD? — hero"
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
