import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/custom/navbar';
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <Navbar />
        {children}
        <AutoPopupModal delaySeconds={7} />
      </body>
    </html>
  );
}
