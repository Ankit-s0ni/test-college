import React from 'react';
import Image from 'next/image';
import FooterSection from '@/components/home/footer-section';
import Testimonials from '@/components/about/testimonials';

export const metadata = {
  title: 'About Us - College Cosmos',
  description:
    'Helping students find the best colleges, programs and career pathways with honest reviews, curated tools and expert guidance.',
};

const ABOUT_BANNER = '/assets/images/hero-img.png';

export default function AboutPage() {
  return (
    <>
      <main>
        {/* Banner */}
        <section className="w-full">
          <div className="relative h-[260px] sm:h-[320px] md:h-[380px] lg:h-[460px]">
            <Image src={ABOUT_BANNER} alt="about banner" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">About College Cosmos</h1>
                <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-white/90">
                  Helping students find the best colleges, programs and career pathways with
                  honest reviews, curated tools and expert guidance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-2 items-start">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Who we are</h2>
              <p className="text-gray-700 leading-relaxed">
                College Cosmos is a student-first college discovery platform built to simplify
                the search for higher education. We combine verified student reviews, expert
                editorial content, and curated program data so you can compare colleges and
                choose the right fit for your goals.
              </p>

              <h3 className="mt-6 text-lg font-medium">Our approach</h3>
              <p className="text-gray-700 leading-relaxed mt-2">
                We surface reliable signals — reviews, placements, faculty quality, campus
                facilities and accreditation — and present them in clear, comparable formats.
                Our editorial team verifies information and provides actionable guidance.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-6 border rounded-lg shadow-sm">
                <h4 className="text-xl font-semibold">Mission</h4>
                <p className="text-gray-600 mt-2">Empower every student to confidently find the best college for their future.</p>
              </div>

              <div className="p-6 border rounded-lg shadow-sm">
                <h4 className="text-xl font-semibold">Vision</h4>
                <p className="text-gray-600 mt-2">Become the most trusted and helpful college discovery resource in the region.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-surface-50 border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-brand-primary">1,200+</div>
                <div className="text-sm text-muted-foreground">Colleges Reviewed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-primary">500k+</div>
                <div className="text-sm text-muted-foreground">Students helped</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-primary">+100</div>
                <div className="text-sm text-muted-foreground">Expert Contributors</div>
              </div>
            </div>
          </div>
        </section>

        {/* Values / How we work */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h3 className="text-2xl font-semibold mb-6">How we work</h3>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="p-6 border rounded-lg">
              <h4 className="font-semibold">Verified Reviews</h4>
              <p className="text-gray-600 mt-2">We verify contributing students to keep reviews trustworthy.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h4 className="font-semibold">Data-driven</h4>
              <p className="text-gray-600 mt-2">We use structured data and signals to surface meaningful comparisons.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h4 className="font-semibold">Student-first</h4>
              <p className="text-gray-600 mt-2">Our features and editorial focus on practical student outcomes.</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12">
          <h3 className="text-2xl font-semibold mb-3">What students say about us</h3>
          <p className="text-gray-600 mb-6">Real feedback from students who used College Cosmos to find their college and programs.</p>

          <Testimonials />
        </section>

        
      </main>
      <FooterSection />
    </>
  );
}

