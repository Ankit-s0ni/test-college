import { CardContent } from '@/components/ui/card';
import {
  BadgeCheck,
  Book,
  Calculator,
  FileSignature,
  Handshake,
  HelpCircle,
  Info,
  MapPin,
  Phone,
  School,
  ScrollText,
  Sparkles,
  Star,
  Trophy,
  Wallet,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

const UniversitySidebar = () => {
  const sections = [
    ['about', 'About', Info],
    ['approvals', 'Approvals', BadgeCheck],
    ['courses', 'Courses', Book],
    ['certificate', 'Certificate', ScrollText],
    ['ranking', 'Ranking', Trophy],
    ['fees', 'Fee Structure', Calculator],
    ['examination', 'Examination', FileSignature],
    ['financial-aid', 'Financial Aid', Wallet],
    ['partners', 'Hiring Partners', Handshake],
    ['campus', 'Campus', MapPin],
    ['advantages', 'Advantages', Sparkles],
    ['faq', 'FAQs', HelpCircle],
    ['similar-universities', 'Similar Universities', School],
    ['reviews', 'Reviews', Star],
    ['contact', 'Contact', Phone],
  ] as const;

  const [activeSection, setActiveSection] = useState<string>('about');
  const [userClicked, setUserClicked] = useState<boolean>(false);

  // Handle initial URL hash
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && sections.some(([id]) => id === hash)) {
      setActiveSection(hash);
    }
  }, []);

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setUserClicked(true);
    // Reset user click flag after a short delay to allow intersection observer to take over
    setTimeout(() => setUserClicked(false), 1000);
  };

  useEffect(() => {
    const setupObservers = () => {
      const ids = sections.map(([id]) => id);
      const observers: IntersectionObserver[] = [];
      const existingElements = new Map<string, Element>();

      // Find all existing elements
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          existingElements.set(id, el);
        }
      });

      if (existingElements.size === 0) {
        console.log('No section elements found, will retry...');
        return [];
      }

      // Create observer for existing elements only
      const observer = new IntersectionObserver(
        (entries) => {
          // Only update if user hasn't recently clicked
          if (userClicked) return;

          let topVisibleSection: string | null = null;
          let topVisiblePosition = Infinity;

          entries.forEach((entry) => {
            const sectionId = entry.target.id;
            
            if (entry.isIntersecting) {
              const rect = entry.target.getBoundingClientRect();
              // Prefer sections that are closer to the top of the viewport
              const distanceFromTop = Math.abs(rect.top);
              
              if (distanceFromTop < topVisiblePosition) {
                topVisiblePosition = distanceFromTop;
                topVisibleSection = sectionId;
              }
            }
          });

          if (topVisibleSection) {
            setActiveSection(topVisibleSection);
          }
        },
        { 
          rootMargin: '-10% 0px -50% 0px',
          threshold: [0.1, 0.5]
        }
      );

      existingElements.forEach((el) => {
        observer.observe(el);
      });

      observers.push(observer);
      return observers;
    };

    // Initial setup
    let observers = setupObservers();

    // Retry setup for dynamic content
    const timeoutId = setTimeout(() => {
      observers.forEach((o) => o.disconnect());
      observers = setupObservers();
    }, 1500);

    return () => {
      observers.forEach((o) => o.disconnect());
      clearTimeout(timeoutId);
    };
  }, [userClicked]);

  return (
    <CardContent className="space-y-2 px-0">
      {(() => {
        return (
          <>
            {sections.map(([id, label, Icon]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleSectionClick(id);
                  // Update URL hash
                  window.history.pushState(null, '', `#${id}`);
                  // Still navigate to section for proper scroll behavior
                  document.getElementById(id)?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
                className={`
                flex items-center gap-2 text-base px-4 py-2 rounded-none cursor-pointer
                ${
                  activeSection === id
                    ? 'bg-[#FFB302] text-black font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }
              `}
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            ))}
          </>
        );
      })()}
    </CardContent>
  );
};

export default UniversitySidebar;
