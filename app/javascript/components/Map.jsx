import React, { useEffect } from 'react'

const Map = ({API_KEY}) => {

    const style = {
        width: "400px",
        height: "300px"
    }

    useEffect(() => {
        mapboxgl.accessToken = API_KEY;
        var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11'
        });
    },[])
    return(
        <div>
            <h1>Hello React!</h1>
            <div id='map' style={style}></div>
        </div>
    )
}

export default Map