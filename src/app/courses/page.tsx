import { coursesAPI } from '@/lib/api';
import { transformCoursesData } from '@/lib/transformers';
import FooterSection from '@/components/home/footer-section';
import { CourseListItem } from '@/types/course';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const COURSES_BANNER =
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop';

async function getCourses(): Promise<CourseListItem[]> {
  try {
    const response = await coursesAPI.getAll();
    return transformCoursesData(response.data);
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    return [];
  }
}

const CourseCard = ({ course }: { course: CourseListItem }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={course.image}
          alt={course.name}
          fill
          className="object-cover"
        />
        {course.featured && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-sm font-medium">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {course.level && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">
              {course.level}
            </span>
          )}
          {course.degree && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
              {course.degree}
            </span>
          )}
          {course.mode && (
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-xs font-medium">
              {course.mode}
            </span>
          )}
          {course.code && (
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs font-medium">
              {course.code}
            </span>
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {course.name}
        </h3>
        
        {course.shortDescription && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {course.shortDescription}
          </p>
        )}
        
        <div className="space-y-2 text-sm text-gray-500">
          {course.duration && (
            <div className="flex items-center">
              <span className="font-medium">Duration:</span>
              <span className="ml-1">{course.duration}</span>
            </div>
          )}
          
          {course.fees && (
            <div className="flex items-center">
              <span className="font-medium">Fees:</span>
              <span className="ml-1">
                ₹{course.fees.toLocaleString()} per year
              </span>
            </div>
          )}
          
          {course.averageSalary && (
            <div className="flex items-center">
              <span className="font-medium">Avg. Salary:</span>
              <span className="ml-1">
                ₹{course.averageSalary.toLocaleString()} per annum
              </span>
            </div>
          )}
          
          {course.topRecruiters.length > 0 && (
            <div className="flex items-center">
              <span className="font-medium">Top Recruiters:</span>
              <span className="ml-1 truncate">
                {course.topRecruiters.slice(0, 3).join(', ')}
                {course.topRecruiters.length > 3 && '...'}
              </span>
            </div>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

const CoursesListingPage = async () => {
  const courses = await getCourses();

  return (
    <>
      <main>
        {/* Banner */}
        <section className="w-full">
          <div className="relative h-[220px] sm:h-[280px] md:h-[340px] lg:h-[400px]">
            <Image
              src={COURSES_BANNER}
              alt="courses banner"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Explore Courses
                </h1>
                <p className="text-lg md:text-xl opacity-90">
                  Discover the perfect course for your career goals
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Courses grid */}
        <section className="mx-auto mt-8 max-w-7xl px-4 mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              All Courses ({courses.length})
            </h2>
            <p className="text-gray-600">
              Browse through our comprehensive collection of courses
            </p>
          </div>
          
          {courses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No courses found.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </section>

        
      </main>
      <FooterSection />
    </>
  );
};

export default CoursesListingPage;
