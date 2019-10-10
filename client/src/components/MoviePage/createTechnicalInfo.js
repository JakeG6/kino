import React from  'react';

const createTechnicalInfo = pageMovie => {
        let movieInfo = pageMovie.movieInfo;
    return (
        <div>
            
            <p><b>Original Title</b> {movieInfo.budget}</p>
            <p><b>Budget</b> {movieInfo.budget}</p>
            <p><b>Runtime</b> {movieInfo.runtime} minutes</p>
            
        </div>
    )
}

export default createTechnicalInfo