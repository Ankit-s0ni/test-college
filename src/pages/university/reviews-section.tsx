import { Reviews } from '@/app/universities/[slug]/page';
import { Star } from 'lucide-react';
import React from 'react';

const ScoreBar = ({ label, score }: { label: string; score: number }) => (
  <div className="flex items-center justify-between text-sm mb-1">
    <span>{label}</span>
    <div className="flex items-center">
      {Array.from({ length: Math.floor(score) }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current text-yellow-500" />
      ))}
    </div>
  </div>
);

const RatingBar = ({ label, value }: { label: string; value: number }) => (
  <div className="flex items-center gap-2">
    <span className="w-20">{label}</span>
    <div className="flex-1 h-[4px] bg-muted relative rounded">
      <div
        className="absolute inset-y-0 left-0 bg-yellow-500 rounded"
        style={{ width: `${value}%` }}
      />
    </div>
    <span className="w-8 text-xs">{Math.round(value)}%</span>
  </div>
);

const ReviewsSection = ({ data }: { data: Reviews }) => {
  // percentages for rating bars
  const total = data.total.count;
  const p5 = ((data.counts.five + data.counts.four) / total) * 100;
  const p4 = (data.counts.three / total) * 100;
  const p3 = (data.counts.two / total) * 100;
  const p2 = (data.counts.one / total) * 100;

  return (
    <section id="reviews" className="space-y-5 p-6 rounded-lg">
      <h2 className="text-xl font-semibold">Reviews</h2>

      {/* review summary */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        <div className="flex gap-6">
          {/* left side: overall */}
          <div className="min-w-[120px]">
            <div className="text-3xl font-bold">{data.total.average.toFixed(1)}</div>
            <div className="flex items-center gap-1 text-yellow-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on {data.total.count} Reviews
            </p>
          </div>

          {/* rating distribution */}
          <div className="flex-1 space-y-1 text-sm">
            <RatingBar label="4–5 stars" value={p5} />
            <RatingBar label="3–4 stars" value={p4} />
            <RatingBar label="2–3 stars" value={p3} />
            <RatingBar label="1–2 stars" value={p2} />
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-sm font-semibold mb-2">Peripheral Rating ( Out of 5 )</h3>
          <ScoreBar label="Average Ratings" score={data.peripheral.avg} />
          <ScoreBar label="Digital Infrastructure" score={data.peripheral.DI} />
          <ScoreBar label="Curriculum" score={data.peripheral.curr} />
          <ScoreBar label="Value For Money" score={data.peripheral.VFM} />
        </div>
      </div>

      {/* horizontal reviews carousel */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {data.list.map((r, i) => (
          <div
            key={i}
            className="min-w-[260px] bg-white rounded-lg border p-4 space-y-2 flex-shrink-0"
          >
            <div className="flex gap-3 items-center">
              <img src={r.image} alt={r.name} className="h-9 w-9 rounded-full object-cover" />
              <div className="flex-1">
                <p className="text-sm font-medium">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.date}</p>
              </div>
              <div className="flex items-center gap-1 text-yellow-500">
                {Array.from({ length: r.rating }).map((_, k) => (
                  <Star key={k} className="h-3 w-3 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{r.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
