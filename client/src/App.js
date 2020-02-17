import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

import ScrollToTop from './ScrollToTop';

//components
import SearchBar from './components/SearchBar/SearchBar';
import Button from 'react-bootstrap/Button';
import Home from './components/Home';
import MoviePage from './components/MoviePage/MoviePage.js';
import CreditsPage from './components/CreditsPage/CreditsPage.js';

import SearchResultsPage from './components/SearchResultsPage/SearchResultsPage.js';

//CSS
import Navbar from 'react-bootstrap/Navbar'
import './App.css'

const App = () => {
    return (
      <Router>
        <ScrollToTop />
        <div className="App">
          <Navbar expand="sm">
            <Navbar.Brand ><Link className="app-logo" to={`/`}>KINO</Link></Navbar.Brand>
            <Navbar.Toggle />
            <SearchBar />
            <Navbar.Collapse className="justify-content-end">
              {/* <Navbar.Text>
                Signed in as: <a href="#login">Mark Otto</a>
              </Navbar.Text> */}
            </Navbar.Collapse>
            <Button variant="light">Log In</Button>
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