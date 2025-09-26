"use client";

import React, { useEffect, useState } from 'react';
import AmityPopupModal from './amity-popup-modal';

export default function AmityModalHost() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    window.addEventListener('amity-modal-open', onOpen as EventListener);
    window.addEventListener('amity-modal-close', onClose as EventListener);

    return () => {
      window.removeEventListener('amity-modal-open', onOpen as EventListener);
      window.removeEventListener('amity-modal-close', onClose as EventListener);
    };
  }, []);

  if (!open) return null;

  return <AmityPopupModal delaySeconds={0} forceOpen={true} onClose={() => window.dispatchEvent(new Event('amity-modal-close'))} />;
}
