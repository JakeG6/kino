import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import apiKey from "./apiKey";
import TrendingChart from './TrendingChart';

import Container from 'react-bootstrap/Container'
import Carousel from 'react-bootstrap/Carousel'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


let Home = () =>  {

    const [nowPlaying, setNowPlaying] = useState([]);

    //Carousel Logic
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
      setDirection(e.direction);
    };

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1&region=US`)
            .then(res => {
                setNowPlaying(res.data.results)
        })
    
    }, [])
        
    return (
        <div>
            <Container fluid={true}>
                <Row>
                    <Col xs={3}>
                        <TrendingChart />
                    </Col>
                    <Col xs={6}>
                        <Carousel activeIndex={index} direction={direction} onSelect={handleSelect}>
                            {
                                nowPlaying.slice(0, 20).map((movie) =>
                                <Carousel.Item key={movie.id}>
                                    <img
                                    className="d-block w-100"
                                    src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                                    alt="First slide"
                                    />
                                    <Carousel.Caption>
                                    <Link to={`/movie/${movie.id}`}><h3 className="carousel-title literata">{movie.title}</h3></Link>
                                    {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                                    </Carousel.Caption>
                                </Carousel.Item>
                                )
                            }   
                        </Carousel>
                    </Col>  
                    <Col xs={3}>
                        <TrendingChart />
                    </Col>                
                </Row>
                <Row>
                    
                </Row>
            </Container>
            
       
        </div>
    )
    
}

export default Home