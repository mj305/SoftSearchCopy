import React from 'react'

const Jobs = ({ jobs, loading }) => {
    if(loading) {
        return <h2>Loading...</h2>
    }

    return(
        <ul id='listings' className='list-group mb-4'>
            {jobs.map(({properties},index) => (
                <div key={index} className="card w-100">
                    <div className="card-body">
                        <h5 className="card-title">{properties.position}</h5>
                        <p className="card-text">{properties.description}</p>
                        <a href="#" className="btn btn-primary">Apply Now</a>
                    </div>
                </div>
                // <li key={index} className='list-group-item'>
                //     <h1>{properties.position}</h1>
                //     <p>{properties.date}</p>
                //     <p>{properties.description}</p>
                // </li>
            ))}
        </ul>
    )
}

export default Jobs

