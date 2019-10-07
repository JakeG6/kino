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

    //retrieve movie data from API
    const fetchData = async () => {
      const { data: movieInfoRes } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
      )
      const { data: movieCreditsRes } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`
      )
        console.log(movieInfoRes);
      setPageMovie({ movieInfo: movieInfoRes, movieCredits: movieCreditsRes })
    }

    fetchData()
  }, [movieId])

  useEffect(() => {
    console.log(`pageMovie state was initialized or changed`, pageMovie);
  }, [pageMovie])

    const createStarringString = () => {
        let starringList = [];
        for (let i = 0; i < 6; i++) {
            starringList.push(pageMovie.movieCredits.cast[i].name);
        }
        let starringString = starringList.join(", ");
        return starringString
    }

    const createCrewList = () => {

        const movieCrew = pageMovie.movieCredits.crew

        //object containing departments on film crew
        let deptObj = {}

        //fill object with departments
        for (let i = 0; i < movieCrew.length; i++) {
            if (deptObj.hasOwnProperty(movieCrew[i].department)) {
                return;
            }
            else {
                deptObj[movieCrew[i].department] = [];
            }
        }
        console.log(deptObj)

        // for (department in deptObj) {

        // }

    }



    if (pageMovie) {
        return (
        <div>
            <Container>
                <Row>
                    <Col xs={12}>
                        <h1>{`${pageMovie.movieInfo.original_title} (${pageMovie.movieInfo.release_date.slice(0,4)})`}</h1>
                        <i>{pageMovie.movieInfo.overview}</i>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} lg={6}>
                        <img
                            src={`http://image.tmdb.org/t/p/w300${pageMovie.movieInfo.poster_path}`}
                            alt={`poster for ${pageMovie.movieInfo.original_title}`}
                        />
                    </Col>
                    <Col xs={6} lg={6}>
                        <p>
                            <b>Release Date</b> {pageMovie.movieInfo.release_date}
                        </p>
                        <p>
                            <b>Starring</b> {createStarringString()}
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