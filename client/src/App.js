import React, { useState, useContext } from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

import ScrollToTop from "./ScrollToTop";
import {logoutUser} from "./firebase.js";
import { UserContext } from "./providers/UserProvider";

//components
import CreditsPage from './components/CreditsPage/CreditsPage.js';
import Home from './components/Home/Home';
import MoviePage from './components/MoviePage/MoviePage.js';
import NoMatch from './components/NoMatch/NoMatch.js';
import ProfilePage from './components/ProfilePage/ProfilePage.js'
import SearchResultsPage from './components/SearchResultsPage/SearchResultsPage.js';
import SearchBar from './components/SearchBar/SearchBar';
import SignIn from './components/SignIn/SignIn.js';
import Signup from './components/Signup/Signup.js';

//CSS
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import './App.css'

const App = () => {

  //user information if logged in
  const user = useContext(UserContext);
  
  //state handlers for modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Container>

          {/* Navigation bar */}
          <Navbar fluid expand="sm" sticky="top" className="justify-content-between">
            <Navbar.Brand><Link className="app-logo" to={`/`}>KINO</Link></Navbar.Brand>
            <SearchBar />
            {
              //is the user logged in?
              user ?
              <div>
                <p>Welcome user</p>
                <Button variant="light" onClick={logoutUser}>Log Out</Button>
              </div>
              :
              <Button variant="light" onClick={handleShow}>Log In</Button>

            }          
          </Navbar>

          <div className="wrapper">
            {/* React Router  */}
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/movie/:id/credits" component={CreditsPage} />
              <Route path="/movie/:id"  component={MoviePage} />
              <Route path="/profile" component={ProfilePage} />
              <Route path="/search"  component={SearchResultsPage} />
              <Route path="/signup"  component={Signup} />
              {/* 404 page */}
              <Route component={NoMatch} />
            </Switch>
          </div>

          {/* Signin Modal */}
          <SignIn show={show} handleClose={handleClose} />
        </Container>

        
        
      </div>
    </Router>     
  );
}

export default App;