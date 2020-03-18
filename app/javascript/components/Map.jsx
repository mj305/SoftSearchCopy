import React, { useState, useEffect } from 'react'
import axios from 'axios'
import JobPic from '../../assets/images/job.png'
import SearchPin from '../../assets/images/search.png'
import { 
    pointFeature,
    filterGeoJsonPoints,
    geoJsonMarkers, onLoad,
    geoLocationOptions,flyToProps
} from './mapFunctions'


const Map = ({API_KEY, coords, jobs}) => {
    const [filteredJobs, setFilteredJobs] = useState([])
    const [apiCoords, setApiCoords] = useState([])
    const [map, setMap] = useState({})
    const [search, setSearch] = useState('')
    const [query, setQuery] = useState('')    

    const usCenter = [-98.5795,39.8283] // center of the united states

    const style = {
        width: "100rem",
        height: "600px"
    }

    const geoJSON = geoJsonMarkers(jobs)

    function createMap(mapOptions) {
        const map = new mapboxgl.Map(mapOptions)
       
        const filteredPoints = filterGeoJsonPoints(coords,geoJSON)
        setFilteredJobs(filteredPoints)
        onLoad(map,coords,filteredPoints,JobPic,SearchPin)
       
        map.addControl(
            new mapboxgl.GeolocateControl(geoLocationOptions)
        )

        setMap( map )
    }


    useEffect(() => {
        mapboxgl.accessToken = API_KEY;

        const options = {
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: coords,
            zoom: 6
            }

        createMap(options)

        return () => {
            map.remove()
        }
    },[])


    useEffect(() => {
        if(apiCoords.length) {
            // map.removeLayer('markers')
            // map.removeLayer('search')

            const filteredPoints = filterGeoJsonPoints(apiCoords,geoJSON)
            setFilteredJobs(filteredPoints)

            console.log(filteredPoints)

            map.getSource('markers').setData({
                type: 'FeatureCollection',
                features: filteredPoints
            })

            map.getSource('search').setData({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: apiCoords
                },
                properties: {foo: 'bar'}
            })
            
            map.flyTo({
                center: apiCoords, 
                ...flyToProps
            })
        }


    },[apiCoords])

    useEffect(() => {
        if(!query) return

        const geoCoder = async () => {
            const response = await axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${API_KEY}`)
            setApiCoords(response.data.features[0].geometry.coordinates)
        } 

        geoCoder()
    
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