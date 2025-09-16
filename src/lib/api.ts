// API configuration and utilities for College Cosmos
import { UniversitiesAPIResponse, UniversityDetailAPIResponse } from '@/types/university';
import { CoursesAPIResponse, CourseDetailAPIResponse } from '@/types/course';
import { BlogsAPIResponse, BlogDetailAPIResponse } from '@/types/blog';
import { ProgramsAPIResponse, ProgramDetailAPIResponse } from '@/types/program';
import { ReviewSubmission, ReviewSubmissionResponse, ReviewsAPIResponse } from '@/types/review';
import { StudentLeadSubmission, StudentLeadResponse } from '@/types/student-lead';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://collegecosmos.manavkhadka.com.np/api';

/**
 * Generic API fetch function with error handling
 */
export async function fetchAPI<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Force fresh data for now, can be optimized later
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Universities API functions
 */
export const universitiesAPI = {
  /**
   * Get all universities
   */
  getAll: () => fetchAPI<UniversitiesAPIResponse>('/universities'),
  
  /**
   * Get university by ID
   */
  getById: (id: string) => fetchAPI<UniversityDetailAPIResponse>(`/universities/${id}`),
  
  /**
   * Get university by slug - converts slug to ID first, then fetches details
   */
  getBySlug: async (slug: string): Promise<UniversityDetailAPIResponse> => {
    try {
      // First, get all universities to find the ID for this slug
      const allUniversities = await fetchAPI<UniversitiesAPIResponse>('/universities');
      
      // Find university with matching slug
      const university = allUniversities.data.find(uni => uni.slug === slug);
      
      if (!university) {
        throw new Error(`University with slug "${slug}" not found`);
      }
      
      // Now fetch detailed data using the ID
      return await fetchAPI<UniversityDetailAPIResponse>(`/universities/${university.id}`);
    } catch (error) {
      console.error(`Error fetching university by slug "${slug}":`, error);
      throw error;
    }
  },
};

/**
 * Courses API functions
 */
export const coursesAPI = {
  /**
   * Get all courses
   */
  getAll: () => fetchAPI<CoursesAPIResponse>('/courses'),
  
  /**
   * Get featured courses
   */
  getFeatured: () => fetchAPI<CoursesAPIResponse>('/courses/featured'),
  /**
   * Get courses by degree
   */
  getByDegree: (degree: string) => fetchAPI<CoursesAPIResponse>(`/courses/degree/${degree}`),
  
  /**
   * Get course by slug
   */
  getBySlug: (slug: string) => fetchAPI<CourseDetailAPIResponse>(`/courses/slug/${slug}`),
  
  /**
   * Get course by ID
   */
  getById: (id: string) => fetchAPI<CourseDetailAPIResponse>(`/courses/${id}`),
};

/**
 * Programs API functions
 */
export const programsAPI = {
  /**
   * Get all programs
   */
  getAll: () => fetchAPI<ProgramsAPIResponse>('/programs'),
  
  /**
   * Get featured programs
   */
  getFeatured: () => fetchAPI<ProgramsAPIResponse>('/programs?featured=true'),
  
  /**
   * Get programs by category
   */
  getByCategory: (category: string) => fetchAPI<ProgramsAPIResponse>(`/programs?category=${category}`),
  
  /**
   * Get program by slug
   */
  getBySlug: (slug: string) => fetchAPI<ProgramDetailAPIResponse>(`/programs/slug/${slug}`),
  
  /**
   * Get program by ID
   */
  getById: (id: string) => fetchAPI<ProgramDetailAPIResponse>(`/programs/${id}`),
};

/**
 * Blogs API functions
 */
export const blogsAPI = {
  /**
   * Get all blogs
   */
  getAll: () => fetchAPI<BlogsAPIResponse>('/blogs'),
  
  /**
   * Get blog by slug
   */
  getBySlug: (slug: string) => fetchAPI<BlogDetailAPIResponse>(`/blogs/slug/${slug}`),
  
  /**
   * Get blog by ID
   */
  getById: (id: string) => fetchAPI<BlogDetailAPIResponse>(`/blogs/${id}`),
  
  /**
   * Get featured blogs
   */
  getFeatured: () => fetchAPI<BlogsAPIResponse>('/blogs?featured=true'),
};

/**
 * Reviews API functions
 */
export const reviewsAPI = {
  /**
   * Submit a new review
   */
  submit: async (reviewData: ReviewSubmission): Promise<ReviewSubmissionResponse> => {
    const url = `${API_BASE_URL}/reviews`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: reviewData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error submitting review:', error);
      throw error;
    }
  },

  /**
   * Get all reviews
   */
  getAll: () => fetchAPI<ReviewsAPIResponse>('/reviews'),

  /**
   * Get reviews by university ID
   */
  getByUniversity: (universityId: string) => fetchAPI<ReviewsAPIResponse>(`/reviews?university=${universityId}`),
};

/**
 * Student Leads API functions
 */
export const studentLeadsAPI = {
  /**
   * Submit a new student lead
   */
  submit: async (leadData: StudentLeadSubmission): Promise<StudentLeadResponse> => {
    const url = `${API_BASE_URL}/student-leads`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: leadData }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
        message: 'Student lead submitted successfully'
      };
    } catch (error) {
      console.error('Error submitting student lead:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to submit student lead',
        data: null
      };
    }
  },
};
