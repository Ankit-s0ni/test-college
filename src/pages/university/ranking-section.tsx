import { Ranking } from '@/app/universities/[slug]/page';
import { Check } from 'lucide-react';
import React from 'react';

const RankingSection = ({ data }: { data: Ranking }) => {
  return (
    <section id="ranking" className="space-y-4 bg-[#F4F5FE] p-6 rounded-lg">
      <h2 className="text-xl font-semibold">{data.title}</h2>

      <ul className="space-y-1 text-sm">
        {data.rankings.map((r, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check className="h-4 w-4 text-emerald-600 mt-0.5" />
            <span>
              <strong>
                {r.body} ({r.year}):
              </strong>{' '}
              {r.rank}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RankingSection;
