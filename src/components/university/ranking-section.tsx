import { Ranking } from '@/app/universities/[slug]/page';
import { Trophy } from 'lucide-react';
import React from 'react';

const RankingSection = ({ data }: { data: Ranking }) => {

  return (
    <section id="ranking" className="py-6 sm:py-8">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            {data.title}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Recognized excellence across prestigious global and national rankings
        </p>
      </div>

      {/* Compact Rankings Cards - White Theme with Blue Rankings */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {data.rankings.map((r, i) => {
          return (
            <div 
              key={i} 
              className="bg-white border-2 border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-lg hover:border-blue-300 transition-all hover:scale-105"
            >
              {/* Year and Name */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="text-xs sm:text-sm font-semibold leading-tight flex-1 text-gray-900">
                  {r.body}
                </h3>
                {r.year && (
                  <span className="text-[10px] sm:text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full whitespace-nowrap">
                    {r.year}
                  </span>
                )}
              </div>

              {/* Rank */}
              <div className="flex items-baseline gap-1.5">
                <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide font-medium">
                  Rank
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-[#1E4BFF]">
                  {r.rank}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      {data.rankings.length > 0 && (
        <div className="flex items-start gap-2 sm:gap-3 mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
          <Trophy className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs sm:text-sm font-medium text-gray-700">
            <span className="font-bold text-blue-600">{data.rankings.length}</span> prestigious ranking{data.rankings.length > 1 ? 's' : ''} showcasing academic excellence
          </p>
        </div>
      )}
    </section>
  );
};

export default RankingSection;
