import React, { useState, useContext, useEffect } from 'react';

//NPM packages
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

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
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';



const App = () => {

  let history = useHistory();

  const {loginShow, setLoginShow} = useContext(LoginModalContext)

  //hide certain elements based on screen width
  const isMobileDevice = useMediaQuery({ query: '(max-width: 767px)' });

  const handleModalShow = () => {
    setLoginShow(true);
  }

  //show mobile search.
  const [mobileSearch, setMobileSearch] = useState(false);

  return (
    <div>
        <ScrollToTop />
        <div id="app-overwrites" className="App">

            <Container >
              {/* Navigation bar */}
              
              <div id="kino-nav">
                {
                  !mobileSearch && 
                  <div className="bar-item"  >
                    <Link className="app-logo" to={`/`}>KINO</Link>
                  </div>
                 
                }

                { 
                  (isMobileDevice && !mobileSearch) ?
                      null
                    :
                      (isMobileDevice && mobileSearch) ?
                 
                        <div className="searchbar-div" >
                          <SearchBar mobileSearch={mobileSearch} />
  
                          
                        </div>
       
                      :
                        <div className="searchbar-div" >
                          <SearchBar mobileSearch={mobileSearch} />
                        </div>
                }


                  {/* show or hide searchbars on mobile display */}

                {
                  (isMobileDevice || mobileSearch) &&
                  <Button 
                    variant="outline-secondary" 
                    style={!mobileSearch ?  {marginLeft: "30%"} : null} 
                    onClick={!mobileSearch ?  () => setMobileSearch(true) : () => setMobileSearch(false)} 
                  >
                      <FontAwesomeIcon icon={!mobileSearch ? faSearch : faTimes} color="white" />
                  </Button>

                }

                {
                  !mobileSearch &&
                    <UserContext.Consumer>
                      {

                  user => (
                    //is the user logged in?
                      user ?                                          
                          <div className="bar-item">
                            <Dropdown  >
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
                        <div className="bar-item" style={ mobileSearch ? {display: "none"} : {display: "show"}}>
                          <Button variant="light" onClick={handleModalShow}>Log In</Button>
                        </div>
                    )      
                
                    }
                  </UserContext.Consumer>
                  
                }  
              </div>

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