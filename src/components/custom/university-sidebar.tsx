import { CardContent } from '@/components/ui/card';
import {
  BadgeCheck,
  Book,
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

  useEffect(() => {
    const ids = sections.map(([id]) => id);
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '0px 0px -60% 0px' },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return (
    <CardContent className="space-y-2 px-0">
      {(() => {
        return (
          <>
            {sections.map(([id, label, Icon]) => (
              <a
                key={id}
                href={`#${id}`}
                className={`
                flex items-center gap-2 text-base px-4 py-2 rounded-none
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
