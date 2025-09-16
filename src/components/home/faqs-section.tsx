'use client';

import * as React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

const FAQS = [
  {
    q: 'What is Lorem ipsum?',
    a: 'Lorem ipsum is a placeholder text commonly used in the printing and typesetting industry to demonstrate content layout without being distracted by readable content.',
  },
  {
    q: 'Do Lorem ipsum charge for counselling?',
    a: 'Yes/no, all need booked ticket through lorem are insured. We offer comprehensive transit insurance to ensure your belongings are covered during the purchase.',
  },
  {
    q: 'How can Lorem ipsum help students to apply to the best university?',
    a: 'We provide personalized guidance, eligibility checking, university matching, and application support to help students find and apply to their ideal universities.',
  },
  {
    q: 'Can I get one-two-one personalized advice from Lorem ipsum ?',
    a: 'Yes, we offer personalized one-on-one counseling sessions with our expert advisors to help you make informed decisions about your education.',
  },
  {
    q: 'How can I compare multiple courses at once?',
    a: 'Our platform lets you compare multiple courses side by side—curriculum, fees, duration, and career prospects—so you can choose confidently.',
  },
];

export default function FaqsSection() {
  return (
    <section className="py-16 sm:py-20 bg-[#F5EEFF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <header className="mb-8 sm:mb-12">
          <h2 className="text-3xl font-bold mb-2">FAQs</h2>
          <p className="text-sm text-muted-foreground">
            List of questions that are generally asked!
          </p>
        </header>

        <Accordion type="single" collapsible defaultValue="item-1" className="space-y-4">
          {FAQS.map((item, idx) => {
            const id = `item-${idx + 1}`;
            return (
              <AccordionItem
                key={id}
                value={id}
                className="rounded-xl border border-border bg-card shadow-sm data-[state=open]:shadow-md overflow-hidden"
              >
                <AccordionTrigger className="px-5 sm:px-6 py-4 text-left hover:no-underline">
                  <span className="text-[15px] sm:text-base font-medium">{item.q}</span>
                </AccordionTrigger>
                <AccordionContent className="px-5 sm:px-6 pb-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
