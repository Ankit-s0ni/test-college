'use client';

import React, { useEffect, useRef, useState } from 'react';

interface InfiniteCarouselProps {
  children: React.ReactNode[];
  speed?: number; // Speed in pixels per second
  pauseOnHover?: boolean;
  gap?: number; // Gap between items in pixels
  className?: string;
}

export function InfiniteCarousel({
  children,
  speed = 50,
  pauseOnHover = true,
  gap = 16,
  className = '',
}: InfiniteCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clone children to create seamless loop
    const firstSet = container.querySelector('.carousel-content');
    if (!firstSet) return;

    // Calculate animation duration based on content width and speed
    const contentWidth = firstSet.scrollWidth;
    const duration = contentWidth / speed;

    container.style.setProperty('--scroll-duration', `${duration}s`);
  }, [children, speed]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div
        className={`flex ${isPaused ? '' : 'animate-infinite-scroll'}`}
        style={{ gap: `${gap}px` }}
      >
        {/* First set of items */}
        <div className="carousel-content flex shrink-0" style={{ gap: `${gap}px` }}>
          {children.map((child, index) => (
            <div key={`original-${index}`} className="shrink-0">
              {child}
            </div>
          ))}
        </div>
        {/* Cloned set for seamless loop */}
        <div className="carousel-content flex shrink-0" style={{ gap: `${gap}px` }} aria-hidden="true">
          {children.map((child, index) => (
            <div key={`clone-${index}`} className="shrink-0">
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
