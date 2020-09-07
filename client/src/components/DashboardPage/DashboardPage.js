import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';

import apiKey from "../apiKey";
import { UserContext } from "../../providers/UserProvider";

import posterPlaceholder from "../poster-placeholder.jpg";

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.js'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Tabs from 'react-bootstrap/Tabs';


const DashboardPage = () => {

    const user = useContext(UserContext);


    //is the user logged in?
    return (

        user ?
            <Row>
                <Col>
                    <p>Welcome "username"</p>
                </Col>
            </Row>
        :
            <Redirect to="/" />
    )       
    
}


export default DashboardPage;