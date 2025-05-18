'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import points from '@/data.json';
import 'mapbox-gl/dist/mapbox-gl.css';


mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VzaDAiLCJhIjoiY21hcjY1M3V3MDdrZDJpc2NzOTJkNHl4OCJ9.ysPWw-6eDGQ3ATDBiAuF8g';

export default function Mapbox() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize the map and store it in mapRef
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [21.7453, 41.6086],
      zoom: 0,
    });

    mapRef.current.on('load', () => {
      // Raster heatmap layer (Sentinel)
      mapRef.current!.addSource('sentinel-heatmap', {
        type: 'raster',
        tiles: ['/api/tile?z={z}&x={x}&y={y}'],
        tileSize: 256,
      });

      mapRef.current!.addLayer({
        id: 'fire-heatmap-layer',
        type: 'raster',
        source: 'sentinel-heatmap',
        minzoom: 5.5,
        paint: {
          'raster-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            5.5, 0,
            16, 0.2,
          ],
        },
      });

      // Incident points (GeoJSON)
      mapRef.current!.addSource('incidents', {
        type: 'geojson',
        data: points as any,
      });

      mapRef.current!.addLayer({
        id: 'incidents',
        type: 'circle',
        source: 'incidents',
        paint: {
          'circle-radius': 6,
          'circle-color': [
            'match',
            ['get', 'type'],
            'Crisis', '#e74b00', // orange-600
            'Assets', '#2c82d2', // sky-600
            'Medical', '#1e9964', // emerald-600
            '#888', // fallback
          ],
          'circle-stroke-width': 2,
          'circle-stroke-color': '#fff',
          'circle-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            4, 0,
            5, 1,
          ],
          'circle-stroke-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            4, 0,
            5, 1,
          ],
        },
      });

      mapRef.current?.on('click', 'incidents', (e) => {

        const feature = e.features?.[0]; if (!feature || feature.geometry.type !== 'Point') return;

        const coordinates = feature.geometry.coordinates.slice() as [number, number]
        const props = feature.properties as any

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(`<p>${props.title}</p>`)
          .addTo(mapRef.current!);
      })

    });

    return () => mapRef.current?.remove();
  }, []);

  return <div ref={mapContainer} className="w-full h-full" />;
}
