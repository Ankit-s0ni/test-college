'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, IndianRupee, Clock, ChevronLeft, ChevronRight, Calendar, CheckCircle } from 'lucide-react';
import StudentLeadModal from '@/components/student-lead-modal';
import Link from 'next/link';

interface Program {
  id: number;
  programCode: string;
  availableSeats?: number;
  tuitionFee?: number;
  otherFees?: number;
  hostelFee?: number;
  totalFee?: number;
  feeFrequency?: string;
  applicationDeadline?: string;
  intakePeriod?: string;
  eligibilityCriteria?: string;
  admissionProcess?: string;
  specializations?: string[];
  isActive?: boolean;
  program?: {
    id?: number;
    documentId?: string;
    name?: string;
    slug?: string;
    duration?: string;
    description?: string;
    category?: {
      id?: number;
      documentId?: string;
      name?: string;
    };
  };
}

interface ProgramsSectionProps {
  programs: Program[];
  universityName: string;
}

export default function ProgramsSection({ programs, universityName }: ProgramsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  if (!programs || programs.length === 0) {
    return null;
  }

  const formatCurrency = (amount: number | undefined) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDeadline = (deadline: string | undefined) => {
    if (!deadline) return 'N/A';
    try {
      return new Date(deadline).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return deadline;
    }
  };

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  return (
    <section id="programs" className="bg-white rounded-lg shadow-sm border p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Programs Offered</h2>
        <p className="text-gray-600 mt-2">Explore our comprehensive range of programs with detailed fee structure</p>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {programs.map((program) => {
            const programName = program.program?.name || program.programCode || 'Program';
            const programDuration = program.program?.duration || 'Duration varies';
            const programCategory = program.program?.category?.name || 'General';
            const programSlug = program.program?.slug;
            
            return (
              <Card 
                key={program.id} 
                className="flex-shrink-0 w-[350px] hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-5">
                  {/* Header */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-[#0247D2] flex-shrink-0" />
                        {program.isActive !== false && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Open
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {programSlug ? (
                      <Link href={`/programs/${programSlug}`}>
                        <h3 className="text-lg font-bold text-gray-900 hover:text-[#0247D2] transition-colors cursor-pointer line-clamp-2 mb-2">
                          {programName}
                        </h3>
                      </Link>
                    ) : (
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2">
                        {programName}
                      </h3>
                    )}
                    
                    <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                      <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                        <Clock className="h-3 w-3" />
                        {programDuration}
                      </span>
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        📚 {programCategory}
                      </span>
                      {program.programCode && (
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded font-mono">
                          {program.programCode}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Intake Period - NEW */}
                  {program.intakePeriod && (
                    <div className="mb-4 p-3 bg-orange-50 border-l-4 border-orange-500 rounded">
                      <p className="text-xs font-semibold text-orange-800 mb-1">📅 Admission Period</p>
                      <p className="text-xs text-orange-700">{program.intakePeriod}</p>
                    </div>
                  )}

                  {/* Fee Display */}
                  {program.totalFee && (
                    <div className="bg-gradient-to-br from-[#0247D2]/10 to-[#0247D2]/5 rounded-lg p-4 mb-4">
                      <p className="text-xs text-gray-600 mb-1">Total Fee</p>
                      <div className="flex items-baseline gap-1">
                        <IndianRupee className="h-5 w-5 text-[#0247D2]" />
                        <p className="text-2xl font-bold text-[#0247D2]">
                          {formatCurrency(program.totalFee).replace('₹', '')}
                        </p>
                      </div>
                      {program.feeFrequency && (
                        <p className="text-xs text-gray-500 mt-1">{program.feeFrequency}</p>
                      )}
                      
                      {/* Fee Breakdown - NEW */}
                      {(program.tuitionFee || program.hostelFee || program.otherFees) && (
                        <div className="mt-3 pt-3 border-t border-gray-200 space-y-1">
                          {program.tuitionFee && (
                            <div className="flex justify-between text-xs text-gray-600">
                              <span>Tuition Fee:</span>
                              <span className="font-medium">{formatCurrency(program.tuitionFee)}</span>
                            </div>
                          )}
                          {program.hostelFee && (
                            <div className="flex justify-between text-xs text-gray-600">
                              <span>Hostel Fee:</span>
                              <span className="font-medium">{formatCurrency(program.hostelFee)}</span>
                            </div>
                          )}
                          {program.otherFees && (
                            <div className="flex justify-between text-xs text-gray-600">
                              <span>Other Fees:</span>
                              <span className="font-medium">{formatCurrency(program.otherFees)}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Quick Info */}
                  <div className="space-y-2 mb-4">
                    {program.availableSeats && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Seats Available</span>
                        <span className="font-semibold text-[#0247D2]">{program.availableSeats}</span>
                      </div>
                    )}
                    {program.applicationDeadline && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Deadline</span>
                        <span className="font-semibold text-orange-600 text-xs">
                          {formatDeadline(program.applicationDeadline)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Specializations Preview */}
                  {program.specializations && program.specializations.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-900 mb-2">Specializations</p>
                      <div className="flex flex-wrap gap-1">
                        {program.specializations.slice(0, 3).map((spec, idx) => (
                          <Badge 
                            key={idx} 
                            variant="outline" 
                            className="text-xs bg-white border-[#0247D2]/30 text-[#0247D2]"
                          >
                            {spec}
                          </Badge>
                        ))}
                        {program.specializations.length > 3 && (
                          <Badge variant="outline" className="text-xs bg-gray-50 border-gray-300 text-gray-600">
                            +{program.specializations.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="pt-4 border-t">
                    <StudentLeadModal
                      universityName={`${universityName} - ${programName}`}
                      triggerContent="Apply Now"
                      modalTitle={`Apply for ${programName}`}
                      triggerClassName="w-full bg-[#0247D2] hover:bg-blue-700 text-white h-10 text-sm transition-all duration-300"
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
