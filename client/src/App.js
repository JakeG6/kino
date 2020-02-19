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
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
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
          <Navbar expand="sm">
            <Navbar.Brand ><Link className="app-logo" to={`/`}>KINO</Link></Navbar.Brand>
            <Navbar.Toggle />
            <SearchBar />
            <Navbar.Collapse className="justify-content-end">
              {/* <Navbar.Text>
                Signed in as: <a href="#login">Mark Otto</a>
              </Navbar.Text> */}
            </Navbar.Collapse>
            <Button variant="light" onClick={handleShow}>Log In</Button>
          </Navbar>
          <div className="wrapper">
            <Route path="/" exact component={Home} />
            <Route path="/movie/:id" exact component={MoviePage} />
            <Route path="/movie/:id/credits" exact component={CreditsPage} />
            <Route path="/search" exact component={SearchResultsPage} />
          </div>
          
          {/* Login Modal */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Log In</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

        </div>
      </Router>

      
    );
}

export default App;