import React, { useEffect, useState } from 'react';

//import SuggestionBars from "./SuggestionBars";
import apiKey from "../apiKey";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import axios from 'axios';

import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Image from 'react-bootstrap/Image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import "./SearchBar.css";


// import Button from 'react-bootstrap/Button'

const SearchBar = (props) => {

    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isFocused, setIsFocused] = useState(false);

    // let history = useHistory();

    useEffect(() => {
        
        const fetchSuggestions = async () => {
            const apiResults = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchQuery}&page=1&include_adult=false`);
            setSuggestions(apiResults.data.results)
        }
        
        if (searchQuery.length >= 4) { 
            fetchSuggestions();
        } 

    }, [searchQuery]);

    const clearSearchBar = () => { setSearchQuery(""); }

    const submitSearch = event => {
        if (event.key === "Enter") {
            event.preventDefault();

            //This causes shenanigans when using the search navbar on the search result page
            props.history.push(`/search?q=${searchQuery}`);
           
            clearSearchBar();
        }

    }

    const clickSearch = event => {
        event.preventDefault()
        
        //This causes shenanigans when using the search navbar on the search result page
        props.history.push(`/search?q=${searchQuery}`);
           
        clearSearchBar();
    }

    //limit the length of titles in the suggestion box that would cause text wrapping
    const titleLimiter = (title, titleCutoff) => {     
        return (title.length > titleCutoff) ?  `${title.slice(0, 47)}...` : title;    
    }

    const releaseDateChecker = (date) => {
        return date ? date.slice(0, 4) : "N/A"
    }

    const handleOnBlur = () => {
        setTimeout(function() { setIsFocused(false, () => console.log(`isFocused is ${isFocused}`)); }, 500)
    }

   const suggestionStyle = {
        zIndex: 1000,
        position: "absolute",
        top: "3.25em",
        width: "660px"
    }

    //JSX

    // const showMore = () => {
    //     if (suggestions.length > 6) {
    //         return (
    //             <ListGroup.Item  variant="warning" className="searchbar-item" onClick={clickSearch} >
    //                 <Link to={`/search?type=movies&q=${searchQuery}`} onClick={clearSearchBar}>{`see more results for "${titleLimiter(searchQuery, 26)}"`}</Link> 
    //             </ListGroup.Item>
    //         )
    //     }
    // }

    const suggestionBars = () => {
        if (suggestions && isFocused && searchQuery.length >= 4) {
            const suggestionCount = suggestions.slice(0, 6);
            return(
                <div style={suggestionStyle} >
                    <ListGroup>
                    {
                        suggestionCount.map(movie => {
                            return (
                                <ListGroup.Item
                                    variant="warning" 
                                    key={movie.id}
                                    onClick={() => { props.history.push(`/movie/${movie.id}`); clearSearchBar(); }}
                                    className="searchbar-item"
                                >
                                    <Image
                                        rounded
                                        className="suggestion-poster"
                                        src={`http://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                        alt={`poster for ${movie.title}`}
                                    />
                                    <Link to={`/movie/${movie.id}`} onClick={clickSearch} className="suggestion-font">
                                        {titleLimiter(movie.title, 50)} ({releaseDateChecker(movie.release_date)})
                                    </Link> 
                                </ListGroup.Item>
                            )
                        })                    
                    }
                    {/* {   
                        showMore() 
                    } */}
                    </ListGroup>
                </div>              
            )
        }
    }

    return (
        <div>
            <Form>
                <InputGroup>
                    <FormControl 
                        type="text" 
                        value={searchQuery} 
                        className="searchbar-input"
                        onChange={e => setSearchQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={handleOnBlur}
                        onKeyPress={submitSearch}
                        placeholder="Search for films" 
                    />  
                    <InputGroup.Append>
                        <Button 
                            variant="outline-secondary"
                            onClick={clickSearch}
                        >
                            <FontAwesomeIcon icon={faSearch} color="white" />
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
                <FontAwesomeIcon icon="fa-search" color="white" />      
            </Form>
            {suggestionBars()}
        </div>
    )
}

export default withRouter(SearchBar)