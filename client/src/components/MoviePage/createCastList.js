import React from 'react';

const createCastList = (pageMovie) => {
    
    //array containing film cast
    const movieCast = pageMovie.movieCredits.cast;

    //render full crew in JSX
    return (
        <div>
            <ul>
                {
                movieCast.map(castMember => (
                <li key={castMember.cast_id}> 
                    {castMember.name} <b>"{castMember.character}"</b> 
                </li>
                ))
                }
            </ul>           
        </div>
    )
}

export default createCastList;