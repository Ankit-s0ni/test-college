import { Approvals } from '@/app/universities/[slug]/page';
import React from 'react';
import Image from 'next/image';
const NaacImg = '/assets/images/naac.jpg';

const ApprovalsSection = ({ data }: { data: Approvals }) => {
  return (
    <section id="approvals" className="space-y-4 rounded-lg bg-[#F9F9FF] p-4">
      <h2 className="text-xl font-semibold">{data.title}</h2>
      <p className="text-sm">{data.description}</p>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {data.items.map((item, i) => (
          <div key={i} className="flex flex-col items-center justify-between h-32 bg-[#FFF6E8] overflow-hidden p-2">
            <div className="relative h-16 w-full flex items-center justify-center">
              {item.logo ? (
                <Image src={item.logo} alt={item.body || 'approval logo'} width={120} height={60} className="object-contain" />
              ) : (item.body && item.body.toLowerCase().includes('naac') ? (
                <Image src={NaacImg} alt="NAAC" width={120} height={60} className="object-contain" />
              ) : null)}
            </div>
            <div className="w-full text-center bg-[#1E4BFF] text-white text-xs py-1">
              {item.body || item.status || 'Approval'}{item.grade ? ` • ${item.grade}` : ''}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ApprovalsSection;
