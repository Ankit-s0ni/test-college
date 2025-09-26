import React from 'react';

const CourseDetailsSection = ({ courses }: { courses: any[] }) => {
  if (!courses || courses.length === 0) return null;

  return (
    <section id="course-details" className="space-y-4 p-6 rounded-lg border bg-white">
      <h2 className="text-xl font-semibold">Course Details</h2>

      <div className="space-y-4 text-sm">
        {courses.map((c) => (
          <div key={c.id || c.courseName} className="border border-border p-3 rounded">
            <div className="flex items-center justify-between">
              <div className="font-medium">{c.courseName}</div>
              <div className="text-xs text-muted-foreground">{c.duration}</div>
            </div>

            {c.fees && <div className="text-sm">Fees: {c.fees}</div>}
            {c.eligibility && <div className="text-sm text-muted-foreground">Eligibility: {c.eligibility}</div>}
            {c.syllabus && <div className="text-sm">Syllabus: <span className="text-muted-foreground">{c.syllabus}</span></div>}
            {c.specializations && c.specializations.length > 0 && (
              <div className="text-sm">Specializations: {c.specializations.join(', ')}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseDetailsSection;
