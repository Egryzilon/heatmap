import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

function CustomMap() {
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);
    const accessToken = import.meta.env.VITE_MAPBOX_ACESS_TOKEN
    mapboxgl.accessToken = accessToken
    useEffect(() => {
        if (mapRef.current) return;

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: [-86.84551, 21.05024],
            zoom: 15,
            maxBounds: [
                [-87.65444, 20.78684],
                [-86.09430, 21.47806]
            ]
        });
        const data = { // Hardcoded examples
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    geometry: { type: 'Point', coordinates: [-86.84551, 21.05024] },
                    properties: { weight: 10.0 },
                },
                {
                    type: 'Feature',
                    geometry: { type: 'Point', coordinates: [-86.84614, 21.05023] },
                    properties: { weight: 10.0 },
                },
                {
                    type: 'Feature',
                    geometry: { type: 'Point', coordinates: [-86.84555, 21.04984] },
                    properties: { weight: 10.0 },
                }
            ]
        }

        mapRef.current.on('load', () => {
            mapRef.current.addSource('incidents', {
                type: 'geojson',
                data: data,
            });

            mapRef.current.addLayer({
                id: 'incidents-heatmap',
                type: 'heatmap',
                source: 'incidents',
                minzoom: 12,
                paint: {
                    'heatmap-weight': [
                        'interpolate', ['linear'], ['get', 'weight'],
                        0, 0,
                        10, 1
                    ],
                    'heatmap-intensity': [
                        'interpolate', ['linear'], ['zoom'],
                        0, 1, 10, 3
                    ],
                    'heatmap-radius': [
                        'interpolate', ['linear'], ['zoom'],
                        0, 2, 15, 30
                    ],
                    'heatmap-color': [
                        'interpolate', ['linear'], ['heatmap-density'],
                        0, 'rgba(0,0,255,0)',
                        0.2, 'rgba(0,128,255,0.6)',
                        0.5, 'rgba(0,255,200,0.8)',
                        0.8, 'rgba(255,200,0,0.9)',
                        1, 'rgba(255,0,0,1)'
                    ],
                    'heatmap-opacity': 0.5,
                },
                slot: 'top'
            });
        });

        return () => {
            mapRef.current?.remove();
            mapRef.current = null;
        }
    }, []);
    return (
        <>
            <div className='w-1/1 h-1/1 ' ref={mapContainerRef} />
        </>
    )
}

export default CustomMap