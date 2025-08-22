'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { PROGRAM_TABS } from '@/app/universities/list';
import type { LucideIcon } from 'lucide-react';
import {
  GraduationCap,
  BookOpen,
  Library,
  FlaskConical,
  BadgeCheck,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type TabKey = (typeof PROGRAM_TABS)[number]['key'];

const ICONS: Record<string, LucideIcon> = {
  executive: GraduationCap,
  pg: BookOpen,
  ug: Library,
  phd: FlaskConical,
  cert: BadgeCheck,
};

export default function FiltersBar() {
  const [activeTab, setActiveTab] = useState<TabKey>(PROGRAM_TABS[0].key);
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(true);
  const [selections, setSelections] = useState<Record<string, string>>({
    [PROGRAM_TABS[0].key]: PROGRAM_TABS[0].options[0],
  });

  const current = useMemo(() => PROGRAM_TABS.find((t) => t.key === activeTab)!, [activeTab]);
  const activeValue = selections[activeTab] ?? current.options[0] ?? undefined;

  const handleTabClick = (key: TabKey) => {
    if (key === activeTab) {
      setIsOptionsOpen((s) => !s); // toggle same tab
    } else {
      setActiveTab(key);
      setIsOptionsOpen(true); // opening a different tab always shows options
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4">
      <div className="mx-auto max-w-[920px] px-4">
        {/* Top row */}
        <div className="flex flex-wrap gap-2 rounded-[8px] border border-[#EAECF0] bg-white p-2.5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
          {PROGRAM_TABS.map((tab) => {
            const Icon = ICONS[tab.key] ?? GraduationCap;
            const isSelected = activeTab === tab.key;
            const isExpanded = isSelected && isOptionsOpen; // 🔑 yellow only when open

            return (
              <Button
                key={tab.key}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleTabClick(tab.key)}
                aria-expanded={isExpanded}
                aria-controls="filters-options-card"
                className={cn(
                  'h-9 rounded-[8px] border-0 text-[13px] font-medium shadow-none transition-colors flex-1',
                  'flex items-center gap-2 px-3 leading-none hover:text-[#111827]',
                  isExpanded
                    ? 'bg-[#FFF7EB] text-[#B45309] hover:bg-[#FFF7EB]' // yellow (open)
                    : 'bg-white text-[#6B7280] hover:bg-[#F9FAFB]', // grey (closed or not selected)
                  { 'bg-[#F9FAFB]': isSelected && !isExpanded },
                )}
              >
                <Icon
                  className={cn(
                    'h-4 w-4 transition-colors',
                    isExpanded ? 'text-[#F59E0B]' : 'text-[#6B7280]',
                  )}
                />
                <span className="whitespace-nowrap">{tab.label}</span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform',
                    isExpanded ? 'text-[#F59E0B] rotate-180' : 'text-[#6B7280]',
                  )}
                />
              </Button>
            );
          })}
        </div>
      </div>

      {/* Options card */}
      {isOptionsOpen && (
        <div
          id="filters-options-card"
          className="mt-4 rounded-[8px] border border-[#EAECF0] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
        >
          <RadioGroup
            value={activeValue}
            onValueChange={(val) => setSelections((prev) => ({ ...prev, [activeTab]: val }))}
            className="grid grid-cols-2 gap-x-10 gap-y-6 md:grid-cols-4"
          >
            {current.options.map((opt, i) => {
              const id = `${activeTab}-${i}`;
              return (
                <div key={opt} className="flex items-center gap-3">
                  <RadioGroupItem
                    id={id}
                    value={opt}
                    className={cn(
                      'h-[14px] w-[14px] border-2 border-[#D1D5DB] rounded-full',
                      'data-[state=checked]:bg-[#F59E0B] data-[state=checked]:border-[#F59E0B]',
                      'focus-visible:ring-0 focus-visible:ring-offset-0',
                      '[&_svg]:hidden',
                    )}
                  />
                  <label
                    htmlFor={id}
                    className="cursor-pointer text-[14px] font-medium text-[#111827]"
                  >
                    {opt}
                  </label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      )}
    </section>
  );
}
