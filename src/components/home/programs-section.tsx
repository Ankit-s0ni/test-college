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

        // Remove duplicate categories based on label and key
        const uniqueCategories = catRes.data.filter((category, index, array) => 
          array.findIndex(cat => cat.label === category.label && cat.key === category.key) === index
        );

        // Since programs don't have direct category relationships, map by degree type
        const categoriesWithPrograms = uniqueCategories.map((category) => {
          let associatedPrograms: ProgramListItem[] = [];
          
          // Map programs to categories based on category key and program degree
          if (category.key === 'ug-program') {
            associatedPrograms = transformedPrograms.filter(program => program.degree === 'Bachelor');
          } else if (category.key === 'pg-program') {
            associatedPrograms = transformedPrograms.filter(program => program.degree === 'Master');
          } else if (category.key === 'diploma') {
            associatedPrograms = transformedPrograms.filter(program => program.degree === 'Certificate' || program.degree === 'Diploma');
          } else if (category.key === 'executive-program') {
            // For executive programs, we can filter by a different criteria or leave empty for now
            associatedPrograms = [];
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
                  <img
                    src={`https://images.unsplash.com/photo-${
                      program.name.toLowerCase().includes('mba') ? '1513475382585-d06e58bcb0e0' :
                      program.name.toLowerCase().includes('mca') ? '1513475382585-d06e58bcb0e0' :
                      program.name.toLowerCase().includes('mcom') ? '1513475382585-d06e58bcb0e0' :
                      program.name.toLowerCase().includes('computer') ? '1513475382585-d06e58bcb0e0' :
                      program.name.toLowerCase().includes('business') ? '1513475382585-d06e58bcb0e0' :
                      program.name.toLowerCase().includes('commerce') ? '1513475382585-d06e58bcb0e0' :
                      program.name.toLowerCase().includes('education') ? '1513475382585-d06e58bcb0e0' :
                      program.name.toLowerCase().includes('arts') ? '1513475382585-d06e58bcb0e0' :
                      program.name.toLowerCase().includes('law') ? '1513475382585-d06e58bcb0e0' :
                      program.name.toLowerCase().includes('technology') ? '1513475382585-d06e58bcb0e0' :
                      program.name.toLowerCase().includes('science') ? '1513475382585-d06e58bcb0e0' :
                      '1513475382585-d06e58bcb0e0'
                    }?auto=format&fit=crop&w=200&h=120&q=80`}
                    alt={program.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to a colored background with icon
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement!;
                      parent.innerHTML = `
                        <div class="w-full h-full ${
                          program.id % 5 === 0 ? 'bg-blue-100' :
                          program.id % 5 === 1 ? 'bg-green-100' :
                          program.id % 5 === 2 ? 'bg-purple-100' :
                          program.id % 5 === 3 ? 'bg-orange-100' :
                          'bg-teal-100'
                        } flex items-center justify-center">
                          <div class="text-2xl ${
                            program.id % 5 === 0 ? 'text-blue-600' :
                            program.id % 5 === 1 ? 'text-green-600' :
                            program.id % 5 === 2 ? 'text-purple-600' :
                            program.id % 5 === 3 ? 'text-orange-600' :
                            'text-teal-600'
                          }">
                            ${program.name.toLowerCase().includes('mba') ? '🎓' :
                              program.name.toLowerCase().includes('mca') ? '💻' :
                              program.name.toLowerCase().includes('mcom') ? '📊' :
                              program.name.toLowerCase().includes('computer') ? '💻' :
                              program.name.toLowerCase().includes('business') ? '�' :
                              program.name.toLowerCase().includes('commerce') ? '�' :
                              program.name.toLowerCase().includes('education') ? '�‍🏫' :
                              program.name.toLowerCase().includes('arts') ? '🎨' :
                              program.name.toLowerCase().includes('law') ? '⚖️' :
                              program.name.toLowerCase().includes('technology') ? '�' :
                              program.name.toLowerCase().includes('science') ? '�' : '📚'}
                          </div>
                        </div>
                      `;
                    }}
                  />
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

export default ProgramsSection;
