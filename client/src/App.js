import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

import ScrollToTop from './ScrollToTop';

//components
import SearchBar from './components/SearchBar/SearchBar';
import Button from 'react-bootstrap/Button';
import Home from './components/Home';
import MoviePage from './components/MoviePage/MoviePage.js';
import CreditsPage from './components/CreditsPage/CreditsPage.js';
import NoMatch from './components/NoMatch/NoMatch.js';
import Signup from './components/Signup.js';

import SearchResultsPage from './components/SearchResultsPage/SearchResultsPage.js';

//CSS
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
  
  //state handlers for modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return (
      <Router>
        <ScrollToTop />
        <div className="App">
          <Navbar fluid expand="sm" sticky="top" className="justify-content-between">
            <Navbar.Brand ><Link className="app-logo" to={`/`}>KINO</Link></Navbar.Brand>
            <SearchBar />
            <Button variant="light" onClick={handleShow}>Log In</Button>
          </Navbar>
          <div className="wrapper">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/movie/:id/credits" component={CreditsPage} />
              <Route path="/movie/:id"  component={MoviePage} />
              <Route path="/search"  component={SearchResultsPage} />
              <Route path="/signup"  component={Signup} />
              {/* 404 page */}
              <Route component={NoMatch} />
            </Switch>
          </div>
          {/* Login Modal */}
          <Modal show={show} onHide={handleClose} className="login-modal">
            <Modal.Header closeButton>
              <Modal.Title>Log In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer className="login-modal-footer">
              <Link to={`/signup`}><p>Don't have an account? Sign up here!</p></Link>
              <Button variant="primary" className="btn-light" onClick={handleClose}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Router>     
    );
}

export default App;