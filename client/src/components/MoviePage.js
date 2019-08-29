import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const MoviePage = ({match}) => {

    const [pageMovie, setPageMovie] = useState([])

    useEffect(() => {
        //this is having issues
        axios.get(`https://api.themoviedb.org/3/movie/${match.params.id}?api_key=3f1b30e6df7ae6dcf64dc94b36c9487d&language=en-US`)
            .then(res => {
                console.log(res.data)
                setPageMovie(res.data)
        })

    })

    return (
        <div>
            <p>movie id: {match.params.id}</p>
            <p>name: {pageMovie.original_title}</p>
        </div>
    )
}

export default MoviePage