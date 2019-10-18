import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion'

import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';


const apiKey = '3f1b30e6df7ae6dcf64dc94b36c9487d';

// let history = useHistory();

const SearchResultsPage = () => {

    const [searchResults, setSearchResults] = useState(null)

    //Deliver user search results from TMDB api
    useEffect(() => {

        const fetchResults = async () => {

            const apiResults = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=batman&page=1&include_adult=false`)

            console.log(apiResults)

            setSearchResults(apiResults.data.results)

            console.log(searchResults)
        }

        fetchResults();

    }, [])

    //go to movie's page when profile is clicked on
    // const goToMovie = (id) =>  {
    //     history.push(`/movies/${id}`);
    // }

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
                                    
                                        <ListGroup.Item >
                                            <Row>
                                                <Col sm={4}>
                                                    <Image src={`http://image.tmdb.org/t/p/w92${result.poster_path}`} rounded />
                                                </Col>
                                                <Col sm={8}>
                                                    <Link to={`/movie/${result.id}`}><b>{result.title} ({result.release_date.slice(0, 4)})</b></Link>
                                                    <i>{result.overview}</i>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    
                                    
                                ))}
                            </ListGroup>
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