import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

let TrendingChart = () => {

    const [nowTrending, setNowTrending] = useState([])

    useEffect(() => {
        //this is having issues
        axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=3f1b30e6df7ae6dcf64dc94b36c9487d`)
            .then(res => {
                
                setNowTrending(res.data.results)
        })

    })

    return (
        <div>
            <Container>
                <Row>
                    
                    <Col>
                        <ul>
                        {
                        nowTrending.map((movie) => 
                            <li>{movie.original_title}</li> 
                        )
                        } 
                        </ul>
                    </Col>
                    
                </Row>
            </Container>
        </div>
    )
}

export default TrendingChart;