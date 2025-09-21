'use client';

import { useState } from 'react';

// shadcn/ui components - switch to Dialog for centered popup
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface TalkToExpertModalProps {
  universityName: string;
  triggerContent: React.ReactNode;
  modalTitle?: string;
  triggerClassName?: string;
  calLink?: string; // optional Cal.com scheduling URL
  calThemeColor?: string; // optional theme color to pass to Cal.com (best-effort)
}

export default function TalkToExpertModal({ 
  universityName,
  triggerContent,
  modalTitle,
  triggerClassName,
  calLink,
  calThemeColor
}: TalkToExpertModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const resetForm = () => {
    // no form data to reset for embed
  };


  const handleClose = () => {
    setIsOpen(false);
    setTimeout(resetForm, 300); // Reset after dialog closes
  };

  // Build a normalized embed URL for Cal.com.
  const rawCal = calLink || (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_CAL_URL || '' : '');
  const buildEmbedUrl = (url: string) => {
    if (!url) return '';
    // If the URL already contains overlayCalendar or looks like an embed, return as-is
    if (url.includes('overlayCalendar') || url.includes('embed')) return appendThemeParam(url);
    // Append overlayCalendar=true safely depending on existing query params
    return appendThemeParam(url + (url.includes('?') ? '&overlayCalendar=true' : '?overlayCalendar=true'));
  };

  // Append theme color param if provided (best-effort). Cal.com may not honor this param.
  const themeColor = calThemeColor || '#0247D2';
  const appendThemeParam = (url: string) => {
    if (!themeColor) return url;
    // Use a param name 'theme' as a best-effort; if Cal.com exposes a different param this should be adjusted.
    return url + (url.includes('?') ? `&theme=${encodeURIComponent(themeColor)}` : `?theme=${encodeURIComponent(themeColor)}`);
  };
  const iframeSrc = buildEmbedUrl(rawCal);

  return (
  <Dialog open={isOpen} onOpenChange={(open: boolean) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button
          className={triggerClassName || "mt-4 w-full sm:w-[420px] bg-[#0247D2] hover:bg-blue-700 h-11 text-[15px]"}
          onClick={() => setIsOpen(true)}
        >
          {triggerContent}
        </Button>
      </DialogTrigger>

      {/* DialogContent will render centered popup; apply backdrop blur via utility classes */}
      {isOpen && (
        <DialogContent className="w-[95vw] max-w-5xl rounded-md p-0 bg-white shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium">{modalTitle || `Talk to ${universityName}`}</DialogTitle>
          </DialogHeader>
          <DialogClose onClick={handleClose}>
            <Button variant="ghost">Close</Button>
          </DialogClose>
        </div>

        <div className="p-4">
          {/* If calLink or env var is present, embed it; otherwise show guidance */}
          { iframeSrc ? (
            <div>
              <div className="h-[80vh]">
                <iframe
                  src={iframeSrc}
                  title="College Cosmos Scheduler"
                  className="w-full h-full border-0 rounded-md"
                />
              </div>
              <div className="mt-3 flex justify-end">
                <a
                  href={rawCal}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="outline">Open in College Cosmos</Button>
                </a>
              </div>
            </div>
          ) : (
            <div className="p-4 text-sm text-muted-foreground">
              <p className="mb-2">Scheduler is not configured for College Cosmos.</p>
              <p className="mb-2">To enable inline booking, set the NEXT_PUBLIC_CAL_URL environment variable to your scheduler link (for example: https://cal.com/your-username) or pass a <code>calLink</code> prop to this component.</p>
              <div className="mt-4">
                <Button onClick={handleClose}>Close</Button>
              </div>
            </div>
          )}
        </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
