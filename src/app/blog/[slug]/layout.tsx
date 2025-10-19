import type { Metadata } from 'next';
import qs from 'qs';

const BASE = process.env.NEXT_PUBLIC_API_URL || 'https://admin.collegecosmos.in/api';
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://collegecosmos.com';
export const revalidate = 60 * 30;

type Seoable = {
  title: string;
  slug: string;
  excerpt?: string;
  seo?: { 
    metaTitle?: string; 
    metaDescription?: string;
    metaKeywords?: string;
    canonicalURL?: string;
  };
  coverImage?: { url: string };
  publishedAt?: string;
  author?: { name?: string };
};

async function fetchSeo(slug: string): Promise<Seoable | null> {
  const query = qs.stringify(
    { 
      filters: { slug: { $eq: slug } }, 
      populate: ['seo', 'coverImage', 'author'] 
    },
    { encodeValuesOnly: true },
  );
  
  try {
    const res = await fetch(`${BASE}/blogs?${query}`, { 
      next: { revalidate },
      cache: 'force-cache'
    });
    
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data?.[0] ?? null;
  } catch (error) {
    console.error('Error fetching SEO data:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const entry = await fetchSeo(params.slug);
  if (!entry) {
    return {
      title: 'Blog Post - College Cosmos',
      description: 'Read our latest insights on education, programs, and career guidance.',
    };
  }

  // Use SEO fields from API with fallbacks
  const title = entry.seo?.metaTitle || entry.title;
  const desc = entry.seo?.metaDescription || entry.excerpt || 'Read this article on our blog.';
  const keywords = entry.seo?.metaKeywords?.split(',').map(k => k.trim()) || [];
  
  // Build Open Graph image URL
  const baseUrl = BASE.replace('/api', '');
  let ogImage: string | undefined;
  if (entry.coverImage?.url) {
    ogImage = entry.coverImage.url.startsWith('http') 
      ? entry.coverImage.url 
      : `${baseUrl}${entry.coverImage.url}`;
  }

  // Use custom canonical URL if provided, otherwise generate
  const canonicalUrl = entry.seo?.canonicalURL || `${SITE}/blog/${params.slug}`;

  return {
    title,
    description: desc,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description: desc,
      url: canonicalUrl,
      type: 'article',
      images: ogImage ? [{ url: ogImage }] : undefined,
      publishedTime: entry.publishedAt,
      authors: entry.author?.name ? [entry.author.name] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default function BlogSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
