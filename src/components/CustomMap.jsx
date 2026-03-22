import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

function CustomMap() {
    const mapRef = useRef()
    const mapContainerRef = useRef()
    const accessToken = import.meta.env.VITE_MAPBOX_ACESS_TOKEN
    useEffect(() => {
        mapboxgl.accessToken = accessToken
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: [-71.06776, 42.35816], // starting position [lng, lat]. Note that lat must be set between -90 and 90
            zoom: 9 // starting zoom
        });

        return () => {
            mapRef.current.remove()
        }
    }, [])

    return (
        <>
            <div className='w-1/1 h-1/1 ' ref={mapContainerRef} />
        </>
    )
}

export default CustomMap