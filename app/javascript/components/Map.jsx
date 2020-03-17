import React, { useEffect } from 'react'

const Map = ({API_KEY, coords}) => {

    const usCenter = [-98.5795,39.8283] // center of the united states

    const style = {
        width: "600px",
        height: "500px"
    }

    useEffect(() => {
        mapboxgl.accessToken = API_KEY;
        var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: usCenter,
        zoom: 3
        });
        
        var marker = new mapboxgl.Marker({color: '#a83232'})
        .setLngLat(usCenter)
        .addTo(map)


        // add geolocate control to the map

        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: false
                },
                trackUserLocation: false,
                showAccuracyCircle: false
            })
        )





    },[])
    return(
        <div>
            <h1>Hello React!</h1>
            <div id='map' style={style}></div>
        </div>
    )
}

export default Map