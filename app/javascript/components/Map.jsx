import React, { useState, useEffect } from 'react'

const Map = ({API_KEY, coords, jobs}) => {
    const [filteredJobs, setFilteredJobs] = useState([])
    const [search, setSearch] = useState('')
    const [query, setQuery] = useState('')

    /////////////////////////////////////////////////////////////////////////////// EXPERIMENTAL 
    
    let geoJsonPoints = {
        type: 'FeatureCollection',
        features: []
      }
      
      function geoJsonPoint(geoPoint) {
        return(
          {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [geoPoint.longitude, geoPoint.latitude]
        },
        properties: {
          title: geoPoint.position,
          description: ''
        }
      }
        )
      }

      const MARKER_LAYER = {
        id: 'markers',
        type: 'symbol',
        source: 'markers',
        layout: {
          'icon-image': 'restaurant-15',
          'icon-size': 1.5,
          'icon-allow-overlap': true
        }
      };

    ////////////////////////////////////////////////////////////////////////////// EXPERIMENTAL 
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
        var geoPoints = turf.points(points)
        var filteredPoints = turf.pointsWithinPolygon(geoPoints, circle).features
        jobsInRange(filteredPoints)
        return(filteredPoints)
      }

      function jobsInRange(geoPoints) {
         setFilteredJobs(jobs.filter( job => {
              return(geoPoints.some( ({geometry}) => {
                  return(geometry.coordinates[0] === job.longitude 
                    && geometry.coordinates[1] === job.latitude)
              }))
          }))
      }

    // takes a json type object and returns an array of [longitude, latitude] sub arrays
    // function geoJsonPoints(array) {
    //     let points = array.map( ({longitude,latitude}) => {
    //         return [longitude,latitude]
    //     })
    //     // console.log(points)
    //     return points //points is an array of 2D LngLat arrays
    // }


    useEffect(() => {
        mapboxgl.accessToken = API_KEY;
        var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: usCenter,
        zoom: 6
        });
        
        let marker = new mapboxgl.Marker({color: '#a83232'})
        .setLngLat(coords)
        .addTo(map)


        jobs.forEach( job => {
            geoJsonPoints.features.push(geoJsonPoint(job))
          })
        
        console.log(geoJsonPoints)

        map.on('load', () => {
            map.addSource('markers', {type: 'geojson', data: geoJsonPoints })
            map.addLayer(MARKER_LAYER)
        })

        
    
        // filterGeoJsonPoints(geoJsonPoints(jobs))
        // .forEach(({geometry}) => {
        //   new mapboxgl.Marker()
        //   .setLngLat(geometry.coordinates)
        //   .addTo(map);
        // })

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
                    {filteredJobs.map( (job,index) => {
                        return(
                            <div key={index}>
                                <h1>{job.position}</h1>
                                <p>{job.date}</p>
                                <p>{job.description}</p>
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