import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import apiKey from "../apiKey";

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

let TrendingChart = () => {

    const [nowTrending, setNowTrending] = useState([])

    useEffect(() => {
        //this is having issues
        axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`)
            .then(res => {            
                setNowTrending(res.data.results)
        })

    }, [])

    return (
        <div>

            <h3>Trending</h3>
                <ol>
                {
                nowTrending.map((movie) => 
                    <li key={movie.id}>
                        <Link to={`/movie/${movie.id}`} key={movie.id}>{movie.title}</Link>
                    </li> 
                )
                } 
                </ol>

        </div>
    )
}

export default TrendingChart;