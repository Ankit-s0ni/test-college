import { BlogPost } from 'types/blog';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'phd-duration',
    slug: 'how-long-is-a-phd-duration-breakdown-india-abroad',
    title: 'How Long is a PhD? Duration Breakdown for India & Abroad',
    excerpt:
      'A realistic look at timelines across India, US/UK/EU/Australia, plus factors that really influence finish time.',
    author: 'Collegecosmos',
    authorHref: '#',
    publishedAt: '2025-01-03T00:00:00.000Z',
    readTimeMin: 7,
    tag: { id: 'phd', label: 'PhD Guide' },
    badges: ['Duration', 'India & Abroad'],
    cover: null,
    featured: false,
  },
  {
    id: 'ugc-7-changes',
    slug: '7-major-changes-introduced-by-ugc-2025',
    title: '7 Major Changes Introduced by UGC You Need to Know About',
    excerpt:
      'UGC aims to make the education system more flexible, accessible and aligned with global standards so that anyone can pursue education…',
    author: 'Collegecosmos',
    authorHref: '#',
    publishedAt: '2025-01-03T00:00:00.000Z',
    readTimeMin: 6,
    tag: { id: 'policy', label: 'Introduced by UGC' },
    badges: ['7 Major Changes'],
    cover: null,
    featured: true,
  },
  {
    id: 'phd-scholarship-2025-1',
    slug: 'top-phd-scholarship-and-fellowship-opportunities-2025-1',
    title: 'Top PhD scholarship and Fellowship Opportunities in India 2025',
    excerpt:
      'India’s IT sector is experiencing a growth revolution, and BCA graduates stand to gain a lot in their career. The heightened utility…',
    author: 'Collegecosmos',
    authorHref: '#',
    publishedAt: '2024-05-30T00:00:00.000Z',
    readTimeMin: 5,
    tag: { id: 'phd', label: 'Top PhD scholarship' },
    badges: ['& Fellowship opportunities', 'in India 2025'],
    cover: null,
  },
  {
    id: 'phd-scholarship-2025-2',
    slug: 'top-phd-scholarship-and-fellowship-opportunities-2025-2',
    title: 'Top PhD scholarship and Fellowship Opportunities you should not miss this year',
    excerpt:
      'From national fellowships to institute-specific grants, here’s a comprehensive list with eligibility, stipend and deadlines…',
    author: 'Collegecosmos',
    authorHref: '#',
    publishedAt: '2024-05-30T00:00:00.000Z',
    readTimeMin: 4,
    tag: { id: 'phd', label: 'Top PhD scholarship' },
    badges: ['& Fellowship opportunities', 'in India 2025'],
    cover: null,
  },
  {
    id: 'phd-duration',
    slug: 'how-long-is-a-phd-duration-breakdown-india-abroad',
    title: 'How Long is a PhD? Duration Breakdown for India & Abroad',
    excerpt:
      'A realistic look at timelines across India, US/UK/EU/Australia, plus factors that really influence finish time.',
    author: 'Collegecosmos',
    authorHref: '#',
    publishedAt: '2025-01-03T00:00:00.000Z',
    readTimeMin: 7,
    tag: { id: 'phd', label: 'PhD Guide' },
    badges: ['Duration', 'India & Abroad'],
    cover: null,
    featured: false,
  },
  // — add a bunch more to make the grid feel full —
  ...Array.from({ length: 12 }).map((_, i) => ({
    id: `phd-${i + 3}`,
    slug: `top-phd-scholarship-and-fellowship-opportunities-2025-${i + 3}`,
    title:
      i % 3 === 0
        ? 'Top PhD scholarship and Fellowship Opportunities…'
        : 'A Fellowship opportunities in India 2025',
    excerpt:
      'Brief overview of eligibility, stipends and how to shortlist programs. Insights tailored for Indian students and fresh grads…',
    author: 'Collegecosmos',
    authorHref: '#',
    publishedAt: '2024-05-30T00:00:00.000Z',
    readTimeMin: 4 + (i % 3),
    tag:
      i % 2 === 0
        ? { id: 'phd', label: 'Top PhD scholarship' }
        : { id: 'opp', label: 'Opportunities' },
    badges:
      i % 2 === 0 ? ['& Fellowship opportunities', 'in India 2025'] : ['Scholarships', 'Guide'],
    cover: null,
  })),
];
