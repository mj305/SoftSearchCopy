import React from 'react'

const Jobs = ({jobs, loading}) => {
    if(loading) {
        return <h2>Loading...</h2>
    }

    return(
        <ul className='list-group mb-4'>
            {jobs.map(({properties},index) => (
                <li key={index} className='list-group-item'>
                    {properties.position}
                </li>
            ))}
        </ul>
    )
}

export default Jobs