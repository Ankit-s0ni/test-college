/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// API imports
import { universitiesAPI } from '@/lib/api';
import { SITE_BASE_URL } from '@/lib/config';
import { UniversityDetailAPIResponse } from '@/types/university';

// shadcn/ui
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

// lucide
import { FileDown, Plus, GraduationCap, Check } from 'lucide-react';
import FooterSection from '@/components/home/footer-section';
import UniversitySidebar from '@/components/custom/university-sidebar';
import AboutSection from '@/components/university/about-section';
import ApprovalsSection from '@/components/university/approvals-section';
import CoursesSection from '@/components/university/courses-section';
import CertificateSection from '@/components/university/certificate-section';
import FeesSection from '@/components/university/fees-section';
import RankingSection from '@/components/university/ranking-section';
import FinancialAidSection from '@/components/university/financial-aid-section';
import AdmissionsSection from '@/components/university/admissions-section';
import FacilitiesSection from '@/components/university/facilities-section';
import PlacementsSection from '@/components/university/placements-section';
import CourseDetailsSection from '@/components/university/course-details-section';
import HiringPartnerSection from '@/components/home/hiring-partner-section';
import ExaminationSection from '@/components/university/examination-section';
import CampusSection from '@/components/university/campus-section';
import GallerySection from '@/components/university/gallery-section';
import ContactSection from '@/components/university/contact-section';
import AdvantagesSection from '@/components/university/advantages-section';
import SimilarUniversities from '@/components/university/similar-universities';
import ReviewsSection from '@/components/university/reviews-section';
import Stars from '@/components/custom/stars';
import ReviewModal from '@/components/review-modal';
import TalkToExpertModal from '@/components/talk-to-expert-modal';

/* -------------------------------------------------------------------------- */
/*                                JSON TYPES                                  */
/* -------------------------------------------------------------------------- */

export type Ratings = {
  overall: number;
  average: number;
  DI: number; // delivery/interaction
  curriculum: number;
  VFM: number; // value for money
};

export type About = {
  title: string;
  description: string;
  courses: Array<{
    name: string;
    perSem: string;
    total: string;
    online: boolean;
  }>;
};

export type Approvals = {
  title: string;
  description: string;
  // items preserve original API objects (body, grade, logo url)
  items: Array<{ body?: string; grade?: string; status?: string; logo?: string }>;
};

export type CoursesHero = {
  image: string;
  detailsLink: string;
  prospectusLink: string;
};

export type Certificate = {
  title: string;
  images: string[];
};

export type Ranking = {
  title: string;
  rankings: Array<{ year: string; body: string; rank: string }>;
};

export type FinancialAid = {
  title: string;
  description: string;
  tableData: Array<{
    category: string;
    scholarshipCredit: string;
    eligibilityDocument: string;
  }>;
  emiAvailable: boolean;
  loans: Array<{
    program: string;
    options?: any;
    title: string;
    total: string;
    loanAmount: string;
    interest: string;
    tenure: string;
    emi: string;
  }>;
};

export type Admission = {
  title: string;
  description: string;
};

export type HiringPartners = {
  title: string;
  description: string;
  images: string[];
  names?: string[];
};

export type Examination = {
  title: string;
  description: string;
};

export type Campus = {
  title: string;
  groups: any[];
};

export type Advantages = {
  title: string;
  description: string;
  tableData: Array<{ benefit: string; description: string }>;
};

export type Faq = Array<{ question: string; answer: string }>;

export type Section13 = {
  title: string;
  description: string;
  data: Array<{
    image: string;
    name: string;
    affiliation: string;
    rating: number;
    prospectusLink: string;
    viewDetailsLink: string;
  }>;
};

export type Reviews = {
  total: { count: number; average: number };
  counts: { one: number; two: number; three: number; four: number; five: number };
  peripheral: { avg: number; DI: number; curr: number; VFM: number };
  list: Array<{ image: string; name: string; date: string; description: string; rating: number }>;
};

