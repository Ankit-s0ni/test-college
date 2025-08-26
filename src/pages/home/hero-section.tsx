import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

import HeroImage from '../../../public/assets/images/hero-img.png';
import HeroBg from '../../../public/assets/icons/hero-bg.svg';
import ApplierIcon from '../../../public/assets/icons/applier-icon-group.svg';
import { MoveRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-left">
          <p className="text-sm text-brand-primary font-medium mb-4">
            We Simplify Everything For You
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            We Are Here To Guide You Best;
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Recruitment reimagined through intelligent conversations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button className="font-semibold flex items gap-2">
              <p>Talk To Our Expert</p>
              <MoveRight />
            </Button>
            <Button variant="outline" className="font-semibold">
              <p>Schedule 1:1 Call</p>
              <MoveRight />
            </Button>
          </div>
          <Image src={ApplierIcon} alt="trust us image" width={300} height={40} />
          {/* <div className="flex items-center gap-3 bg-muted/50 rounded-full px-4 py-2 w-fit">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-brand-primary"></div>
                <div className="w-8 h-8 rounded-full bg-secondary"></div>
                <div className="w-8 h-8 rounded-full bg-accent"></div>
              </div>
              <span className="text-sm text-muted-foreground">Applied Already Trust Us</span>
            </div> */}
        </div>
        <div className="relative">
          <Image
            className="absolute top-0 left-0"
            src={HeroImage}
            alt="hero image"
            width={500}
            height={500}
          />
          <Image src={HeroBg} alt="hero background" width={500} height={500} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
