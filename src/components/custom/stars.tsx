import React from 'react';

const Stars = ({ value }: { value: number }) => {
  const v = Math.max(0, Math.min(5, Math.round(value * 2) / 2));
  return (
    <div className="flex items-center gap-0.5 text-yellow-500">
      {Array.from({ length: 5 }).map((_, i) => {
        const full = v >= i + 1;
        const half = !full && v >= i + 0.5;
        return (
          <svg key={i} viewBox="0 0 24 24" className="h-4 w-4">
            <defs>
              <linearGradient id={`half-${i}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              fill={full ? 'currentColor' : half ? `url(#half-${i})` : 'none'}
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
        );
      })}
    </div>
  );
};

export default Stars;