export type Fees = {
  title: string;
  description: string;
  fees: Array<{
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
};

export type UniversityPageDataAPI = {
  name: string;
  details: string;
  location: string;
  established: number;
  ratings: Ratings;
  prospectusLink: string;
  scheduleLink: string;
  applyLink: string;
  headerImage: string | null;
  logo: string | null;
  about?: About;
  approvals?: Approvals;
  courses?: CoursesHero[];
  ranking?: Ranking;
  reviews?: Reviews;
  financialAid?: FinancialAid;
  partners?: HiringPartners;
  campus?: Campus;
  advantages?: Advantages;
  gallery?: string[];
  contact?: {
    phone?: string | null;
    email?: string | null;
    fax?: string | null;
    tollFree?: string | null;
  };
  admissions?: {
    applicationStart?: string | null;
    applicationEnd?: string | null;
    examDate?: string | null;
    resultDate?: string | null;
    selectionProcess?: string | null;
    applicationFee?: number | null;
  };
  facilities?: Array<{ id?: number; name?: string; description?: string; category?: string; availability?: boolean; capacity?: number }>;
  placements?: Array<{ id?: number; year?: number | string; totalStudents?: number; studentsPlaced?: number; placementPercentage?: number | null; averagePackage?: number | null; highestPackage?: number | null; lowestPackage?: number | null; topRecruiters?: string[] }>;
  placementRecords?: Array<any>;
  courseDetails?: Array<{ id?: number; courseName?: string; duration?: string; fees?: string | number; mode?: string; eligibility?: string; syllabus?: string; specializations?: string[] }>;
  faq?: Faq;
  examination?: Examination;
  certificate?: Certificate;
  fees?: Fees;
};

export type UniversityPageData = {
  name: string;
  details: string;
  location: string;
  established: number;
  ratings: Ratings;
  prospectusLink: string;
  scheduleLink: string;
  applyLink: string;
  headerImage: string;
  logo: string;

  about: About;
  approvals: Approvals;
  courses: CoursesHero[];
  certificate: Certificate;
  ranking: Ranking;
  financialAid: FinancialAid;
  admission: Admission;
  partners: HiringPartners;
  examination: Examination;
  campus: Campus;
  advantages: Advantages;
  faq: Faq;
  section13: Section13; // “Similar Programs/Universities” style block
  reviews: Reviews;
  fees?: Fees;
  admissions?: {
    applicationStart?: string | null;
    applicationEnd?: string | null;
    examDate?: string | null;
    resultDate?: string | null;
    selectionProcess?: string | null;
    applicationFee?: number | null;
  };
  facilities?: Array<{ id?: number; name?: string; description?: string; category?: string; availability?: boolean; capacity?: number }>;
  placements?: Array<{ id?: number; year?: number | string; totalStudents?: number; studentsPlaced?: number; placementPercentage?: number | null; averagePackage?: number | null; highestPackage?: number | null; lowestPackage?: number | null; topRecruiters?: string[] }>;
  placementRecords?: Array<any>;
  courseDetails?: Array<{ id?: number; courseName?: string; duration?: string; fees?: string | number; mode?: string; eligibility?: string; syllabus?: string; specializations?: string[] }>;
};

/* -------------------------------------------------------------------------- */
/*                              DUMMY PAGE DATA                                */
/* -------------------------------------------------------------------------- */

const BASE_GALLERY = [
  'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop',
];

const PAGE_DB: Record<string, UniversityPageData> = {};

/* -------------------------------------------------------------------------- */
/*                          API DATA CONVERSION                               */
/* -------------------------------------------------------------------------- */

function convertAPIDataToPageData(apiResponse: UniversityDetailAPIResponse): UniversityPageDataAPI {
  // Cast to any for dynamic API data transformation with flexible properties
  const university = apiResponse.data as any;
  const baseUrl = SITE_BASE_URL;
  
  const baseData = {
    name: university.name,
    details: university.shortDescription || university.description || 'University Details',
    location: university.location?.city || 'India',
    established: university.established || 2000,
    ratings: {
      overall: university.rating || 0,
      average: university.rating || 0,
      DI: university.rating || 0,
      curriculum: university.rating || 0,
      VFM: university.rating || 0,
    },
    prospectusLink: university.brochures && university.brochures.length > 0 
      ? `${baseUrl}${university.brochures[0].url}` 
      : '#',
    scheduleLink: '#',
    applyLink: '#',
  headerImage: university.coverImage?.url ? `${baseUrl}${university.coverImage.url}` : null,
  logo: university.logo?.url ? `${baseUrl}${university.logo.url}` : null,
  };

  const conditionalData: Partial<UniversityPageDataAPI> = {};

  // Only add About section if we have description
  if (university.description) {
    // Build courses list for About table. Prefer explicit university.courses, fall back to courseDetails or fees.
    let aboutCourses: any[] = [];

    if (university.courses && university.courses.length > 0) {
      aboutCourses = university.courses.map((course: any) => ({
        name: course.name,
        perSem: course.feeRange || null,
        total: course.feeRange || null,
        online: course.mode ? String(course.mode).toLowerCase().includes('online') : false,
      }));
    } else if (university.courseDetails && university.courseDetails.length > 0) {
      aboutCourses = university.courseDetails.map((c: any) => ({
        name: c.courseName || c.title || 'Course',
        perSem: c.fees || c.feeRange || null,
        total: c.fees || c.feeRange || null,
        online: c.mode ? String(c.mode).toLowerCase().includes('online') : false,
      }));
    } else if (university.fees && university.fees.length > 0) {
      // fees array contains aggregated fee rows; map to a displayable course-like row
      aboutCourses = university.fees.map((f: any) => ({
        name: f.courseType || f.category || 'Program',
        perSem: f.frequency && f.frequency.toLowerCase().includes('per year') ? f.totalFee : f.tuitionFee || f.totalFee || null,
        total: f.totalFee || f.tuitionFee || null,
        online: false,
      }));
    }

    conditionalData.about = {
      title: `About ${university.name}`,
      description: university.description,
      courses: aboutCourses,
    };
  }

  // Use real approvals data if available, fallback to accreditation
  if (university.approvals && university.approvals.length > 0) {
    conditionalData.approvals = {
      title: 'Approvals & Accreditations',
      description: 'Recognized by top statutory bodies and accreditation councils.',
      items: university.approvals.map((approval: any) => ({
        body: approval.body || approval.name || undefined,
        grade: approval.grade || undefined,
        status: approval.status || undefined,
        logo: approval.logo?.url ? `${baseUrl}${approval.logo.url}` : undefined,
      })).filter(Boolean),
    };
    } else if (university.accreditation && university.accreditation.length > 0) {
    conditionalData.approvals = {
      title: 'Approvals & Accreditations',
      description: 'Recognized by top statutory bodies and accreditation councils.',
      items: university.accreditation.map((acc: any) => ({
        body: acc.body || acc.name || undefined,
        grade: acc.grade || undefined,
        status: acc.status || undefined,
        logo: acc.logo?.url ? `${baseUrl}${acc.logo.url}` : undefined,
      })).filter(Boolean),
    };
  }

  // Only add Courses section if we have real courses data
  if (university.courses && university.courses.length > 0) {
    conditionalData.courses = university.courses.map((course: any) => ({
      image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop',
      detailsLink: '#',
      prospectusLink: '#',
    }));
  }

  // Only add Ranking section if we have ranking data
  if (university.ranking && university.ranking.length > 0) {
    conditionalData.ranking = {
      title: 'Rankings',
      rankings: university.ranking.map((rank: any) => ({
        year: rank.year.toString(),
        body: rank.organization,
        rank: rank.rank.toString(),
      })),
    };
  }

  // Add Financial Aid section if we have real data
  if (university.financialAid) {
    conditionalData.financialAid = {
      title: university.financialAid.title || 'Financial Aid & Scholarships',
      description: university.financialAid.description || 'Scholarships and loan options available.',
      tableData: [
        {
          category: 'Merit-based',
          scholarshipCredit: 'Available',
          eligibilityDocument: 'Academic records',
        },
        {
          category: 'Need-based',
          scholarshipCredit: 'Available',
          eligibilityDocument: 'Income certificate',
        },
      ],
      emiAvailable: university.financialAid.emiAvailable || false,
      loans: [
        {
          program: 'Standard Loan Program',
          options: [
            {
              mode: 'EMI',
              total: 'As per course fee',
                loanAmount: 'Up to 100% of fees',
                interest: 'Competitive rates',
                tenure: 'Flexible',
                emi: null,
            },
          ],
          title: '',
          total: '',
          loanAmount: '',
          interest: '',
          tenure: '',
          emi: '',
        },
      ],
    };
  }

  // Add Hiring Partners section if we have real data
  if (university.hiringPartners && university.hiringPartners.length > 0) {
    conditionalData.partners = {
      title: 'Hiring Partners',
      description: 'Trusted by leading companies for talent and internships.',
  images: university.hiringPartners.map((partner: any) => partner.logo?.url ? `${baseUrl}${partner.logo.url}` : undefined).filter(Boolean) as string[],
  names: university.hiringPartners.map((partner: any) => partner.companyName || partner.company || partner.name).filter(Boolean) as string[],
    };
  }

  // Add Campus section if we have real data
  if (university.campusGroups && university.campusGroups.length > 0) {
    const normalizeLocations = (locations: any) => {
      // If already an array of strings or numbers, stringify and trim
      if (Array.isArray(locations)) {
        return locations.map((loc: any) => String(loc).trim()).filter(Boolean);
      }

      // If a string (comma separated), split safely
      if (typeof locations === 'string') {
        return locations.split(',').map((loc: any) => String(loc).trim()).filter(Boolean);
      }

      // If it's an object (likely GeoJSON), try to summarize coordinates
      if (locations && typeof locations === 'object') {
        // Handle GeoJSON Polygon/Point types
        try {
          if (locations.type === 'Point' && Array.isArray(locations.coordinates)) {
            const [lng, lat] = locations.coordinates;
            return [`Point: ${lat.toFixed(5)}, ${lng.toFixed(5)}`];
          }

          if (locations.type === 'Polygon' && Array.isArray(locations.coordinates)) {
            // summarize polygon as a few coordinate pairs
            const coords = locations.coordinates[0] || [];
            const sample = coords.slice(0, 3).map((c: any) => `${c[1].toFixed(5)}, ${c[0].toFixed(5)}`);
            return [`Polygon with ${coords.length} points`, ...sample];
          }

          // fallback: stringify object keys
          return [JSON.stringify(locations)];
        } catch (e) {
          return [];
        }
      }

      // Default empty
      return [];
    };

    conditionalData.campus = {
      title: `${university.name} Campuses`,
      groups: university.campusGroups.map((group: any) => {
        // detect geo object in locations or explicit geo
        const geo = group.geo || (group.locations && typeof group.locations === 'object' && group.locations.type ? group.locations : undefined);
        return {
          label: group.label,
          color: group.color || '#FFF4BF',
          locations: normalizeLocations(group.locations),
          geo,
        };
      }),
    };
  }

  // Add Advantages section if we have real data
  if (university.advantages && university.advantages.length > 0) {
    conditionalData.advantages = {
      title: `${university.name} Advantages`,
      description: `${university.name} provides excellent opportunities for career growth.`,
      tableData: university.advantages.map((advantage: any) => ({
        benefit: advantage.benefit,
        description: advantage.description,
      })),
    };
  }

  // Add FAQ section if we have real data
  if (university.faqs && university.faqs.length > 0) {
    conditionalData.faq = university.faqs
      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
      .map((faq: any) => ({
        question: faq.question,
        answer: faq.answer,
      }));
  }

  // Add Examination section if we have real data
  if (university.examinationPatterns && university.examinationPatterns.length > 0) {
    const examPattern = university.examinationPatterns[0]; // Use first pattern
    conditionalData.examination = {
      title: examPattern.title || 'Examination & Assessment',
      description: examPattern.description || 'Examination details not available.',
    };
  }

  // Add Certificate section if we have brochures
  if (university.brochures && university.brochures.length > 0) {
    conditionalData.certificate = {
      title: 'Documents & Brochures',
      images: university.brochures.map((brochure: any) => `${baseUrl}${brochure.url}`),
    };
  }

  // Add gallery if available
  if (university.gallery && university.gallery.length > 0) {
    conditionalData['gallery'] = university.gallery.map((g: any) => `${baseUrl}${g.url}`);
  }

  // Only add Reviews section if we have rating data
  if (university.rating && university.totalRatings) {
    conditionalData.reviews = {
      total: { count: university.totalRatings, average: university.rating },
      counts: { one: 0, two: 0, three: 0, four: 0, five: 0 },
      peripheral: { 
        avg: university.rating, 
        DI: university.rating, 
        curr: university.rating, 
        VFM: university.rating 
      },
      list: university.reviews?.slice(0, 5).map((review: any) => ({
        image: 'https://i.pravatar.cc/80?img=' + Math.floor(Math.random() * 50),
        name: review.reviewerName,
        date: new Date(review.reviewDate || review.createdAt).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: '2-digit' 
        }),
        description: review.review,
        rating: review.overallRating,
      })) || [],
    };
  }

  // Add Fees section if we have fees data
  if (university.fees && university.fees.length > 0) {
    conditionalData.fees = {
      title: 'Fee Structure',
      description: 'Detailed fee breakdown for all courses and categories.',
      fees: university.fees.map((fee: any) => ({
        courseType: fee.courseType,
        category: fee.category,
        tuitionFee: fee.tuitionFee,
        otherFees: fee.otherFees,
        hostelFee: fee.hostelFee,
        messFee: fee.messFee,
        transportFee: fee.transportFee,
        totalFee: fee.totalFee,
        frequency: fee.frequency,
      })),
    };
  }

  // Admissions
  if (university.admissions) {
    conditionalData['admissions'] = {
      applicationStart: university.admissions.applicationStart || null,
      applicationEnd: university.admissions.applicationEnd || null,
      examDate: university.admissions.examDate || null,
      resultDate: university.admissions.resultDate || null,
      selectionProcess: university.admissions.selectionProcess || null,
      applicationFee: university.admissions.applicationFee || null,
    };
  }

  // Facilities
  if (university.facilities && university.facilities.length > 0) {
    conditionalData['facilities'] = university.facilities.map((f: any) => ({
      id: f.id,
      name: f.name,
      description: f.description,
      category: f.category,
      availability: f.availability,
      capacity: f.capacity,
    }));
  }

  // Placements
  if (university.placements && university.placements.length > 0) {
    conditionalData['placements'] = university.placements.map((p: any) => ({
      id: p.id,
      year: p.year,
      totalStudents: p.totalStudents,
      studentsPlaced: p.studentsPlaced || p.placedStudents,
      placementPercentage: p.placementPercentage || null,
      averagePackage: p.averagePackage || null,
      highestPackage: p.highestPackage || null,
      lowestPackage: p.lowestPackage || null,
      topRecruiters: p.topRecruiters || [],
    }));
  }

  // Placement records (detailed yearly records that may use different field names)
  if (university.placementRecords && university.placementRecords.length > 0) {
    conditionalData['placementRecords'] = university.placementRecords.map((r: any) => ({
      id: r.id,
      year: r.year || r.academicYear || null,
      totalStudents: r.totalStudents || null,
      placedStudents: r.placedStudents || r.studentsPlaced || r.studentsPlacedCount || null,
      placementRate: r.placementRate || r.placementPercentage || null,
      averagePackage: r.averagePackage || r.averagePackageString || null,
      highestPackage: r.highestPackage || null,
      medianPackage: r.medianPackage || r.median || null,
      lowestPackage: r.lowestPackage || null,
      topRecruiters: r.topRecruiters || r.topRecruitersList || [],
      sectorWiseBreakdown: r.sectorWiseBreakdown || r.sectorWiseData || r.sectorBreakdown || null,
      raw: r,
    }));
  }

  // Course details
  if (university.courseDetails && university.courseDetails.length > 0) {
    conditionalData['courseDetails'] = university.courseDetails.map((c: any) => ({
      id: c.id,
      courseName: c.courseName,
      duration: c.duration,
      fees: c.fees,
      mode: c.mode,
      eligibility: c.eligibility,
      syllabus: c.syllabus,
      specializations: c.specializations || [],
    }));
  }

  // Add contact details
  if (university.contact) {
    conditionalData['contact'] = {
      phone: university.contact.phone || null,
      email: university.contact.email || null,
      fax: university.contact.fax || null,
      tollFree: university.contact.tollFree || null,
    };
  }

  return { ...baseData, ...conditionalData };
}

