import React from 'react';
import { Card } from '@/components/ui/card';
import { Users, GraduationCap, Building2, BookOpen, Home, Building } from 'lucide-react';

interface UniversityStatsProps {
  studentStrength?: number;
  facultyCount?: number;
  campusSize?: number;
  libraryBooks?: number;
  hostelFacility?: boolean;
  universityType?: string;
}

export default function UniversityStats({
  studentStrength,
  facultyCount,
  campusSize,
  libraryBooks,
  hostelFacility,
  universityType,
}: UniversityStatsProps) {
  // Only render if we have at least one stat
  const hasStats = studentStrength || facultyCount || campusSize || libraryBooks || hostelFacility !== undefined || universityType;
  
  if (!hasStats) return null;

  const stats = [
    {
      icon: Users,
      label: 'Student Strength',
      value: studentStrength ? `${studentStrength.toLocaleString()}+` : null,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: GraduationCap,
      label: 'Faculty Members',
      value: facultyCount ? `${facultyCount.toLocaleString()}+` : null,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Building2,
      label: 'Campus Size',
      value: campusSize ? `${campusSize} Acres` : null,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: BookOpen,
      label: 'Library Books',
      value: libraryBooks ? `${libraryBooks.toLocaleString()}+` : null,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Home,
      label: 'Hostel Facility',
      value: hostelFacility !== undefined ? (hostelFacility ? 'Available' : 'Not Available') : null,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
    {
      icon: Building,
      label: 'University Type',
      value: universityType || null,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ].filter(stat => stat.value !== null);

  return (
    <section id="stats" className="py-8">
      <div className="mb-6">
        <h3 className="text-xl font-semibold">University at a Glance</h3>
        <p className="text-sm text-muted-foreground mt-1">Key facts and figures</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                  <p className="font-semibold text-sm truncate">{stat.value}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
