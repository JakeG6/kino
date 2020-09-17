import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import axios from 'axios';
import apiKey from "../apiKey";


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import Tabs from 'react-bootstrap/Tabs'

const PopularMovies = similarMovies => {

    const displayCount = 13;
    const [popularMovies, setPopularMovies] = useState([])



    useEffect(() => {
        
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1&region=US`)
            .then(res => {   
                let list = []         
                for (let i = 1; i < displayCount; i++) {
                    list.push(res.data.results[i]);
                }
                setPopularMovies(list);

        })

    }, [])

        return (
            <Row>
                <Col>
                    <Row>
                            {
                        popularMovies.map(movie => {
                            return(
                                <Col key={movie.id} xs={4} md={3} lg={2} className="similar-movie">
                                    <Link to={`/movie/${movie.id}`}>
                                        <Image
                                            className="similar-poster"
                                            src={`http://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                            alt={`poster for ${movie.title}`}
                                        />
                                    </Link>                                                                
                                    <Link to={`/movie/${movie.id}`}>
                                        <p>{movie.title}</p>
                                    </Link>
                                </Col>
                            ) 
                        })
                        }
                    </Row>
                </Col>
            </Row>
        )

}

export default PopularMovies;