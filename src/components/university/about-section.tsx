import { About } from '@/app/universities/[slug]/page';
import React from 'react';

const AboutSection = ({ data }: { data: About }) => {
  return (
    <section id="about" className="space-y-4 max-w-full">
      <h2 className="text-xl font-semibold">{data.title}</h2>

      <p className="text-sm">{data.description}</p>

      {/* Mobile: card list */}
      <div className="md:hidden space-y-3">
        {data.courses.map((c) => (
          <div key={c.name} className="border border-black rounded-none">
            <div className="bg-[#1E4BFF] text-white px-4 py-2 font-medium">{c.name}</div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 px-4 py-3 text-sm">
              <dt className="text-muted-foreground">Per Semester</dt>
              <dd className="text-right font-medium">{c.perSem}</dd>

              <dt className="text-muted-foreground">Total Fees</dt>
              <dd className="text-right font-medium">{c.total}</dd>

              <dt className="text-muted-foreground">Online</dt>
              <dd className="text-right">N/A</dd>
            </dl>
          </div>
        ))}
      </div>

      {/* Tablet/Desktop: table */}
      <div className="hidden md:block overflow-x-auto rounded-none border border-black">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-[#1E4BFF] text-white border-black">
              <th className="px-4 py-4 text-left font-medium">Courses</th>
              <th className="px-4 py-4 text-center font-medium" colSpan={4}>
                Semester Wise
              </th>
              <th className="px-4 py-4 text-center font-medium">Online</th>
            </tr>
            <tr className="bg-muted/50 border-black">
              <th className="px-4 py-4" />
              <th className="px-4 py-4 font-medium" colSpan={2}>
                Per Semester
              </th>
              <th className="px-4 py-4 font-medium" colSpan={2}>
                Total Fees
              </th>
              <th className="px-4 py-4" />
            </tr>
          </thead>
          <tbody className="[&>tr:not(:last-child)]:border-b [&>tr:not(:last-child)]:border-border">
            {data.courses.map((c) => (
              <tr key={c.name} className="border-black">
                <td className="px-4 py-4 border-black">{c.name}</td>
                <td className="px-4 py-4 text-center font-medium border-black" colSpan={2}>
                  {c.perSem}
                </td>
                <td className="px-4 py-4 text-center font-medium border-black" colSpan={2}>
                  {c.total}
                </td>
                <td className="px-4 py-4 text-center border-black">N/A</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AboutSection;
