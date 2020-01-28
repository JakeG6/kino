import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route, Link, useLocation } from "react-router-dom";

import apiKey from "../apiKey";
import queryBuilder from "./queryBuilder";
import axios from 'axios';

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';

import "./SearchResultsPage.css"

const queryString = require('query-string');

const SearchResultsPage = () => {

    const [searchResults, setSearchResults] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [totalPages, setTotalPages] = useState(null);

    //The user's kino url query parameters
    const parsed = queryString.parse(window.location.search);

    console.log(parsed)

    //Deliver user search results from TMDB api, then set maximum number of search result pages possible
    useEffect(() => {
        const fetchResults = async () => {
            //original
            //const apiResults = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${parsed.q}&page=${pageCount}&include_adult=false`);
            
            //results from api based on url built by queryBuilder function
            const apiResults = await axios.get(queryBuilder(parsed, parsed.type, pageCount));

            setSearchResults([...searchResults, ...apiResults.data.results]);
            setTotalPages(apiResults.data.total_pages);
        }
        fetchResults();
    }, [pageCount])

    const showMoreResults = () => setPageCount(pageCount + 1);

    const MoreResultsButton = () => (
        <Button onClick={showMoreResults} id="more-results-button" variant="primary" size="lg" block>
            Show More Results
        </Button>
    )
        
    if (searchResults) {
        return (          
            <div>
                <Container>
                    <Row>
                        <Col xs={12}>
                            <ListGroup>
                                {searchResults.map(result => (
                                    <ListGroup.Item key={result.id}>
                                        <Row>
                                            <Col xs={2}>
                                                <Image src={`http://image.tmdb.org/t/p/w92${result.poster_path}`} rounded />
                                            </Col>
                                            <Col xs={10}>
                                                <Row>
                                                    <Link to={`/movie/${result.id}`}><b>{result.title} ({result.release_date ? result.release_date.slice(0, 4) : "N/A"})</b></Link>
                                                </Row>
                                                <Row>
                                                    <i className="result-overview">{result.overview}</i>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            {
                                pageCount < totalPages ? <MoreResultsButton /> : <div></div>
                            }
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
                        Loading Results
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default SearchResultsPage;