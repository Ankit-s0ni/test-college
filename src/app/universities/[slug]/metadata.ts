import type { Metadata } from 'next';
import qs from 'qs';

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
export const revalidate = 60 * 60; // 1 hour revalidation

type University = {
  name: string;
  slug: string;
  description?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  logo?: { data?: { attributes: { url: string } } };
};

async function fetchUniversity(slug: string): Promise<University | null> {
  const query = qs.stringify(
    { filters: { slug: { $eq: slug } }, populate: ['seo', 'logo'] },
    { encodeValuesOnly: true },
  );
  const res = await fetch(`${BASE}/universities?${query}`, {
    next: { revalidate },
  });
  if (!res.ok) return null;

  const json = await res.json();
  return json?.data?.[0]?.attributes ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const uni = await fetchUniversity(params.slug);
  if (!uni) return {};

  const title = uni.seo?.metaTitle || `${uni.name} – University Overview`;
  const desc =
    uni.seo?.metaDescription ||
    uni.description ||
    `Explore programs, eligibility, fees and details about ${uni.name}.`;

  const logo =
    uni.logo?.data?.attributes?.url && `${BASE.replace('/api', '')}${uni.logo.data.attributes.url}`;

  const url = `${SITE}/universities/${params.slug}`;

  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: desc,
      url,
      type: 'website',
      images: logo ? [logo] : undefined,
    },
  };
}
