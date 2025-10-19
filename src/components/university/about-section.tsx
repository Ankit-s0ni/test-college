import { About } from '@/app/universities/[slug]/page';
import React from 'react';

const AboutSection = ({ data }: { data: About & { courses: Array<any> } }) => {
  // Clean the description: remove content reference tags and fix newlines
  const cleanDescription = (html: string) => {
    if (!html) return '';
    
    // Remove content reference tags like :contentReference[oaicite:0]{index=0}
    let cleaned = html.replace(/:contentReference\[oaicite:\d+\]\{index=\d+\}/g, '');
    
    // Replace literal \n with actual line breaks
    cleaned = cleaned.replace(/\\n/g, '\n');
    
    // Convert plain text newlines to HTML breaks if not already in tags
    cleaned = cleaned.replace(/\n/g, '<br/>');
    
    return cleaned;
  };

  return (
    <section id="about" className="space-y-4 w-full overflow-hidden">
      <h2 className="text-xl font-semibold break-words">{data.title}</h2>

      {/* Render HTML content properly */}
      <div 
        className="prose prose-sm max-w-none text-gray-700 
          prose-headings:text-gray-900 prose-headings:font-semibold prose-headings:break-words
          prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-3
          prose-h3:text-lg prose-h3:mt-4 prose-h3:mb-2
          prose-p:my-2 prose-p:leading-relaxed prose-p:break-words
          prose-ul:my-2 prose-ul:list-disc prose-ul:pl-5
          prose-li:my-1 prose-li:break-words
          prose-a:text-[#0247D2] prose-a:no-underline hover:prose-a:underline prose-a:break-all
          [&>br]:hidden [&_br]:my-1
          w-full overflow-x-auto
          [&_*]:max-w-full [&_*]:break-words"
        dangerouslySetInnerHTML={{ __html: cleanDescription(data.description) }}
      />
    </section>
  );
};

export default AboutSection;
