'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { universitiesAPI } from '@/lib/api';
import { SITE_BASE_URL } from '@/lib/config';
import { UniversityAPI } from '@/types/university';

// Fallback data for loading state or error
const FALLBACK_UNIVERSITIES = [
  {
    id: 1,
    name: 'Amity University',
    logo: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=200&auto=format&fit=crop',
    slug: 'amity-university-online',
  },
  {
    id: 2,
    name: 'Chandigarh University',
    logo: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=200&auto=format&fit=crop',
    slug: 'chandigarh-university-online',
  },
  {
    id: 3,
    name: 'DY Patil University',
    logo: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=200&auto=format&fit=crop',
    slug: 'dy-patil-university-online',
  },
  {
    id: 4,
    name: 'Online VGU',
    logo: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=200&auto=format&fit=crop',
    slug: 'online-vgu',
  },
  {
    id: 5,
    name: 'ICFAI University',
    logo: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=200&auto=format&fit=crop',
    slug: 'icfai-university',
  },
  {
    id: 6,
    name: 'Jain University',
    logo: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=200&auto=format&fit=crop',
    slug: 'jain-university',
  },
  {
    id: 7,
    name: 'Online Manipal',
    logo: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=200&auto=format&fit=crop',
    slug: 'online-manipal',
  },
  {
    id: 8,
    name: 'UPES University',
    logo: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=200&auto=format&fit=crop',
    slug: 'upes-university',
  },
  {
    id: 9,
    name: 'OP Jindal University',
    logo: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=200&auto=format&fit=crop',
    slug: 'op-jindal-university',
  },
  {
    id: 10,
    name: 'Chitkara University',
    logo: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=200&auto=format&fit=crop',
    slug: 'chitkara-university',
  },
  {
    id: 11,
    name: 'LPU Online',
    logo: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=200&auto=format&fit=crop',
    slug: 'lpu-online',
  },
  {
    id: 12,
    name: 'IMT CDL',
    logo: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=200&auto=format&fit=crop',
    slug: 'imt-cdl',
  },
];

export default function UniversityLogosSection() {
  const [universities, setUniversities] = useState<UniversityAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        const response = await universitiesAPI.getAll();
        
        // Get first 12 universities for the grid, sorted by featured/order
        const displayUniversities = response.data
          .sort((a, b) => {
            // Sort by featured first, then by order (with fallbacks)
            const aFeatured = a.featured || false;
            const bFeatured = b.featured || false;
            if (aFeatured && !bFeatured) return -1;
            if (!aFeatured && bFeatured) return 1;
            return (a.order || 0) - (b.order || 0);
          })
          .slice(0, 12);
        
        setUniversities(displayUniversities);
      } catch (err) {
        console.error('Error fetching universities:', err);
        setError('Failed to load universities');
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  // Transform API data for rendering
  const getDisplayUniversities = () => {
    if (loading || error || universities.length === 0) {
      return FALLBACK_UNIVERSITIES;
    }

  // Base URL for the API / site (use env-configured value)
  const API_BASE_URL = SITE_BASE_URL;

    return universities.map(uni => ({
      id: uni.id,
      name: uni.name,
      logo: uni.logo?.url 
        ? `${API_BASE_URL}${uni.logo.url}` 
        : FALLBACK_UNIVERSITIES[0].logo,
      slug: uni.slug,
    }));
  };

  const displayUniversities = getDisplayUniversities();

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 via-blue-50 to-slate-100 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full text-sm font-medium text-blue-600 border border-blue-200 mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Trusted by Students Nationwide
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            India's <span className="text-blue-600">Top Universities</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Enhance Your Skills with India's Leading Universities
          </p>
        </div>

        {/* University Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-8 sm:mb-12">
          {displayUniversities.map((university) => (
            <Link
              key={university.id}
              href={`/universities/${university.slug}`}
              className="group block"
            >
              <div className="relative bg-white rounded-lg p-4 hover:shadow-xl transition-transform duration-300 transform-gpu hover:-translate-y-1">
                {/* blue bottom accent (project primary blue) */}
                <div className="absolute left-0 right-0 bottom-0 h-3 bg-[#2563EB] rounded-b-lg"></div>

                <div className="flex flex-col items-center justify-center py-6 px-2">
                  {/* University Logo */}
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mb-3">
                    <Image
                      src={university.logo}
                      alt={`${university.name} logo`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 56px, (max-width: 1024px) 64px, 80px"
                    />
                  </div>

                  {/* University Name */}
                  <h3 className="text-sm sm:text-sm font-semibold text-center text-[#0B3650] group-hover:text-[#BD6C12] transition-colors duration-200">
                    {university.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/universities" className="inline-block bg-[#E9A22A] text-[#07283A] px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-shadow duration-200">
            View All Universities
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="flex items-center justify-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
              <p className="text-gray-600 font-medium">Loading universities...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <div className="bg-red-50 text-red-700 px-6 py-4 rounded-lg border border-red-200 max-w-md mx-auto">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
