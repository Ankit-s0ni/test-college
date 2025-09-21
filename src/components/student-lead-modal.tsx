'use client';

import { useState } from 'react';

// shadcn/ui components
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

// lucide icons
// no loader icon required

interface StudentLeadModalProps {
  universityName: string;
  triggerContent: React.ReactNode;
  modalTitle?: string;
  triggerClassName?: string;
  calLink?: string; // optional Cal.com scheduling URL
}

export default function StudentLeadModal({ 
  universityName,
  triggerContent,
  modalTitle,
  triggerClassName
  , calLink
}: StudentLeadModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  // no submission state required for embed

  const resetForm = () => {
    // no form data to reset for embed
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

        <div className="mt-4">
          {/* If calLink or env var is present, embed it; otherwise show guidance */}
          { (calLink || typeof process !== 'undefined' && process.env.NEXT_PUBLIC_CAL_URL) ? (
            <div className="h-[640px]">
              <iframe
                src={calLink || (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_CAL_URL : '')}
                title="Cal.com Scheduler"
                className="w-full h-full border-0"
              />
            </div>
          ) : (
            <div className="p-4 text-sm text-muted-foreground">
              <p className="mb-2">Cal.com is not configured.</p>
              <p className="mb-2">To enable inline booking, set the NEXT_PUBLIC_CAL_URL environment variable to your Cal.com booking link (for example: https://cal.com/your-username) or pass a <code>calLink</code> prop to this component.</p>
              <div className="mt-4">
                <Button onClick={handleClose}>Close</Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
