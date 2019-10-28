import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route, Link, useLocation } from "react-router-dom";

import apiKey from "../apiKey";

import axios from 'axios';

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';

const SearchResultsPage = () => {

    const [searchResults, setSearchResults] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [totalPages, setTotalPages] = useState(null)

    //Deliver user search results from TMDB api, then set maximum number of search result pages possible
    useEffect(() => {
        const fetchResults = async () => {
            const apiResults = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=batman&page=${pageCount}&include_adult=false`);
            setSearchResults([...searchResults, ...apiResults.data.results]);
            setTotalPages(apiResults.data.total_pages);
        }
        
        fetchResults();
    }, [pageCount])

    const showMoreResults = () => setPageCount(pageCount + 1);

    const MoreResultsButton = () => (
        <Button onClick={showMoreResults} variant="primary" size="lg" block>
            Show More Results
        </Button>
    )
        

    if (searchResults) {
        return (
            
            <div>
                <Container>
                    <Row>
                        <Col sm={6} className="red" >
                        we live in a society
                        </Col>
                        <Col sm={6} className="green">
                        we live in a society
                        </Col>
                        <Col sm={6} className="blue">
                        we live in a society
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <ListGroup>
                                {searchResults.map(result => (
                                    <ListGroup.Item key={result.id}>
                                        <Row>
                                            <Col sm={4}>
                                                <Image src={`http://image.tmdb.org/t/p/w92${result.poster_path}`} rounded />
                                            </Col>
                                            <Col sm={8}>
                                                <Link to={`/movie/${result.id}`}><b>{result.title} ({result.release_date ? result.release_date.slice(0, 4) : "N/A"})</b></Link>
                                                <i>{result.overview}</i>
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
                        we don't live in a society yet.

                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

}

export default SearchResultsPage;