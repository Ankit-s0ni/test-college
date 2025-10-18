import Head from 'next/head';

interface SEOMetadataProps {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalURL?: string;
  defaultTitle: string;
  defaultDescription: string;
}

export default function SEOMetadata({
  metaTitle,
  metaDescription,
  metaKeywords,
  canonicalURL,
  defaultTitle,
  defaultDescription,
}: SEOMetadataProps) {
  const title = metaTitle || defaultTitle;
  const description = metaDescription || defaultDescription;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {metaKeywords && <meta name="keywords" content={metaKeywords} />}
      {canonicalURL && <link rel="canonical" href={canonicalURL} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {canonicalURL && <meta property="og:url" content={canonicalURL} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Head>
  );
}