/* -------------------------------------------------------------------------- */
/*                               UI SUBCOMPONENTS                              */
/* -------------------------------------------------------------------------- */

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-4 sm:mb-6">
    <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
    {subtitle ? <p className="text-sm text-muted-foreground mt-1">{subtitle}</p> : null}
  </div>
);

/* -------------------------------- 1. HERO --------------------------------- */

function Gauge({ value }: { value: number }) {
  const r = 54;
  const half = Math.PI * r; // semicircle length
  const pct = Math.max(0, Math.min(1, value / 5));
  return (
    <div className="relative w-[150px] sm:w-[170px]">
      <svg viewBox="0 0 140 90" className="w-full">
        <defs>
          <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
        {/* background arc */}
        <path
          d="M10,80 A60,60 0 0 1 130,80"
          stroke="#e5e7eb"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
        />
        {/* value arc */}
        <path
          d="M10,80 A60,60 0 0 1 130,80"
          stroke="url(#gaugeGrad)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: half,
            strokeDashoffset: half * (1 - pct),
          }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center translate-y-3 mt-4">
        <span className="text-[10px] text-muted-foreground mb-1">Overall Rating</span>
        <div className="flex items-end gap-1">
          <span className="text-3xl font-bold leading-none">{value.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground leading-none pb-1">/ 5</span>
        </div>
        <div className="mt-1">
          <Stars value={value} />
        </div>
      </div>
    </div>
  );
}

