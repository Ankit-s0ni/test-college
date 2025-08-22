'use client';

import { Button } from '@/components/ui/button';
import { GraduationCap, LineChart, Library, FlaskConical, BadgeCheck } from 'lucide-react';
import React, { useState } from 'react';

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

  // Doctorate/Ph.D
  { name: 'Ph.D (Mgmt)', duration: '4–6 Years', icon: '📖', category: 'Doctorate/Ph.D' },
  { name: 'Ph.D (CS)', duration: '4–6 Years', icon: '🧠', category: 'Doctorate/Ph.D' },

  // Certification
  { name: 'Data Analytics', duration: '6–9 Months', icon: '📈', category: 'Certification' },
  { name: 'Product Mgmt', duration: '4–6 Months', icon: '🗂️', category: 'Certification' },
];

const ProgramsSection = () => {
  const categories = [
    'Executive Programs',
    'PG Courses',
    'UG Courses',
    'Doctorate/Ph.D',
    'Certification',
  ] as const;

  const icons = {
    'Executive Programs': GraduationCap,
    'PG Courses': LineChart,
    'UG Courses': Library,
    'Doctorate/Ph.D': FlaskConical,
    Certification: BadgeCheck,
  } as const;

  const [active, setActive] = useState<(typeof categories)[number]>('Executive Programs');

  const visiblePrograms = ALL_PROGRAMS.filter((p) => p.category === active);

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
        <div className="flex flex-wrap items-center justify-center gap-3">
          {visiblePrograms.map((program) => (
            <div
              key={program.name}
              className="w-[180px] bg-card rounded-lg p-3 text-center border border-border hover:shadow-lg transition-shadow"
            >
              <p className="text-xs text-muted-foreground mb-4 border rounded p-2">
                Course Duration: {program.duration}
              </p>
              <div className="text-3xl mb-3">{program.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{program.name}</h3>
              <Button size="sm" className="w-full rounded-sm">
                View Program
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgramsSection;
