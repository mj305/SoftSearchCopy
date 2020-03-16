import React, { useEffect } from 'react'

const Map = ({API_KEY, coords}) => {

    const style = {
        width: "600px",
        height: "500px"
    }

    useEffect(() => {
        mapboxgl.accessToken = API_KEY;
        var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: coords,
        zoom: 6
        });
        
        var marker = new mapboxgl.Marker({color: '#a83232'})
        .setLngLat(coords)
        .addTo(map)
    },[])
    return(
        <div>
            <h1>Hello React!</h1>
            <div id='map' style={style}></div>
        </div>
    )
}

export default Map