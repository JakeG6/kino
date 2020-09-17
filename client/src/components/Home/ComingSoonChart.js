import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiKey from "../apiKey";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

let ComingSoonChart = () => {

    const [comingSoon, setcomingSoon] = useState([])

    useEffect(() => {
        //this is having issues
        axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1&region=US`)
            .then(res => {            
                setcomingSoon(res.data.results)
        })

    }, [])

    return (
        <div>
            <h3>Coming Soon</h3>
                <ul>
                {
                comingSoon.map((movie) => 
                    <li key={movie.id}>
                        <Link to={`/movie/${movie.id}`} key={movie.id}>{movie.original_title}</Link>
                    </li> 
                )
                } 
                </ul>
        </div>
    )
}

export default ComingSoonChart;