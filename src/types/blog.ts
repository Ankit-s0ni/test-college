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
    name: string;
    bio?: string;
    avatar?: string;
  };
  cover?: {
    url: string;
    alt?: string;
  };
  tags?: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
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