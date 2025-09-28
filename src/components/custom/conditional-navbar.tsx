"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './navbar';

export default function ConditionalNavbar() {
  const pathname = usePathname() || '';

  // Hide global navbar on the Amity and Manipal pages and their subpaths
  if (pathname.startsWith('/amityonline') || pathname.startsWith('/manipalonline')) {
    return null;
  }

  return <Navbar />;
}
