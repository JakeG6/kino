import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

import apiKey from "../apiKey";

import createTechnicalInfo from './createTechnicalInfo';
import createGenreList from './createGenreList';
import createStarringList from './createStarringList';
import similarMovieDisplay from './similarMoviesDisplay';
import CommentTabs from './CommentTabs';

import LoadingSpinner from '../LoadingSpinner.js'

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
            setSimilarMovies(simMoviesRes.results);
        }
        fetchSimilar();
    }, [movieId])

    //check if component state has changed. for development only.
    useEffect(() => {
    console.log(`pageMovie state was initialized or changed`, pageMovie);
    }, [pageMovie]);

    //scroll to top of page when url is changed.
    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, [movieId])

    //return movie page, or loading screen if api calls aren't done 
    if (pageMovie) {

        const posterRow = {
            marginBottom: "1em"
        }

        //release date
        const releaseDate = pageMovie.movieInfo.release_date

        return (   
        <div>
            <Container >
                <Row>
                    <Col>
                        <h1 className="movie-page-header">
                            {`${pageMovie.movieInfo.original_title} (${releaseDate.length > 0 ? releaseDate.slice(0,4) : "N/A"})`}
                        </h1>
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
                        <p><i id="movie-overview">{pageMovie.movieInfo.overview}</i></p>
                        <p><b>Release Date</b> {releaseDate.length > 0 ? releaseDate : "N/A" }</p>
                        <p><b>Genres</b> {createGenreList(pageMovie)}</p>  
                        <p><b>Starring</b> {pageMovie.movieCredits.cast ? createStarringList(pageMovie) : "N/A"}</p> 
                        {createTechnicalInfo(pageMovie)}
                        <b><Link to={`/movie/${movieId}/credits`}>See Full Cast and Crew</Link></b>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
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
                <LoadingSpinner />
            </div>
        )    
    }
}

export default MoviePage