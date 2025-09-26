/* eslint-disable @typescript-eslint/no-explicit-any */
import { Campus } from '@/app/universities/[slug]/page';
import React from 'react';
import CampusMap from './campus-map';
import dynamic from 'next/dynamic';
import dynamicNoSSR from 'next/dynamic';

const GoogleMap = dynamic(() => import('./google-map'), { ssr: false });
const OsmMap = dynamicNoSSR(() => import('./osm-map'), { ssr: false });

const CampusSection = ({ data }: { data: Campus }) => {
  return (
    <section id="campus" className="space-y-4 p-6 rounded-lg">
      <h2 className="text-xl font-semibold">{data.title}</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {data?.groups?.map((group, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-border p-4"
            style={{ backgroundColor: group.color }}
          >
            <h3 className="font-semibold mb-2">{group.label}</h3>
            {group.geo ? (
                  <div className="space-y-2">
                    {/* Render GoogleMap if point coordinates are present, otherwise use SVG preview */}
                    {(() => {
                      // try to extract point coordinates from geo and detect polygons
                      const pts: any[] = [];
                      const features: any[] = [];
                      if (Array.isArray(group.geo)) {
                        group.geo.forEach((g: any) => features.push(g));
                      } else if (group.geo?.type === 'FeatureCollection') {
                        group.geo.features.forEach((f: any) => features.push(f));
                      } else if (group.geo?.type === 'Feature') {
                        features.push(group.geo);
                      } else if (group.geo) {
                        features.push({ geometry: group.geo });
                      }

                      let hasPolygon = false;
                      features.forEach((f) => {
                        const geom = f.geometry || f;
                        if (!geom) return;
                        if (geom.type === 'Point') {
                          const [lng, lat] = geom.coordinates;
                          pts.push({ lat, lng, label: group.label });
                        }
                        if (geom.type === 'Polygon' || geom.type === 'MultiPolygon') hasPolygon = true;
                      });

                      // Prefer OsmMap when polygon present or when no google key is configured
                      const googleKey = (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '').trim();
                      if (hasPolygon || !googleKey) {
                        // collect polygon features for OsmMap
                        const polys = features.filter((f) => {
                          const g = f.geometry || f;
                          return g && (g.type === 'Polygon' || g.type === 'MultiPolygon');
                        });
                        // compute simple centroid marker for polygons when no explicit points provided
                        const polyCentroidMarkers = pts.slice();
                        if (polys.length > 0 && polyCentroidMarkers.length === 0) {
                          try {
                            const p = polys[0].geometry || polys[0];
                            const coords = p.type === 'Polygon' ? p.coordinates[0] : p.coordinates[0][0];
                            const avg = coords.reduce((acc: any, c: any) => ([acc[0] + c[1], acc[1] + c[0]]), [0, 0]);
                            const centroid = [avg[0] / coords.length, avg[1] / coords.length];
                            polyCentroidMarkers.push({ lat: centroid[0], lng: centroid[1], label: group.label });
                          } catch (e) {}
                        }
                        return <OsmMap polygons={polys} markers={polyCentroidMarkers} showPolygons={false} />;
                      }

                      // Otherwise interactive GoogleMap when points exist; fallback to CampusMap
                      return pts.length > 0 ? <GoogleMap markers={pts} /> : <CampusMap geo={group.geo} />;
                    })()}

                    {(() => {
                      // If geo is a polygon or multipolygon, show a friendly summary instead of raw coords
                      const geom = Array.isArray(group.geo) ? group.geo[0] : group.geo?.type ? group.geo : group.geo?.geometry || group.geo;
                      const geomType = geom?.type || (geom?.geometry && geom.geometry.type) || null;
                      if (geomType === 'Polygon' || geomType === 'MultiPolygon') {
                        // count points (approx)
                        let points = 0;
                        try {
                          if (geomType === 'Polygon') {
                            const coords = geom.coordinates || geom.geometry?.coordinates || [];
                            // count points in outer ring
                            points = coords[0]?.length || 0;
                          } else {
                            const coords = geom.coordinates || geom.geometry?.coordinates || [];
                            points = coords.reduce((sum: number, ring: any[]) => sum + (ring[0]?.length || 0), 0);
                          }
                        } catch (e) {
                          points = 0;
                        }
                        return (
                          <div className="text-sm text-muted-foreground">
                            {`Polygon with ${points || 'multiple'} points`}
                          </div>
                        );
                      }

                      if (group?.locations && Array.isArray(group.locations)) {
                        return (
                          <div className="grid grid-cols-2 gap-1 text-sm text-muted-foreground">
                            {group.locations.map((loc: any, i: number) => (
                              <span key={i}>{typeof loc === 'string' ? loc : JSON.stringify(loc)}</span>
                            ))}
                          </div>
                        );
                      }

                      return null;
                    })()}
                  </div>
            ) : (
              <div className="grid grid-cols-2 gap-1 text-sm text-muted-foreground">
                {Array.isArray(group?.locations)
                  ? group.locations.map((loc: any, i: number) => <span key={i}>{loc}</span>)
                  : typeof group?.locations === 'string'
                  ? <span>{group.locations}</span>
                  : null}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CampusSection;
