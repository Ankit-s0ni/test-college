'use client';

import Link from 'next/link';
import { UniversityListItem } from '@/types/university';
import { Download, Star } from 'lucide-react';
import Image from 'next/image';

type UniversityCardProps = {
  university: UniversityListItem;
};

export default function UniversityCard({ university }: UniversityCardProps) {
  const rating = university.rating || 0;
  const ratingDisplay = rating.toFixed(1); // Show one decimal place
  const approvalsText = university.approvals.join(', ');
  const hasProspectus = Boolean(university.prospectusUrl);

  return (
    <article
      className="
        group flex flex-col overflow-hidden rounded-lg border border-[#E5E7EB]
        bg-white shadow-[0_1px_2px_rgba(16,24,40,0.06)]
      "
    >
      {/* Cover with logo overlay */}
      <div className="relative">
        <div className="aspect-[16/10] w-full overflow-hidden">
          {/* keep <img> to avoid Next remote patterns; hide on error */}
          <Image
            src={university.image}
            alt={`${university.name} campus`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
            width={366}
            height={272}
          />
        </div>

        {/* top-left logo badge */}
        <div
          className="
            absolute left-2 top-2 rounded-md border border-[#E5E7EB] bg-white/95
            p-1 shadow-[0_1px_2px_rgba(16,24,40,0.12)] backdrop-blur
          "
        >
          <Image
            src={university.logo}
            alt={`${university.name} logo`}
            className="h-6 w-16 object-contain"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
            width={64}
            height={64}
          />
        </div>
      </div>

      {/* Body */}
      <div className="p-3">
        {/* Title + rating row */}
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="max-w-[75%] text-[15px] font-semibold leading-5 text-[#111827] line-clamp-1">
            {university.name}
          </h3>

          <div className="flex shrink-0 items-center gap-1 text-[13px] font-semibold text-[#111827]">
            <span>{ratingDisplay}</span>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-3 w-3 ${
                    i < Math.floor(rating) 
                      ? 'fill-[#F5DE08] text-[#F5DE08]' 
                      : 'text-[#E5E7EB]'
                  }`} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Approvals */}
        <p className="text-[11px] uppercase tracking-wide text-[#6B7280] line-clamp-2">
          {approvalsText}
        </p>

        {/* Prospectus button row */}
        <div className="mt-3">
          {hasProspectus ? (
            <a
              href={university.prospectusUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2 rounded-md border border-[#86EFAC]
                bg-[#ECFDF5] px-3 py-1.5 text-[12px] font-medium text-[#065F46]
                shadow-[0_1px_2px_rgba(16,24,40,0.04)] hover:bg-[#D1FAE5]
                focus:outline-none focus:ring-2 focus:ring-[#86EFAC]/60
              "
            >
              <Download className="h-4 w-4" />
              Download Prospectus
            </a>
          ) : (
            <button
              disabled
              className="
                inline-flex cursor-not-allowed items-center gap-2 rounded-md border
                border-[#E5E7EB] bg-white px-3 py-1.5 text-[12px] font-medium text-[#9CA3AF]
              "
            >
              <Download className="h-4 w-4" />
              Download Prospectus
            </button>
          )}
        </div>
      </div>

      {/* Full-width footer button */}
      <Link
        href={`/universities/${university.slug}`}
        className="
          block w-full bg-[#2563EB] py-2 text-center text-[14px] font-semibold
          text-white hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#93C5FD]
        "
      >
        View Details
      </Link>
    </article>
  );
}
