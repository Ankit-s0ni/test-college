import React from 'react';
import HeroSection from '@/components/home/hero-section';
import ProgramsSection from '@/components/home/programs-section';
import UniversitiesSection from '@/components/home/universities-section';
import UniversityLogosSection from '@/components/home/university-logos-section';
import ReasonsSection from '@/components/home/reasons-section';
import TestimonialsSection from '@/components/home/testimonials-section';
import BlogsSection from '@/components/home/blogs-section';
import ContactsSection from '@/components/home/contact-section';
import FooterSection from '@/components/home/footer-section';
import FaqsSection from '@/components/home/faqs-section';

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="">
        <HeroSection />
        <UniversityLogosSection />
        <ProgramsSection />
        <UniversitiesSection />
        <ReasonsSection />
        <TestimonialsSection />
        <BlogsSection />
        <FaqsSection />
        <ContactsSection />
      </main>
      <FooterSection />
    </div>
  );
}
