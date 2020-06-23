import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import "./Signup.css";

const Signup = () => {

    return (
        <Container>
            <Row className="signup">
                <Col xs={1} sm={2} md={4}>
                </Col>
                <Col xs={10} sm={8} md={4}>
                    <Form>
                        
                        <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="email" placeholder="What's your name?" />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="light" size="lg" block>Submit</Button>
                    </Form>
                </Col >
                <Col xs={1} sm={2} md={4}>
                </Col>
            </Row>
        </Container>
    )
    
}

export default Signup;