import { CoursesHero } from '@/app/universities/[slug]/page';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ManipalLogoImg from '../../../public/assets/images/manipal-logo.jpg';
import { Download } from 'lucide-react';

// Accept both course data and university context
interface CoursesSectionProps {
  items: CoursesHero[];
  universityData?: {
    name: string;
    logo: string;
    rating?: number;
    courses?: Array<{
      id: number;
      name: string;
      shortDescription?: string;
      feeRange?: string;
      duration?: string;
      mode?: string;
      level?: string;
      slug?: string;
    }>;
  };
}

const CoursesSection = ({ items, universityData }: CoursesSectionProps) => {
  // Use real course data if available, otherwise fall back to items
  const coursesToShow = universityData?.courses || [];

  return (
    <section id="courses" className="space-y-4 bg-transparent p-6 rounded-lg">
      <h2 className="text-xl font-semibold">Courses</h2>

      <ScrollArea className="w-full max-w-[248px] sm:max-w-full">
        <div className="flex gap-4 pb-4">
          {coursesToShow.length > 0 ? (
            // Show real courses from API
            coursesToShow.map((course, i) => (
              <div
                key={i}
                className="w-[300px] sm:w-[360px] flex-shrink-0 overflow-hidden bg-white shadow-sm"
              >
                <div className="relative h-40">
                  <Image 
                    src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop" 
                    alt={course.name} 
                    fill 
                    className="object-cover" 
                  />
                  {/* University logo overlay */}
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
                </div>

                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-sm">{course.name}</h3>
                    {course.shortDescription && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {course.shortDescription}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {course.duration} • {course.mode} • {course.level}
                    </span>
                    {universityData?.rating && (
                      <span className="font-medium">
                        {universityData.rating.toFixed(1)}/5 ⭐
                      </span>
                    )}
                  </div>

                  {course.feeRange && (
                    <div className="text-xs">
                      <span className="text-muted-foreground">Fee: </span>
                      <span className="font-medium text-green-600">{course.feeRange}</span>
                    </div>
                  )}

                  <Link
                    href="#"
                    className="mt-2 inline-flex items-center gap-1 rounded-none bg-[#E8F8EF] text-[#17733B] text-xs px-3 py-1"
                  >
                    <Download className="h-3 w-3" />
                    Download Prospectus
                  </Link>
                </div>

                <Button
                  size="lg"
                  className="w-full rounded-none bg-[#004AFF] hover:bg-[#003cd6]"
                  asChild
                >
                  <Link href={course.slug ? `/courses/${course.slug}` : '#'}>View Details</Link>
                </Button>
              </div>
            ))
          ) : (
            // Fallback to old structure if no real courses
            items.map((c, i) => (
              <div
                key={i}
                className="w-[300px] sm:w-[360px] flex-shrink-0 overflow-hidden bg-white shadow-sm"
              >
                <div className="relative h-40">
                  <Image src={c.image} alt="course" fill className="object-cover" />
                  {/* University logo overlay */}
                  <div className="absolute top-2 left-2 bg-white/80 px-2 py-1">
                    <Image
                      src={universityData?.logo || ManipalLogoImg}
                      alt="logo"
                      className="h-6 w-auto"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>

                <div className="p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">
                      {universityData?.name || 'Manipal Online University'}
                    </h3>
                    <span className="text-sm font-medium">
                      {universityData?.rating ? `${universityData.rating.toFixed(1)}/5 ⭐` : '4/5 ⭐'}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground">AICTE, NAAC, NBA, QS, UGC</p>

                  <Link
                    href={c.prospectusLink}
                    className="mt-2 inline-flex items-center gap-1 rounded-none bg-[#E8F8EF] text-[#17733B] text-xs px-3 py-1"
                  >
                    <Download className="h-3 w-3" />
                    Download Prospectus
                  </Link>
                </div>

                <Button
                  size="lg"
                  className="w-full rounded-none bg-[#004AFF] hover:bg-[#003cd6]"
                  asChild
                >
                  <Link href={c.detailsLink}>View Details</Link>
                </Button>
              </div>
            ))
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};

export default CoursesSection;
