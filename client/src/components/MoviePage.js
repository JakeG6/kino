import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Row';
import Axios from 'axios';

const MoviePage = ({match}) => {

    const [pageMovie, setPageMovie] = useState([])
    const [movieCredits, setMovieCredits] = useState([])
    

    useEffect(() => {
        //this is having issues
        axios.get(`https://api.themoviedb.org/3/movie/${match.params.id}?api_key=3f1b30e6df7ae6dcf64dc94b36c9487d&language=en-US`)
            .then(res => {
                console.log(res.data)
                setPageMovie(res.data)
        })

        Axios.get(`https://api.themoviedb.org/3/movie/${match.params.id}/credits?api_key=3f1b30e6df7ae6dcf64dc94b36c9487d`)
            .then(res => {
                console.log(res.data)
                setMovieCredits(res.data)
        })

    }, [])

    let moviePageStyle = {
        color: 'white',
        backgroundImage: `url(https://image.tmdb.org/t/p/original${pageMovie.backdrop_path})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'

    }

    // let releaseDate = pageMovie.release_date.toString()
    // let releaseYear = releaseDate.slice(0, 3)

    return (
        <div style={moviePageStyle}>
            <Container>
                <Row>
                    <Col><h1>{pageMovie.original_title}</h1></Col>
                    
                </Row>
                <Row>
                    <Col xs={6}>
                        <img src={`http://image.tmdb.org/t/p/w300${pageMovie.poster_path}`} alt={`poster for ${pageMovie.original_title}`} />
                    </Col>
                    <Col xs={6}>
                        <i>{pageMovie.overview}</i>
                        <p><b>Release Date</b> {pageMovie.release_date}</p>
                        <p><b>Starring</b> {movieCredits.cast[0]name.]}</p>

                    </Col>
                </Row>
            </Container>
            
            
        </div>
    )
}

export default MoviePage