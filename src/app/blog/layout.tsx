import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://collegecosmos.com';

export const metadata: Metadata = {
  title: 'Blog – Insights on Programs, Admissions & Careers',
  description: 'Read expert content on universities, admissions, exams, and career choices from College Cosmos.',
  keywords: ['education blog', 'university admissions', 'online programs', 'career guidance', 'MBA', 'engineering', 'distance learning'],
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'Blog – College Cosmos',
    description: 'Expert content on online programs, admissions, and careers.',
    url: `${SITE_URL}/blog`,
    type: 'website',
    siteName: 'College Cosmos',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog – College Cosmos',
    description: 'Expert content on online programs, admissions, and careers.',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
