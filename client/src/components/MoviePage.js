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
      
        const movieCrew = pageMovie.movieCredits.crew;
        console.log(movieCrew);
        //object containing departments on film crew
        let emptyObj = {};
        let deptObj = {};
        console.log(deptObj)
        //fill object with departments
        for (let i = 0; i < movieCrew.length; i++) {
            if (deptObj.hasOwnProperty(movieCrew[i].department)) {
                console.log(movieCrew[i].department)
                console.log(deptObj.hasOwnProperty(movieCrew[i].department) == true)
                console.log("we're about to return")
                
            }
            else {
                deptObj[movieCrew[i].department] = [];
                console.log(deptObj);
            }
        }
        
        //fill departments with crew
        for (let i = 0; i < movieCrew.length; i++) {
            deptObj[movieCrew[i].department].push(movieCrew[i]);
        }

        console.log(deptObj);

        //render full crew in JSX
        return (
            <div>
                {
                Object.keys(deptObj).map(department => (
                    <div>
                        <h3>{department}</h3>
                        <ul>
                            {
                            deptObj[department].map(crewMember => (
                                <li> {crewMember.name} <b>{crewMember.job}</b> </li>
                            ))
                            }
                        </ul>
                    </div>
                ))
                }
            </div>
        )
    }

    if (pageMovie) {
        return (
        <div>
            <h1>{`${pageMovie.movieInfo.original_title} (${pageMovie.movieInfo.release_date.slice(0,4)})`}</h1>
            <i>{pageMovie.movieInfo.overview}</i>
            <img
                src={`http://image.tmdb.org/t/p/w300${pageMovie.movieInfo.poster_path}`}
                alt={`poster for ${pageMovie.movieInfo.original_title}`}
            />
            <p><b>Release Date</b> {pageMovie.movieInfo.release_date} </p>
            <p><b>Starring</b> {createStarringString()}</p>
            <h2>Full Crew</h2>
            {createCrewList()}
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