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
  const allSections = [
    ['about', 'About', Info],
    ['programs', 'Programs & Fees', School],
    ['approvals', 'Approvals', BadgeCheck],
    ['courses', 'Courses', Book],
    ['certificate', 'Certificate', ScrollText],
    ['ranking', 'Ranking', Trophy],
    ['fees', 'Fee Structure', Calculator],
    ['examination', 'Examination', FileSignature],
    ['financial-aid', 'Financial Aid', Wallet],
    ['placements', 'Placements', Trophy],
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
  const [availableSections, setAvailableSections] = useState<Array<readonly [string, string, any]>>([]);

  // Detect which sections actually exist on the page
  useEffect(() => {
    const checkSections = () => {
      const existing = allSections.filter(([id]) => {
        const element = document.getElementById(id);
        // Check if element exists and has content (not just a placeholder div)
        return element && (element.children.length > 0 || element.textContent?.trim());
      });
      setAvailableSections(existing);
    };

    // Initial check
    checkSections();

    // Recheck after a delay for dynamic content
    const timeoutId = setTimeout(checkSections, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  // Handle initial URL hash
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && availableSections.some(([id]) => id === hash)) {
      setActiveSection(hash);
    }
  }, [availableSections]);

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setUserClicked(true);
    // Reset user click flag after a short delay to allow intersection observer to take over
    setTimeout(() => setUserClicked(false), 1000);
  };

  useEffect(() => {
    const setupObservers = () => {
      const ids = availableSections.map(([id]) => id);
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
  }, [userClicked, availableSections]);

  // Don't render sidebar if no sections are available yet
  if (availableSections.length === 0) {
    return (
      <CardContent className="space-y-2 px-0">
        <div className="px-4 py-2 text-sm text-muted-foreground">Loading...</div>
      </CardContent>
    );
  }

  return (
    <CardContent className="space-y-2 px-0">
      {(() => {
        return (
          <>
            {availableSections.map(([id, label, Icon]) => (
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
