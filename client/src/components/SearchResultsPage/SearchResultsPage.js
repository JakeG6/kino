import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route, Link, useLocation } from "react-router-dom";

//import apiKey from "../apiKey";
import queryBuilder from "./queryBuilder";
import axios from 'axios';

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';

import "./SearchResultsPage.css"

// const queryString = require('query-string');
import queryString from "query-string";

const SearchResultsPage = () => {
    //useLocation() listens for a change to the URL
    const location = useLocation();

    //The user's url search query parameters
    const searchParams = queryString.parse(window.location.search);

    //results retrieved from API

    // const [resultsPageData, setResultsPageData] = useState({
    //     currentParams: searchParams,
    //     searchResults: [],
    //     pageCount: 1,
    //     totalPages: null
    // })

    const [currentParams, setCurrentParams] = useState(searchParams);
    const [searchResults, setSearchResults] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [totalPages, setTotalPages] = useState(null);

    console.log(searchParams)

    const fetchResults = async () => {

        // console.log(` we have new search params: ${searchParams.q}`)
        
        // console.log(`the new pageCount is ${pageCount}`)
        
        // console.log(`the new current params is ${currentParams.q}`)

        //results from api based on url built by queryBuilder function
        const apiResults = await axios.get(queryBuilder(searchParams, searchParams.type, 1));
        
        //update component state
        setCurrentParams(searchParams)
        setPageCount(1);
        setSearchResults([...apiResults.data.results]);
        setTotalPages(apiResults.data.total_pages);
        
    }

    const showMoreResults = async () => {
        const replacementPageCount = pageCount + 1;
        
        console.log(`getting more of the same. the page will be  ${replacementPageCount}`)
        const apiResults = await axios.get(queryBuilder(currentParams, currentParams.type, replacementPageCount));
        setPageCount(replacementPageCount);
        setSearchResults([...searchResults, ...apiResults.data.results]);
        setTotalPages(apiResults.data.total_pages);
          
    }

    useEffect(() => {

        console.log(`hey! this is the start of useEffect. param is ${searchParams.q}. the pageCount is ${pageCount}`);
        fetchResults();

    }, [location])

    const MoreResultsButton = () => (
        <Button onClick={showMoreResults} id="more-results-button" variant="light" size="lg" block>
            Show More Results
        </Button>
    )

   
        
    if (searchResults) {
        return (          
            <div>
                <Container>
                    <Row>
                        <Col xs={12}>
                            <ListGroup >
                                {searchResults.map(result => (
                                    <ListGroup.Item key={result.id} className="results-item">
                                        <Row>
                                            <Col xs={12} md={2} className="d-none d-md-block">
                                                <Image src={`http://image.tmdb.org/t/p/w92${result.poster_path}`} rounded />
                                            </Col>
                                            <Col xs={12} md={10}>
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