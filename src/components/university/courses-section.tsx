// flexible course item shape (API may vary)
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Download } from 'lucide-react';

interface CoursesSectionProps {
  items: any[];
  universityData?: {
    name?: string;
    logo?: string | null;
    rating?: number;
    courses?: Array<{
      id?: number;
      name: string;
      shortDescription?: string;
      feeRange?: string;
      duration?: string;
      mode?: string;
      level?: string;
      slug?: string;
      image?: string;
      prospectusLink?: string;
      detailsLink?: string;
    }>;
  };
}

const CoursesSection = ({ items, universityData }: CoursesSectionProps) => {
  const coursesToShow = universityData?.courses || items || [];
  if (!coursesToShow || coursesToShow.length === 0) return null;

  return (
    <section id="courses" className="space-y-4 bg-transparent p-6 rounded-lg">
      <h2 className="text-xl font-semibold">Courses</h2>

      <ScrollArea className="w-full max-w-[248px] sm:max-w-full">
        <div className="flex gap-4 pb-4">
          {coursesToShow.map((course: any, i: number) => (
            <div
              key={i}
              className="w-[300px] sm:w-[360px] flex-shrink-0 overflow-hidden bg-white shadow-sm"
            >
              {course.image ? (
                <div className="relative h-40">
                  <Image src={course.image} alt={course.name || ''} fill className="object-cover" />
                </div>
              ) : null}

              {universityData?.logo && (
                <div className="absolute top-2 left-2 bg-white/80 px-2 py-1 rounded">
                  <Image
                    src={universityData.logo}
                    alt="university logo"
                    className="h-6 w-auto"
                    width={24}
                    height={24}
                  />
                </div>
              )}

              <div className="p-4 space-y-3">
                <div className="space-y-1">
                  <h3 className="font-semibold text-sm">{course.name || course.title || ''}</h3>
                  {course.shortDescription && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {course.shortDescription}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {(course.duration || '') + (course.mode ? ` • ${course.mode}` : '') + (course.level ? ` • ${course.level}` : '')}
                  </span>
                  {universityData?.rating && (
                    <span className="font-medium">{universityData.rating.toFixed(1)}/5 ⭐</span>
                  )}
                </div>

                {course.feeRange && (
                  <div className="text-xs">
                    <span className="text-muted-foreground">Fee: </span>
                    <span className="font-medium text-green-600">{course.feeRange}</span>
                  </div>
                )}

                {course.prospectusLink && (
                  <Link
                    href={course.prospectusLink}
                    className="mt-2 inline-flex items-center gap-1 rounded-none bg-[#E8F8EF] text-[#17733B] text-xs px-3 py-1"
                  >
                    <Download className="h-3 w-3" />
                    Download Prospectus
                  </Link>
                )}
              </div>

                <Button
                size="lg"
                className="w-full rounded-none bg-[#004AFF] hover:bg-[#003cd6]"
                asChild
              >
                <Link href={course.detailsLink || course.slug ? `/courses/${course.slug}` : '#'}>View Details</Link>
              </Button>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};

export default CoursesSection;
