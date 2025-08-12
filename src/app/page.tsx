import React from 'react';
import HeroSection from "@/pages/home/hero-section";
import ProgramsSection from "@/pages/home/programs-section";
import UniversitiesSection from "@/pages/home/universities-section";
import ReasonsSection from "@/pages/home/reasons-section";
import TestimonialsSection from "@/pages/home/testimonials-section";
import BlogsSection from "@/pages/home/blogs-section";
import ContactsSection from "@/pages/home/contact-section";
import FooterSection from "@/pages/home/footer-section";
import FaqsSection from "@/pages/home/faqs-section";


export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="">
        <HeroSection />
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
