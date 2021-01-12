import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

import getUser from "./UserPage-FB.js";
import apiKey from "../apiKey";
import ArticleList from "./ArticleList.js"
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.js'

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

const UserPage = ({ match }) => {

    const [userPageData, setUserPageData] = useState({});

    const usernameUrl = match.params.username;

    useEffect(() => {

        //retrieve user data from firestore
        const fetchUser = async () => {

            let userToBe = await getUser(usernameUrl);

            setUserPageData(userToBe);

        }

        fetchUser();

    }, [])

    if(userPageData) {

        return (
            <Container>
                <Row>
                    <Col xs={12}   lg={4} >
                    <Card className="comment-card">
                        <Card.Header >
                            <h1 >{userPageData.username}</h1>
                        </Card.Header>
                        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                        <Card.Body> <b>{userPageData.userPoints} points </b> </Card.Body>
                    </Card>
                    
                    </Col>
                    <Col xs={12}  lg={8}>
                        <h1 style={{textAlign: "center", marginTop: ".8em"}}>Articles</h1>
                        <ArticleList username={usernameUrl} />
                        
                    </Col>
                </Row>
            </Container>
        )
    } else {

        return (
            <div>
                <LoadingSpinner />
            </div>
        )    
    } 

}

export default UserPage