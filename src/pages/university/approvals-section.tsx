import { Approvals } from '@/app/universities/[slug]/page';
import React from 'react';
import NaacImg from '../../../public/assets/images/naac.jpg';
import Image from 'next/image';

const ApprovalsSection = ({ data }: { data: Approvals }) => {
  return (
    <section id="approvals" className="space-y-4 rounded-lg bg-[#F9F9FF]">
      <h2 className="text-xl font-semibold">{data.title}</h2>
      <p className="text-sm">{data.description}</p>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {data.images.map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-between h-32 bg-[#FFF6E8] overflow-hidden"
          >
            {/* Replace these src values with real ones later */}
            <Image
              src={NaacImg}
              alt="approval"
              className="object-contain h-[60%] w-auto mt-3"
              width={200}
              height={100}
            />
            <div className="w-full text-center bg-[#1E4BFF] text-white text-xs py-1">NAAC</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ApprovalsSection;
