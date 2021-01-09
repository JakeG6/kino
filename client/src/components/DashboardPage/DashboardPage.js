import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import ChangePW from "./ChangePW.js";
import "./DashboardPage.css";
import axios from 'axios';

import apiKey from "../apiKey";
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.js'
import { UserContext } from "../../providers/UserProvider";
import { getUserData } from "../../firebase.js";

import posterPlaceholder from "../poster-placeholder.jpg";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Tabs from 'react-bootstrap/Tabs';
import Nav from 'react-bootstrap/Nav'
import Tab from 'react-bootstrap/Tab';


const DashboardPage = () => {

    const user = useContext(UserContext);

    const [userData, setUserData] = useState({data: null, gettingData: true});

    const retrieveUserData = async (user) => {
        const userObj = await getUserData(user);
        setUserData({data: userObj, gettingData: false});
    }

    useEffect(()=> {

        retrieveUserData(user);
        
    }, []);

    //is the user logged in?
    return (
        <UserContext.Consumer>
        {
            user =>
                user ?
                    !userData.gettingData ?

                <Row>
                    
                    <Col xs={0} sm={1}></Col>
                    
                        <Col xs={12} sm={10}>
                            <Card className="comment-card dashboard-card">
                                <Card.Header className="comment-header">             
                                    <h4>Welcome {userData.data.username}</h4>
                                </Card.Header>
                                <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                                <Card.Body>

                                    <Tab.Container  defaultActiveKey="first">
                                        <Row>
                                            <Col sm={2}>
                                                <Nav id="dashboard-nav" variant="pills" className="flex-column">
                                                    <Nav.Item>
                                                        <Nav.Link  eventKey="first">Stats</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link  eventKey="second">Settings</Nav.Link>
                                                    </Nav.Item>
                                                </Nav>
                                            </Col>
                                            <Col sm={9}>
                                                <Tab.Content>
                                                    
                                                    <Tab.Pane eventKey="first">
                                                        <p>You have {userData.data.userPoints} points.</p>
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="second">
                                                        <Tab.Container defaultActiveKey="third">
                                                            <Row>
                                                                <Col sm={4}>
                                                                    <Nav id="dashboard-nav" variant="pills" className="flex-column">
                                                                        <Nav.Item>
                                                                            <Nav.Link  eventKey="third">Change Password</Nav.Link>
                                                                        </Nav.Item>
                                                                    
                                                                    </Nav>
                                                                </Col>
                                                                <Col sm={8}>
                                                                <Tab.Pane eventKey="third">
                                                                    <ChangePW />
                                                                </Tab.Pane>
                                                                </Col>
                                                            </Row>                                                        
                                                        </Tab.Container>
                                                    </Tab.Pane>
                                                </Tab.Content>
                                            </Col>
                                        </Row>
                                    </Tab.Container>
                                </Card.Body>
                                {/* <footer className="comment-footer"> </footer> */}
                            </Card>
                        </Col><Col xs={0} sm={1}>

                    </Col>
                </Row>
            :
                <LoadingSpinner />
            :
            

                <Redirect to="/" />
        }
        </UserContext.Consumer>
        
        
    )       
    
}

export default DashboardPage;