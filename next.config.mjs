/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "res.cloudinary.com", 
      "images.unsplash.com", 
  "dummyimage.com",
  "collegecosmos.manavkhadka.com.np",
  "admin.collegecosmos.in"
    ],
  },
};

export default nextConfig;
