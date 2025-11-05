import type { Metadata } from 'next';
import Script from 'next/script';
import { UniversitiesAPIResponse, UniversityDetailAPIResponse } from '@/types/university';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://collegecosmos.com';
const BASE = process.env.NEXT_PUBLIC_API_URL || 'https://admin.collegecosmos.in/api';
// Use shorter cache time in development, longer in production
export const revalidate = process.env.NODE_ENV === 'development' ? 60 : 60 * 30; // 1 min in dev, 30 mins in prod

type Seoable = {
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
  coverImage?: { url?: string };
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
};

// Use direct fetch with proper caching for build-time metadata generation
async function fetchSeo(slug: string): Promise<Seoable | null> {
  try {
    console.log('[Metadata] Fetching SEO data for slug:', slug);
    
    // First get all universities to find ID - with caching for build
    const allUniversitiesResponse = await fetch(`${BASE}/universities`, {
      next: { revalidate: process.env.NODE_ENV === 'development' ? 60 : 3600 }, // 1 min in dev, 1 hour in prod
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    if (!allUniversitiesResponse.ok) {
      console.error('[Metadata] Failed to fetch universities list');
      return null;
    }
    
    const allUniversities: UniversitiesAPIResponse = await allUniversitiesResponse.json();
    const university = allUniversities.data.find(uni => uni.slug === slug);
    
    if (!university) {
      console.error('[Metadata] University not found with slug:', slug);
      return null;
    }
    
    // Fetch detailed university data - with caching for build
    const detailResponse = await fetch(`${BASE}/universities/${university.id}`, {
      next: { revalidate: process.env.NODE_ENV === 'development' ? 60 : 3600 }, // 1 min in dev, 1 hour in prod
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    if (!detailResponse.ok) {
      console.error('[Metadata] Failed to fetch university details');
      return null;
    }
    
    const detailData: UniversityDetailAPIResponse = await detailResponse.json();
    
    console.log('[Metadata] SEO data fetched:', {
      name: detailData.data.name,
      hasMetaTitle: !!detailData.data.seo?.metaTitle,
      hasMetaDescription: !!detailData.data.seo?.metaDescription,
    });
    
    return detailData.data as Seoable;
  } catch (error) {
    console.error('[Metadata] Error fetching university SEO data:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await fetchSeo(slug);
  
  if (!entry) {
    console.warn('[Metadata] No SEO data found, using defaults');
    return {
      title: 'University Details - College Cosmos',
      description: 'Explore university programs, fees, eligibility, and more.',
    };
  }

  console.log('[Metadata] Generating metadata for:', entry.name);

  // Use SEO fields from API with fallbacks
  const title = entry.seo?.metaTitle || `${entry.name} - College Cosmos`;
  const desc = entry.seo?.metaDescription || entry.shortDescription || entry.description || `Explore programs, eligibility, fees and details about ${entry.name}.`;
  const keywords = entry.seo?.metaKeywords?.split(',').map(k => k.trim()).filter(Boolean) || [];
  
  // Build Open Graph image URL - prefer logo over coverImage
  const baseUrl = BASE.replace('/api', '');
  let ogImage: string | undefined;
  const imageSource = entry.logo || entry.coverImage;
  if (imageSource?.url) {
    ogImage = imageSource.url.startsWith('http') 
      ? imageSource.url 
      : `${baseUrl}${imageSource.url}`;
  }

  // Use custom canonical URL if provided, otherwise generate
  const canonicalUrl = entry.seo?.canonicalURL || `${SITE}/universities/${slug}`;

  console.log('[Metadata] Final metadata:', {
    title,
    description: desc.substring(0, 50) + '...',
    canonicalUrl,
    hasImage: !!ogImage,
    keywordsCount: keywords.length,
  });

  return {
    title,
    description: desc,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: { canonical: canonicalUrl },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description: desc,
      url: canonicalUrl,
      type: 'website',
      siteName: 'College Cosmos',
      locale: 'en_IN',
      images: ogImage ? [{ 
        url: ogImage,
        alt: `${entry.name} Logo`,
        width: 1200,
        height: 630,
      }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: ogImage ? [ogImage] : undefined,
      site: '@collegecosmos', // Add your Twitter handle
    },
  };
}

// Generate static params for popular universities (optional but recommended for performance)
export async function generateStaticParams() {
  try {
    // Fetch top universities to pre-generate
    const response = await fetch(`${BASE}/universities?pagination[limit]=20&filters[featured]=true`, {
      next: { revalidate: process.env.NODE_ENV === 'development' ? 60 : 3600 }, // 1 min in dev, 1 hour in prod
    });
    
    if (!response.ok) return [];
    
    const data = await response.json();
    const universities = data?.data || [];
    
    return universities.map((uni: any) => ({
      slug: uni.slug,
    }));
  } catch (error) {
    console.error('[StaticParams] Error:', error);
    return [];
  }
}

export default async function UniversitySlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await fetchSeo(slug);

  // Generate JSON-LD structured data for better SEO
  const jsonLd = entry ? {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    'name': entry.name,
    'description': entry.shortDescription || entry.description,
    'url': entry.seo?.canonicalURL || `${SITE}/universities/${slug}`,
    'logo': entry.logo?.url ? (entry.logo.url.startsWith('http') ? entry.logo.url : `${BASE.replace('/api', '')}${entry.logo.url}`) : undefined,
    'address': entry.location ? {
      '@type': 'PostalAddress',
      'addressLocality': entry.location.city,
      'addressRegion': entry.location.state,
      'addressCountry': entry.location.country,
    } : undefined,
  } : null;

  return (
    <>
      {jsonLd && (
        <Script
          id="university-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
