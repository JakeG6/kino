import React, { useState, useContext } from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

import ScrollToTop from "./ScrollToTop";
import {logoutUser} from "./firebase.js";
import { UserContext } from "./providers/UserProvider";
import { LoginModalContext } from "./providers/LoginModalProvider";

//components
import CreditsPage from './components/CreditsPage/CreditsPage.js';
import Home from './components/Home/Home';
import MoviePage from './components/MoviePage/MoviePage.js';
import NoMatch from './components/NoMatch/NoMatch.js';
import DashboardPage from './components/DashboardPage/DashboardPage.js'
import SearchResultsPage from './components/SearchResultsPage/SearchResultsPage.js';
import SearchBar from './components/SearchBar/SearchBar';
import SignIn from './components/SignIn/SignIn.js';
import Signup from './components/Signup/Signup.js';

//CSS
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Dropdown from "react-bootstrap/Dropdown";
import Row from 'react-bootstrap/Row'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import './App.css'

const App = () => {

  const {loginShow, setLoginShow} = useContext(LoginModalContext)

  const handleModalShow = () => {
    setLoginShow(true);
  }

  

  let history = useHistory();

  return (
    <div>
      
        <ScrollToTop />
        <div className="App">
            <Container>
              {/* Navigation bar */}
              <Navbar fluid="true" expand="sm" sticky="top" className="justify-content-between">
                <Navbar.Brand><Link className="app-logo" to={`/`}>KINO</Link></Navbar.Brand>
                <SearchBar />
                <UserContext.Consumer>
                {
                  user => (
                  //is the user logged in?
                  user ? 
                    <div>
                      <Dropdown >
                        <Dropdown.Toggle variant="light">
                          User name
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item className="black-text" onClick={() => {history.push("/dashboard")}}>Dashboard</Dropdown.Item>
                          <Dropdown.Item className="black-text" onClick={logoutUser}>Log Out</Dropdown.Item>                       
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  :
                  
                    <Button variant="light" onClick={handleModalShow}>Log In</Button>
                    
                  )
                }         
                </UserContext.Consumer>
              </Navbar>
              <div className="wrapper">
                {/* React Router */}
                <Switch>
                  <Route path="/"                   exact component={Home} />
                  <Route path="/movie/:id/credits"  component={CreditsPage} />
                  <Route path="/movie/:id"          component={MoviePage} />
                  <Route path="/dashboard"          component={DashboardPage} />
                  <Route path="/search"             component={SearchResultsPage} />
                  <Route path="/signup"             component={Signup} />
                  {/* 404 page */}
                  <Route component={NoMatch} />
                </Switch>
              </div>
              {/* Signin Modal */}
              <SignIn />
            </Container>
        </div>
   
    </div>
  );
}

export default App;