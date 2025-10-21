import type { Metadata } from 'next';

const BASE = process.env.NEXT_PUBLIC_API_URL || 'https://admin.collegecosmos.in/api';
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://collegecosmos.com';
export const revalidate = 60 * 60; // 1 hour revalidation

type University = {
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
    canonicalURL?: string;
  };
  logo?: { url?: string };
};

async function fetchUniversity(slug: string): Promise<University | null> {
  try {
    console.log('🔍 [Metadata] Fetching university with slug:', slug);
    console.log('🔍 [Metadata] API BASE:', BASE);
    
    // First, get all universities to find the one with matching slug
    const allRes = await fetch(`${BASE}/universities`, {
      next: { revalidate },
      cache: 'no-store', // Force fresh data for testing
    });
    
    if (!allRes.ok) {
      console.error('❌ [Metadata] Failed to fetch universities list:', allRes.status);
      return null;
    }

    const allData = await allRes.json();
    console.log('📋 [Metadata] Total universities found:', allData.data?.length);
    
    // Find university with matching slug
    const university = allData.data?.find((uni: any) => uni.slug === slug);
    
    if (!university) {
      console.error(`❌ [Metadata] University with slug "${slug}" not found`);
      return null;
    }
    
    console.log('✅ [Metadata] Found university:', university.name, 'ID:', university.id);
    
    // Now fetch detailed data using the ID (includes all populated data)
    const detailRes = await fetch(`${BASE}/universities/${university.id}`, {
      next: { revalidate },
      cache: 'no-store', // Force fresh data for testing
    });
    
    if (!detailRes.ok) {
      console.error('❌ [Metadata] Failed to fetch university details:', detailRes.status);
      return null;
    }
    
    const detailData = await detailRes.json();
    console.log('✅ [Metadata] University data fetched successfully');
    console.log('📊 [Metadata] SEO Data:', detailData?.data?.seo);
    
    return detailData?.data ?? null;
  } catch (error) {
    console.error('❌ [Metadata] Error fetching university:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  console.log('🎯 [generateMetadata] Called for slug:', params.slug);
  
  const uni = await fetchUniversity(params.slug);
  if (!uni) {
    console.error('❌ [generateMetadata] No university data available');
    return {};
  }

  const title = uni.seo?.metaTitle || `${uni.name} – University Overview`;
  const desc =
    uni.seo?.metaDescription ||
    uni.shortDescription ||
    uni.description ||
    `Explore programs, eligibility, fees and details about ${uni.name}.`;

  const logo = uni.logo?.url ? `${BASE.replace('/api', '')}${uni.logo.url}` : undefined;

  const canonicalUrl = uni.seo?.canonicalURL || `${SITE}/universities/${params.slug}`;

  console.log('📝 [generateMetadata] Generated metadata:');
  console.log('   Title:', title);
  console.log('   Description:', desc.substring(0, 100) + '...');
  console.log('   Canonical:', canonicalUrl);
  console.log('   Keywords:', uni.seo?.metaKeywords);

  const metadata: Metadata = {
    title,
    description: desc,
    keywords: uni.seo?.metaKeywords?.split(',').map((k: string) => k.trim()),
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description: desc,
      url: canonicalUrl,
      type: 'website',
      siteName: 'College Cosmos',
      images: logo ? [{ url: logo, alt: `${uni.name} Logo` }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: logo ? [logo] : undefined,
    },
  };

  return metadata;
}
