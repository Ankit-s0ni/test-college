import { Advantages } from '@/app/universities/[slug]/page';
import React from 'react';

const AdvantagesSection = ({ data }: { data: Advantages }) => {
  return (
    <section id="advantages" className="space-y-3 sm:space-y-4 p-4 sm:p-6 rounded-lg">
      <h2 className="text-lg sm:text-xl font-semibold">{data.title}</h2>
      <p className="text-xs sm:text-sm text-muted-foreground">{data.description}</p>

      <div className="overflow-x-auto border border-border rounded-lg">
        <table className="min-w-full text-xs sm:text-sm">
          <thead>
            <tr className="bg-[#1E4BFF] text-white">
              <th className="px-2 sm:px-3 py-2 text-left font-medium w-[35%] sm:w-auto">Benefits</th>
              <th className="px-2 sm:px-3 py-2 text-left font-medium">Description</th>
            </tr>
          </thead>
          <tbody className="[&>tr:not(:last-child)]:border-b [&>tr:not(:last-child)]:border-border">
            {data.tableData.map((r) => (
              <tr key={r.benefit} className="hover:bg-muted/30">
                <td className="px-2 sm:px-3 py-2 sm:py-3 font-medium align-top">{r.benefit}</td>
                <td className="px-2 sm:px-3 py-2 sm:py-3">{r.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdvantagesSection;
