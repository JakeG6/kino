import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


//components
import SearchBar from './components/SearchBar'
import Home from './components/Home'
import MoviePage from './components/MoviePage/MoviePage.js'
import SearchResultsPage from './components/SearchResultsPage/SearchResultsPage.js'

//CSS
import Navbar from 'react-bootstrap/Navbar'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar expand="sm" bg="dark" variant="dark">
          <Navbar.Brand ><Link className="app-logo" to={`/`}>KINO</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBar />
          </Navbar.Collapse>
        </Navbar> 
        <Route path="/" exact component={Home} />
        <Route path="/movie/:id" exact component={MoviePage} />
        <Route path="/search" exact component={SearchResultsPage} />
      </div>
    );
  }
}

export default App;