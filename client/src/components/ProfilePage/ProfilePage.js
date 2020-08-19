import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

import apiKey from "../apiKey";

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


const ProfilePage = () => {


    return (
        <Container>
            <Row>
                <Col>
                    <p>Welcome "username"</p>
                </Col>
            </Row>
            
        </Container>
    )

}


export default ProfilePage;