import React, { useEffect, useState } from 'react';

import apiKey from "./apiKey";
import axios from 'axios';


import Form from 'react-bootstrap/Form'

// import Button from 'react-bootstrap/Button'

const SearchBar = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

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

    return (
        <div>
            <Form inline>
                <Form.Control 
                    type="text" 
                    value={searchQuery} 
                    onChange={e => setSearchQuery(e.target.value)}        
                    placeholder="Search for films" 
                />
            </Form>
        </div>
    )
    
}

export default SearchBar