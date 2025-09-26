import React from 'react';

// Very small GeoJSON -> SVG renderer for preview purposes only.
// It normalizes coordinates and draws points/polygons scaled to the viewBox.

function getBounds(coords: number[][]) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  coords.forEach(([x, y]) => {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  });
  return { minX, minY, maxX, maxY };
}

const CampusMap = ({ geo }: { geo: any }) => {
  if (!geo) return null;

  // Collect all coords
  const allCoords: number[][] = [];
  const features: any[] = [];

  if (Array.isArray(geo)) {
    geo.forEach((g) => features.push(g));
  } else if (geo.type === 'FeatureCollection') {
    geo.features.forEach((f: any) => features.push(f));
  } else if (geo.type === 'Feature') {
    features.push(geo);
  } else {
    // raw geometry
    features.push({ geometry: geo });
  }

  features.forEach((f) => {
    const geom = f.geometry || f;
    if (geom.type === 'Point') {
      allCoords.push(geom.coordinates);
    } else if (geom.type === 'Polygon') {
      const ring = geom.coordinates[0] || [];
      ring.forEach((c: any) => allCoords.push(c));
    } else if (geom.type === 'MultiPolygon') {
      (geom.coordinates || []).forEach((poly: any) => (poly[0] || []).forEach((c: any) => allCoords.push(c)));
    }
  });

  if (allCoords.length === 0) return null;

  const bounds = getBounds(allCoords);
  const padding = 0.02; // small padding
  const width = bounds.maxX - bounds.minX || 1;
  const height = bounds.maxY - bounds.minY || 1;

  const viewBox = `${bounds.minX - padding * width} ${bounds.minY - padding * height} ${width + 2 * padding * width} ${height + 2 * padding * height}`;

  const renderFeature = (f: any, idx: number) => {
    const geom = f.geometry || f;
    if (geom.type === 'Point') {
      const [x, y] = geom.coordinates;
      return <circle key={idx} cx={x} cy={y} r={(Math.max(width, height) / 100)} fill="#2563EB" />;
    }

    if (geom.type === 'Polygon') {
      const ring = geom.coordinates[0] || [];
      const d = ring.map((c: any) => `${c[0]},${c[1]}`).join(' ');
      return <polyline key={idx} points={d} fill="rgba(37,99,235,0.08)" stroke="#2563EB" strokeWidth={Math.max(width, height) / 300} />;
    }

    return null;
  };

  return (
    <div className="w-full h-40 bg-white border border-border rounded overflow-hidden">
      <svg viewBox={viewBox} preserveAspectRatio="xMidYMid meet" className="w-full h-full">
        {features.map((f, i) => renderFeature(f, i))}
      </svg>
    </div>
  );
};

export default CampusMap;
