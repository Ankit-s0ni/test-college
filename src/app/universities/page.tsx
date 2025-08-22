import { UNIVERSITIES } from '@/app/universities/list';
import ContactsSection from '@/pages/home/contact-section';
import FooterSection from '@/pages/home/footer-section';
import FiltersBar from '@/pages/university/filters-bar';
import UniversityCard from '@/pages/university/university-card';
import Image from 'next/image';
import React from 'react';

const UNIVERSITY_BANNER =
  'https://images.unsplash.com/photo-1545048702-79362596cdc9?q=80&w=1400&auto=format&fit=crop';

const UniversitiesListingPage = () => {
  return (
    <>
      <main>
        {/* Banner */}
        <section className="w-full">
          <div className="relative h-[220px] sm:h-[280px] md:h-[340px] lg:h-[400px]">
            <Image
              src={UNIVERSITY_BANNER}
              alt="university banner"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
        </section>

        {/* Filters */}
        <div className="mt-6">
          <FiltersBar />
        </div>

        {/* Cards grid */}
        <section className="mx-auto mt-8 max-w-6xl px-4  mb-16">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {UNIVERSITIES.map((university) => (
              <li key={university.slug}>
                <UniversityCard university={university} />
              </li>
            ))}
          </ul>
        </section>

        <ContactsSection />
      </main>
      <FooterSection />
    </>
  );
};

export default UniversitiesListingPage;
