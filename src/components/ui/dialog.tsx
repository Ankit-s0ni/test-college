"use client";

import * as React from 'react';

// A minimal Dialog wrapper to match the project's UI pattern.
// This is intentionally simple: it uses native dialog behavior with basic structure
// and Tailwind classes to match the existing design system. If you have a
// preferred implementation (Radix UI or custom), replace this file.

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children, ...rest }: DialogProps) {
  return (
    <div {...rest} data-open={open}>
      {children}
    </div>
  );
}

export function DialogTrigger({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
  // expecting the tappable element to be provided (Button etc.)
  return <>{children}</>;
}

export function DialogContent({ children, className = '', ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" {...rest}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
      <div className={`relative ${className}`}>{children}</div>
    </div>
  );
}

export function DialogHeader({ children }: { children?: React.ReactNode }) {
  return <div className="flex-1">{children}</div>;
}

export function DialogTitle({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
}

export function DialogClose({ children, onClick }: { children?: React.ReactNode; onClick?: () => void }) {
  // Wrap children in a span and call onClick when clicked. Caller should pass the handler.
  return <span onClick={onClick} role="button" tabIndex={0}>{children}</span>;
}

export default Dialog;
