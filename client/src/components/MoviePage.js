import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const MoviePage = ({match}) => {

    return (
        <div>
            movie page: {match.params.id}
        </div>
    )
}

export default MoviePage