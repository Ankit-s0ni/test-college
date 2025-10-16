import { UniversityAPI, UniversityListItem } from '@/types/university';
import { CourseAPI, CourseListItem } from '@/types/course';
import { BlogAPI, BlogPost } from '@/types/blog';
import { ProgramAPI, ProgramListItem } from '@/types/program';
import { SITE_BASE_URL } from '@/lib/config';

/**
 * Transform API university data to frontend format
 */
export function transformUniversityData(apiUniversity: UniversityAPI): UniversityListItem {
  // Handle logo URL - use logo first, then coverImage, then featuredImage as fallback
  let logoUrl = '/assets/images/manipal-logo.jpg'; // Using existing logo as default
  if (apiUniversity.logo?.url) {
    logoUrl = apiUniversity.logo.url;
  } else if (apiUniversity.coverImage?.url) {
    logoUrl = apiUniversity.coverImage.url;
  } else if (apiUniversity.featuredImage?.url) {
    logoUrl = apiUniversity.featuredImage.url;
  }

  // Handle image URL - use coverImage first, then featuredImage, then logo as fallback
  let imageUrl = '/assets/images/hero-img.png'; // Using existing hero image as default
  if (apiUniversity.coverImage?.url) {
    imageUrl = apiUniversity.coverImage.url;
  } else if (apiUniversity.featuredImage?.url) {
    imageUrl = apiUniversity.featuredImage.url;
  } else if (apiUniversity.logo?.url) {
    imageUrl = apiUniversity.logo.url;
  }

  // Handle approvals - for now use accreditation bodies as approvals
  const approvals: string[] = [];
  if (apiUniversity.accreditation) {
    approvals.push(...apiUniversity.accreditation.map(acc => acc.body));
  }
  if (apiUniversity.approvals && Array.isArray(apiUniversity.approvals)) {
    approvals.push(...apiUniversity.approvals.map((approval: any) => 
      approval.name || approval.attributes?.name || approval.toString()
    ).filter(Boolean));
  }

  // Ensure URLs are absolute
  const baseUrl = SITE_BASE_URL;
  const fullLogoUrl = logoUrl.startsWith('http') ? logoUrl : `${baseUrl}${logoUrl}`;
  const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`;

  return {
    slug: apiUniversity.slug,
    name: apiUniversity.name,
    city: apiUniversity.city || apiUniversity.location?.city,
    approvals,
    rating: apiUniversity.rating || 0,
    logo: fullLogoUrl,
    image: fullImageUrl,
    prospectusUrl: apiUniversity.website,
  };
}

/**
 * Transform array of API universities to frontend format
 */
export function transformUniversitiesData(apiUniversities: UniversityAPI[]): UniversityListItem[] {
  return apiUniversities.map(transformUniversityData);
}

/**
 * Transform API course data to frontend format
 */
export function transformCourseData(apiCourse: CourseAPI): CourseListItem {
  // Use different default images based on course level/type
  let imageUrl = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop'; // Default
  
  // Different images for different course types
  if (apiCourse.level === 'UG') {
    if (apiCourse.code.includes('CSE') || apiCourse.code.includes('CS')) {
      imageUrl = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&auto=format&fit=crop'; // Computer Science
    } else if (apiCourse.code.includes('ME') || apiCourse.name.toLowerCase().includes('mechanical')) {
      imageUrl = 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=800&auto=format&fit=crop'; // Mechanical
    } else if (apiCourse.code.includes('ECE') || apiCourse.name.toLowerCase().includes('electronics')) {
      imageUrl = 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=800&auto=format&fit=crop'; // Electronics
    } else if (apiCourse.code.includes('MBBS') || apiCourse.name.toLowerCase().includes('medicine')) {
      imageUrl = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=800&auto=format&fit=crop'; // Medical
    } else {
      imageUrl = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'; // General undergraduate
    }
  } else if (apiCourse.level === 'PG') {
    if (apiCourse.code.includes('MBA') || apiCourse.name.toLowerCase().includes('business')) {
      imageUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop'; // MBA/Business
    } else {
      imageUrl = 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=800&auto=format&fit=crop'; // General postgraduate
    }
  }

  // Handle universities - extract university names
  const universities: string[] = [];
  if (apiCourse.universities && Array.isArray(apiCourse.universities)) {
    universities.push(...apiCourse.universities.map((university: any) => 
      university.name || university.attributes?.name || university.toString()
    ).filter(Boolean));
  }

  // Handle top recruiters
  const topRecruiters = apiCourse.topRecruiters || [];

  // Calculate total fees from fees array
  let totalFees: number | undefined;
  if (apiCourse.fees && apiCourse.fees.length > 0) {
    // Get the first fee structure as default
    totalFees = apiCourse.fees[0].totalFee;
  }

  return {
    id: apiCourse.id,
    slug: apiCourse.slug,
    name: apiCourse.name,
    code: apiCourse.code,
    description: apiCourse.description,
    shortDescription: apiCourse.shortDescription,
    duration: apiCourse.duration,
    level: apiCourse.level,
    degree: apiCourse.degree,
    mode: apiCourse.mode,
    fees: totalFees,
    currency: 'INR',
    image: imageUrl,
    featured: apiCourse.featured,
    eligibility: apiCourse.eligibility,
    averageSalary: apiCourse.averageSalary,
    topRecruiters: topRecruiters,
    universities: universities,
  };
}

/**
 * Transform array of API courses to frontend format
 */
export function transformCoursesData(apiCourses: CourseAPI[]): CourseListItem[] {
  return apiCourses.map(transformCourseData);
}

/**
 * Transform API blog data to frontend format
 */
export function transformBlogData(apiBlog: BlogAPI): BlogPost {
  // Generate a category based on the title or content
  let category = 'General';
  if (apiBlog.title.toLowerCase().includes('mba')) {
    category = 'MBA';
  } else if (apiBlog.title.toLowerCase().includes('engineering')) {
    category = 'Engineering';
  } else if (apiBlog.title.toLowerCase().includes('scholarship')) {
    category = 'Scholarships';
  } else if (apiBlog.title.toLowerCase().includes('distance') || apiBlog.title.toLowerCase().includes('online')) {
    category = 'Online Learning';
  }

  return {
    id: apiBlog.id.toString(),
    slug: apiBlog.slug,
    title: apiBlog.title,
    excerpt: apiBlog.excerpt,
    author: 'College Cosmos Team', // Default author
    authorHref: '#',
    publishedAt: apiBlog.publishedAt,
    readTimeMin: apiBlog.readTimeMin,
    tag: {
      id: category.toLowerCase().replace(' ', '-'),
      label: category,
    },
    badges: [],
    cover: null, // You can add cover images from API if available
    featured: apiBlog.featured,
  };
}

/**
 * Transform array of API blogs to frontend format
 */
export function transformBlogsData(apiBlogs: BlogAPI[]): BlogPost[] {
  return apiBlogs.map(transformBlogData);
}

/**
 * Transform API program data to frontend format
 */
export function transformProgramData(apiProgram: ProgramAPI): ProgramListItem {
  // Map degree to category
  const categoryMapping: Record<string, string> = {
    'Certificate': 'Executive Programs', // Map certificates to Executive Programs
    'Bachelor': 'UG Courses',
    'Master': 'PG Courses',
    'Doctorate': 'PG Courses', // Map doctorate to PG Courses
  };

  // Use category from API if available, otherwise derive from degree
  let category = 'Executive Programs'; // default
  if (apiProgram.category?.label) {
    category = apiProgram.category.label;
  } else if (apiProgram.degree && categoryMapping[apiProgram.degree]) {
    category = categoryMapping[apiProgram.degree];
  }

  // Generate icon based on program name or degree
  let icon = '🎓'; // default
  const nameUpper = apiProgram.name.toUpperCase();
  const degreeUpper = apiProgram.degree.toUpperCase();
  
  if (nameUpper.includes('MBA') || nameUpper.includes('MANAGEMENT') || nameUpper.includes('BUSINESS')) {
    icon = '💼';
  } else if (nameUpper.includes('MCA') || nameUpper.includes('COMPUTER') || nameUpper.includes('IT') || nameUpper.includes('SOFTWARE')) {
    icon = '💻';
  } else if (nameUpper.includes('M.TECH') || nameUpper.includes('ENGINEERING') || nameUpper.includes('TECHNOLOGY')) {
    icon = '⚙️';
  } else if (degreeUpper.includes('DOCTORATE') || nameUpper.includes('PHD') || nameUpper.includes('DOCTORATE')) {
    icon = '🧠';
  } else if (nameUpper.includes('MSC') || nameUpper.includes('SCIENCE') || nameUpper.includes('RESEARCH')) {
    icon = '🔬';
  } else if (nameUpper.includes('MAJMC') || nameUpper.includes('JOURNALISM') || nameUpper.includes('MEDIA')) {
    icon = '🎤';
  } else if (nameUpper.includes('DATA') || nameUpper.includes('ANALYTICS') || nameUpper.includes('STATISTICS')) {
    icon = '📈';
  } else if (nameUpper.includes('BBA') || degreeUpper.includes('BACHELOR')) {
    icon = '📚';
  } else if (nameUpper.includes('BCA')) {
    icon = '💻';
  } else if (nameUpper.includes('LLM') || nameUpper.includes('LAW') || nameUpper.includes('LEGAL')) {
    icon = '⚖️';
  } else if (degreeUpper.includes('CERTIFICATE') || nameUpper.includes('CERTIFICATE')) {
    icon = '📜';
  }

  // Derive level from degree
  const levelMapping: Record<string, string> = {
    'Certificate': 'certification',
    'Bachelor': 'undergraduate', 
    'Master': 'postgraduate',
    'Doctorate': 'doctoral',
  };
  const level = levelMapping[apiProgram.degree] || 'postgraduate';

  return {
    id: apiProgram.id,
    name: apiProgram.name,
    slug: apiProgram.slug,
    duration: apiProgram.standardDuration || apiProgram.duration || 'N/A', // Use standardDuration from API
    category: category,
    icon: icon,
    degree: apiProgram.degree,
    level: level,
    featured: apiProgram.featured,
    averageSalary: apiProgram.averageSalary,
    image: apiProgram.image,
  };
}

/**
 * Transform array of API programs to frontend format
 */
export function transformProgramsData(apiPrograms: ProgramAPI[]): ProgramListItem[] {
  return apiPrograms.map(transformProgramData);
}
