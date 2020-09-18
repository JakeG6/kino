import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

import apiKey from "../apiKey";
import createCrewList from './createCrewList';
import createCastList from './createCastList';
//import createTechnicalInfo from './createTechnicalInfo';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Tabs from 'react-bootstrap/Tabs';

const CreditsPage = ({ match }) => { 

    const [pageMovie, setPageMovie] = useState(null);

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

    if (pageMovie) {

        const releaseDate = pageMovie.movieInfo.release_date

        return (   
        <div>   
            <Container>
                <Row>
                    <Col>
                        <Link exact to={`/movie/${movieId}`} >
                            <h1 className="movie-page-header">
                            {`${pageMovie.movieInfo.original_title} (${releaseDate.length > 0 ? releaseDate.slice(0,4) : "N/A"})`}                       
                            </h1>
                        </Link>  
                    </Col>
                </Row>
                {createCastList(pageMovie)}
                {createCrewList(pageMovie)}
                <Row>
                    <Col>
                        <Link exact to={`/movie/${movieId}`} ><p className="return-link">{`<< Return to Overview Page`}</p></Link>  
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
                            <p>Getting Credits</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        )    
    }
}

export default CreditsPage;
