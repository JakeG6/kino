import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

import ScrollToTop from "./ScrollToTop";
import {signinUser} from "./firebase.js";

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
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import './App.css'

const App = () => {

  const user = null;
  
  //state handlers for modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        
        {/* Navigation bar */}
        <Navbar fluid expand="sm" sticky="top" className="justify-content-between">
          <Navbar.Brand><Link className="app-logo" to={`/`}>KINO</Link></Navbar.Brand>
          <SearchBar />
          {
            user ?
            <p>Welcome user</p>
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
        
      </div>
    </Router>     
  );
}

export default App;