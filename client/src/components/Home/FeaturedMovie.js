import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiKey from "../apiKey";
import { BrowserRouter as Router, Route, Link, useHistory } from "react-router-dom";

import Jumbotron from 'react-bootstrap/Jumbotron'

let FeaturedMovie = () => {



    const [popularMovie, setPopularMovie] = useState([])

    let history = useHistory();

    useEffect(() => {

        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1&region=US`)
            .then(res => {            
                setPopularMovie(res.data.results[0])
        })

    }, [])

    return (
        <div>
            <Jumbotron
                style={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%,rgba(0,0,0,0.3) 100%), url(https://image.tmdb.org/t/p/w780${popularMovie.backdrop_path})`}}
                onClick={() => history.push(`/movie/${popularMovie.id}`)}
           >
                <div  className = "imageDuller"></div>
                <h2>Featured Film</h2>
                <h1>{popularMovie.title}</h1>
                
                
                
            </Jumbotron>

        </div>
    )
}

export default FeaturedMovie;