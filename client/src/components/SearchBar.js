import React, { useEffect, useState } from 'react';

import apiKey from "./apiKey";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import axios from 'axios';

import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image';


// import Button from 'react-bootstrap/Button'

const SearchBar = (props) => {

    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    // let history = useHistory();

    useEffect(() => {
        
        const fetchSuggestions = async () => {
            const apiResults = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchQuery}&page=1&include_adult=false`);
            setSuggestions(apiResults.data.results)
        }
        
        if (searchQuery.length >= 4) { 
            fetchSuggestions();
            console.log(suggestions); 
        } 

    }, [searchQuery]);

    const clearSearchBar = () => {
            setSearchQuery("");
    }

    const submitSearch = event => {
        if (event.key === "Enter") {
            console.log('recognized');
            console.log(searchQuery);
            event.preventDefault()
            props.history.push(`/search?q=${searchQuery}`);
            clearSearchBar();
        }
    }

    const showMore = () => {
        if (suggestions.length > 6) {
        return (
        <ListGroup.Item variant="warning">
            <Link to={`/search?type=movies&q=${searchQuery}`} onClick={clearSearchBar}>{`see more results for ${searchQuery}`}</Link> 
        </ListGroup.Item>
        )
        }
    
    }

    const suggestionBars = () => {
        if (suggestions && searchQuery.length >= 4) {

            const sixSuggestions = suggestions.slice(0, 6);

            return(
                <ListGroup>
                {
                    sixSuggestions.map(movie => {
                        return (

                            <ListGroup.Item variant="warning" key={movie.id}>
                                <Image
                                    rounded
                                    className="suggestion-poster"
                                    src={`http://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                    alt={`poster for ${movie.title}`}
                                />
                                <Link to={`/movie/${movie.id}`} onClick={clearSearchBar}>{movie.title} ({movie.release_date.slice(0,4)})</Link> 
                            </ListGroup.Item>
                        )
                    })                    
                }
                {   
                   showMore() 
                }
                </ListGroup>
            )
        }
        else {

            const sixSuggestions = suggestions.slice(0, 6);

            return(
                <ListGroup>
                {
                    sixSuggestions.map(movie => {
                        return (
                            <ListGroup.Item variant="warning" key={movie.id}>
                                <Image
                                    rounded
                                    className="suggestion-poster"
                                    src={`http://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                    alt={`poster for ${movie.title}`}
                                />
                                <Link to={`/movie/${movie.id}`} onClick={clearSearchBar}>{movie.title} ({movie.release_date.slice(0,4)})</Link> 
                            </ListGroup.Item>
                        )
                    })
                }
                </ListGroup>
            )
        }
    }

    const suggestionStyle = {
        zIndex: 1000,
        position: "absolute",
        top: ".6em"
    }    

    return (
        <div 
        style={suggestionStyle}
        >
            <Form className="searchbar">
                <Form.Control 
                    type="text" 
                    value={searchQuery} 
                    onChange={e => setSearchQuery(e.target.value)}  
                    onKeyPress={submitSearch}
                    placeholder="Search for films" 
                />
            </Form>
            {suggestionBars()}
        </div>
    )
}

export default withRouter(SearchBar)