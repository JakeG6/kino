import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

import apiKey from "../apiKey";

import createTechnicalInfo from './createTechnicalInfo';
import createGenreList from './createGenreList';
import createStarringList from './createStarringList';
import similarMovieDisplay from './similarMoviesDisplay';
import DiscussionTabs from './DiscussionTabs/DiscussionTabs.js';
import "./MoviePage.css"

import posterPlaceholder from "../poster-placeholder.jpg";

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.js'

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';


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

    const checkPosterPath = path => {
        return path ?  `http://image.tmdb.org/t/p/w300${path}` : posterPlaceholder;
    }

    //return movie page, or loading screen if api calls aren't done 
    if (pageMovie) {

        const posterRow = {
            marginBottom: "1em"
        };

        const backdropURL= `https://image.tmdb.org/t/p/w1280${pageMovie.movieInfo.backdrop_path}`;

        const backdrop = {
            background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url(${backdropURL})`,
            backgroundPosition: "center center",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            paddingBottom: "1em"
        };

        const backdropDefault = {
            background: "#343a40",
            paddingBottom: "1em"
        }

        //release date
        const releaseDate = pageMovie.movieInfo.release_date

        return (   
        <div>
            <Container style={pageMovie.movieInfo.backdrop_path ? backdrop : backdropDefault} >
                <div >
                    <Row>
                        <Col>
                            <h1 className="movie-page-header">
                                {`${pageMovie.movieInfo.title} (${releaseDate.length > 0 ? releaseDate.slice(0,4) : "N/A"})`}
                            </h1>
                        </Col>
                    </Row>
                    <Row style={posterRow}>
                        <Col xs={12} md={6} className="poster-column">                    
                            <Image
                                rounded
                                className="movie-page-poster"
                                src={checkPosterPath(pageMovie.movieInfo.poster_path)}
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
                    </div>
            </Container>
            <Container>
                <Row>
                    <Col xs={12}>
                        {similarMovieDisplay(similarMovies)}
                        <DiscussionTabs movieId={movieId} />
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