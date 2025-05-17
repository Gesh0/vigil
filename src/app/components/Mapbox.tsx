'use client'

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VzaDAiLCJhIjoiY21hcjY1M3V3MDdrZDJpc2NzOTJkNHl4OCJ9.ysPWw-6eDGQ3ATDBiAuF8g';

export default function Mapbox() {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (!mapContainer.current) return

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [21.7453, 41.6086],
      zoom: 2,
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainer} className='w-full h-full' />;
}
