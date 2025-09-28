import type { Metadata } from 'next';
import './globals.css';
import ConditionalNavbar from '@/components/custom/conditional-navbar';
import AutoPopupModal from '@/components/auto-popup-modal';

import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
export const metadata: Metadata = {
  title: 'College Cosmos',
  description: 'Explore universities, programs, blogs, and more at College Cosmos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
