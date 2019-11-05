import React, { useState, useEffect } from 'react';
import { BrowserRouter as Link } from "react-router-dom";
import axios from 'axios';

import apiKey from "../apiKey";
import createCrewList from './createCrewList';
import createCastList from './createCastList';
import createTechnicalInfo from './createTechnicalInfo';
import similarMovieDisplay from './similarMoviesDisplay';
import CommentTabs from './CommentTabs';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Tabs from 'react-bootstrap/Tabs';


const MoviePage = ({ match }) => {

    const [pageMovie, setPageMovie] = useState(null);
    const [similarMovies, setSimilarMovies] = useState([]);

    const movieId = match.params.id;

    useEffect(() => {
        //retrieve movie data from API
        const fetchData = async () => {
            const { data: movieInfoRes } = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
            );
            const { data: movieCreditsRes } = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`
            );
            setPageMovie({ movieInfo: movieInfoRes, movieCredits: movieCreditsRes });
        }
        fetchData();
    }, [movieId])

    useEffect(() => {
        //retrieve similar movies
        const fetchSimilar = async () => {
            const {data: simMoviesRes} = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}&language=en-US&page=1`
            );
            console.log(simMoviesRes.results);
            setSimilarMovies(simMoviesRes.results);
        }
        fetchSimilar();
    }, [movieId])

    //check if component state has changed. for development only.
    useEffect(() => {
    console.log(`pageMovie state was initialized or changed`, pageMovie);
    }, [pageMovie]);

    //create list of headlining stars
    const createStarringString = () => {
        const cast = pageMovie.movieCredits.cast
        const starringMax = 6;
        const castLength = (cast.length < starringMax ? cast.length : starringMax);  
        let starringList = [];
        for (let i = 0; i < castLength; i++) {
            starringList.push(pageMovie.movieCredits.cast[i].name);
        }
        let starringString = starringList.join(", ");
        return starringString;        
    }

    //create list of genres of movie
    const createGenreString = () => {
        let genreList = [];
        for (let i = 0; i < pageMovie.movieInfo.genres.length; i++) {
            genreList.push(pageMovie.movieInfo.genres[i].name);
        }
        return genreList;
    }

    //return movie page, or loading screen if api calls aren't done 
    if (pageMovie) {

        const movieBackground={

        }

        const posterRow = {
            marginBottom: "1em"
        }


        return (   
        <div>
            <Container >
                <Row>
                    <Col>
                        <h1 className="movie-page-header">{`${pageMovie.movieInfo.original_title} (${pageMovie.movieInfo.release_date.slice(0,4)})`}</h1>
                                        
                    </Col>
                </Row>
                <Row style={posterRow}>
                    <Col xs={12} md={6} className="poster-column">                    
                        <Image
                            rounded
                            className="movie-page-poster"
                            src={`http://image.tmdb.org/t/p/w300${pageMovie.movieInfo.poster_path}`}
                            alt={`poster for ${pageMovie.movieInfo.original_title}`}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <i>{pageMovie.movieInfo.overview}</i>
                        <p><b>Release Date</b> {pageMovie.movieInfo.release_date}</p>
                        <p><b>Genres</b> {createGenreString().join(", ")}</p>  
                        <p><b>Starring</b> {pageMovie.movieCredits.cast ? createStarringString() : "N/A"}</p> 
                        {createTechnicalInfo(pageMovie)}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        {createCastList(pageMovie)}
                        {createCrewList(pageMovie)}
                        {similarMovieDisplay(similarMovies)}
                        <CommentTabs />
                    </Col>
                </Row>
            </Container>
        </div>
        )
    }
    else {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <p>getting page movie</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        )    
    }
}

export default MoviePage