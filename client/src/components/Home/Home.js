import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import apiKey from "../apiKey";
import TrendingChart from './TrendingChart';
import ComingSoonChart from './ComingSoonChart';
import FeaturedMovie from './FeaturedMovie';
import PopularMovies from './PopularMovies';
import TrendingGrid from './TrendingGrid';
import backdropPlaceholder from "../backdrop-placeholder.jpg"

import "./Home.css";

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
                // console.log(res.data.results)
                setNowPlaying(res.data.results)
        })
    
    }, [])

    const checkBackdropPath = path => {
        return path ?  `https://image.tmdb.org/t/p/w780${path}` : backdropPlaceholder;
    }
        
    return (
        <div>
            <Row md={2} lg={3}>
                <Col xs={0}  sm={{number: 0}} md={{number: 6}} lg={{number:3, order: 'first'}}>
                    <TrendingChart />
                    {/* <TrendingGrid /> */}
            
                </Col>   
                <Col xs={{ number:12, order: 'first' }} sm={12} md={12} lg={6}>
                    <Carousel activeIndex={index} direction={direction} onSelect={handleSelect} >
                        {
                            nowPlaying.slice(0, 20).map((movie) =>
                                <Carousel.Item key={movie.id}  >
                                    <Link to={`/movie/${movie.id}`}>
                                    <div className="carousel-image">
                                        <img
                                            className="d-block w-100"
                                            src={checkBackdropPath(movie.backdrop_path)}
                                            alt="First slide"
                                        />
                                    </div>
                                    <div >
                                        <Carousel.Caption >
                                            <h3 className="carousel-title literata">{movie.title}</h3>
                                        </Carousel.Caption>
                                    </div>
                                    </Link>
                                </Carousel.Item>
                            )
                        }   
                    </Carousel>
                    
                    <FeaturedMovie />
                </Col>
                <Col xs={0} sm={0} md={6} lg={3}>
                    
                    <ComingSoonChart />
                </Col> 
            </Row>
            <Row>
                <Col>
                    <h3>Popular Movies</h3>
                    <PopularMovies />
                    <footer style={{textAlign:"center", margin:"1em", fontSize: "11px"}}>
                        <i>© 2020 Jacob Guss. Built with <a href="https://react-bootstrap.github.io/">React Bootstrap</a> and <a href="https://developers.themoviedb.org/3/getting-started/introduction">The Movie Database API</a>.</i>
                    </footer>
                </Col>
            </Row>
        </div>
    )
    
}

export default Home