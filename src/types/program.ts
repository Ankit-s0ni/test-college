// Program-related types for the College Cosmos frontend

export interface ProgramImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    xsmall?: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path?: string;
      size: number;
      width: number;
      height: number;
      sizeInBytes: number;
    };
    thumbnail?: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path?: string;
      size: number;
      width: number;
      height: number;
      sizeInBytes: number;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ProgramAPI {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  degree: 'Certificate' | 'Bachelor' | 'Master' | 'Doctorate';
  mode?: 'Full-time' | 'Part-time' | 'Online' | 'Hybrid';
  standardDuration: string; // API uses standardDuration
  duration?: string; // Keep for backward compatibility
  standardEligibility?: string; // API uses standardEligibility
  eligibility?: string; // Keep for backward compatibility
  standardCurriculum?: string; // API uses standardCurriculum
  curriculum?: string; // Keep for backward compatibility
  averageSalary?: number;
  placementRate?: number;
  featured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string | null;
  description?: string;
  shortDescription?: string;
  totalFees?: number;
  yearlyFees?: number;
  image?: ProgramImage;
  syllabus?: string;
  specializations?: string;
  category?: {
    id: number;
    documentId: string;
    label: string;
    key: string;
    order: number;
    programs?: any[];
  } | null;
  entranceExams?: any[];
  universities?: any[];
  fees?: Array<{
    id: number;
    courseType: string;
    category: string;
    tuitionFee: number;
    otherFees: number;
    hostelFee?: number;
    messFee?: number;
    transportFee?: number;
    totalFee: number;
    frequency: string;
  }>;
}

export interface ProgramsAPIResponse {
  data: ProgramAPI[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface ProgramDetailAPIResponse {
  data: ProgramAPI;
  meta?: any;
}

// Frontend program item for display
export interface ProgramListItem {
  id: number;
  name: string;
  slug: string;
  duration: string;
  category: string;
  icon: string;
  degree: string;
  level: string;
  featured: boolean;
  averageSalary?: number;
  image?: ProgramImage;
}

// Program categories
export type ProgramCategory =
  | 'Executive Programs'
  | 'PG Courses'
  | 'UG Courses';
