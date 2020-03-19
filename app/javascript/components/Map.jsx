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


const Map = ({API_KEY, jobs}) => {
    const [filteredJobs, setFilteredJobs] = useState([])
    const [apiJobs, setApiJobs] = useState([])
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

    const geoJSON = geoJsonMarkers(jobs.job_data)

    const fetchJobData = async () => {
        // const requests = await axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${API_KEY}`)
        const request = await axios.get(`/map/jobs.json?location=${query}`)
        console.log(request.data)
        setApiJobs(request.data)
    } 

    useEffect(() => {
        mapboxgl.accessToken = API_KEY;
        
        // console.log(jobs.jobs)
        console.log(geoJSON)
        console.log(jobs)

        if(jobs.coords[0] === -98.5795 && jobs.coords[1] === 39.8283) {
            createMap(allJobsOption)
        } else {
            createMap(options(jobs.coords))
        }

        console.log('MADE IT THIS FAR!!')
        // jobs.coords ? createMap(options(coords)) : createMap(allJobsOption)
        return () => {
            map.remove()
        }
    },[])

    useEffect(() => {
        if(!query) return
        // const fetchJobData = async () => {
        //     // const requests = await axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${API_KEY}`)
        //     const request = await axios.get(`/map/jobs.json?location=${query}`)
        //     console.log(request.data)
        //     setApiJobs(request.data)
        // } 

        fetchJobData()

    },[query])

    useEffect(() => {
        if(apiJobs.job_data) {
            // const filteredPoints = filterGeoJsonPoints(apiCoords,geoJSON,100)         /////////////////////////////////////   
            const filteredPoints = geoJsonMarkers(apiJobs.job_data)
            // console.log(filteredPoints)
            setLoading(true)
            setFilteredJobs(filteredPoints.features)

            map.getSource('markers').setData(filteredPoints)
            map.getSource('search').setData(pointFeature(apiJobs.coords))
            map.flyTo({
                center: apiJobs.coords, 
                ...flyToProps
            })
        }
    },[apiJobs])

    function createMap(mapOptions) {
        const map = new mapboxgl.Map(mapOptions)
        // let filteredPoints
        // if(coords) {
        //     // filteredPoints = filterGeoJsonPoints(coords,geoJSON,100)  //////////////////////////////
        //     filteredPoints = geoJsonMarkers(jobs).features
        //     console.log(filteredPoints)
        // } else {
        //     coords = usCenter
        //     filteredPoints = geoJSON.features /////////////////////////////////////////////
        // }
        const filteredPoints = geoJSON.features
        // console.log(jobs)

        setLoading(true)
        setFilteredJobs(filteredPoints)
        onLoad(map,jobs.coords,filteredPoints,JobPic,SearchPin)
        map.addControl(new mapboxgl.GeolocateControl(geoLocationOptions))
        map.addControl(new MapboxDirections({accessToken: API_KEY}),'top-left');
        map.on('click','markers', showJob)
        setMap( map )
    }

    function showJob(event) {
        console.log(event.features[0].properties)
    }

    function allJobs() {
        // const filteredPoints = filterGeoJsonPoints(usCenter,geoJSON,3000)  /////////////////////
        // setLoading(true)
        // setFilteredJobs(filteredPoints)
        // console.log(geoJsonMarkers(filteredPoints))
        // map.getSource('markers').setData(geoJsonMarkers(filteredPoints))
        // map.getSource('search').setData(pointFeature(usCenter))
        // map.flyTo({
        //     center: usCenter, 
        //     speed: 0.5, 
        //     zoom: 4
        // })

        setQuery('GET_ALL')

    }

    function onChange(event) {
        setSearch(event.target.value)
    }

    function onSubmit(event) {
        event.preventDefault()
        console.log(`This is the query!!!!!!!!!! ${search}`)
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