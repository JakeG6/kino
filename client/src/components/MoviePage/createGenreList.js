import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";    
    
//create list of genres of movie
const createGenreList = (movie) => {
    // console.log(movie.movieInfo.genres)

    let genreList = [];

    for (let i = 0; i < movie.movieInfo.genres.length; i++) {
        genreList.push(movie.movieInfo.genres[i]);
    }

    return (           
        genreList.map(genre => 
            <span key={genre.id}>
                <Link to={`/search/?type=discover&wg=${genre.id}`}>{genre.name}</Link>{genreList.indexOf(genre) == genreList.length - 1 ? ``:`, `}
            </span>
        )            
    );
}

export default createGenreList