'use client';

import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';

import ReasonImg1 from '../../../public/assets/icons/reason-1.svg';
import ReasonImg2 from '../../../public/assets/icons/reason-2.svg';

const REASONS: React.ReactNode[] = [
  <>50+ Universities at one platform</>,
  <>
    Fast check admission <strong>eligibility</strong> criteria
  </>,
  <>
    Choose your <strong>favourite</strong> university
  </>,
  <>24×7 customer support</>,
];

export default function ReasonsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          {/* Left: Heading + paragraph + illustration */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Reason To Choose Us</h2>
              <p className="text-black max-w-[46ch]">
                At Lorem, we provide exceptional technology solutions and services. We leverage our
                large base to deliver solutions that meet customers, business and budget
                expectations. We firmly deliver customized solutions for needs.
              </p>
            </div>

            {/* Illustration (kept below text like the reference) */}
            <div className="relative w-full ">
              <div className="relative">
                <Image
                  src={ReasonImg1}
                  alt="Students and learning materials"
                  // fill
                  // className="object-cover"
                  priority={false}
                />
              </div>
            </div>
          </div>

          {/* Right: Big tick list + graduate illustration */}
          <div className="flex flex-col lg:items-end gap-8 relative h-[500px] lg:h-full">
            <ul className="space-y-5 w-full h-full">
              {REASONS.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span aria-hidden className="mt-0.5">
                    <Check className="h-7 w-7" strokeWidth={3} />
                  </span>
                  <span className="text-base sm:text-2xl font-medium leading-snug">{item}</span>
                </li>
              ))}
            </ul>

            <div className="absolute bottom-0 right-0">
              <Image
                src={ReasonImg2}
                alt="Graduate leaping over stacks of books"
                // fill
                // className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
