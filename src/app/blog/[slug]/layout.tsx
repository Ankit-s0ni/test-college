import type { Metadata } from 'next';
import { blogsAPI } from '@/lib/api';
import { SITE_BASE_URL } from '@/lib/config';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://collegecosmos.com';
export const revalidate = 3600; // 1 hour

type BlogSeo = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  seo?: { 
    metaTitle?: string; 
    metaDescription?: string;
    metaKeywords?: string;
    canonicalURL?: string;
  };
  coverImage?: { 
    url: string;
    alternativeText?: string | null;
    width?: number;
    height?: number;
  };
  cover?: {
    url: string;
  };
  publishedAt?: string;
  updatedAt?: string;
  author?: { name?: string };
  readTimeMin?: number;
};

async function fetchBlogSeo(slug: string): Promise<BlogSeo | null> {
  try {
    console.log('🔍 [Blog SEO] Fetching blog for slug:', slug);
    
    // Get all blogs to find the one with matching slug
    const blogsResponse = await blogsAPI.getAll();
    const matchingBlog = blogsResponse.data.find((blog) => blog.slug === slug);
    
    if (!matchingBlog) {
      console.log('❌ [Blog SEO] Blog not found for slug:', slug);
      return null;
    }

    // Get full blog details
    const blogDetailResponse = await blogsAPI.getById(matchingBlog.id.toString());
    console.log('✅ [Blog SEO] Blog data fetched:', {
      title: blogDetailResponse.data.title,
      hasSEO: !!blogDetailResponse.data.seo,
    });
    
    return blogDetailResponse.data;
  } catch (error) {
    console.error('❌ [Blog SEO] Error fetching blog SEO data:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await fetchBlogSeo(slug);
  
  if (!entry) {
    return {
      title: 'Blog Post - College Cosmos',
      description: 'Read our latest insights on education, programs, and career guidance.',
    };
  }

  // Use SEO fields from API with fallbacks
  const title = entry.seo?.metaTitle || entry.title;
  const desc = entry.seo?.metaDescription || entry.excerpt || 'Read this article on our blog.';
  const keywords = entry.seo?.metaKeywords?.split(',').map((k: string) => k.trim()) || [];
  
  // Build Open Graph image URL
  let ogImage: string | undefined;
  if (entry.coverImage?.url) {
    ogImage = entry.coverImage.url.startsWith('http') 
      ? entry.coverImage.url 
      : `${SITE_BASE_URL}${entry.coverImage.url}`;
  } else if (entry.cover?.url) {
    ogImage = entry.cover.url.startsWith('http')
      ? entry.cover.url
      : `${SITE_BASE_URL}${entry.cover.url}`;
  }

  // Use custom canonical URL if provided, otherwise generate
  const canonicalUrl = entry.seo?.canonicalURL || `${SITE}/blog/${slug}`;
  const authorName = entry.author?.name || 'College Cosmos Team';
  const publishedTime = entry.publishedAt;
  const modifiedTime = entry.updatedAt || entry.publishedAt;

  console.log('📝 [Blog SEO] Generated metadata:', {
    title,
    canonicalUrl,
    hasCoverImage: !!ogImage,
    author: authorName,
  });

  return {
    title,
    description: desc,
    keywords: keywords.length > 0 ? keywords : undefined,
    authors: [{ name: authorName }],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description: desc,
      url: canonicalUrl,
      type: 'article',
      siteName: 'College Cosmos',
      publishedTime,
      modifiedTime,
      authors: [authorName],
      images: ogImage ? [{
        url: ogImage,
        alt: entry.coverImage?.alternativeText || entry.title,
        width: entry.coverImage?.width || 1200,
        height: entry.coverImage?.height || 630,
      }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: ogImage ? [ogImage] : undefined,
      creator: '@collegecosmos',
    },
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
  };
}

export default function BlogSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
