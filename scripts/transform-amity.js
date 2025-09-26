const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'src', 'tmp', 'amity-api.json');
const raw = fs.readFileSync(file, 'utf8');
const api = JSON.parse(raw);
const university = api.data || {};
const baseUrl = '';

function normalizeLocations(locations) {
  if (!locations) return [];
  if (Array.isArray(locations)) return locations.map(l => String(l).trim()).filter(Boolean);
  if (typeof locations === 'string') return locations.split(',').map(s => s.trim()).filter(Boolean);
  if (typeof locations === 'object') {
    try {
      if (locations.type === 'Point' && Array.isArray(locations.coordinates)) {
        const [lng, lat] = locations.coordinates; return [`Point: ${lat.toFixed(5)}, ${lng.toFixed(5)}`];
      }
      if (locations.type === 'Polygon' && Array.isArray(locations.coordinates)) {
        const coords = locations.coordinates[0] || [];
        const sample = coords.slice(0,3).map(c => `${c[1].toFixed(5)}, ${c[0].toFixed(5)}`);
        return [`Polygon with ${coords.length} points`, ...sample];
      }
      return [JSON.stringify(locations)];
    } catch (e) { return []; }
  }
  return [];
}

const baseData = {
  name: university.name,
  details: university.shortDescription || university.description || 'University Details',
  location: (university.location && (university.location.city || university.location.address)) || 'India',
  established: university.established || null,
  ratings: {
    overall: university.rating || 0,
    average: university.rating || 0,
    DI: university.rating || 0,
    curriculum: university.rating || 0,
    VFM: university.rating || 0,
  },
  prospectusLink: (university.brochures && university.brochures.length>0) ? `${baseUrl}${university.brochures[0].url}` : '#',
  scheduleLink: '#',
  applyLink: '#',
  headerImage: university.coverImage?.url ? `${baseUrl}${university.coverImage.url}` : null,
  logo: university.logo?.url ? `${baseUrl}${university.logo.url}` : null,
};

const conditionalData = {};

// About.courses building
let aboutCourses = [];
if (university.courses && university.courses.length>0) {
  aboutCourses = university.courses.map(c => ({ name: c.name, perSem: c.feeRange||null, total: c.feeRange||null, online: c.mode?String(c.mode).toLowerCase().includes('online'):false }));
} else if (university.courseDetails && university.courseDetails.length>0) {
  aboutCourses = university.courseDetails.map(c => ({ name: c.courseName||c.title||'Course', perSem: c.fees||c.feeRange||null, total: c.fees||c.feeRange||null, online: c.mode?String(c.mode).toLowerCase().includes('online'):false }));
} else if (university.fees && university.fees.length>0) {
  aboutCourses = university.fees.map(f => ({ name: f.courseType||f.category||'Program', perSem: (f.frequency&&String(f.frequency).toLowerCase().includes('per year'))?f.totalFee:f.tuitionFee||f.totalFee||null, total: f.totalFee||f.tuitionFee||null, online: false }));
}
if (university.description) {
  conditionalData.about = { title: `About ${university.name}`, description: university.description, courses: aboutCourses };
}

if (university.courseDetails && university.courseDetails.length>0) {
  conditionalData.courseDetails = university.courseDetails.map(c => ({ id: c.id, courseName: c.courseName, duration: c.duration, fees: c.fees, mode: c.mode, eligibility: c.eligibility, syllabus: c.syllabus, specializations: c.specializations }));
}

if (university.fees && university.fees.length>0) {
  conditionalData.fees = { title: 'Fee Structure', description: 'Detailed fee breakdown', fees: university.fees.map(f=>({ courseType: f.courseType, category: f.category, tuitionFee: f.tuitionFee, otherFees: f.otherFees, hostelFee: f.hostelFee, messFee: f.messFee, transportFee: f.transportFee, totalFee: f.totalFee, frequency: f.frequency })) };
}

if (university.campusGroups && university.campusGroups.length>0) {
  conditionalData.campus = { title: `${university.name} Campuses`, groups: university.campusGroups.map(g=>({ label: g.label, color: g.color||'#FFF', locations: normalizeLocations(g.locations), geo: g.geo || (g.locations && typeof g.locations==='object' && g.locations.type?g.locations:undefined) })) };
}

if (university.contact) {
  conditionalData.contact = { phone: university.contact.phone||null, email: university.contact.email||null, fax: university.contact.fax||null, tollFree: university.contact.tollFree||null };
}

if (university.placements && university.placements.length>0) {
  conditionalData.placements = university.placements.map(p=>({ id:p.id, year:p.year, totalStudents:p.totalStudents, studentsPlaced:p.studentsPlaced||p.placedStudents, placementPercentage:p.placementPercentage, averagePackage:p.averagePackage, highestPackage:p.highestPackage, lowestPackage:p.lowestPackage, topRecruiters:p.topRecruiters }));
}

const pageData = { ...baseData, ...conditionalData };

console.log(JSON.stringify({ pageData }, null, 2));
