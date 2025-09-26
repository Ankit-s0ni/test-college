'use client';

import { Button } from '@/components/ui/button';
import { GraduationCap, LineChart, Library, FlaskConical, BadgeCheck } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { programsAPI } from '@/lib/api';
import { transformProgramsData } from '@/lib/transformers';
import { ProgramListItem } from '@/types/program';
import { programCategoriesAPI, ProgramCategoryAPI } from '@/lib/program-categories-api';

const ProgramsSection = () => {
  const [programs, setPrograms] = useState<ProgramListItem[]>([]);
  const [categories, setCategories] = useState<ProgramCategoryAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [catRes, progRes] = await Promise.all([
          programCategoriesAPI.getAll(),
          programsAPI.getAll(),
        ]);

        // Transform programs and map to categories based on degree type
        const transformedPrograms = transformProgramsData(progRes.data);
        // debug: log API url and programs
        try {
          console.debug('Programs API URL:', (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337') + '/api/programs');
          console.debug('Transformed programs count:', transformedPrograms.length, transformedPrograms.slice(0,3));
        } catch (e) {
          console.debug('Debug log failed', e);
        }

        // Remove duplicate categories based on label and key
        const uniqueCategories = catRes.data.filter((category, index, array) => 
          array.findIndex(cat => cat.label === category.label && cat.key === category.key) === index
        );

        // Since programs don't have direct category relationships, map by degree type
        const categoriesWithPrograms = uniqueCategories.map((category) => {
          let associatedPrograms: ProgramListItem[] = [];

          // Normalize degree value for robust matching
          const normalizeDegree = (d?: string) => (d || '').toString().toLowerCase().trim();

          // Map programs to categories based on category key and normalized program degree
          if (category.key === 'ug-program') {
            associatedPrograms = transformedPrograms.filter(program => normalizeDegree(program.degree) === 'bachelor');
          } else if (category.key === 'pg-program') {
            associatedPrograms = transformedPrograms.filter(program => normalizeDegree(program.degree) === 'master');
          } else if (category.key === 'executive-program' || category.key === 'executive' || (category.key || '').toString().toLowerCase().includes('executive')) {
            // Treat executive programs as certificates/executive-level courses
            associatedPrograms = transformedPrograms.filter(program => {
              const deg = normalizeDegree(program.degree);
              const name = (program.name || '').toString().toLowerCase();
              const slug = (program.slug || '').toString().toLowerCase();
              const isExecName = name.includes('executive') || name.includes('exec');
              const isExecSlug = slug.includes('executive') || slug.includes('exec');
              return deg === 'certificate' || deg === 'certification' || deg.includes('executive') || isExecName || isExecSlug;
            });
          }

          return {
            ...category,
            programs: associatedPrograms,
          };
        });

        setCategories(categoriesWithPrograms);

        // Set first category as active by default
        if (categoriesWithPrograms.length > 0) {
          setActive(categoriesWithPrograms[0].label);
        }
      } catch (error) {
        console.error('❌ Failed to fetch data:', error);
        setError('Failed to load programs');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filter programs by active category
  const visiblePrograms =
    categories.find((category) => category.label === active)?.programs || [];

  // debug visible programs
  if (process.env.NODE_ENV !== 'production') {
    console.debug('Visible programs for category', active, visiblePrograms.length, visiblePrograms.map(p => p.name).slice(0,5));
  }

  return (
    <div id="programs" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Explore Top-Ranked Online Programs</h2>

        {/* Program Categories */}
        <div className="mb-10 flex justify-center">
          <div className="inline-flex rounded-md border bg-white p-1 shadow-sm overflow-x-auto space-x-2">
            {categories.map((category) => {
              const isActive = active === category.label;
              return (
                <button
                  key={category.id}
                  onClick={() => setActive(category.label)}
                  className={[
                    'inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm transition whitespace-nowrap',
                    isActive
                      ? 'bg-[#E9F0FF] text-[#1E40AF] ring-1 ring-[#BFD4FF] shadow-inner'
                      : 'text-muted-foreground hover:bg-muted/60',
                  ].join(' ')}
                >
                  <span className={isActive ? 'font-medium' : ''}>{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Program Section */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading programs...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {visiblePrograms.map((program) => (
              <div
                key={program.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                {/* Program Image */}
                <div className="h-24 bg-gray-50 flex items-center justify-center overflow-hidden">
                  {/* Prefer program image; fallback to a local placeholder image from public assets. Use React state to avoid DOM innerHTML hacks. */}
                  <ProgramImageFallback program={program} />
                </div>
                
                {/* Program Details */}
                <div className="p-3">
                  <h3 className="font-medium text-sm text-gray-900 mb-1 leading-tight overflow-hidden" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical' as any,
                    lineHeight: '1.2'
                  }}>
                    {program.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">
                    Duration: {program.duration}
                  </p>
                  <Button 
                    size="sm" 
                    className="w-full rounded-sm" 
                    asChild
                  >
                    <a href={`/programs/${program.slug}`} className="inline-flex items-center justify-center">
                      Read More
                    </a>
                  </Button>
                </div>
              </div>
            ))}
            {visiblePrograms.length === 0 && (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">No programs available in this category.</p>
                {active !== 'Executive Programs' && (
                  <button 
                    onClick={() => setActive('Executive Programs')}
                    className="text-primary hover:underline mt-2"
                  >
                    View Executive Programs instead
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Small helper component to render program image with a safe fallback.
function ProgramImageFallback({ program }: { program: any }) {
  const [resolvedSrc, setResolvedSrc] = useState<string | null>(null);
  const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337').replace('/api', '');
  const externalStock = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80';
  const localPlaceholder = '/assets/images/program-placeholder.svg';

  useEffect(() => {
    let mounted = true;

    const sources: string[] = [];
    if (program.image?.url) sources.push(`${baseUrl}${program.image.url}`);
    sources.push(externalStock, localPlaceholder);

    (async () => {
      for (const s of sources) {
        try {
          await new Promise<void>((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => reject(new Error('load failed'));
            img.src = s;
          });
          if (mounted) setResolvedSrc(s);
          return;
        } catch (e) {
          // try next source
        }
      }
      // none loaded -> resolvedSrc stays null
    })();

    return () => { mounted = false; };
  }, [program]);

  if (!resolvedSrc) {
    const colorClass = program.id % 5 === 0 ? 'bg-blue-100 text-blue-600' :
      program.id % 5 === 1 ? 'bg-green-100 text-green-600' :
      program.id % 5 === 2 ? 'bg-purple-100 text-purple-600' :
      program.id % 5 === 3 ? 'bg-orange-100 text-orange-600' : 'bg-teal-100 text-teal-600';

    return (
      <div className={`w-full h-full ${colorClass} flex items-center justify-center`}>
        <div className="text-2xl">{program.name ? program.name.charAt(0).toUpperCase() : '📚'}</div>
      </div>
    );
  }

  return (
    <img src={resolvedSrc} alt={program.image?.alternativeText || program.name} className="w-full h-full object-cover" />
  );
}

export default ProgramsSection;
