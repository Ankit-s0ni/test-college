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
  featured?: boolean; // for the big “UGC changes” block
};
