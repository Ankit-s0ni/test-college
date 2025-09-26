import React from 'react';

const FacilitiesSection = ({ facilities }: { facilities: any[] }) => {
  if (!facilities || facilities.length === 0) return null;

  return (
    <section id="facilities" className="space-y-4 p-6 rounded-lg border bg-white">
      <h2 className="text-xl font-semibold">Facilities</h2>

      <div className="grid sm:grid-cols-2 gap-4 text-sm">
        {facilities.map((f: any) => (
          <div key={f.id || f.name} className="space-y-1">
            <div className="font-medium">{f.name}</div>
            {f.description && <div className="text-muted-foreground">{f.description}</div>}
            <div className="text-xs text-muted-foreground">{f.category}{f.capacity ? ` • Capacity: ${f.capacity}` : ''}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FacilitiesSection;
