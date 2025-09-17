'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Image from 'next/image';
import { universitiesAPI } from '@/lib/api';
import { UniversityAPI } from '@/types/university';

// Fallback data for loading state or error
const FALLBACK_UNIVERSITIES = [
  {
    college_img:
      'https://images.unsplash.com/photo-1545048702-79362596cdc9?q=80&w=1400&auto=format&fit=crop',
    college_logo:
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=200&auto=format&fit=crop',
    college_name: 'Amity University',
    college_link: 'amity-university-online',
  },
  {
    college_img:
      'https://images.unsplash.com/photo-1545048702-79362596cdc9?q=80&w=1400&auto=format&fit=crop',
    college_logo:
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=200&auto=format&fit=crop',
    college_name: 'DPU University',
    college_link: 'dpu-university-online',
  },
  {
    college_img:
      'https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1400&auto=format&fit=crop',
    college_logo:
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=200&auto=format&fit=crop',
    college_name: 'Lovely University',
    college_link: 'lovely-university-online',
  },
  {
    college_img:
      'https://images.unsplash.com/photo-1545048702-79362596cdc9?q=80&w=1400&auto=format&fit=crop',
    college_logo:
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=200&auto=format&fit=crop',
    college_name: 'Sharda University',
    college_link: 'sharda-university-online',
  },
];

export default function UniversitiesSection() {
  const [universities, setUniversities] = useState<UniversityAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        const response = await universitiesAPI.getAll();
        
        // Get first 4 universities for the home page, sorted by featured/order
        const displayUniversities = response.data
          .sort((a, b) => {
            // Sort by featured first, then by order (with fallbacks)
            const aFeatured = a.featured || false;
            const bFeatured = b.featured || false;
            if (aFeatured && !bFeatured) return -1;
            if (!aFeatured && bFeatured) return 1;
            return (a.order || 0) - (b.order || 0);
          })
          .slice(0, 4);
        
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

  // Transform API data to match the old format for rendering
  const getDisplayUniversities = () => {
    if (loading || error || universities.length === 0) {
      return FALLBACK_UNIVERSITIES;
    }

    // Base URL for the API
    const API_BASE_URL = 'https://collegecosmos.manavkhadka.com.np';

    return universities.map(uni => ({
      college_img: uni.coverImage?.url 
        ? `${API_BASE_URL}${uni.coverImage.url}` 
        : uni.featuredImage?.url 
        ? `${API_BASE_URL}${uni.featuredImage.url}` 
        : FALLBACK_UNIVERSITIES[0].college_img,
      college_logo: uni.logo?.url 
        ? `${API_BASE_URL}${uni.logo.url}` 
        : FALLBACK_UNIVERSITIES[0].college_logo,
      college_name: uni.name,
      college_link: uni.slug,
    }));
  };

  const displayUniversities = getDisplayUniversities();

  return (
    <section id="universities" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Discover Leading Universities</h2>

        {/* Horizontal scroll row using ShadCN ScrollArea */}
        <ScrollArea className="w-full" aria-label="Leading universities">
          <div
            className="
              flex gap-6 pb-4
              snap-x snap-mandatory
              px-1
              "
          >
            {displayUniversities.map((u) => (
              <Card
                key={u.college_link}
                className="
                  px-5 py-[18px]
                  snap-start
                  flex-shrink-0
                  w-[85%] sm:w-[60%] md:w-[45%] lg:w-[24%]
                  overflow-hidden rounded-lg
                "
              >
                <CardContent className="p-0">
                  <div className="relative h-44">
                    <Image
                      src={u.college_img}
                      alt={`${u.college_name} campus`}
                      className="absolute inset-0 h-full w-full object-cover rounded-lg"
                      loading="lazy"
                      width={320}
                      height={240}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/30 to-black/80 rounded-lg" />

                    {/* Logo + name overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-white/95 ring-1 ring-black/5 overflow-hidden flex items-center justify-center">
                        <Image
                          src={u.college_logo}
                          alt={`${u.college_name} logo`}
                          className="h-full w-full object-cover rounded-lg"
                          loading="lazy"
                          width={64}
                          height={64}
                        />
                      </div>
                      <div className="text-white">
                        <p className="font-semibold leading-tight">{u.college_name}</p>
                        <p className="text-xs opacity-90 leading-tight">Online</p>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-0">
                  <Button size="sm" className="w-full rounded-sm" asChild>
                    <Link href={`/universities/${u.college_link}`}>Explore The Courses →</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="w-full flex justify-center items-center mt-4">
          <Link href="/universities">
            <Button variant="outline" className="cursor-pointer">
              Browse all universities
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
