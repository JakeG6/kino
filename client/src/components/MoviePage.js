import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Row';

const apiKey = '3f1b30e6df7ae6dcf64dc94b36c9487d';

const MoviePage = ({ match }) => {
  const [pageMovie, setPageMovie] = useState(null)

  const movieId = match.params.id

  useEffect(() => {
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
    console.log(`pageMovie state was initialized or changed`, pageMovie)
  }, [pageMovie])

    if (pageMovie) {
        return (
        <div>
            <Container>
                <Row>
                    <Col>
                    <h1>{pageMovie.movieInfo.original_title}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <img
                            src={`http://image.tmdb.org/t/p/w300${pageMovie.poster_path}`}
                            alt={`poster for ${pageMovie.original_title}`}
                        />
                    </Col>
                    <Col xs={6}>
                        <i>{pageMovie.movieInfo.overview}</i>
                        <p>
                            <b>Release Date</b> {pageMovie.movieInfo.release_date}
                        </p>
                        <p>
                            <b>Starring</b> {pageMovie.movieCredits.cast[0].name}
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
        )
    }
    else {
        return (
            <div>
                <p>getting page movie</p>
            </div>
        )    
    }
  
}
export default MoviePage