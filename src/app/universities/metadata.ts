import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata: Metadata = {
  title: 'Universities – Explore Accredited Institutions',
  description:
    'Browse accredited universities offering online and on‑campus programs. Compare courses, fees, and eligibility.',
  alternates: { canonical: `${SITE_URL}/universities` },
  openGraph: {
    title: 'Universities',
    description: 'Discover leading universities and compare programs, fees, and eligibility.',
    url: `${SITE_URL}/universities`,
    type: 'website',
  },
};
