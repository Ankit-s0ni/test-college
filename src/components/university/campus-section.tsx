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
    <section id="campus" className="space-y-4 p-4 sm:p-6 rounded-lg w-full overflow-hidden">
      <h2 className="text-xl font-semibold break-words">{data.title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {data?.groups?.map((group, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-border p-4 w-full overflow-hidden"
            style={{ backgroundColor: group.color }}
          >
            <h3 className="font-semibold mb-2 break-words">{group.label}</h3>
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

                      if (group?.locations) {
                        let locs = group.locations;
                        
                        // If it's a JSON string, parse it first
                        if (typeof locs === 'string') {
                          try {
                            locs = JSON.parse(locs);
                          } catch (e) {
                            // If it's not valid JSON, just display as string
                            return <div className="text-sm text-muted-foreground break-words">{locs}</div>;
                          }
                        }
                        
                        // If it's an object with address fields
                        if (locs && typeof locs === 'object' && !Array.isArray(locs)) {
                          return (
                            <div className="space-y-1 text-sm w-full">
                              {locs.address && (
                                <div className="flex items-start gap-2 w-full">
                                  <span className="text-muted-foreground shrink-0">📍</span>
                                  <span className="break-words flex-1">{locs.address}</span>
                                </div>
                              )}
                              {locs.city && locs.state && (
                                <div className="flex items-start gap-2 w-full">
                                  <span className="text-muted-foreground shrink-0">🏙️</span>
                                  <span className="break-words flex-1">{locs.city}, {locs.state}</span>
                                </div>
                              )}
                              {locs.country && (
                                <div className="flex items-start gap-2 w-full">
                                  <span className="text-muted-foreground shrink-0">🌍</span>
                                  <span className="break-words flex-1">{locs.country}</span>
                                </div>
                              )}
                              {locs.zipCode && (
                                <div className="flex items-start gap-2 w-full">
                                  <span className="text-muted-foreground shrink-0">📮</span>
                                  <span className="break-words flex-1">{locs.zipCode}</span>
                                </div>
                              )}
                            </div>
                          );
                        }
                        
                        // If it's an array of strings
                        if (Array.isArray(locs)) {
                          return (
                            <div className="grid grid-cols-2 gap-1 text-sm text-muted-foreground">
                              {locs.map((loc: any, i: number) => (
                                <span key={i}>{typeof loc === 'string' ? loc : `${loc.city || ''}, ${loc.state || ''}`}</span>
                              ))}
                            </div>
                          );
                        }
                      }

                      return null;
                    })()}
                  </div>
            ) : (
              <div className="space-y-2 text-sm w-full overflow-hidden">
                {(() => {
                  // Parse locations from object or array
                  let locs = group?.locations;
                  
                  // If it's a JSON string, parse it first
                  if (typeof locs === 'string') {
                    try {
                      locs = JSON.parse(locs);
                    } catch (e) {
                      // If it's not valid JSON, just display as string
                      return <div className="text-muted-foreground break-words">{locs}</div>;
                    }
                  }
                  
                  // If it's an object (like the API returns)
                  if (locs && typeof locs === 'object' && !Array.isArray(locs)) {
                    return (
                      <div className="space-y-1 w-full">
                        {locs.address && (
                          <div className="flex items-start gap-2 w-full">
                            <span className="text-muted-foreground shrink-0">📍</span>
                            <span className="break-words flex-1">{locs.address}</span>
                          </div>
                        )}
                        {locs.city && locs.state && (
                          <div className="flex items-start gap-2 w-full">
                            <span className="text-muted-foreground shrink-0">🏙️</span>
                            <span className="break-words flex-1">{locs.city}, {locs.state}</span>
                          </div>
                        )}
                        {locs.country && (
                          <div className="flex items-start gap-2 w-full">
                            <span className="text-muted-foreground shrink-0">🌍</span>
                            <span className="break-words flex-1">{locs.country}</span>
                          </div>
                        )}
                        {locs.zipCode && (
                          <div className="flex items-start gap-2 w-full">
                            <span className="text-muted-foreground shrink-0">📮</span>
                            <span className="break-words flex-1">{locs.zipCode}</span>
                          </div>
                        )}
                      </div>
                    );
                  }
                  
                  // If it's an array
                  if (Array.isArray(locs)) {
                    return (
                      <div className="flex flex-wrap gap-2">
                        {locs.map((loc: any, i: number) => {
                          if (typeof loc === 'string') {
                            return (
                              <span key={i} className="px-2 py-1 bg-white/50 rounded text-xs">
                                {loc}
                              </span>
                            );
                          }
                          // If loc is an object, format it nicely
                          if (loc && typeof loc === 'object') {
                            const parts = [];
                            if (loc.address) parts.push(loc.address);
                            if (loc.city) parts.push(loc.city);
                            if (loc.state) parts.push(loc.state);
                            if (loc.country) parts.push(loc.country);
                            if (loc.zipCode) parts.push(loc.zipCode);
                            return (
                              <span key={i} className="px-2 py-1 bg-white/50 rounded text-xs">
                                {parts.join(', ') || 'Location'}
                              </span>
                            );
                          }
                          return null;
                        })}
                      </div>
                    );
                  }
                  
                  // If it's a string
                  if (typeof locs === 'string') {
                    return <div className="text-muted-foreground">{locs}</div>;
                  }
                  
                  return <div className="text-muted-foreground text-xs">No location data</div>;
                })()}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CampusSection;
