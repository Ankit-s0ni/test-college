// Course-related types for the College Cosmos frontend

export interface CourseAPI {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  code: string;
  description?: string;
  shortDescription?: string;
  degree: string;
  level: string;
  duration: string;
  durationInYears: number;
  mode: string;
  eligibility?: string;
  curriculum?: string;
  careerProspects?: string;
  averageSalary?: number;
  topRecruiters?: string[];
  featured: boolean;
  courseStatus: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale?: string;
  universities: any[];
  department?: any;
  category?: any;
  fees: Array<{
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
  seo?: any;
}

export interface CoursesAPIResponse {
  data: CourseAPI[];
}

export interface CourseDetailAPIResponse {
  data: CourseAPI;
}

// Frontend types for course listing
export interface CourseListItem {
  id: number;
  slug: string;
  name: string;
  code: string;
  description?: string;
  shortDescription?: string;
  duration: string;
  level: string;
  degree: string;
  mode: string;
  fees?: number;
  currency?: string;
  image: string;
  featured: boolean;
  eligibility?: string;
  averageSalary?: number;
  topRecruiters: string[];
  universities: string[];
}

// Filter types for course listing
export interface CourseFilterGroup {
  key: string;
  label: string;
  options: string[];
}

export interface CourseFilters {
  level?: string[];
  category?: string[];
  duration?: string[];
  mode?: string[];
  featured?: boolean;
}