function HeroSection({ 
  data, 
  universityId 
}: { 
  data: UniversityPageDataAPI | UniversityPageData;
  universityId?: string | number;
}) {
  return (
    <section className="relative">
      {/* banner */}
      <div className="relative h-[220px] sm:h-[280px] md:h-[340px] lg:h-[400px]">
        {data.headerImage ? (
          <>
            <Image src={data.headerImage} alt={data.name} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </>
        ) : (
          <div className="h-full w-full bg-gray-100" />
        )}
      </div>

      {/* content */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* LEFT */}
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{data.name}</h1>
            
            <p className="mt-3 text-lg text-muted-foreground">{data.details}</p>

            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-2">
                📍 {data.location}
              </span>
              <span className="flex items-center gap-2">
                🏛️ Established {data.established}
              </span>
              {data.ratings.overall > 0 && (
                <span className="flex items-center gap-2">
                  ⭐ {data.ratings.overall.toFixed(1)} Rating
                </span>
              )}
            </div>

            {/* small CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="bg-[#1EC408] hover:bg-green-700">
                <Link href={data.prospectusLink}>
                  <FileDown className="mr-2 h-4 w-4" />
                  Download Prospectus
                </Link>
              </Button>

              <TalkToExpertModal
                universityName={data.name}
                triggerContent="Talk to our expert"
                modalTitle={`Schedule a Call with ${data.name}`}
                triggerClassName="border-green-600 text-green-700 hover:bg-green-50 w-[200px] bg-transparent"
                calLink={data.scheduleLink || undefined}
              />
            </div>
          </div>

          {/* RIGHT: ratings */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] items-center gap-6">
            <div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-lg font-semibold">Peripheral Rating</h3>
                <span className="text-sm text-muted-foreground">(Out of 5)</span>
              </div>

              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between gap-6">
                  <span className="text-[15px] text-muted-foreground">Average Ratings</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{data.ratings.average.toFixed(1)}</span>
                    <Stars value={data.ratings.average} />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-6">
                  <span className="text-[15px] text-muted-foreground">Digital Infrastructure</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{data.ratings.DI.toFixed(1)}</span>
                    <Stars value={data.ratings.DI} />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-6">
                  <span className="text-[15px] text-muted-foreground">Curriculum</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{data.ratings.curriculum.toFixed(1)}</span>
                    <Stars value={data.ratings.curriculum} />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-6">
                  <span className="text-[15px] text-muted-foreground">Value For Money</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{data.ratings.VFM.toFixed(1)}</span>
                    <Stars value={data.ratings.VFM} />
                  </div>
                </div>

                <ReviewModal 
                  universityId={universityId || data.name} 
                  universityName={data.name} 
                />
              </div>
            </div>

            <div className="justify-self-center sm:justify-self-end">
              <Gauge value={data.ratings.overall} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- 12. FAQ --------------------------------- */

function FaqSection({ data }: { data: Faq }) {
  return (
    <section id="faq" className="bg-[#F7EEFD] px-5 py-8">
      <SectionHeader title="FAQs" subtitle="List of questions that are generally asked!" />
      <Accordion type="single" collapsible className="space-y-3">
        {data.map((f, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="rounded-xl border bg-card shadow-sm overflow-hidden"
          >
            <AccordionTrigger className="px-4 py-3 text-left hover:no-underline">
              {f.question}
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground">
              {f.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   PAGE                                      */
/* -------------------------------------------------------------------------- */

export default function UniversitySlugPage({ params }: any) {
  const slug = params.slug;
  
  // State for API data
  const [apiData, setApiData] = useState<UniversityDetailAPIResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch university data from API using slug
  useEffect(() => {
    async function fetchUniversityData() {
      try {
        console.log('🔍 Fetching university data for slug:', slug);
        setLoading(true);
        setError(null);
        
        const response = await universitiesAPI.getBySlug(slug);
        console.log('✅ University API Response:', response);
        
        setApiData(response);
      } catch (error) {
        console.error('❌ Failed to fetch university data:', error);
        setError('Failed to load university data');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchUniversityData();
    }
  }, [slug]);

  // Show loading spinner while fetching API data
  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground mt-4">Loading university details...</p>
      </div>
    );
  }

  // Determine what data to use for display
  let pageData: UniversityPageDataAPI | UniversityPageData | null = null;

  if (apiData) {
    // Use API data if available
    pageData = convertAPIDataToPageData(apiData);
    console.log('🎓 Using API Data for:', pageData.name);
  } else {
    // Fallback to static data if API fails
    pageData = PAGE_DB[slug];
    console.log('📁 Using Static Data for slug:', slug);
  }

  // Show error only if both API and static data fail
  if (!pageData) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-2xl font-bold mb-2">University not found</h1>
        <p className="text-muted-foreground mb-6">
          We couldn’t find the university you’re looking for.
        </p>
        <Button asChild>
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#F7EEFD66]">
      <HeroSection 
        data={pageData} 
        universityId={apiData?.data?.id || pageData.name}
      />

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid lg:grid-cols-[280px_800px] gap-6 lg:gap-8 mb-6">
          {/* Left rail nav */}
          <aside className="hidden lg:block">
            <Card className="sticky top-24 py-0 border rounded-none">
              <UniversitySidebar />
            </Card>
          </aside>

          {/* Main column */}
          <main className="space-y-8 lg:space-y-10">
            {/* Only show sections where we have real API data */}
            {pageData.about && <AboutSection data={pageData.about} />}
            {pageData.approvals && <ApprovalsSection data={pageData.approvals} />}
            {(pageData.courses && pageData.courses.length > 0) || (apiData?.data?.courses && apiData.data.courses.length > 0) ? (
              (() => {
                const safeLogo: string | undefined = apiData?.data?.logo?.url ? `${SITE_BASE_URL}${apiData.data.logo.url}` : (pageData.logo ?? undefined) || undefined;
                return (
                  <CoursesSection 
                    items={pageData.courses || []} 
                    universityData={{
                      name: apiData?.data?.name || pageData.name,
                      logo: safeLogo,
                      rating: apiData?.data?.rating,
                      courses: apiData?.data?.courses || []
                    }}
                  />
                );
              })()
            ) : null}
            {pageData.certificate && (
              (() => {
                const safeLogo: string | undefined = apiData?.data?.logo?.url ? `${SITE_BASE_URL}${apiData.data.logo.url}` : (pageData.logo ?? undefined) || undefined;
                return <CertificateSection data={pageData.certificate} logoUrl={safeLogo} />;
              })()
            )}
            {pageData.ranking && <RankingSection data={pageData.ranking} />}
            {Array.isArray((pageData as any).gallery) && <GallerySection images={(pageData as any).gallery} />}
            {pageData.fees && <FeesSection data={pageData.fees} />}
            {pageData.admissions && <AdmissionsSection admissions={(pageData as any).admissions} />}
            {pageData.facilities && <FacilitiesSection facilities={(pageData as any).facilities} />}
            {pageData.examination?.title && pageData.examination?.description && (
              <ExaminationSection
                title={pageData.examination.title}
                description={pageData.examination.description}
              />
            )}
            {pageData.financialAid && <FinancialAidSection data={pageData.financialAid} />}
            {!pageData.financialAid && <div id="financial-aid" />}
            { (pageData.placements || pageData.placementRecords) && (
              <PlacementsSection placements={(pageData as any).placements} placementRecords={(pageData as any).placementRecords} />
            )}
            {pageData.courseDetails && <CourseDetailsSection courses={(pageData as any).courseDetails} />}
            {pageData.partners && <HiringPartnerSection data={pageData.partners} />}
            {!pageData.partners && <div id="partners" />}
            {pageData.campus && <CampusSection data={pageData.campus} />}
            {(pageData as any).contact && <ContactSection contact={(pageData as any).contact} />}
            {pageData.advantages && <AdvantagesSection data={pageData.advantages} />}
            
            {/* FAQ section */}
            {pageData.faq && pageData.faq.length > 0 && <FaqSection data={pageData.faq} />}
            {!pageData.faq && <div id="faq" />}
            
            {/* Placeholder sections for sidebar navigation */}
            <div id="similar-universities" />
            
            {pageData.reviews && <ReviewsSection data={pageData.reviews} />}

            {/* Show message if using API data but no optional sections are available */}
            {apiData && !pageData.about && !pageData.approvals && (!pageData.courses || pageData.courses.length === 0) && !pageData.ranking && !pageData.reviews && !pageData.financialAid && !pageData.partners && !pageData.campus && !pageData.advantages && (!pageData.faq || pageData.faq.length === 0) && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">More Details Coming Soon</h3>
                <p className="text-muted-foreground">
                  We're working on adding more detailed information about {pageData.name}. 
                  Please check back later for updates.
                </p>
              </div>
            )}

            <div id="contact" />
          </main>
        </div>
        
      </section>

      <FooterSection />
    </div>
  );
}
