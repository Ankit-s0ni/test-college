import { Certificate } from '@/app/universities/[slug]/page';
import Image from 'next/image';
import React from 'react';
import NaacImg from '../../../public/assets/images/naac.jpg';

const CertificateSection = ({ data }: { data: Certificate }) => {
  return (
    <section id="certificate" className="bg-[#F4F5FE] p-6 rounded-lg space-y-4">
      <h2 className="text-xl font-semibold">{data.title}</h2>

      <div className="grid sm:grid-cols-2 gap-6">
        {data.images.map((_, i) => (
          <div key={i} className="relative w-full">
            <Image
              src={NaacImg}
              alt="Sample certificate"
              width={500}
              height={350}
              className="w-full h-auto drop-shadow-xl"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CertificateSection;
