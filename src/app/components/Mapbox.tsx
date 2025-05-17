'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VzaDAiLCJhIjoiY21hcjY1M3V3MDdrZDJpc2NzOTJkNHl4OCJ9.ysPWw-6eDGQ3ATDBiAuF8g';

export default function Mapbox() {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [21.7453, 41.6086],
      zoom: 0
    });

    map.on('load', () => {
      map.addSource('sentinel-heatmap', {
        type: 'raster',
        tiles: ['/api/tile?z={z}&x={x}&y={y}'],
        tileSize: 256,
      });

      map.addLayer({
        id: 'fire-heatmap-layer',
        type: 'raster',
        source: 'sentinel-heatmap', // ✅ matches the source added above
        minzoom: 5.5,
        paint: {
          'raster-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            5.5, 0.1,   // Blurry/transparent at zoomed-out
            16, 0.2  // Fully visible when zoomed in
          ]
        }
      });

    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainer} className="w-full h-full" />;
}
