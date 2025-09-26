"use client";
import React, { useEffect, useRef } from 'react';

type LatLng = { lat: number; lng: number; label?: string };

const loadScript = (src: string) =>
  new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Failed to load script'));
    document.head.appendChild(s);
  });

const GoogleMap = ({ markers }: { markers: LatLng[] }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const key = (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "").trim();

  useEffect(() => {
    if (!key) return; // no-op when no key; we render OSM static fallback
    const src = `https://maps.googleapis.com/maps/api/js?key=${key}`;
    let map: any;
    let googleLoaded = false;

    loadScript(src)
      .then(() => {
        // @ts-ignore
        if (!window.google) return;
        // @ts-ignore
        const LatLngBounds = window.google.maps.LatLngBounds;
        // @ts-ignore
        map = new window.google.maps.Map(ref.current, { zoom: 16, center: { lat: markers[0].lat, lng: markers[0].lng } });
        const bounds = new LatLngBounds();
        markers.forEach((m) => {
          // @ts-ignore
          const marker = new window.google.maps.Marker({ position: { lat: m.lat, lng: m.lng }, map, title: m.label });
          bounds.extend(marker.getPosition());
        });
        map.fitBounds(bounds);
        googleLoaded = true;
      })
      .catch(() => {
        // silent fail
      });

    return () => {
      if (googleLoaded && ref.current) {
        ref.current.innerHTML = '';
      }
    };
  }, [key, markers]);

  if (!markers || markers.length === 0) return null;

  // If no key, render a static OpenStreetMap preview + per-marker Google Maps links.
  if (!key) {
    // helper to create a static OpenStreetMap preview URL using the bounding box of markers
    const buildOSMStaticUrl = (markers: LatLng[], width = 1024, height = 360) => {
      if (!markers || markers.length === 0) return "";
      const lats = markers.map((m) => m.lat);
      const lngs = markers.map((m) => m.lng);
      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);
      const minLng = Math.min(...lngs);
      const maxLng = Math.max(...lngs);
      // staticmap.openstreetmap.de expects bbox as minlon,minlat,maxlon,maxlat
      const url = `https://staticmap.openstreetmap.de/staticmap.php?bbox=${minLng},${minLat},${maxLng},${maxLat}&size=${width}x${height}&markers=${markers
        .map((m) => `${m.lat},${m.lng},red`)
        .join("|")}`;
      return url;
    };
    const imgUrl = buildOSMStaticUrl(markers, 1024, 360);
    return (
      <div>
        <div style={{ width: "100%", height: 360, background: "#f6f6f6", borderRadius: 6, overflow: "hidden" }}>
          {imgUrl ? (
            <a
              href={
                markers.length === 1
                  ? `https://www.google.com/maps/search/?api=1&query=${markers[0].lat},${markers[0].lng}`
                  : `https://www.google.com/maps/dir/?api=1&destination=${markers[0].lat},${markers[0].lng}`
              }
              target="_blank"
              rel="noreferrer"
            >
              <img src={imgUrl} alt="Map preview" style={{ width: "100%", height: 360, objectFit: "cover", display: "block" }} />
            </a>
          ) : (
            <div style={{ padding: 20 }}>No map preview available</div>
          )}
        </div>
        <div style={{ marginTop: 8 }}>
          {markers.map((m, i) => (
            <div key={i}>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${m.lat},${m.lng}`}
                target="_blank"
                rel="noreferrer"
              >
                {m.label || `${m.lat.toFixed(6)}, ${m.lng.toFixed(6)}`}
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <div ref={ref} className="w-full h-64 rounded overflow-hidden" />;
};

export default GoogleMap;
