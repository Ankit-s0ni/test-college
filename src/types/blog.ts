export type BlogTag = {
  id: string;
  label: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  authorHref?: string;
  publishedAt: string; // ISO string
  readTimeMin: number;
  tag: BlogTag; // primary tag/pill shown on the card
  badges?: string[]; // tiny label chips (optional)
  cover?: string | null; // /blog/xxx.jpg (optional)
  featured?: boolean; // for the big "UGC changes" block
};

// API Response Types
export interface BlogAPI {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  readTimeMin: number;
  author?: {
    id: number;
    documentId: string;
    name: string;
    email?: string;
    bio?: string;
    avatar?: string;
  };
  coverImage?: {
    id: number;
    documentId: string;
    name: string;
    url: string;
    alternativeText?: string | null;
    caption?: string | null;
    width: number;
    height: number;
    formats?: {
      large?: { url: string; width: number; height: number };
      medium?: { url: string; width: number; height: number };
      small?: { url: string; width: number; height: number };
      thumbnail?: { url: string; width: number; height: number };
      xsmall?: { url: string; width: number; height: number };
    };
  };
  cover?: {
    url: string;
    alt?: string;
  };
  primaryTag?: {
    id: number;
    documentId: string;
    label: string;
    slug: string;
    color: string;
  };
  tags?: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  seo?: {
    id: number;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
    structuredData?: any;
    canonicalURL?: string;
  };
}

export interface BlogsAPIResponse {
  data: BlogAPI[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface BlogDetailAPIResponse {
  data: BlogAPI;
  meta: Record<string, unknown>;
}