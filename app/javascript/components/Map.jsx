import React, { useEffect } from 'react'

const Map = ({API_KEY, coords, jobs}) => {

    const usCenter = [-98.5795,39.8283] // center of the united states

    const style = {
        width: "600px",
        height: "500px"
    }

    function filterGeoJsonPoints(points) {
        var center = coords;
        var radius = 500;
        var options = {steps: 64, units: 'miles', properties: {foo: 'bar'}};
        var circle = turf.circle(center, radius, options);
        var geoPoints = turf.points(points)
        return( turf.pointsWithinPolygon(geoPoints, circle).features )
      }

    function geoJsonPoints(array) {
        let points = array.map( ({longitude,latitude}) => {
            return [longitude,latitude]
        })
        // console.log(points)
        return points //points is an array of 2D LngLat arrays
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
    
        filterGeoJsonPoints(geoJsonPoints(jobs))
        .forEach(({geometry}) => {
          new mapboxgl.Marker()
          .setLngLat(geometry.coordinates)
          .addTo(map);
        })

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