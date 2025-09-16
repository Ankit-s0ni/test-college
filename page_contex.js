// This file tracks the integration status of all required pages and their API connections.
// Update this file as you create or integrate each page.

/**
 * Page Context: College Cosmos Frontend
 * Last updated: 2025-09-12
 */

module.exports = [
  // --- University ---
  { path: '/universities', api: 'GET /universities', status: 'created', apiIntegrated: true },
  { path: '/universities/[id]', api: 'GET /universities/{id}', status: 'not-created', apiIntegrated: false },

  // --- Course ---
  { path: '/courses', api: 'GET /courses', status: 'created', apiIntegrated: true },
  { path: '/courses/featured', api: 'GET /courses/featured', status: 'not-created', apiIntegrated: false },
  { path: '/courses/degree/[degree]', api: 'GET /courses/degree/{degree}', status: 'not-created', apiIntegrated: false },
  { path: '/courses/slug/[slug]', api: 'GET /courses/slug/{slug}', status: 'not-created', apiIntegrated: false },
  { path: '/courses/[id]', api: 'GET /courses/{id}', status: 'not-created', apiIntegrated: false },

  // --- Content & Organization ---
  { path: '/categories', api: 'GET /categories', status: 'not-created', apiIntegrated: false },
  { path: '/categories/[id]', api: 'GET /categories/{id}', status: 'not-created', apiIntegrated: false },
  { path: '/blog', api: 'GET /blogs', status: 'created', apiIntegrated: true },
  { path: '/articles', api: 'GET /articles', status: 'created', apiIntegrated: true },
  { path: '/articles/[id]', api: 'GET /articles/{id}', status: 'not-created', apiIntegrated: false },
  { path: '/authors', api: 'GET /authors', status: 'not-created', apiIntegrated: false },
  { path: '/authors/[id]', api: 'GET /authors/{id}', status: 'not-created', apiIntegrated: false },
  { path: '/blogs', api: 'GET /blogs', status: 'created', apiIntegrated: true },
  { path: '/blogs/[id]', api: 'GET /blogs/{id}', status: 'not-created', apiIntegrated: false },
  { path: '/blog-tags', api: 'GET /blog-tags', status: 'not-created', apiIntegrated: false },
  { path: '/blog-tags/[id]', api: 'GET /blog-tags/{id}', status: 'not-created', apiIntegrated: false },

  // --- Academic Information ---
  { path: '/departments', api: 'GET /departments', status: 'not-created', apiIntegrated: false },
  { path: '/departments/[id]', api: 'GET /departments/{id}', status: 'not-created', apiIntegrated: false },
  { path: '/entrance-exams', api: 'GET /entrance-exams', status: 'not-created', apiIntegrated: false },
  { path: '/entrance-exams/[id]', api: 'GET /entrance-exams/{id}', status: 'not-created', apiIntegrated: false },
  { path: '/programs', api: 'GET /programs', status: 'not-created', apiIntegrated: false },
  { path: '/programs/[id]', api: 'GET /programs/{id}', status: 'not-created', apiIntegrated: false },
  { path: '/program-categories', api: 'GET /program-categories', status: 'not-created', apiIntegrated: false },
  { path: '/program-categories/[id]', api: 'GET /program-categories/{id}', status: 'not-created', apiIntegrated: false },

  // --- General & Site Management ---
  { path: '/about', api: 'GET /about', status: 'not-created', apiIntegrated: false },
  { path: '/global', api: 'GET /global', status: 'not-created', apiIntegrated: false },
  { path: '/site-setting', api: 'GET /site-setting', status: 'not-created', apiIntegrated: false },
  { path: '/reviews', api: 'GET /reviews', status: 'not-created', apiIntegrated: false },
  { path: '/reviews/[id]', api: 'GET /reviews/{id}', status: 'not-created', apiIntegrated: false },
  { path: '/scholarships', api: 'GET /scholarships', status: 'not-created', apiIntegrated: false },
  { path: '/scholarships/[id]', api: 'GET /scholarships/{id}', status: 'not-created', apiIntegrated: false },
  { path: '/approvals', api: 'GET /approvals', status: 'not-created', apiIntegrated: false },
  { path: '/approvals/[id]', api: 'GET /approvals/{id}', status: 'not-created', apiIntegrated: false },
  { path: '/student-leads', api: 'GET /student-leads', status: 'not-created', apiIntegrated: false },
  { path: '/student-leads/[id]', api: 'GET /student-leads/{id}', status: 'not-created', apiIntegrated: false },

  // --- Users, Permissions & Authentication ---
  { path: '/connect/[provider]', api: 'GET /connect/{provider}', status: 'not-created', apiIntegrated: false },
  { path: '/auth/[provider]/callback', api: 'GET /auth/{provider}/callback', status: 'not-created', apiIntegrated: false },
  { path: '/auth/email-confirmation', api: 'GET /auth/email-confirmation', status: 'not-created', apiIntegrated: false },
  { path: '/users-permissions/permissions', api: 'GET /users-permissions/permissions', status: 'not-created', apiIntegrated: false },
  { path: '/users-permissions/roles', api: 'GET /users-permissions/roles', status: 'not-created', apiIntegrated: false },
  { path: '/users-permissions/roles/[id]', api: 'GET /users-permissions/roles/{id}', status: 'not-created', apiIntegrated: false },
  { path: '/users', api: 'GET /users', status: 'not-created', apiIntegrated: false },
  { path: '/users/[id]', api: 'GET /users/{id}', status: 'not-created', apiIntegrated: false },
  { path: '/users/me', api: 'GET /users/me', status: 'not-created', apiIntegrated: false },
  { path: '/users/count', api: 'GET /users/count', status: 'not-created', apiIntegrated: false },
];
