/* eslint-disable @typescript-eslint/no-explicit-any */
import { Campus } from '@/app/universities/[slug]/page';
import React from 'react';

const CampusSection = ({ data }: { data: Campus }) => {
  return (
    <section id="campus" className="space-y-4 p-6 rounded-lg">
      <h2 className="text-xl font-semibold">{data.title}</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {data?.groups?.map((group, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-border p-4"
            style={{ backgroundColor: group.color }}
          >
            <h3 className="font-semibold mb-2">{group.label}</h3>
            <div className="grid grid-cols-2 gap-1 text-sm text-muted-foreground">
              {group?.locations?.map((loc: any) => (
                <span key={loc}>{loc}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CampusSection;
