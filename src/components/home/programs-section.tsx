'use client';

import { Button } from '@/components/ui/button';
import { GraduationCap, LineChart, Library, FlaskConical, BadgeCheck } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { programsAPI } from '@/lib/api';
import { transformProgramsData } from '@/lib/transformers';
import { ProgramListItem, ProgramCategory } from '@/types/program';

const ALL_PROGRAMS: { name: string; duration: string; icon: string; category: string }[] = [
  // Executive
  { name: 'MCA', duration: '3 Years', icon: '💻', category: 'Executive Programs' },
  { name: 'MBA', duration: '2 Years', icon: '🎓', category: 'Executive Programs' },
  { name: 'MAJMC', duration: '2 Years', icon: '🎤', category: 'Executive Programs' },
  { name: 'M.TECH', duration: '2 Years', icon: '⚙️', category: 'Executive Programs' },
  { name: 'Dual MBA', duration: '2 Years', icon: '🎯', category: 'Executive Programs' },
  { name: 'M.Sc', duration: '2 Years', icon: '🔬', category: 'Executive Programs' },
  { name: 'Online MBA', duration: '2 Years', icon: '💼', category: 'Executive Programs' },
  { name: 'PGDBA', duration: '2 Years', icon: '📊', category: 'Executive Programs' },
  { name: '1-Year MBA', duration: '1 Year', icon: '⏱️', category: 'Executive Programs' },
  { name: 'PGDM', duration: '2 Years', icon: '📈', category: 'Executive Programs' },
  { name: 'PGDM(Ex)', duration: '2 Years', icon: '🧑‍💼', category: 'Executive Programs' },
  { name: 'Executive MBA', duration: '2 Years', icon: '👔', category: 'Executive Programs' },
  { name: 'LLM', duration: '2 Years', icon: '⚖️', category: 'Executive Programs' },
  { name: 'Distance MBA', duration: '2 Years', icon: '🎓', category: 'Executive Programs' },

  // PG
  { name: 'MBA (PG)', duration: '2 Years', icon: '🎓', category: 'PG Courses' },
  { name: 'M.Tech (PG)', duration: '2 Years', icon: '⚙️', category: 'PG Courses' },
  { name: 'M.Sc (PG)', duration: '2 Years', icon: '🧪', category: 'PG Courses' },

  // UG
  { name: 'BBA', duration: '3 Years', icon: '📚', category: 'UG Courses' },
  { name: 'BCA', duration: '3 Years', icon: '💻', category: 'UG Courses' },
  { name: 'B.Com', duration: '3 Years', icon: '🧾', category: 'UG Courses' },
];

const ProgramsSection = () => {
  const [programs, setPrograms] = useState<ProgramListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories: ProgramCategory[] = [
    'Executive Programs',
    'PG Courses',
    'UG Courses',
  ];

  const icons = {
    'Executive Programs': GraduationCap,
    'PG Courses': LineChart,
    'UG Courses': Library,
  } as const;

  const [active, setActive] = useState<ProgramCategory>('Executive Programs');

  // Fetch programs from API
  useEffect(() => {
    async function fetchPrograms() {
      try {
        console.log('🔍 Fetching programs from API...');
        setLoading(true);
        setError(null);
        
        const response = await programsAPI.getAll();
        console.log('✅ Programs API Response:', response);
        
        const transformedPrograms = transformProgramsData(response.data);
        console.log('🔄 Transformed Programs:', transformedPrograms);
        
        // Log category distribution
        const categoryCount = transformedPrograms.reduce((acc, program) => {
          acc[program.category] = (acc[program.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        console.log('📊 Programs by category:', categoryCount);
        
        setPrograms(transformedPrograms);
      } catch (error) {
        console.error('❌ Failed to fetch programs:', error);
        setError('Failed to load programs');
        
        // Fallback to dummy data if API fails
        const fallbackPrograms: ProgramListItem[] = ALL_PROGRAMS.map((program, index) => ({
          id: index + 1,
          name: program.name,
          slug: program.name.toLowerCase().replace(/\s+/g, '-'),
          duration: program.duration,
          category: program.category as ProgramCategory,
          icon: program.icon,
          degree: program.name,
          level: program.category.includes('UG') ? 'undergraduate' : 'postgraduate',
          featured: false,
        }));
        setPrograms(fallbackPrograms);
      } finally {
        setLoading(false);
      }
    }

    fetchPrograms();
  }, []);

  const visiblePrograms = programs.filter((p) => p.category === active);

  return (
    <div id="programs" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Explore Top-Ranked Online Programs</h2>

        {/* Program Categories */}
        <div className="mb-10 flex justify-center">
          <div className="inline-flex rounded-md border bg-white p-1 shadow-sm overflow-x-auto space-x-2">
            {categories.map((category) => {
              const Icon = icons[category];
              const isActive = active === category;
              return (
                <button
                  key={category}
                  onClick={() => setActive(category)}
                  className={[
                    'inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm transition whitespace-nowrap',
                    isActive
                      ? 'bg-[#E9F0FF] text-[#1E40AF] ring-1 ring-[#BFD4FF] shadow-inner'
                      : 'text-muted-foreground hover:bg-muted/60',
                  ].join(' ')}
                >
                  <Icon
                    className={'h-4 w-4 ' + (isActive ? 'text-[#1E40AF]' : 'text-muted-foreground')}
                  />
                  <span className={isActive ? 'font-medium' : ''}>{category}</span>
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
          <div className="flex flex-wrap items-center justify-center gap-3">
            {visiblePrograms.map((program) => (
              <div
                key={program.id}
                className="w-[180px] bg-card rounded-lg p-3 text-center border border-border hover:shadow-lg transition-shadow"
              >
                <p className="text-xs text-muted-foreground mb-4 border rounded p-2">
                  Course Duration: {program.duration}
                </p>
                <div className="text-3xl mb-3">{program.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{program.name}</h3>
                <Button size="sm" className="w-full rounded-sm" asChild>
                  <a href={`/programs/${program.slug}`} className="inline-flex items-center justify-center">
                    View Program
                  </a>
                </Button>
              </div>
            ))}
            {visiblePrograms.length === 0 && !loading && (
              <div className="text-center py-8 w-full">
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
