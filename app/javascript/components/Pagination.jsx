import React from 'react'

const Pagination = ({ jobsPerPage, totalJobs, paginate }) => {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        {/* <a onClick={() => paginate(number)} href="miami" className='page-link'>
                            {number}
                        </a> */}

                        <button onClick={() => paginate(number)} className='page-link'>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination