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
    q: 'How do I choose the right college for my course?',
    a: 'Start by listing priorities (specialization, placements, fees, location). Use our filters to compare course curriculum, placement stats, faculty profiles and student reviews. Shortlist 3–5 colleges, visit campuses if possible, and compare final costs and career outcomes.',
  },
  {
    q: 'What factors should I consider besides rankings?',
    a: 'Look at placement rates and average salary, course curriculum and industry connections, faculty experience, campus facilities, student support services, accreditations, and alumni network — rankings are a single data point among many.',
  },
  {
    q: 'Can I compare fees, scholarships and ROI across colleges?',
    a: 'Yes — our comparison tools show tuition, typical scholarships, average package after graduation, and estimated return on investment so you can evaluate affordability and long-term value.',
  },
  {
    q: 'Do you provide personalized counselling or application help?',
    a: 'We offer free guidance content and paid one-on-one counselling options. Use the "Talk To Our Expert" button to schedule a call for personalized shortlisting, eligibility checks, and application support.',
  },
  {
    q: 'How reliable are student reviews and placement information?',
    a: 'We surface reviews from verified students and aggregate placement data from official reports when available. Still, we recommend cross-checking with college websites and contacting admissions for the most current figures.',
  },
  {
    q: 'What documents and deadlines should I watch for?',
    a: 'Typical requirements include transcripts, entrance test scores, ID/proof of residence, and essays or recommendation letters for some programs. Deadlines vary — add colleges you like to your dashboard to get deadline reminders.',
  },
];

export default function FaqsSection() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#FBF7FF] to-[#F5EEFF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <header className="mb-8 sm:mb-12 text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">FAQs</h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto sm:mx-0">
            Quick answers to common questions — tap any question to reveal a helpful explanation.
          </p>
        </header>

        <Accordion type="single" collapsible defaultValue="item-1" className="space-y-4">
          {FAQS.map((item, idx) => {
            const id = `item-${idx + 1}`;
            return (
              <AccordionItem
                key={id}
                value={id}
                className="rounded-2xl border border-border bg-white/80 shadow-sm overflow-hidden transition-shadow duration-200 hover:shadow-md data-[state=open]:shadow-lg"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline flex items-center justify-between gap-4">
                  <span className="text-[16px] sm:text-[18px] font-semibold">{item.q}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {item.a}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
