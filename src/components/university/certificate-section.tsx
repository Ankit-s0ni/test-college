import { Certificate } from '@/app/universities/[slug]/page';
import Image from 'next/image';
import React from 'react';
import { SITE_BASE_URL } from '@/lib/config';

const CertificateSection = ({ data, logoUrl }: { data: Certificate; logoUrl?: string }) => {
  return (
    <section id="certificate" className="bg-[#F4F5FE] p-6 rounded-lg space-y-4">
      <h2 className="text-xl font-semibold">{data.title}</h2>

      <div className="grid sm:grid-cols-2 gap-6">
        {data.images.map((img: any, i: number) => {
          const url = typeof img === 'string' ? img : (img && (img.url || img.url?.toString())) || '';
          const isPdf = typeof url === 'string' && url.toLowerCase().includes('.pdf');
          const absUrl = typeof url === 'string' && url.startsWith('/') ? `${SITE_BASE_URL}${url}` : url;

          // build preview element
          let preview: React.ReactNode;
          if (isPdf) {
            preview = (
              <div className="w-full h-56 bg-white flex items-center justify-center">
                {logoUrl ? (
                  <div className="relative w-2/3 h-4/5">
                    <Image src={logoUrl} alt="university logo" fill className="object-contain p-6" />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">PDF document</div>
                )}
              </div>
            );
          } else {
            preview = (
              <div className="relative h-56 bg-white">
                {url ? (
                  <Image
                    src={url}
                    alt={(img && (img.name || img.alternativeText)) || `document-${i}`}
                    fill
                    className="object-contain"
                  />
                ) : logoUrl ? (
                  <Image src={logoUrl} alt="university logo" fill className="object-contain p-6" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">No preview available</div>
                )}
              </div>
            );
          }

          return (
            <div key={i} className="w-full bg-white rounded shadow-sm overflow-hidden flex flex-col items-center">
              {absUrl ? (
                <a href={absUrl} target="_blank" rel="noreferrer" className="w-full block">
                  {preview}
                </a>
              ) : (
                preview
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CertificateSection;
