import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

import ScrollToTop from './ScrollToTop';

//components
import SearchBar from './components/SearchBar/SearchBar';
import Home from './components/Home';
import MoviePage from './components/MoviePage/MoviePage.js';
import CreditsPage from './components/CreditsPage/CreditsPage.js';

import SearchResultsPage from './components/SearchResultsPage/SearchResultsPage.js';

//CSS
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import './App.css'

const App = () => {
    return (
      <Router>
        <ScrollToTop />
        <div className="App">
          <Navbar expand="sm" >
            <Navbar.Brand ><Link className="app-logo" to={`/`}>KINO</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav.Item>
                <SearchBar />
              </Nav.Item>
              {/* <Nav.Item>
                <Nav.Link href="#">Sign in</Nav.Link>
              </Nav.Item> */}
            </Navbar.Collapse>
            
          </Navbar>
          <div className="wrapper">
            <Route path="/" exact component={Home} />
            <Route path="/movie/:id" exact component={MoviePage} />
            <Route path="/movie/:id/credits" exact component={CreditsPage} />
            <Route path="/search" exact component={SearchResultsPage} />

          </div>
          
        </div>
      </Router>
      
    );
}

export default App;