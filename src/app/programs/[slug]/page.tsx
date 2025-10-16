'use client';

import React from 'react';
import { programsAPI } from '@/lib/api';
import { notFound, useParams } from 'next/navigation';
import { SITE_BASE_URL } from '@/lib/config';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { GraduationCap, Clock, BookOpen, Users, TrendingUp, CheckCircle2 } from 'lucide-react';
import StudentLeadModal from '@/components/student-lead-modal';

export default function ProgramDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [program, setProgram] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchProgram() {
      try {
        console.log('Fetching program with slug:', slug);
        const response = await programsAPI.getBySlug(slug);
        console.log('Program data received:', response.data);
        setProgram(response.data);
      } catch (error) {
        console.error('Error fetching program:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    }
    fetchProgram();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>;
  }

  if (!program) {
    notFound();
  }

    // Get image URL
    const baseUrl = SITE_BASE_URL;
    const imageUrl = program.image?.url
      ? program.image.url.startsWith('http')
        ? program.image.url
        : `${baseUrl}${program.image.url}`
      : '/assets/images/programs/images.jpeg';

    // Parse HTML descriptions and fix escaped newlines
    const stripHtml = (html: string) => {
      return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
    };

    // Process HTML content to fix escaped newlines
    const processHtmlContent = (html: string) => {
      if (!html) return '';
      // Replace literal \n with actual line breaks
      return html.replace(/\\n/g, '<br/>').replace(/\n/g, '<br/>');
    };

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-white border-b border-gray-200 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="mb-6 flex items-center gap-2 text-sm text-gray-600">
                <Link href="/" className="hover:text-[#0247D2]">Home</Link>
                <span>/</span>
                <Link href="/#programs" className="hover:text-[#0247D2]">Programs</Link>
                <span>/</span>
                <span className="text-gray-900 font-medium">{program.name}</span>
              </nav>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Program Image */}
                <div className="w-full md:w-48 h-48 bg-gray-100 rounded-lg overflow-hidden shadow-lg flex-shrink-0 border border-gray-200">
                  <img
                    src={imageUrl}
                    alt={program.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Program Info */}
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">{program.name}</h1>
                  <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                    {program.shortDescription || stripHtml(program.description || '')}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg">
                      <GraduationCap className="w-5 h-5 text-[#0247D2]" />
                      <span className="text-gray-900 font-medium">{program.degree}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg">
                      <Clock className="w-5 h-5 text-[#0247D2]" />
                      <span className="text-gray-900 font-medium">{program.standardDuration}</span>
                    </div>
                    {program.category && (
                      <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg">
                        <BookOpen className="w-5 h-5 text-[#0247D2]" />
                        <span className="text-gray-900 font-medium">{program.category.label}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <StudentLeadModal
                      universityName={program.name}
                      triggerContent="Apply Now"
                      modalTitle={`Apply for ${program.name}`}
                      triggerClassName="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold h-10 px-8 bg-[#0247D2] text-white hover:bg-white hover:text-[#0247D2] border-2 border-[#0247D2] transition-all duration-300 shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Program Overview */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    Program Overview
                  </h2>
                  <div 
                    className="prose prose-slate max-w-none prose-headings:text-gray-900 prose-h2:text-xl prose-h2:font-bold prose-h2:text-gray-900 prose-h3:text-lg prose-h3:font-semibold prose-h3:text-gray-800 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:list-disc prose-ul:ml-6 prose-ol:list-decimal prose-ol:ml-6"
                    dangerouslySetInnerHTML={{ __html: processHtmlContent(program.description || '') }}
                  />
                </div>

                {/* Eligibility Criteria */}
                {program.standardEligibility && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                      Eligibility Criteria
                    </h2>
                    <div 
                      className="prose prose-slate max-w-none prose-headings:text-gray-900 prose-h2:text-xl prose-h2:font-bold prose-h2:text-gray-900 prose-h3:text-lg prose-h3:font-semibold prose-h3:text-gray-800 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:list-disc prose-ul:ml-6 prose-ol:list-decimal prose-ol:ml-6"
                      dangerouslySetInnerHTML={{ __html: processHtmlContent(program.standardEligibility) }}
                    />
                  </div>
                )}

                {/* Curriculum */}
                {program.standardCurriculum && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <BookOpen className="w-6 h-6 text-purple-600" />
                      Curriculum
                    </h2>
                    <div 
                      className="prose prose-slate max-w-none prose-headings:text-gray-900 prose-h2:text-xl prose-h2:font-bold prose-h2:text-gray-900 prose-h3:text-lg prose-h3:font-semibold prose-h3:text-gray-800 prose-h4:text-base prose-h4:font-semibold prose-h4:text-gray-800 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:list-disc prose-ul:ml-6 prose-ol:list-decimal prose-ol:ml-6"
                      dangerouslySetInnerHTML={{ __html: processHtmlContent(program.standardCurriculum) }}
                    />
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Facts */}
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Facts</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-gray-600">Degree</span>
                      <span className="font-semibold text-gray-900">{program.degree}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-semibold text-gray-900">{program.standardDuration}</span>
                    </div>
                    {program.category && (
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-gray-600">Category</span>
                        <span className="font-semibold text-gray-900">{program.category.label}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Status</span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {program.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <StudentLeadModal
                      universityName={program.name}
                      triggerContent="Apply Now"
                      modalTitle={`Apply for ${program.name}`}
                      triggerClassName="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 bg-[#0247D2] text-white hover:bg-white hover:text-[#0247D2] border-2 border-[#0247D2] transition-all duration-300"
                    />
                    <StudentLeadModal
                      universityName={program.name}
                      triggerContent="Request Info"
                      modalTitle={`Request Info - ${program.name}`}
                      triggerClassName="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 bg-white text-gray-900 hover:bg-[#0247D2] hover:text-white border-2 border-gray-300 hover:border-[#0247D2] transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Related Programs */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
                  <p className="text-gray-700 mb-4">
                    Our admission counselors are here to guide you through the application process.
                  </p>
                  <StudentLeadModal
                    universityName={program.name}
                    triggerContent="Contact Us"
                    modalTitle={`Contact Us - ${program.name}`}
                    triggerClassName="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 bg-white text-gray-900 hover:bg-[#0247D2] hover:text-white border-2 border-gray-300 hover:border-[#0247D2] transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
