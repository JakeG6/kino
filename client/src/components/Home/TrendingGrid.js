import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import apiKey from "../apiKey";

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const TrendingGrid = () => {

    const [nowTrending, setNowTrending] = useState([]);

    useEffect(() => {
      
        axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`)
            .then(res => {            
                setNowTrending(res.data.results)
                
        })

    }, [])

    const makeImages = arg => {
        
        arg.map((movie) => {
            console.log(movie.backdrop_path)
          return (
            <img key={movie.id} height="100px" width="100px" src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}></img>
          )
            
       
        })
    }



    return (
        <div style={{display: "flex"}}>
            {
                makeImages(nowTrending)
            }
        </div>
             
    )

}
export default TrendingGrid;