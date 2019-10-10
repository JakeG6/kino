import React, { useState, useEffect } from 'react';
import axios from 'axios'

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
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=3f1b30e6df7ae6dcf64dc94b36c9487d&language=en-US&page=1&region=US`)
            .then(res => {
                console.log(res.data.results)
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
                                
                                <Carousel.Item>
                                    <img
                                    className="d-block w-100"
                                    src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                                    alt="First slide"
                                    />
                                    <Carousel.Caption>
                                    <h3>{movie.title}</h3>
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