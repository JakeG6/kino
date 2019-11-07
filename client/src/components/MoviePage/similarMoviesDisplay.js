import React from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import Tabs from 'react-bootstrap/Tabs'

const similarMoviesDisplay = similarMovies => {

    //number of similar movies shown
    const displayCount = 12;

    //create short list of similar movies
    let simList = [];
    for (let i = 0; i < displayCount; i++) {
        simList.push(similarMovies[i]);
    }
    console.log(simList);

    //render similar movies in JSX if there are any.
    if (simList[0] !== undefined) {
        return (
            <Row>
                <Col>
                    <Row>
                        <Col>
                        <h2 className="movie-page-header">Similar Movies</h2>
                        </Col>
                        
                    </Row>
                    <Row>
                            {
                        simList.map(movie => {
                            return(
                                <Col key={movie.id} xs={3} md={2} className="similar-movie">
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
    // else {
    //     return (
    //         <Row>
    //             <Col>
    //                 <h2>There Are No Similar Movies at This Time</h2>
    //             </Col>
    //         </Row>
    //     )
    // }
    
}

export default similarMoviesDisplay;