// Centralized config for API and site base URLs
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://collegecosmos.manavkhadka.com.np/api';

// SITE_BASE_URL is the API base with a trailing `/api` removed so it can be used for images/assets
export const SITE_BASE_URL = API_BASE_URL.replace(/\/api\/?$/i, '');

export default {
  API_BASE_URL,
  SITE_BASE_URL,
};
