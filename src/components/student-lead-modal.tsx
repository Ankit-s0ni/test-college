'use client';

import { useState, useEffect } from 'react';
import { studentLeadsAPI, programsAPI } from '@/lib/api';
import { StudentLeadSubmission } from '@/types/student-lead';
import { ProgramListItem } from '@/types/program';
import { transformProgramsData } from '@/lib/transformers';

// shadcn/ui components
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// lucide icons
import { Loader2 } from 'lucide-react';

interface StudentLeadModalProps {
  universityName: string;
  triggerContent: React.ReactNode;
  modalTitle?: string;
  triggerClassName?: string;
}

export default function StudentLeadModal({ 
  universityName,
  triggerContent,
  modalTitle,
  triggerClassName
}: StudentLeadModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [programs, setPrograms] = useState<ProgramListItem[]>([]);
  const [loadingPrograms, setLoadingPrograms] = useState(false);
  
  const [formData, setFormData] = useState<StudentLeadSubmission>({
    name: '',
    email: '',
    phone: '',
    program: '',
    stateProvince: 'Andhra Pradesh',
    status: 'new',
    message: '',
    leadSource: 'website',
    locale: 'en'
  });

  // Fetch programs when modal opens
  useEffect(() => {
    if (isOpen && programs.length === 0) {
      fetchPrograms();
    }
  }, [isOpen]);

  const fetchPrograms = async () => {
    try {
      setLoadingPrograms(true);
      const response = await programsAPI.getAll();
      const transformedPrograms = transformProgramsData(response.data);
      setPrograms(transformedPrograms);
    } catch (error) {
      console.error('Failed to fetch programs:', error);
    } finally {
      setLoadingPrograms(false);
    }
  };

  const handleInputChange = (field: keyof StudentLeadSubmission, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Form validation
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!formData.email.trim()) {
      setError('Please enter your email');
      return;
    }

    if (!formData.phone.trim()) {
      setError('Please enter your phone number');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await studentLeadsAPI.submit(formData);
      
      if (response.success) {
        setSubmitted(true);
      } else {
        throw new Error(response.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Failed to submit student lead:', err);
      setError('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setError(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      program: '',
      stateProvince: 'Andhra Pradesh',
      status: 'new',
      message: '',
      leadSource: 'website',
      locale: 'en'
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(resetForm, 300); // Reset after sheet closes
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          className={triggerClassName || "mt-4 w-full sm:w-[420px] bg-[#0247D2] hover:bg-blue-700 h-11 text-[15px]"}
          onClick={() => setIsOpen(true)}
        >
          {triggerContent}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>
            {modalTitle || `Apply to ${universityName}`}
          </SheetTitle>
        </SheetHeader>

        {submitted ? (
          <div className="mt-6 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Application Submitted!</h3>
            <p className="text-gray-600">
              Thank you for your interest in {universityName}. Our admissions team will contact you shortly.
            </p>
            <Button onClick={handleClose} className="mt-4">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="program">Interested Program</Label>
              <select
                id="program"
                value={formData.program}
                onChange={(e) => handleInputChange('program', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a program</option>
                {loadingPrograms ? (
                  <option value="">Loading programs...</option>
                ) : (
                  programs.map((program) => (
                    <option key={program.id} value={program.name}>
                      {program.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stateProvince">State/Province *</Label>
              <select
                id="stateProvince"
                value={formData.stateProvince}
                onChange={(e) => handleInputChange('stateProvince', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <textarea
                id="message"
                value={formData.message || ''}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Tell us about your goals and any specific questions you have..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] resize-y"
                rows={3}
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0247D2] hover:bg-blue-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting Application...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              By submitting this form, you agree to receive communications from {universityName} about their programs.
            </p>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}
