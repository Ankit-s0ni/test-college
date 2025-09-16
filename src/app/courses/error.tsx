'use client';

import React from 'react';

const CoursesError = () => {
  return (
    <main>
      <section className="mx-auto mt-8 max-w-7xl px-4 mb-16">
        <div className="text-center py-12">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">
            We couldn't load the courses at the moment. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    </main>
  );
};

export default CoursesError;
