'use client';

import { universitiesAPI } from '@/lib/api';
import { transformUniversitiesData } from '@/lib/transformers';
import FooterSection from '@/components/home/footer-section';
import FiltersBar from '@/components/university/filters-bar';
import UniversityCard from '@/components/university/university-card';
import { UniversityListItem } from '@/types/university';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const UNIVERSITY_BANNER =
  'https://images.unsplash.com/photo-1545048702-79362596cdc9?q=80&w=1400&auto=format&fit=crop';

const UniversitiesListingPage = () => {
  const [universities, setUniversities] = useState<UniversityListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUniversities() {
      try {
        console.log('Starting API call to fetch universities...');
        setLoading(true);
        const response = await universitiesAPI.getAll();
        console.log('Raw API Response:', response);
        
        const transformedData = transformUniversitiesData(response.data);
        console.log('Transformed data:', transformedData);
        
        setUniversities(transformedData);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch universities:', error);
        setError('Failed to load universities. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchUniversities();
  }, []);

  if (loading) {
    return (
      <>
        <main>
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

          <div className="mt-6">
            <FiltersBar />
          </div>

          <section className="mx-auto mt-8 max-w-6xl px-4 mb-16">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading universities...</p>
            </div>
          </section>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <main>
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

          <div className="mt-6">
            <FiltersBar />
          </div>

          <section className="mx-auto mt-8 max-w-6xl px-4 mb-16">
            <div className="text-center py-12">
              <div className="text-red-600 text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Universities</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <main>
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

        <div className="mt-6">
          <FiltersBar />
        </div>

        <section className="mx-auto mt-8 max-w-6xl px-4 mb-16">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Universities ({universities.length})
            </h2>
            <p className="text-gray-600">
              Data fetched from API: {universities.length > 0 ? '✅ Success' : '❌ No data'}
            </p>
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
