"use client";

import { useState, useEffect } from 'react';
import { studentLeadsAPI } from '@/lib/api';
import { StudentLeadSubmission } from '@/types/student-lead';

// shadcn/ui components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// lucide icons
import { X, Loader2, Phone, Mail, User, MapPin } from 'lucide-react';

interface AmityPopupModalProps {
  delaySeconds?: number;
  universityName?: string;
  forceOpen?: boolean;
  onClose?: () => void;
}

export default function AmityPopupModal({ delaySeconds = 7, forceOpen = false, onClose }: AmityPopupModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasShown, setHasShown] = useState(false);

  const [formData, setFormData] = useState<StudentLeadSubmission>({
    name: '',
    email: '',
    phone: '',
    stateProvince: 'Andhra Pradesh',
    locale: 'en'
  });

  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true);
      setHasShown(true);
      return;
    }

    if (hasShown) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      setHasShown(true);
    }, delaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [delaySeconds, hasShown, forceOpen]);

  useEffect(() => {
    if (forceOpen) return;
    const hasSeenPopup = sessionStorage.getItem('college-cosmos-popup-shown');
    if (hasSeenPopup) setHasShown(true);
  }, [forceOpen]);

  const handleInputChange = (field: keyof StudentLeadSubmission, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) return setError('Please enter your name');
    if (!formData.email.trim()) return setError('Please enter your email');
    if (!formData.phone.trim()) return setError('Please enter your phone number');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return setError('Please enter a valid email address');

    setIsSubmitting(true);
    try {
      const response = await studentLeadsAPI.submit(formData);
      if (response.success) {
        setSubmitted(true);
        sessionStorage.setItem('college-cosmos-popup-shown', 'true');
      } else {
        throw new Error(response.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Failed to submit amity popup lead:', err);
      setError('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('college-cosmos-popup-shown', 'true');
  if (typeof onClose === 'function') onClose();
  };

  if (hasShown && !isOpen) return null;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 99999 }}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

    <div className="relative bg-white rounded-2xl shadow-2xl w-full" style={{ maxWidth: 'min(520px,96%)', maxHeight: '80vh', overflow: 'hidden' }}>
            <div className="max-h-[80vh] overflow-y-auto">
            {submitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Thank You!</h3>
                <p className="text-gray-600">We've received your information. Our education consultants will contact you shortly with personalized program recommendations.</p>
                <Button onClick={handleClose} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg" style={{ backgroundColor: '#0247D2', color: '#ffffff' }}>
                  <span className="text-white">Close</span>
                </Button>
              </div>
            ) : (
              <>
                <div className="relative p-3 pb-2 border-b border-gray-100 sm:p-4 sm:pb-3">
                  <button onClick={handleClose} className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 transition-colors">
                    <X className="h-5 w-5 text-gray-500" />
                  </button>

                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-transparent rounded-full mb-4">
                      <img src="/assets/images/amity.png" alt="Amity logo" style={{height:44}} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Program</h2>
                    <p className="text-gray-600 text-sm">Get personalized guidance from our education experts</p>
                  </div>
                </div>

                <div className="p-3 sm:p-4">
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="popup-name" className="text-sm font-medium text-gray-700">Full Name *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                          <Input id="popup-name" type="text" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} placeholder="Enter your full name" className="pl-10 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white placeholder-gray-500 shadow-sm" required />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="popup-email" className="text-sm font-medium text-gray-700">Email Address *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                          <Input id="popup-email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} placeholder="Enter your email address" className="pl-10 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white placeholder-gray-500 shadow-sm" required />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="popup-phone" className="text-sm font-medium text-gray-700">Phone Number *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                          <Input id="popup-phone" type="tel" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} placeholder="Enter your phone number" className="pl-10 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white placeholder-gray-500 shadow-sm" required />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="popup-stateProvince" className="text-sm font-medium text-gray-700">State/Province *</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                          <select id="popup-stateProvince" value={formData.stateProvince} onChange={(e) => handleInputChange('stateProvince', e.target.value)} className="w-full pl-10 pr-4 py-3 h-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white placeholder-gray-500 shadow-sm" required>
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
                      </div>
                    </div>

                    {error && (<div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">{error}</div>)}

                    <div className="pt-3 sm:pt-4">
                      <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors" style={{ backgroundColor: '#0247D2', color: '#ffffff' }}>
                        {isSubmitting ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" /><span className="text-white">Submitting...</span></>) : (<span className="text-white">Get Free Consultation</span>)}
                      </Button>
                    </div>

                    <p className="text-xs text-gray-500 text-center leading-relaxed">By submitting, you agree to receive educational guidance calls from our experts. We respect your privacy and won't spam you.</p>
                  </form>
                </div>
              </>
            )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
