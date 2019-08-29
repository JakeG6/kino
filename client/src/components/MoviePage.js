import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Row';

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
            <Container>
                <Row>
                    <Col><h1>{pageMovie.original_title}</h1></Col>
                </Row>
                <Row>
                    <Col><i>{pageMovie.overview}</i></Col>
                </Row>
                <Row>
                    <Col><img src={`http://image.tmdb.org/t/p/w400${pageMovie.poster_path}`} alt={`poster for  ${pageMovie.original_title}`} /></Col>
                    <Col><i>{}</i></Col>
                </Row>
            </Container>
            
            
        </div>
    )
}

export default MoviePage