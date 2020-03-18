import React, { useState, useEffect } from 'react'
import JobPic from '../../assets/images/job.png'

const Map = ({API_KEY, coords, jobs}) => {
    const [filteredJobs, setFilteredJobs] = useState([])
    const [search, setSearch] = useState('')
    const [query, setQuery] = useState('')    

      const MARKER_LAYER = {
        id: 'markers',
        type: 'symbol',
        source: 'markers',
        layout: {
          'icon-image': 'JobPic',
          'icon-size': 0.25,
          'icon-allow-overlap': true
        }
      };

    const usCenter = [-98.5795,39.8283] // center of the united states

    const style = {
        width: "100rem",
        height: "600px"
    }

    // var from = turf.point(coords);
    // var to = turf.point([-80.1373,26.1224]);
    // var options = {units: 'miles'};
    // var distance = turf.distance(from, to, options);


    function filterGeoJsonPoints(points) {
        var center = coords;
        var radius = 100;
        var options = {steps: 64, units: 'miles', properties: {foo: 'bar'}};
        var circle = turf.circle(center, radius, options);

        var filteredPoints = turf.pointsWithinPolygon(points, circle).features
        // console.log(filteredPoints)
        setFilteredJobs(filteredPoints)
        return(filteredPoints)
      }

    useEffect(() => {
        mapboxgl.accessToken = API_KEY;
        var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: coords,
        zoom: 6
        });
        
        let marker = new mapboxgl.Marker({color: '#a83232'})
        .setLngLat(coords)
        .addTo(map)



        const features = jobs.map( job => {
            return {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [job.longitude, job.latitude]
                },
                properties: {...job}
              }
        })

        const geoJsonMarkers = {
            type: "FeatureCollection",
            features
        }
        
        // console.log(geoJsonMarkers)

        map.on('load', () => {
            map.loadImage(JobPic, (error, image) => {
                if (error) throw error
                map.addImage('JobPic', image)
            })
            map.addSource('markers', {type: 'geojson', data: {
                type: 'FeatureCollection',
                features: filterGeoJsonPoints(geoJsonMarkers)
            } })
            map.addLayer(MARKER_LAYER)
        })


        // add geolocate control to the map

        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: false
                },
                trackUserLocation: false,
                showAccuracyCircle: false,
                fitBoundsOptions: {
                    maxZoom: 6
                }
            })
        )

        return () => {
            map.remove()
        }

    },[query])

    function onChange(event) {
        console.log(event.target.value)
        setSearch(event.target.value)
    }

    function onSubmit(event) {
        console.log(`This is the query!!!!!!!!!! ${query}`)
        setQuery(search)
        map.remove()
    }
    return(
        <>
            <form style={{marginBottom:'5rem'}} action='/search' method='POST' onSubmit={onSubmit}>
                <input type="text" name={query} onChange={onChange}/>
                <input type="submit" name="q" value={query || "Search Now"}/>
            </form>

            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <div>
                    {filteredJobs.map( ({properties},index) => {
                        return(
                            <div key={index}>
                                <h1>{properties.position}</h1>
                                <p>{properties.date}</p>
                                <p>{properties.description}</p>
                            </div>
                        )
                    })}
                </div>
                <div id='map' style={style}></div>

            </div>
        </>
    )
}

export default Map