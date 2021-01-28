import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';

import "./SearchBar.css";

const SuggestionBars = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isFocused, setIsFocused] = useState(false);

    //style for suggestion
    const suggestionStyle = {
        zIndex: 1000,
        position: "absolute",
        top: "3.25em",
        width: "660px"
    }

    //get placeholder poster if official poster is not available.
    const checkPosterPath = path => {
        return path !== null ?  `https://image.tmdb.org/t/p/w92${path}` : posterPlaceholder;
    }

    //limit the length of titles in the suggestion box that would cause text wrapping
    const titleLimiter = (title, titleCutoff) => {     
        return (title.length > titleCutoff) ?  `${title.slice(0, 47)}...` : title    
    }

    const clearSearchBar = () => {
        setSearchQuery("");
    }

    const releaseDateChecker = (date) => {
        return date ? date.slice(0, 4) : "N/A"
    }

    const clickSearch = event => {
        event.preventDefault()
        
        props.history.push(`/search?q=${searchQuery}`);
           
        clearSearchBar();
    }

    const showMore = () => {
        if (suggestions.length > 6) {
            return (
            <ListGroup.Item variant="warning" className="searchbar-item">
                <Link to={`/search?type=movies&q=${searchQuery}`} onClick={clearSearchBar}>{`see more results for "${titleLimiter(searchQuery, 26)}"`}</Link> 
            </ListGroup.Item>
            )
        }
    }

    if (suggestions && isFocused && searchQuery.length >= 4) {

        const suggestionCount = suggestions.slice(0, 6);

        return(
            <div style={suggestionStyle} >
                <ListGroup>
                {
                    suggestionCount.map(movie => {
                        return (
                            <ListGroup.Item variant="warning" key={movie.id} className="searchbar-item">
                                <Image
                                    rounded
                                    className="suggestion-poster"
                                    src={checkPosterPath(movie.poster_path)}
                                    alt={`poster for ${movie.title}`}
                                />
                                <Link to={`/movie/${movie.id}`} onClick={clickSearch} className="suggestion-font">
                                    {titleLimiter(movie.title, 50)} ({releaseDateChecker(movie.release_date)})
                                </Link> 
                            </ListGroup.Item>
                        )
                    })                    
                }
                {   
                    showMore() 
                }
                </ListGroup>
            </div>              
        )
    }
}

export default SuggestionBars;