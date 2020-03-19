import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Jobs from './Jobs'
import Pagination from './Pagination'
import JobPic from '../../assets/images/job.png'
import SearchPin from '../../assets/images/search.png'
import { 
    filterGeoJsonPoints, allJobsOption,
    pointFeature, options,
    geoJsonMarkers, onLoad,
    geoLocationOptions,flyToProps,
    usCenter
} from './mapFunctions'


const Map = ({API_KEY, coords, jobs}) => {
    const [filteredJobs, setFilteredJobs] = useState([])
    const [apiCoords, setApiCoords] = useState([])
    const [map, setMap] = useState({})
    const [search, setSearch] = useState('')
    const [query, setQuery] = useState('')    
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [jobsPerPage] = useState(10)

    const style = {
        width: "100rem",
        height: "600px"
    }

    const geoJSON = geoJsonMarkers(jobs)

    useEffect(() => {
        mapboxgl.accessToken = API_KEY;
        coords ? createMap(options(coords)) : createMap(allJobsOption)
        return () => {
            map.remove()
        }
    },[])

    useEffect(() => {
        if(!query) return
        const geoCoder = async () => {
            const response = await axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${API_KEY}`)
            setApiCoords(response.data.features[0].geometry.coordinates)
        } 

        geoCoder()

    },[query])

    useEffect(() => {
        if(apiCoords.length) {
            const filteredPoints = filterGeoJsonPoints(apiCoords,geoJSON,100)            
            setLoading(true)
            setFilteredJobs(filteredPoints)
            map.getSource('markers').setData(geoJsonMarkers(filteredPoints))
            map.getSource('search').setData(pointFeature(apiCoords))
            map.flyTo({
                center: apiCoords, 
                ...flyToProps
            })
        }
    },[apiCoords])

    function createMap(mapOptions) {
        const map = new mapboxgl.Map(mapOptions)
        let filteredPoints
        if(coords) {
            filteredPoints = filterGeoJsonPoints(coords,geoJSON,100)
        } else {
            coords = usCenter
            filteredPoints = geoJSON.features
        }
        setLoading(true)
        setFilteredJobs(filteredPoints)
        onLoad(map,coords,filteredPoints,JobPic,SearchPin)
        map.addControl(new mapboxgl.GeolocateControl(geoLocationOptions))
        map.addControl(new MapboxDirections({accessToken: API_KEY}),'top-left');
        map.on('click','markers', showJob)
        setMap( map )
    }

    function showJob(event) {
        console.log(event.features[0].properties)
    }

    function allJobs() {
        const filteredPoints = filterGeoJsonPoints(usCenter,geoJSON,3000)
        setLoading(true)
        setFilteredJobs(filteredPoints)
        map.getSource('markers').setData(geoJsonMarkers(filteredPoints))
        map.getSource('search').setData(pointFeature(usCenter))
        map.flyTo({
            center: usCenter, 
            speed: 0.5, 
            zoom: 4
        })
    }

    function onChange(event) {
        setSearch(event.target.value)
    }

    function onSubmit(event) {
        event.preventDefault()
        console.log(`This is the query!!!!!!!!!! ${query}`)
        setQuery(search)
    }

    useEffect(() => {
        if(!filteredJobs.length) return
        setLoading(false)
    },[filteredJobs])

    // get current jobs 

    const indexOfLastJob = currentPage * jobsPerPage
    const indexOfFirstJob = indexOfLastJob - jobsPerPage
    const currentJobs = filteredJobs.slice(indexOfFirstJob,indexOfLastJob)
    const paginate = pageNumber => setCurrentPage(pageNumber)

    return(
        <>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}> 
                <form style={{marginBottom:'1rem'}}  onSubmit={onSubmit}>
                    <input type="text" name={query} onChange={onChange}/>
                    <input type="submit"/>
                </form>
                <button style={{marginBottom:'5rem'}} onClick={allJobs}>SEE ALL JOBS</button>
            </div>
                <div id='map' style={style}></div>
                <Jobs jobs={currentJobs} loading={loading} />
                <Pagination jobsPerPage={jobsPerPage} totalJobs={filteredJobs.length} paginate={paginate} />
        </>
    )
}

export default Map