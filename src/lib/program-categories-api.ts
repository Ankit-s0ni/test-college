import { fetchAPI } from './api';
import { ProgramListItem } from '@/types/program';

export interface Program {
  id: number;
  name: string;
  degree: string;
  duration: string; // Added duration property
  icon?: string; // Made icon property optional
  slug: string; // Added slug property
  // Add other relevant fields from the program API response
}

export interface ProgramCategoryAPI {
  id: number;
  documentId: string;
  label: string;
  key: string;
  order: number;
  programs?: ProgramListItem[]; // Use ProgramListItem instead of Program
}

export interface ProgramCategoriesAPIResponse {
  data: ProgramCategoryAPI[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export const programCategoriesAPI = {
  getAll: () => fetchAPI<ProgramCategoriesAPIResponse>('/program-categories'),
};
