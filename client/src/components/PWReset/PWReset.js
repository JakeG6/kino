import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import validator from 'validator';

import axios from 'axios';

import apiKey from "../apiKey";

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.js'

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

import { useHistory } from "react-router-dom";

import {signupNewUser} from "../../firebase.js";

import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';

import "../Signup/Signup.css";

const PWReset = () => {

    let [email, setEmail] = useState('');
    let [sendingConfirm, setSendingConfirm] = useState(false);

    const noWhitespace = { ignore_whitespace:true };

    return (

        <Container>
            <Row className="signup">
                <Col xs={1} sm={2} lg={3} xl={4}>
                </Col>
                <Col xs={10} sm={8} lg={6} xl={4}>
                    <Form className="signup-form">                       
                        <Form.Group >
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="username" placeholder="What's your email?" value={email} onChange={ e => setEmail(e.target.value)} />
                        </Form.Group>

                        <Button 
                        variant="light" 
                        size="lg" 
                        disabled={validator.isEmpty(email, noWhitespace) ? true : false} 
                        block 
                        // onClick={validateSignup}
                        >
                            Submit
                        </Button>
                    </Form>
                </Col > 
                <Col xs={1} sm={2} lg={3} xl={4}>
                </Col>
            </Row>
        </Container>
    )



}

export default PWReset;