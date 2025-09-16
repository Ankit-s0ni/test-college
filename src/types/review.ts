// Review-related types for the College Cosmos frontend

export interface ReviewSubmission {
  reviewerName: string;
  reviewerType: 'Current Student' | 'Alumni' | 'Faculty' | 'Prospective Student' | 'Parent' | 'Other';
  overallRating: number;
  digitalInfrastructureRating: number;
  curriculumRating: number;
  valueForMoneyRating: number;
  title: string;
  review: string;
  isApproved?: boolean;
  university: string | number;
  program?: string | number;
  reviewDate?: string;
  helpfulCount?: number;
  locale?: string;
  localizations?: (string | number)[];
}

export interface ReviewAPI {
  id: number;
  documentId: string;
  reviewerName: string;
  reviewerType: string;
  overallRating: number;
  digitalInfrastructureRating: number;
  curriculumRating: number;
  valueForMoneyRating: number;
  title: string;
  review: string;
  isApproved: boolean;
  university: any;
  program?: any;
  reviewDate: string;
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale?: string;
  localizations?: any[];
}

export interface ReviewSubmissionResponse {
  data: ReviewAPI;
  meta?: any;
}

export interface ReviewsAPIResponse {
  data: ReviewAPI[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
