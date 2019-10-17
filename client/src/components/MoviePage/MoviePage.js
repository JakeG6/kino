import React, { useState, useEffect } from 'react';
import { BrowserRouter as Link } from "react-router-dom";
import axios from 'axios';

import createCrewList from './createCrewList';
import createCastList from './createCastList';
import createTechnicalInfo from './createTechnicalInfo';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Row';


const apiKey = '3f1b30e6df7ae6dcf64dc94b36c9487d';

const MoviePage = ({ match }) => {

  const [pageMovie, setPageMovie] = useState(null)
  const movieId = match.params.id

    useEffect(() => {
    //retrieve movie data from API
    const fetchData = async () => {
        const { data: movieInfoRes } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
        )
        const { data: movieCreditsRes } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`
        )
        setPageMovie({ movieInfo: movieInfoRes, movieCredits: movieCreditsRes })
    }
    fetchData()
    }, [movieId])

    useEffect(() => {
    console.log(`pageMovie state was initialized or changed`, pageMovie);
    }, [pageMovie])

    //create list of headlining stars
    const createStarringString = () => {
        let starringList = [];
        for (let i = 0; i < 6; i++) {
            starringList.push(pageMovie.movieCredits.cast[i].name);
        }
        let starringString = starringList.join(", ");
        return starringString
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
        return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h1>{`${pageMovie.movieInfo.original_title} (${pageMovie.movieInfo.release_date.slice(0,4)})`}</h1>
                        <i>{pageMovie.movieInfo.overview}</i>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={6}>
                        
                        <img
                            src={`http://image.tmdb.org/t/p/w300${pageMovie.movieInfo.poster_path}`}
                            alt={`poster for ${pageMovie.movieInfo.original_title}`}
                        />
                    </Col>
                    <Col xs={12} sm={6}>
                        <p><b>Release Date</b> {pageMovie.movieInfo.release_date}</p>
                        <p><b>Genres</b> {createGenreString().join(", ")}</p>  
                        <p><b>Starring</b> {createStarringString()}</p> 
                        {createTechnicalInfo(pageMovie)}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <h2>Full Cast</h2>
                        {createCastList(pageMovie)}
                        <h2>Full Crew</h2>
                        {createCrewList(pageMovie)}
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