"use client";
import React, { useEffect, useRef } from "react";

type LatLng = { lat: number; lng: number; label?: string };

// Dynamically load Leaflet CSS/JS and render map into container
export default function OsmMap({ polygons, markers, showPolygons = true }: { polygons?: any[]; markers?: LatLng[]; showPolygons?: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let L: any = (window as any).L;
    let map: any;
    let created = false;

    async function ensureLeaflet() {
      if (!L) {
        // load CSS
        const cssHref = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        if (!document.querySelector(`link[href='${cssHref}']`)) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = cssHref;
          document.head.appendChild(link);
        }

        // load script
        await new Promise<void>((res, rej) => {
          const src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
          if (document.querySelector(`script[src='${src}']`)) return res();
          const s = document.createElement("script");
          s.src = src;
          s.async = true;
          s.onload = () => res();
          s.onerror = () => rej();
          document.body.appendChild(s);
        });
        L = (window as any).L;
      }

      if (!ref.current || !L) return;
      try {
        map = L.map(ref.current).setView([markers?.[0]?.lat || 0, markers?.[0]?.lng || 0], 15);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        }).addTo(map);

        // add polygons (optional)
        if (showPolygons && polygons && polygons.length > 0) {
          polygons.forEach((poly) => {
            try {
              const geom = poly.geometry || poly;
              if (geom.type === "Polygon") {
                const latlngs = geom.coordinates[0].map((c: [number, number]) => [c[1], c[0]]);
                L.polygon(latlngs, { color: "#3182ce", weight: 1.5, fillOpacity: 0.2 }).addTo(map);
              } else if (geom.type === "MultiPolygon") {
                geom.coordinates.forEach((ring: any[]) => {
                  const latlngs = ring[0].map((c: [number, number]) => [c[1], c[0]]);
                  L.polygon(latlngs, { color: "#3182ce", weight: 1.5, fillOpacity: 0.2 }).addTo(map);
                });
              }
            } catch (e) {
              // ignore malformed
            }
          });
        }

        // add markers
        const markerGroup: any[] = [];
        if (markers && markers.length > 0) {
          markers.forEach((m) => {
            const mk = L.marker([m.lat, m.lng]);
            if (m.label) mk.bindPopup(m.label);
            mk.addTo(map);
            markerGroup.push(mk.getLatLng());
          });
        }

        // fit bounds
        const boundsCandidates: any[] = [];
        if (markerGroup.length) boundsCandidates.push(L.latLngBounds(markerGroup));
        if (polygons && polygons.length > 0) {
          polygons.forEach((poly) => {
            try {
              const geom = poly.geometry || poly;
              if (geom.type === "Polygon") {
                const latlngs = geom.coordinates[0].map((c: [number, number]) => [c[1], c[0]]);
                boundsCandidates.push(L.latLngBounds(latlngs));
              }
            } catch (e) {}
          });
        }

        if (boundsCandidates.length) {
          const b = boundsCandidates.reduce((acc: any, cur: any) => acc.extend(cur), L.latLngBounds(boundsCandidates[0]));
          map.fitBounds(b.pad ? b.pad(0.12) : b);
        }

        created = true;
      } catch (e) {
        // swallow
      }
    }

    ensureLeaflet();

    return () => {
      try {
        if (created && map) map.remove();
      } catch (e) {}
    };
  }, [polygons, markers]);

  return <div ref={ref} style={{ width: "100%", height: 360 }} />;
}
