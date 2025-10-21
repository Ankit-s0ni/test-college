export type ProgramCategory =
  | 'Executive Programs'
  | 'PG Courses'
  | 'UG Courses';

export interface ProgramFilterGroup {
  key: string;
  label: ProgramCategory;
  options: string[];
}

export interface UniversityListItem {
  slug: string;
  name: string;
  city?: string;
  approvals: string[];
  rating: number;
  logo: string;
  image: string;
  prospectusUrl?: string;
}

// API-specific types (updated to match actual backend response)
export interface UniversityAPI {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  website?: string;
  established?: number;
  universityType?: string;
  affiliation?: string;
  city?: string;
  state?: string;
  contactPhone?: string;
  contactEmail?: string;
  rating?: number;
  totalRatings?: number;
  totalStudents?: number;
  placementRate?: number;
  averagePlacementPackage?: number;
  highestPlacementPackage?: number;
  isActive: boolean;
  featured: boolean;
  collegeStatus: string;
  tagline?: string;
  hostelFacility: boolean;
  order: number;
  dataQuality: string;
  lastVerified?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale: string;
  logo?: {
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string;
    url: string;
    width: number;
    height: number;
  };
  coverImage?: {
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string;
    url: string;
    width: number;
    height: number;
  };
  featuredImage?: {
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string;
    url: string;
    width: number;
    height: number;
  };
  gallery?: Array<{
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string;
    url: string;
    width: number;
    height: number;
  }>;
  location?: {
    id: number;
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    coordinates?: {
      id: number;
      latitude: number;
      longitude: number;
    };
  };
  contact?: {
    id: number;
    phone?: string;
    email?: string;
    fax?: string;
    tollFree?: string;
    socialMedia?: Array<{
      id: number;
      platform: string;
      url: string;
      handle?: string;
    }>;
  };
  ranking?: Array<{
    id: number;
    organization: string;
    rank: number;
    year: number;
    category: string;
    score: number;
  }>;
  accreditation?: Array<{
    id: number;
    body: string;
    grade: string;
    status: string;
    validFrom: string;
    validUntil: string;
    cgpa?: number;
  }>;
  approvals?: any[];
  courses?: any[];
  departments?: any[];
  programs?: any[];
  reviews?: any[];
  facilities?: any[];
  placements?: any[];
  fees?: any[];
  seo?: {
    id: number;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
    structuredData?: any;
    canonicalURL?: string;
  };
  brochures?: Array<{
    id: number;
    name: string;
    url: string;
    alternativeText?: string;
  }>;
  hiringPartners?: any[];
  contactDetails?: any[];
  advantages?: any[];
  faqs?: any[];
  campusGroups?: any[];
  placementRecords?: any[];
  financialAid?: any;
  studentStrength?: number;
  facultyCount?: number;
  campusSize?: number;
  libraryBooks?: number;
  canonicalUrl?: string;
  internalNotes?: string;
}

export interface UniversitiesAPIResponse {
  data: UniversityAPI[];
}

export interface UniversityDetailAPIResponse {
  data: UniversityAPI;
}
