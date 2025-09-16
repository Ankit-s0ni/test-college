'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Star, Plus } from 'lucide-react';
import { reviewsAPI } from '@/lib/api';
import { ReviewSubmission } from '@/types/review';

interface ReviewModalProps {
  universityId: string | number;
  universityName: string;
  programs?: Array<{ id: number; name: string; slug: string }>;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ universityId, universityName, programs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<ReviewSubmission>>({
    reviewerName: '',
    reviewerType: 'Current Student',
    overallRating: 0,
    digitalInfrastructureRating: 0,
    curriculumRating: 0,
    valueForMoneyRating: 0,
    title: '',
    review: '',
    university: universityId,
    program: undefined,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.reviewerName?.trim()) {
      alert('Please enter your name');
      return;
    }

    if (!formData.title?.trim()) {
      alert('Please enter a review title');
      return;
    }

    if (!formData.review?.trim()) {
      alert('Please write your review');
      return;
    }

    if (!formData.overallRating || formData.overallRating === 0) {
      alert('Please provide an overall rating');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const reviewSubmission: ReviewSubmission = {
        reviewerName: formData.reviewerName.trim(),
        reviewerType: formData.reviewerType as any,
        overallRating: formData.overallRating,
        digitalInfrastructureRating: formData.digitalInfrastructureRating || 0,
        curriculumRating: formData.curriculumRating || 0,
        valueForMoneyRating: formData.valueForMoneyRating || 0,
        title: formData.title.trim(),
        review: formData.review.trim(),
        university: universityId,
        program: formData.program,
        reviewDate: new Date().toISOString(),
        isApproved: false, // Reviews need approval
        helpfulCount: 0,
      };

      console.log('🔍 Submitting review:', reviewSubmission);
      
      const response = await reviewsAPI.submit(reviewSubmission);
      console.log('✅ Review submitted successfully:', response);
      
      // Reset form and close modal
      setFormData({
        reviewerName: '',
        reviewerType: 'Current Student',
        overallRating: 0,
        digitalInfrastructureRating: 0,
        curriculumRating: 0,
        valueForMoneyRating: 0,
        title: '',
        review: '',
        university: universityId,
        program: undefined,
      });
      setIsOpen(false);
      
      alert('Thank you! Your review has been submitted and will be published after approval.');
    } catch (error) {
      console.error('❌ Failed to submit review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStarRating = (
    label: string,
    value: number,
    onChange: (rating: number) => void
  ) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="p-1"
          >
            <Star
              className={`h-5 w-5 ${
                star <= value 
                  ? 'fill-yellow-400 text-yellow-400' 
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-muted-foreground">
          {value > 0 ? `${value}/5` : 'Not rated'}
        </span>
      </div>
    </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="mt-2">
          <Plus className="mr-2 h-4 w-4" />
          Review Rating
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Review {universityName}</SheetTitle>
          <SheetDescription>
            Share your experience to help other students make informed decisions.
          </SheetDescription>
        </SheetHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Reviewer Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="reviewerName">Your Name *</Label>
              <Input
                id="reviewerName"
                value={formData.reviewerName}
                onChange={(e) => setFormData({...formData, reviewerName: e.target.value})}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div>
              <Label>You are a *</Label>
              <RadioGroup 
                value={formData.reviewerType} 
                onValueChange={(value) => setFormData({...formData, reviewerType: value as any})}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Current Student" id="current" />
                  <Label htmlFor="current">Current Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Alumni" id="alumni" />
                  <Label htmlFor="alumni">Alumni</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Faculty" id="faculty" />
                  <Label htmlFor="faculty">Faculty</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Prospective Student" id="prospective" />
                  <Label htmlFor="prospective">Prospective Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Parent" id="parent" />
                  <Label htmlFor="parent">Parent</Label>
                </div>
              </RadioGroup>
            </div>
            
            {programs && programs.length > 0 && (
              <div>
                <Label htmlFor="program">Program (Optional)</Label>
                <select
                  id="program"
                  value={formData.program || ''}
                  onChange={(e) => setFormData({...formData, program: e.target.value ? Number(e.target.value) : undefined})}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select a program (optional)</option>
                  {programs.map((program) => (
                    <option key={program.id} value={program.id}>
                      {program.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Ratings */}
          <div className="space-y-4">
            <h3 className="font-medium">Rate Your Experience</h3>
            
            {renderStarRating(
              'Overall Rating *',
              formData.overallRating || 0,
              (rating) => setFormData({...formData, overallRating: rating})
            )}
            
            {renderStarRating(
              'Digital Infrastructure',
              formData.digitalInfrastructureRating || 0,
              (rating) => setFormData({...formData, digitalInfrastructureRating: rating})
            )}
            
            {renderStarRating(
              'Curriculum',
              formData.curriculumRating || 0,
              (rating) => setFormData({...formData, curriculumRating: rating})
            )}
            
            {renderStarRating(
              'Value for Money',
              formData.valueForMoneyRating || 0,
              (rating) => setFormData({...formData, valueForMoneyRating: rating})
            )}
          </div>

          {/* Review Content */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Review Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Summarize your review in a few words"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="review">Your Review *</Label>
              <Textarea
                id="review"
                value={formData.review}
                onChange={(e) => setFormData({...formData, review: e.target.value})}
                placeholder="Share your detailed experience, what you liked, areas for improvement, etc."
                rows={5}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default ReviewModal;
