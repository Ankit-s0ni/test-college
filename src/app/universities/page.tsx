import { universitiesAPI } from '@/lib/api';
import { transformUniversitiesData } from '@/lib/transformers';
import FooterSection from '@/components/home/footer-section';
import FiltersBar from '@/components/university/filters-bar';
import UniversityCard from '@/components/university/university-card';
import { UniversityListItem } from '@/types/university';
import Image from 'next/image';
import React from 'react';

const UNIVERSITY_BANNER =
  'https://images.unsplash.com/photo-1545048702-79362596cdc9?q=80&w=1400&auto=format&fit=crop';

async function getUniversities(): Promise<UniversityListItem[]> {
  try {
    const response = await universitiesAPI.getAll();
    return transformUniversitiesData(response.data);
  } catch (error) {
    console.error('Failed to fetch universities:', error);
    return [];
  }
}

const UniversitiesListingPage = async () => {
  const universities = await getUniversities();

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
        <section className="mx-auto mt-8 max-w-6xl px-4 mb-16">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Universities ({universities.length})
            </h2>
            {/* debug status removed */}
          </div>
          
          {universities.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No universities found.</p>
            </div>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {universities.map((university) => (
                <li key={university.slug}>
                  <UniversityCard university={university} />
                </li>
              ))}
            </ul>
          )}
        </section>

        
      </main>
      <FooterSection />
    </>
  );
};

export default UniversitiesListingPage;
