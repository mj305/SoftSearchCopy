import React, { useState, useEffect } from 'react'
import axios from 'axios'
import JobPic from '../../assets/images/job.png'


const Map = ({API_KEY, coords, jobs}) => {
    const [filteredJobs, setFilteredJobs] = useState([])
    const [search, setSearch] = useState('')
    const [query, setQuery] = useState('')    
    const [map, setMap] = useState({})

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

    async function geoCoder() {
        const response = await axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${API_KEY}`)
        console.log(response.data.features[0].geometry.coordinates)
        return response
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

    useEffect(() => {
        mapboxgl.accessToken = API_KEY;
        setMap( new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: coords,
        zoom: 6
        }))
    },[])


    useEffect(() => {
        if(Object.entries(map).length === 0) return

        const mapInstance = map
        
        let marker = new mapboxgl.Marker({color: '#a83232'})
        .setLngLat(coords)
        .addTo(mapInstance)

        
        // console.log(geoJsonMarkers)

        mapInstance.on('load', () => {
            mapInstance.loadImage(JobPic, (error, image) => {
                if (error) throw error
                mapInstance.addImage('JobPic', image)
            })
            mapInstance.addSource('markers', {type: 'geojson', data: {
                type: 'FeatureCollection',
                features: filterGeoJsonPoints(geoJsonMarkers)
            } })
            mapInstance.addLayer(MARKER_LAYER)
        })


        // add geolocate control to the map

        mapInstance.addControl(
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

        // return () => {
        //     map.remove()
        // }

    },[map])


    useEffect(() => {
        if(!query) return
        console.log(map)

        map.removeLayer('markers')

    },[query])


    function onChange(event) {
        console.log(event.target.value)
        setSearch(event.target.value)
    }

    function onSubmit(event) {
        event.preventDefault()
        console.log(`This is the query!!!!!!!!!! ${query}`)
        setQuery(search)
    }
    return(
        <>
            <form style={{marginBottom:'5rem'}} action='/search' method='GET' onSubmit={onSubmit}>
                <input type="text" name={query} onChange={onChange}/>
                {/* <input type="submit" name="q" value={query || "Search Now"}/> */}
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