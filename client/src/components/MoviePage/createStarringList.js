import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const createStarringList = (movie) => {

    const cast = movie.movieCredits.cast

    //maximum number of starring cast listed
    const starringMax = 6;

    //if starring cast is less than starringMax
    const castLength = (cast.length < starringMax ? cast.length : starringMax);  

    let starringList = [];

    for (let i = 0; i < castLength; i++) {
        starringList.push(movie.movieCredits.cast[i]);
    }

    console.log("starring List: ", starringList);

    // let starringString = starringList.join(", ");

    return (           
        starringList.map(star => 
            <span key={star.id}>
                <Link to={`/search/?type=discover&wca=${star.id}`}>{star.name}</Link>{starringList.indexOf(star) == starringList.length - 1 ? ``:`, `}
            </span>
        )            
    );        
}

export default createStarringList;