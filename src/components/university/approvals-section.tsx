import { Approvals } from '@/app/universities/[slug]/page';
import React from 'react';
import Image from 'next/image';
import { ExternalLink, Calendar } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const NaacImg = '/assets/images/naac.jpg';

const ApprovalsSection = ({ data }: { data: Approvals }) => {
  return (
    <section id="approvals" className="space-y-4 rounded-lg bg-[#F9F9FF] p-4">
      <h2 className="text-xl font-semibold">{data.title}</h2>
      <p className="text-sm">{data.description}</p>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <TooltipProvider>
          {data.items.map((item, i) => {
            const hasTooltip = item.fullName || item.description || item.validFrom || item.validUntil;
            const isClickable = item.website;

            const content = (
              <div className="flex flex-col items-center justify-between h-32 bg-[#FFF6E8] overflow-hidden p-2 hover:shadow-md transition-shadow cursor-pointer">
                <div className="relative h-16 w-full flex items-center justify-center">
                  {item.logo ? (
                    <Image src={item.logo} alt={item.body || 'approval logo'} width={120} height={60} className="object-contain" />
                  ) : (item.body && item.body.toLowerCase().includes('naac') ? (
                    <Image src={NaacImg} alt="NAAC" width={120} height={60} className="object-contain" />
                  ) : null)}
                  {isClickable && (
                    <ExternalLink className="absolute top-0 right-0 h-3 w-3 text-blue-600" />
                  )}
                </div>
                <div className="w-full text-center bg-[#1E4BFF] text-white text-xs py-1">
                  {item.body || item.status || 'Approval'}{item.grade ? ` • ${item.grade}` : ''}
                </div>
              </div>
            );

            const wrappedContent = isClickable ? (
              <a 
                href={item.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                {content}
              </a>
            ) : content;

            return hasTooltip ? (
              <Tooltip key={i}>
                <TooltipTrigger asChild>
                  {wrappedContent}
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <div className="space-y-2">
                    {item.fullName && (
                      <p className="font-semibold text-sm">{item.fullName}</p>
                    )}
                    {item.description && (
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    )}
                    {(item.validFrom || item.validUntil) && (
                      <div className="flex items-center gap-1 text-xs">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {item.validFrom && `Valid from ${new Date(item.validFrom).getFullYear()}`}
                          {item.validFrom && item.validUntil && ' - '}
                          {item.validUntil && `until ${new Date(item.validUntil).getFullYear()}`}
                        </span>
                      </div>
                    )}
                    {item.website && (
                      <p className="text-xs text-blue-600">Click to visit website →</p>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            ) : (
              <div key={i}>{wrappedContent}</div>
            );
          })}
        </TooltipProvider>
      </div>
    </section>
  );
};

export default ApprovalsSection;
