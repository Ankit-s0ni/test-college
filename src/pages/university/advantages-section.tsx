import { Advantages } from '@/app/universities/[slug]/page';
import React from 'react'

const AdvantagesSection = ({ data }: { data: Advantages }) => {
  return (
    <section id="advantages" className="space-y-4 p-6 rounded-lg">
      <h2 className="text-xl font-semibold">{data.title}</h2>
      <p className="text-sm text-muted-foreground">{data.description}</p>

      <div className="overflow-x-auto border border-border">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-[#1E4BFF] text-white">
              <th className="px-3 py-2 text-left font-medium">Benefits</th>
              <th className="px-3 py-2 text-left font-medium">Description</th>
            </tr>
          </thead>
          <tbody className="[&>tr:not(:last-child)]:border-b [&>tr:not(:last-child)]:border-border">
            {data.tableData.map((r) => (
              <tr key={r.benefit}>
                <td className="px-3 py-3 font-medium">{r.benefit}</td>
                <td className="px-3 py-3">{r.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AdvantagesSection