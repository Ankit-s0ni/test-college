// Program-related types for the College Cosmos frontend

// Program-related types for the College Cosmos frontend

export interface ProgramAPI {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  degree: 'Certificate' | 'Bachelor' | 'Master' | 'Doctorate';
  mode: 'Full-time' | 'Part-time' | 'Online' | 'Hybrid';
  duration: string;
  eligibility: string;
  averageSalary: number;
  placementRate: number;
  featured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  syllabus?: string;
  specializations?: string;
  category?: {
    id: number;
    documentId: string;
    label: string;
    key: string;
    order: number;
    programs?: any[];
  };
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
}

// Program categories
export type ProgramCategory =
  | 'Executive Programs'
  | 'PG Courses'
  | 'UG Courses';
