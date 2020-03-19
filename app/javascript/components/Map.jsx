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

    useEffect(() => {
        mapboxgl.accessToken = API_KEY;

        if(jobs.coords[0] === -98.5795 && jobs.coords[1] === 39.8283) {
            createMap(allJobsOption)
        } else {
            createMap(options(jobs.coords))
        }
        return () => {
            map.remove()
        }
    },[])

    useEffect(() => {
        if(!query) return
        fetchJobData()
    },[query])

    useEffect(() => {
        if(apiJobs.job_data) {
            const filteredPoints = geoJsonMarkers(apiJobs.job_data)
            setLoading(true)
            setFilteredJobs(filteredPoints.features)
            map.getSource('markers').setData(filteredPoints)
            map.getSource('search').setData(pointFeature(apiJobs.coords))
            map.flyTo({
                center: apiJobs.coords, 
                speed: 0.5,
                zoom: (query === "GET_ALL" ? 4 : 6 )
            })
        }
    },[apiJobs])

    function createMap(mapOptions) {
        const map = new mapboxgl.Map(mapOptions)
        const filteredPoints = geoJSON.features
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

    const fetchJobData = async () => {
        const request = await axios.get(`/map/jobs.json?location=${query}`)
        setApiJobs(request.data)
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
                <form style={{marginBottom:'1rem'}}  onSubmit={e => { e.preventDefault()
                                                                      setQuery(search)  }}>
                    <input type="text" name={query} onChange={e => setSearch(e.target.value)}/>
                    <input type="submit"/>
                </form>
                <button style={{marginBottom:'5rem'}} onClick={() => setQuery('GET_ALL')}>SEE ALL JOBS</button>
            </div>
                <div id='map' style={style}></div>
                <Jobs jobs={currentJobs} loading={loading} />
                <Pagination jobsPerPage={jobsPerPage} totalJobs={filteredJobs.length} paginate={paginate} />
        </>
    )
}

export default Map