import type { Metadata } from 'next';
import { universitiesAPI } from '@/lib/api';
import Script from 'next/script';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://collegecosmos.com';
const BASE = process.env.NEXT_PUBLIC_API_URL || 'https://admin.collegecosmos.in/api';
export const revalidate = 60 * 30; // Revalidate every 30 minutes

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

async function fetchSeo(slug: string): Promise<Seoable | null> {
  try {
    console.log('[Metadata] Fetching SEO data for slug:', slug);
    
    // Use the same API call as the page component
    const response = await universitiesAPI.getBySlug(slug);
    
    console.log('[Metadata] API Response:', response?.data?.name || 'No data');
    
    if (!response?.data) {
      console.error('[Metadata] No data returned from API');
      return null;
    }
    
    const university = response.data;
    console.log('[Metadata] SEO data:', {
      hasMetaTitle: !!university.seo?.metaTitle,
      hasMetaDescription: !!university.seo?.metaDescription,
      hasCanonicalURL: !!university.seo?.canonicalURL,
    });
    
    return university as Seoable;
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
      next: { revalidate: 3600 }, // Cache for 1 hour
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
