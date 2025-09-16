import { Reviews } from '@/app/universities/[slug]/page';
import { Star } from 'lucide-react';
import React from 'react';

const clampStars = (n: number) => Math.max(0, Math.min(5, Math.floor(n)));

const ScoreBar = ({ label, score }: { label: string; score: number }) => (
  <div className="grid grid-cols-[1fr_auto] items-center gap-2 text-xs sm:text-sm mb-1">
    <span className="truncate">{label}</span>
    <div className="flex items-center">
      {Array.from({ length: clampStars(score) }).map((_, i) => (
        <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-current text-yellow-500" />
      ))}
    </div>
  </div>
);

const RatingBar = ({ label, value }: { label: string; value: number }) => {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="flex items-center gap-2 min-w-0">
      <span className="w-24 sm:w-28 text-xs sm:text-sm shrink-0">{label}</span>
      <div className="flex-1 h-2 sm:h-[4px] bg-muted relative rounded overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-yellow-500 rounded"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-10 text-[10px] sm:text-xs text-right shrink-0">{Math.round(pct)}%</span>
    </div>
  );
};

const ReviewsSection = ({ data }: { data: Reviews }) => {
  // percentages (defensive against divide-by-zero)
  const total = data.total.count || 0;
  const toPct = (n: number) => (total ? (n / total) * 100 : 0);

  const p5 = toPct(data.counts.five + data.counts.four);
  const p4 = toPct(data.counts.three);
  const p3 = toPct(data.counts.two);
  const p2 = toPct(data.counts.one);

  return (
    <section
      id="reviews"
      className="space-y-5 p-4 sm:p-6 rounded-lg w-full max-w-full col-span-full"
    >
      <h2 className="text-lg sm:text-xl font-semibold">Reviews</h2>

      {/* Summary card */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm w-full">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
          {/* Overall */}
          <div className="w-full sm:w-auto text-center sm:text-left">
            <div className="text-3xl sm:text-4xl font-bold">{data.total.average.toFixed(1)}</div>
            <div className="mt-1 flex items-center justify-center sm:justify-start gap-1 text-yellow-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
              ))}
            </div>
            <p className="text-[11px] sm:text-xs text-muted-foreground mt-1">
              Based on {data.total.count} Reviews
            </p>
          </div>

          {/* Distribution */}
          <div className="flex-1 space-y-2">
            <RatingBar label="4–5 stars" value={p5} />
            <RatingBar label="3–4 stars" value={p4} />
            <RatingBar label="2–3 stars" value={p3} />
            <RatingBar label="1–2 stars" value={p2} />
          </div>
        </div>

        {/* Peripheral ratings */}
        <div className="mt-5">
          <h3 className="text-sm font-semibold mb-2">Peripheral Rating (Out of 5)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <ScoreBar label="Average Ratings" score={data.peripheral.avg} />
            <ScoreBar label="Digital Infrastructure" score={data.peripheral.DI} />
            <ScoreBar label="Curriculum" score={data.peripheral.curr} />
            <ScoreBar label="Value For Money" score={data.peripheral.VFM} />
          </div>
        </div>
      </div>

      {/* Reviews list: vertical stack on mobile, responsive grid on larger screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full">
        {data.list.map((r, i) => (
          <div key={i} className="bg-white rounded-lg border p-4 space-y-2 w-full">
            <div className="flex gap-3 items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={r.image}
                alt={r.name}
                loading="lazy"
                className="h-9 w-9 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.date}</p>
              </div>
              <div className="flex items-center gap-1 text-yellow-500 shrink-0">
                {Array.from({ length: clampStars(r.rating) }).map((_, k) => (
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
