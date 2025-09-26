"use client";

import React, { useState, cloneElement } from 'react';
import AmityPopupModal from './amity-popup-modal';

export default function ApplyNowButton({ className, children }: { className?: string; children?: React.ReactNode }) {

  const openModal = (e?: React.SyntheticEvent) => {
    if (e) e.stopPropagation();
    // dispatch a global event so a single host mounts the modal
    window.dispatchEvent(new Event('amity-modal-open'));
  };

  let trigger: React.ReactNode;

  if (children && React.isValidElement(children)) {
    // Clone provided element and attach our onClick to it so we avoid nesting buttons
    trigger = cloneElement(children as React.ReactElement, {
      onClick: (e: any) => {
        // call existing handler if present
        const orig = (children as any).props.onClick;
        if (typeof orig === 'function') orig(e);
        openModal(e);
      },
      'aria-haspopup': 'dialog',
    });
  } else {
    trigger = (
      <button onClick={openModal} className={className} style={{ cursor: 'pointer' }} aria-haspopup="dialog">
        {children || 'Apply Now'}
      </button>
    );
  }

  return <>{trigger}</>;
}
