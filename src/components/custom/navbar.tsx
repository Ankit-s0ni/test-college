'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const navigationItems = [
  { name: 'Top Universities', href: '/universities' },
  { name: 'About Us', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact Us', href: '/contact' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300 ease-in-out bg-white',
        isScrolled ? 'border-b border-navbar-border shadow-navbar' : '',
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-md bg-linear-to-br from-brand-primary to-brand-primary/80 flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-brand-primary">College Cosmos</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-nav-link hover:text-nav-link-hover px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-accent/50 rounded-md"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Button
              className="font-medium bg-[#0247D2] hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              onClick={() => {
                window.location.href = '/contact';
              }}
            >
              Get In Touch
            </Button>
          </div>

          {/* Mobile menu sheet */}
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-nav-link hover:text-nav-link-hover"
                  aria-label="Toggle menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <SheetHeader className="p-6 border-b border-border">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-md bg-linear-to-br from-brand-primary to-brand-primary/80 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">E</span>
                      </div>
                      <div className="flex flex-col">
                        <SheetTitle className="text-sm font-semibold text-brand-primary text-left">
                          Edu
                        </SheetTitle>
                        <span className="text-xs text-nav-link">Lorem ipsum</span>
                      </div>
                    </div>
                  </SheetHeader>

                  {/* Navigation Links */}
                  <div className="flex-1 py-6">
                    <nav className="space-y-2 px-6">
                      {navigationItems.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block text-nav-link hover:text-nav-link-hover px-4 py-3 text-base font-medium transition-colors duration-200 hover:bg-accent/50 rounded-lg"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </div>

                  {/* Footer CTA */}
                  <div className="p-6 border-t border-border">
                    <Button
                      className="w-full font-medium bg-[#0247D2] hover:bg-blue-700 text-white px-4 py-2 rounded-md h-11"
                      onClick={() => {
                        window.location.href = '/contact';
                        setIsMenuOpen(false); // Close the mobile menu
                      }}
                    >
                      Get In Touch
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
