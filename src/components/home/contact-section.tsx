'use client';

import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { studentLeadsAPI, programsAPI } from '@/lib/api';
import { StudentLeadSubmission } from '@/types/student-lead';
import { ProgramListItem } from '@/types/program';
import { transformProgramsData } from '@/lib/transformers';

export default function ContactsSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<StudentLeadSubmission>({
    name: '',
    email: '',
    phone: '',
    stateProvince: 'Andhra Pradesh',
    status: 'new',
    message: '',
    leadSource: 'website',
    locale: 'en'
  });

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
      setError('Please enter your full name');
      return;
    }

    if (!formData.email.trim()) {
      setError('Please enter your email');
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
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          stateProvince: 'Andhra Pradesh',
          status: 'new',
          message: '',
          leadSource: 'website',
          locale: 'en'
        });
      } else {
        throw new Error(response.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Failed to submit contact form:', err);
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // shared style to mimic light filled fields from the mock
  const filledField =
    'bg-rose-50 border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60 bg-white';

  return (
    <section id="contact" className="py-20 bg-[#F7EEFD]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
          {/* Left: Contact info */}
          <div>
            <h2 className="text-3xl font-bold mb-1">Get In Touch</h2>
            <p className="text-sm text-muted-foreground mb-10">Lorem ipsum learner support</p>

            <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Feel free to use the form or drop us an email. Old fashioned phone calls work too.
            </p>

            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" aria-hidden />
                <span className="text-sm sm:text-base">9122100100</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" aria-hidden />
                <span className="text-sm sm:text-base">loremipsum@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" aria-hidden />
                <span className="text-sm sm:text-base">15 west 3rd st media road 230047</span>
              </li>
            </ul>
          </div>

          {/* Right: Form */}
          {submitted ? (
            <div className="w-full text-center space-y-4 p-8 bg-white rounded-lg">
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
              <h3 className="text-lg font-semibold">Message Sent!</h3>
              <p className="text-gray-600">
                Thank you for contacting us. We'll get back to you shortly.
              </p>
              <Button 
                onClick={() => setSubmitted(false)} 
                className="mt-4 bg-[#0247D2] hover:bg-blue-700"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className={filledField}
                  autoComplete="name"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className={filledField}
                  autoComplete="email"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+91-9876543210"
                  className={filledField}
                  autoComplete="tel"
                />
              </div>



              {/* State/Province */}
              <div className="space-y-2">
                <Label htmlFor="stateProvince">State/Province *</Label>
                <select
                  id="stateProvince"
                  value={formData.stateProvince}
                  onChange={(e) => handleInputChange('stateProvince', e.target.value)}
                  className={`${filledField} w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
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

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message || ''}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Tell us about your goals and any questions you have..."
                  className={filledField + ' resize-none'}
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
                className="w-full h-11 text-base bg-[#0247D2] hover:bg-blue-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
