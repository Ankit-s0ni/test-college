export type ProgramCategory =
  | 'Executive Programs'
  | 'PG Courses'
  | 'UG Courses'
  | 'Doctorate/PhD'
  | 'Certification';

export interface ProgramFilterGroup {
  key: string;
  label: ProgramCategory;
  options: string[];
}

export interface UniversityListItem {
  slug: string;
  name: string;
  city?: string;
  approvals: string[];
  rating: number;
  logo: string;
  image: string;
  prospectusUrl?: string;
}
