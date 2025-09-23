import React from 'react';
import ContactsSection from '@/components/home/contact-section';
import FooterSection from '@/components/home/footer-section';
import Image from 'next/image';

export const metadata = {
  title: 'Contact Us - College Cosmos',
  description: 'Get in touch with College Cosmos for support, partnerships, or media enquiries.',
};

const CONTACT_BANNER = '/assets/images/hero-img.png';

export default function ContactPage() {
  return (
    <>
      <main>
        <section className="w-full">
          <div className="relative h-[220px] sm:h-[280px] md:h-[340px] lg:h-[420px]">
            <Image src={CONTACT_BANNER} alt="contact banner" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Contact College Cosmos</h1>
                <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-white/90">
                  Have a question or need help? Fill the form and our team will reach out within 48 hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid lg:grid-cols-1 gap-8 items-start">
            <div className="lg:col-span-1">
              <ContactsSection />
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
}
