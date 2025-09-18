import React from 'react';

interface ExaminationSectionProps {
  title: string;
  description: string;
}

const ExaminationSection: React.FC<ExaminationSectionProps> = ({ title, description }) => {
  // Try to split description into main and details for formatting
  const [mainDesc, ...rest] = description.split('\n');
  const details = rest.join('\n');

  return (
    <section id="examination" className="space-y-6 p-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{mainDesc}</p>
        {details && (
          <p className="text-xs text-muted-foreground mt-2">
            {details}
          </p>
        )}
      </div>
    </section>
  );
};

export default ExaminationSection;
