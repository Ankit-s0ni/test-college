import type { Metadata } from 'next';
import qs from 'qs';

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
export const revalidate = 60 * 30;

type Seoable = {
  title: string;
  slug: string;
  excerpt?: string;
  seo?: { metaTitle?: string; metaDescription?: string };
  cover?: { data?: { attributes: { url: string } } };
};

async function fetchSeo(slug: string): Promise<Seoable | null> {
  const query = qs.stringify(
    { filters: { slug: { $eq: slug } }, populate: ['seo', 'cover'] },
    { encodeValuesOnly: true },
  );
  const res = await fetch(`${BASE}/blogs?${query}`, { next: { revalidate } });
  if (!res.ok) return null;
  const json = await res.json();
  return json?.data?.[0]?.attributes ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const entry = await fetchSeo(params.slug);
  if (!entry) return {};

  const title = entry.seo?.metaTitle || entry.title;
  const desc = entry.seo?.metaDescription || entry.excerpt || 'Read this article on our blog.';
  const og =
    entry.cover?.data?.attributes?.url &&
    `${BASE.replace('/api', '')}${entry.cover.data.attributes.url}`;

  const url = `${SITE}/blog/${params.slug}`;

  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: desc,
      url,
      type: 'article',
      images: og ? [og] : undefined,
    },
  };
}
