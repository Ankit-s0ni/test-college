import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_NAME} – Top Online Universities & Programs in India`,
  description: "Explore India's best UGC-approved online courses and universities. Compare programs, read blogs, and get expert guidance on College Cosmos.",
  openGraph: {
    title: `${SITE_NAME} – Discover UGC-Approved Programs`,
    description: "Explore India's leading online universities. Apply to accredited courses and connect with experts.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/assets/images/og-home.jpg`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} Hero`,
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};