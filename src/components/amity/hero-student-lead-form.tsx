"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { studentLeadsAPI } from '@/lib/api';
import { StudentLeadSubmission } from '@/types/student-lead';

export default function HeroStudentLeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<StudentLeadSubmission>({
    name: '',
    email: '',
    phone: '',
  stateProvince: '',
  locale: 'en',
  status: 'new',
  leadSource: 'website',
  program: ''
  });

  const handleInputChange = (field: keyof StudentLeadSubmission, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

  if (!formData.name.trim()) return setError('Please enter your name');
  if (formData.name.trim().length < 2) return setError('Name must be at least 2 characters');
  if (formData.name.trim().length > 100) return setError('Name must be at most 100 characters');
    if (!formData.email.trim()) return setError('Please enter your email');
    if (!formData.phone.trim()) return setError('Please enter your phone number');

    setIsSubmitting(true);
    try {
  const res = await studentLeadsAPI.submit(formData);
      if (res.success) {
        setSubmitted(true);
        sessionStorage.setItem('college-cosmos-popup-shown', 'true');
      } else {
        throw new Error(res.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Hero form submit error', err);
      setError('Submission failed. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={{padding:18,background:'#fff',borderRadius:8}}>
        <div style={{textAlign:'center'}}>
          <h4 style={{margin:0}}>Thank you!</h4>
          <p style={{marginTop:8,fontSize:13,color:'#6b7280'}}>Our representative will contact you shortly.</p>
          <Button onClick={() => setSubmitted(false)} style={{marginTop:12}}>Send another</Button>
        </div>
      </div>
    );
  }

  return (
  <form onSubmit={handleSubmit} aria-label="Amity student lead form" className="bg-transparent p-6 rounded-lg w-full max-w-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="sr-only" htmlFor="hero-name">Full name</label>
          <Input
            id="hero-name"
            aria-label="Full name"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
            className="h-12 px-3 border border-gray-200 rounded-md bg-white shadow-sm"
          />
        </div>

        <div>
          <label className="sr-only" htmlFor="hero-email">Email</label>
          <Input
            id="hero-email"
            aria-label="Email address"
            placeholder="Your email address"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
            className="h-12 px-3 border border-gray-200 rounded-md bg-white shadow-sm"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="sr-only" htmlFor="hero-state">State/Province</label>
        <select
          id="hero-state"
          value={formData.stateProvince}
          onChange={(e) => handleInputChange('stateProvince', e.target.value)}
          aria-label="State or province"
          required
          className="w-full h-12 px-3 border border-gray-200 rounded-md bg-white shadow-sm"
        >
          <option value="">Select State *</option>
          <option>Andhra Pradesh</option>
          <option>Arunachal Pradesh</option>
          <option>Assam</option>
          <option>Bihar</option>
          <option>Chhattisgarh</option>
          <option>Goa</option>
          <option>Gujarat</option>
          <option>Haryana</option>
          <option>Himachal Pradesh</option>
          <option>Jharkhand</option>
          <option>Karnataka</option>
          <option>Kerala</option>
          <option>Madhya Pradesh</option>
          <option>Maharashtra</option>
          <option>Manipur</option>
          <option>Meghalaya</option>
          <option>Mizoram</option>
          <option>Nagaland</option>
          <option>Odisha</option>
          <option>Punjab</option>
          <option>Rajasthan</option>
          <option>Sikkim</option>
          <option>Tamil Nadu</option>
          <option>Telangana</option>
          <option>Tripura</option>
          <option>Uttar Pradesh</option>
          <option>Uttarakhand</option>
          <option>West Bengal</option>
          <option>Delhi</option>
          <option>Mumbai</option>
          <option>Other</option>
        </select>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <div>
          <label className="sr-only" htmlFor="hero-phone">Mobile</label>
          <Input
            id="hero-phone"
            aria-label="Phone number"
            placeholder="+91 Your mobile number"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
            className="h-12 px-3 border border-gray-200 rounded-md bg-white shadow-sm"
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting} className="h-12 px-6 bg-[#0247D2] text-white rounded-md">
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </div>

      {error && <div role="alert" className="mt-3 text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

      {/* hidden fields to match API shape */}
      <input type="hidden" name="status" value={(formData as any).status} />
      <input type="hidden" name="leadSource" value={(formData as any).leadSource} />
      <input type="hidden" name="locale" value={(formData as any).locale} />
    </form>
  );
}
