'use client';

import { useState } from 'react';
import { studentLeadsAPI } from '@/lib/api';

// shadcn/ui components
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [program, setProgram] = useState(universityName);
  const [stateProvince, setStateProvince] = useState('');

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setProgram(universityName);
    setStateProvince('');
    setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    
    if (!name || !email || !phone || !program || !stateProvince) {
      setMessage({ type: 'error', text: 'Please fill all fields.' });
      return;
    }
    
    setLoading(true);
    
    try {
      const formData = {
        name,
        email,
        phone,
        program,
        stateProvince,
        status: 'new',
        message: `Interested in ${program}`,
        leadSource: 'program-detail-page',
        locale: 'en'
      };

      const response = await studentLeadsAPI.submit(formData);
      
      if (!response.success) {
        throw new Error(response.message || 'Submission failed');
      }
      
      setMessage({ type: 'success', text: 'Thank you! We will contact you soon.' });
      setTimeout(() => {
        setIsOpen(false);
        setTimeout(resetForm, 300);
      }, 2000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(resetForm, 300);
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
      
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {modalTitle || `Apply to ${universityName}`}
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0247D2] focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0247D2] focus:border-transparent"
              placeholder="your.email@example.com"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0247D2] focus:border-transparent"
              placeholder="+91 1234567890"
              required
            />
          </div>

          {/* Program */}
          <div>
            <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-1">
              Program *
            </label>
            <input
              type="text"
              id="program"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0247D2] focus:border-transparent"
              readOnly
            />
          </div>

          {/* State/Province */}
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              State/Province *
            </label>
            <input
              type="text"
              id="state"
              value={stateProvince}
              onChange={(e) => setStateProvince(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0247D2] focus:border-transparent"
              placeholder="Enter your state or province"
              required
            />
          </div>

          {/* Message */}
          {message && (
            <div className={`p-3 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {message.text}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#0247D2] hover:bg-blue-700 text-white font-medium h-11"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="px-6"
            >
              Cancel
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
