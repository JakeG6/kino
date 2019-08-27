import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


//components
import SearchBar from './components/SearchBar'
import Home from './components/Home'
import Navbar from 'react-bootstrap/Navbar'
import './App.css'

class App extends Component {


  render() {
    return (
      <div className="App">
        <Navbar expand="sm" bg="dark" variant="dark">
          <Navbar.Brand className="App-logo">KINO</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBar />
          </Navbar.Collapse>
        </Navbar> 
        <Route path="/" exact component={Home} />
      </div>
    );
  }
}

export default App;