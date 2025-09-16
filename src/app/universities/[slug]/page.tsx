/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// API imports
import { universitiesAPI } from '@/lib/api';
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
import ContactsSection from '@/components/home/contact-section';
import FooterSection from '@/components/home/footer-section';
import { UNIVERSITIES } from '@/components/home/universities-section';
import UniversitySidebar from '@/components/custom/university-sidebar';
import AboutSection from '@/components/university/about-section';
import ApprovalsSection from '@/components/university/approvals-section';
import CoursesSection from '@/components/university/courses-section';
import CertificateSection from '@/components/university/certificate-section';
import RankingSection from '@/components/university/ranking-section';
import FinancialAidSection from '@/components/university/financial-aid-section';
import HiringPartnerSection from '@/components/home/hiring-partner-section';
import ExaminationSection from '@/components/university/examination-section';
import CampusSection from '@/components/university/campus-section';
import AdvantagesSection from '@/components/university/advantages-section';
import SimilarUniversities from '@/components/university/similar-universities';
import ReviewsSection from '@/components/university/reviews-section';
import Stars from '@/components/custom/stars';
import ReviewModal from '@/components/review-modal';
import StudentLeadModal from '@/components/student-lead-modal';

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
  images: string[];
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

export type UniversityPageDataAPI = {
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
  about?: About;
  approvals?: Approvals;
  courses?: CoursesHero[];
  ranking?: Ranking;
  reviews?: Reviews;
  financialAid?: FinancialAid;
  partners?: HiringPartners;
  campus?: Campus;
  advantages?: Advantages;
  faq?: Faq;
  examination?: Examination;
  certificate?: Certificate;
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

const makePageData = (u: (typeof UNIVERSITIES)[number], seed = 0): UniversityPageData => ({
  name: `${u.college_name} (Online)`,
  details: 'UGC-Approved • NAAC A+ • 100% Online Programs',
  location: ['Noida, UP', 'Pune, MH', 'Phagwara, PB', 'Greater Noida, UP'][seed] || 'India',
  established: 2010 + seed,
  ratings: { overall: 4.6 - seed * 0.1, average: 4.5, DI: 4.7, curriculum: 4.4, VFM: 4.6 },
  prospectusLink: '#',
  scheduleLink: '#',
  applyLink: '#',
  headerImage: u.college_img,
  logo: u.college_logo,

  about: {
    title: `About ${u.college_name} Online University`,
    description: `${u.college_name} offers flexible online degrees designed for working professionals and fresh graduates. Learn from top faculty with a mix of live sessions and recorded lectures, plus career services.`,
    courses: [
      { name: 'BBA (Online)', perSem: '₹35,000', total: '₹2,10,000', online: true },
      { name: 'MBA (Online)', perSem: '₹45,000', total: '₹1,80,000', online: true },
      { name: 'MCA (Online)', perSem: '₹40,000', total: '₹1,60,000', online: true },
    ],
  },

  approvals: {
    title: 'Approvals & Accreditations',
    description: 'Recognized by top statutory bodies and accreditation councils.',
    images: [
      'https://dummyimage.com/100x60/edf2f7/333&text=UGC',
      'https://dummyimage.com/100x60/edf2f7/333&text=AICTE',
      'https://dummyimage.com/100x60/edf2f7/333&text=NAAC+A+',
    ],
  },

  courses: BASE_GALLERY.map((g, i) => ({
    image: g,
    detailsLink: '#',
    prospectusLink: '#',
  })),

  certificate: {
    title: 'Degree & Sample Certificates',
    images: [
      'https://dummyimage.com/420x260/f5f5f5/333&text=Degree+Sample',
      'https://dummyimage.com/420x260/f5f5f5/333&text=Provisional+Certificate',
    ],
  },

  ranking: {
    title: 'Ranking',
    rankings: [
      { year: '2024', body: 'NIRF (Management)', rank: 'Top 50' },
      { year: '2023', body: 'India Today (Overall)', rank: 'Top 30' },
    ],
  },

  financialAid: {
    title: 'Financial Aid & Scholarships',
    description:
      'Merit, need-based and defense scholarships are available. Easy EMIs help you manage fees.',
    tableData: [
      {
        category: 'Merit-based',
        scholarshipCredit: 'Up to 30%',
        eligibilityDocument: '10+2 / Grad marksheet',
      },
      {
        category: 'Need-based',
        scholarshipCredit: 'Up to 20%',
        eligibilityDocument: 'Income certificate',
      },
      {
        category: 'Defense/Ex-servicemen',
        scholarshipCredit: '15%',
        eligibilityDocument: 'Service ID / Discharge book',
      },
    ],
    emiAvailable: true,
    loans: [
      {
        program: 'Online MBA',
        options: [
          {
            mode: 'Semester Wise',
            total: '₹43,750/-',
            loanAmount: '₹43,750/-',
            interest: '₹175,000/-',
            tenure: 'N/A',
            emi: 'N/A',
          },
          {
            mode: 'Annually',
            total: '₹43,750/-',
            loanAmount: '₹43,750/-',
            interest: '₹175,000/-',
            tenure: 'N/A',
            emi: '7292',
          },
          {
            mode: 'One Time',
            total: '₹43,750/-',
            loanAmount: '₹43,750/-',
            interest: '₹175,000/-',
            tenure: 'N/A',
            emi: '7292',
          },
        ],
        title: '',
        total: '',
        loanAmount: '',
        interest: '',
        tenure: '',
        emi: '',
      },
      {
        program: 'Online MCA',
        options: [
          {
            mode: 'Semester Wise',
            total: '₹43,750/-',
            loanAmount: '₹43,750/-',
            interest: '₹175,000/-',
            tenure: 'N/A',
            emi: 'N/A',
          },
          {
            mode: 'Annually',
            total: '₹43,750/-',
            loanAmount: '₹43,750/-',
            interest: '₹175,000/-',
            tenure: 'N/A',
            emi: '7292',
          },
          {
            mode: 'One Time',
            total: '₹43,750/-',
            loanAmount: '₹43,750/-',
            interest: '₹175,000/-',
            tenure: 'N/A',
            emi: '7292',
          },
        ],
        title: '',
        total: '',
        loanAmount: '',
        interest: '',
        tenure: '',
        emi: '',
      },
      {
        program: 'Online BBA',
        options: [
          {
            mode: 'Semester Wise',
            total: '₹43,750/-',
            loanAmount: '₹43,750/-',
            interest: '₹175,000/-',
            tenure: 'N/A',
            emi: 'N/A',
          },
          {
            mode: 'Annually',
            total: '₹43,750/-',
            loanAmount: '₹43,750/-',
            interest: '₹175,000/-',
            tenure: 'N/A',
            emi: '7292',
          },
          {
            mode: 'One Time',
            total: '₹43,750/-',
            loanAmount: '₹43,750/-',
            interest: '₹175,000/-',
            tenure: 'N/A',
            emi: '7292',
          },
        ],
        title: '',
        total: '',
        loanAmount: '',
        interest: '',
        tenure: '',
        emi: '',
      },
      {
        program: 'Online BCA',
        options: [
          {
            mode: 'Semester Wise',
            total: '₹43,750/-',
            loanAmount: '₹43,750/-',
            interest: '₹175,000/-',
            tenure: 'N/A',
            emi: 'N/A',
          },
          {
            mode: 'Annually',
            total: '₹43,750/-',
            loanAmount: '₹43,750/-',
            interest: '₹175,000/-',
            tenure: 'N/A',
            emi: '7292',
          },
          {
            mode: 'One Time',
            total: '₹43,750/-',
            loanAmount: '₹43,750/-',
            interest: '₹175,000/-',
            tenure: 'N/A',
            emi: '7292',
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
  },

  admission: {
    title: 'Admission Process',
    description:
      'Apply online, upload KYC and educational documents, pay the application fee, appear for counseling (if applicable), and receive the offer letter.',
  },

  partners: {
    title: 'Hiring Partners',
    description: 'Trusted by leading companies for talent and internships.',
    images: [
      'https://dummyimage.com/120x60/e2e8f0/333&text=Infosys',
      'https://dummyimage.com/120x60/e2e8f0/333&text=TCS',
      'https://dummyimage.com/120x60/e2e8f0/333&text=Accenture',
      'https://dummyimage.com/120x60/e2e8f0/333&text=Capgemini',
    ],
  },

  examination: {
    title: 'Examination & Assessment',
    description:
      'Online proctored exams at the end of each term with a mix of MCQs, case studies, and assignments. Internal assessments carry 30–40% weightage.',
  },

  campus: {
    title: 'Manipal Online University Campuses',
    groups: [
      {
        label: 'All Over India',
        color: '#FFF4BF',
        locations: ['Mangaluru', 'Jaipur', 'Sikkim'],
      },
      {
        label: 'International Campus',
        color: '#FEE1EE',
        locations: ['Dubai', 'Malaysia', 'Dubai'],
      },
    ],
  },

  advantages: {
    title: 'Manipal Online University Advantages',
    description:
      'The Manipal Online University has gained popularity in the educational world as it provides many opportunities for growth with the degree. These benefits or opportunities are briefly explained as follows:',
    tableData: [
      {
        benefit: 'Globally Accepted',
        description:
          'Manipal online degrees are globally recognized and accepted, because of which the students and the learners get multiple opportunities for their career growth in India as well as abroad. Manipal University online accreditation makes the university trust worthy and popular.',
      },
      {
        benefit: 'Flexibility & Self-Paced Learning',
        description:
          'The Manipal online degrees are completely online. This flexibility provides the opportunity to study at their convenience without disturbing any of their professional or personal commitments.',
      },
      {
        benefit: 'Industry-Driven Curriculum',
        description:
          'The Manipal online degrees have been designed based on industry expectations which include real-life case studies and live projects, helping the students get experiential learning and become more skilled.',
      },
      {
        benefit: 'Advanced Learning Resources',
        description:
          'Manipal online education is supported by an advanced AI-enabled digital learning system that creates an interactive and engaging learning environment. The Manipal university online classes recorded live lectures, quizzes, assignments, discussion forums and projects, making the learning even more enjoyable.',
      },
      {
        benefit: 'Learn from Experts and Industry Mentors',
        description:
          'With Manipal university online registration, the students benefit from highly qualified faculty members who are or have been in the industry, which gives them perspectives on real-world business and technical challenges. Hence, they develop practical skills and knowledge related to their specific needs.',
      },
      {
        benefit: 'Affordable Education',
        description:
          'Manipal Online University has an affordable fee structure compared to the campus degree programs, with EMI options and scholarships available. This makes quality education accessible to all.',
      },
      {
        benefit: 'Career & Placement Assistance',
        description:
          'To ensure that students can find job opportunities, the university provides career counseling, resume-building workshop sessions, LinkedIn profile optimization, and mock interviews. Also, the placement drives with the top companies allow the students to start their careers.',
      },
      {
        benefit: 'Networking Opportunities',
        description:
          'Students get an opportunity to interact with a vast alumni network, industry professionals, and peers for career advancements and collaborative work experiences.',
      },
    ],
  },

  faq: [
    {
      question: 'Is the online degree recognized?',
      answer: 'Yes, UGC-entitled; valid for jobs and higher studies.',
    },
    {
      question: 'Do you provide placement help?',
      answer: 'Yes—resume prep, mock interviews, and exclusive job fairs.',
    },
    {
      question: 'Are classes live or recorded?',
      answer: 'Both. Live weekend classes with recordings for self-paced study.',
    },
  ],

  section13: {
    title: 'Similar Universities',
    description: 'You may also be interested in these online universities.',
    data: [
      {
        image: BASE_GALLERY[0],
        name: 'ABC Online University',
        affiliation: 'UGC | NAAC A',
        rating: 4.4,
        prospectusLink: '#',
        viewDetailsLink: '#',
      },
      {
        image: BASE_GALLERY[0],
        name: 'XYZ Digital University',
        affiliation: 'UGC | AICTE',
        rating: 4.3,
        prospectusLink: '#',
        viewDetailsLink: '#',
      },
      {
        image: BASE_GALLERY[2],
        name: 'PQR Tech University',
        affiliation: 'UGC',
        rating: 4.2,
        prospectusLink: '#',
        viewDetailsLink: '#',
      },
    ],
  },

  reviews: {
    total: { count: 1248 + seed * 100, average: 4.5 },
    counts: { one: 20, two: 30, three: 120, four: 420, five: 658 },
    peripheral: { avg: 4.5, DI: 4.6, curr: 4.4, VFM: 4.6 },
    list: [
      {
        image: 'https://i.pravatar.cc/80?img=12',
        name: 'Kriti Sharma',
        date: 'May 07, 2025',
        description: 'Great mentors and flexible schedule. LMS is smooth and support is quick.',
        rating: 5,
      },
      {
        image: 'https://i.pravatar.cc/80?img=22',
        name: 'Arjun Mehta',
        date: 'Apr 19, 2025',
        description: 'Curriculum is relevant and the projects helped me switch roles.',
        rating: 4,
      },
    ],
  },
});

const PAGE_DB: Record<string, UniversityPageData> = Object.fromEntries(
  UNIVERSITIES.map((u, idx) => [u.college_link, makePageData(u, idx)]),
);

/* -------------------------------------------------------------------------- */
/*                          API DATA CONVERSION                               */
/* -------------------------------------------------------------------------- */

function convertAPIDataToPageData(apiResponse: UniversityDetailAPIResponse): UniversityPageDataAPI {
  // Cast to any for dynamic API data transformation with flexible properties
  const university = apiResponse.data as any;
  const baseUrl = 'https://collegecosmos.manavkhadka.com.np';
  
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
    headerImage: university.coverImage?.url ? `${baseUrl}${university.coverImage.url}` : 
                 'https://images.unsplash.com/photo-1545048702-79362596cdc9?q=80&w=1400&auto=format&fit=crop',
    logo: university.logo?.url ? `${baseUrl}${university.logo.url}` : 
          '/assets/images/manipal-logo.jpg',
  };

  const conditionalData: Partial<UniversityPageDataAPI> = {};

  // Only add About section if we have description
  if (university.description) {
    conditionalData.about = {
      title: `About ${university.name}`,
      description: university.description,
      courses: university.courseDetails?.map((course: any) => ({
        name: course.courseName,
        perSem: course.fees,
        total: course.fees,
        online: course.mode.toLowerCase().includes('online')
      })) || [],
    };
  }

  // Use real approvals data if available, fallback to accreditation
  if (university.approvals && university.approvals.length > 0) {
    conditionalData.approvals = {
      title: 'Approvals & Accreditations',
      description: 'Recognized by top statutory bodies and accreditation councils.',
      images: university.approvals.map((approval: any) =>
        approval.logo?.url ? `${baseUrl}${approval.logo.url}` :
        `https://dummyimage.com/100x60/edf2f7/333&text=${encodeURIComponent(approval.name || 'Approval')}`
      ),
    };
  } else if (university.accreditation && university.accreditation.length > 0) {
    conditionalData.approvals = {
      title: 'Approvals & Accreditations',
      description: 'Recognized by top statutory bodies and accreditation councils.',
      images: university.accreditation.map((acc: any) =>
        `https://dummyimage.com/100x60/edf2f7/333&text=${encodeURIComponent(acc.body)}`
      ),
    };
  }

  // Only add Courses section if we have real course details data
  if (university.courseDetails && university.courseDetails.length > 0) {
    conditionalData.courses = university.courseDetails.map((course: any) => ({
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
              emi: 'Contact for details',
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
      images: university.hiringPartners.map((partner: any) =>
        partner.logo?.url ? `${baseUrl}${partner.logo.url}` :
        `https://dummyimage.com/120x60/e2e8f0/333&text=${encodeURIComponent(partner.companyName)}`
      ),
    };
  }

  // Add Campus section if we have real data
  if (university.campusGroups && university.campusGroups.length > 0) {
    conditionalData.campus = {
      title: `${university.name} Campuses`,
      groups: university.campusGroups.map((group: any) => ({
        label: group.label,
        color: group.color || '#FFF4BF',
        locations: group.locations ? group.locations.split(',').map((loc: any) => loc.trim()) : [],
      })),
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
        <Image src={data.headerImage} alt={data.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
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

              <StudentLeadModal
                universityName={data.name}
                triggerContent="Schedule 1:1 Call"
                modalTitle={`Schedule a Call with ${data.name}`}
                triggerClassName="border-green-600 text-green-700 hover:bg-green-50 w-[200px] bg-transparent"
              />
            </div>

            {/* big CTA */}
            <StudentLeadModal 
              universityName={data.name}
              triggerContent={
                <>
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Apply Now
                </>
              }
            />
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
            {pageData.courses && pageData.courses.length > 0 && <CoursesSection items={pageData.courses} />}
            {pageData.certificate && <CertificateSection data={pageData.certificate} />}
            {pageData.ranking && <RankingSection data={pageData.ranking} />}
            {pageData.examination && (
              <section id="examination" className="bg-[#F7EEFD] px-5 py-8">
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-semibold">{pageData.examination.title}</h3>
                </div>
                <p className="text-muted-foreground">{pageData.examination.description}</p>
              </section>
            )}
            {pageData.financialAid && <FinancialAidSection data={pageData.financialAid} />}
            {pageData.partners && <HiringPartnerSection data={pageData.partners} />}
            {pageData.campus && <CampusSection data={pageData.campus} />}
            {pageData.advantages && <AdvantagesSection data={pageData.advantages} />}
            {pageData.faq && <FaqSection data={pageData.faq} />}
            {pageData.reviews && <ReviewsSection data={pageData.reviews} />}

            {/* Show message if using API data but no optional sections are available */}
            {apiData && !pageData.about && !pageData.approvals && (!pageData.courses || pageData.courses.length === 0) && !pageData.ranking && !pageData.reviews && !pageData.financialAid && !pageData.partners && !pageData.campus && !pageData.advantages && !pageData.faq && (
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
        <ContactsSection />
      </section>

      <FooterSection />
    </div>
  );
}
