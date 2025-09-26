"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './navbar';

export default function ConditionalNavbar() {
  const pathname = usePathname() || '';

  // Hide global navbar on the Amity page and its subpaths
  if (pathname.startsWith('/amityonline')) {
    return null;
  }

  return <Navbar />;
}
