import React from 'react';

const CoursesLoading = () => {
  return (
    <main>
      {/* Banner Skeleton */}
      <section className="w-full">
        <div className="h-[220px] sm:h-[280px] md:h-[340px] lg:h-[400px] bg-gray-200 animate-pulse" />
      </section>

      {/* Content Skeleton */}
      <section className="mx-auto mt-8 max-w-7xl px-4 mb-16">
        <div className="mb-8">
          <div className="h-8 w-64 bg-gray-200 animate-pulse rounded mb-2" />
          <div className="h-4 w-96 bg-gray-200 animate-pulse rounded" />
        </div>
        
        {/* Course Cards Skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse" />
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <div className="h-6 w-16 bg-gray-200 animate-pulse rounded" />
                  <div className="h-6 w-20 bg-gray-200 animate-pulse rounded" />
                </div>
                <div className="h-6 w-full bg-gray-200 animate-pulse rounded mb-2" />
                <div className="h-4 w-full bg-gray-200 animate-pulse rounded mb-1" />
                <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded mb-3" />
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
                  <div className="h-4 w-28 bg-gray-200 animate-pulse rounded" />
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default CoursesLoading;
