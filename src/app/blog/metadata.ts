import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata: Metadata = {
  title: 'Blog – Insights on Programs, Admissions & Careers',
  description: 'Read expert content on universities, admissions, exams, and career choices.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'Blog – College Cosmos',
    description: 'Expert content on online programs, admissions, and careers.',
    url: `${SITE_URL}/blog`,
    type: 'website',
  },
};
