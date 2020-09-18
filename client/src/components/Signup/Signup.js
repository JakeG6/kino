import React, { useState, useEffect } from 'react';
import validator from 'validator';

// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

import {signupNewUser} from "../../firebase.js";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import "./Signup.css";

const Signup = () => {

    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [errorMessage, setErrorMessage] = useState('')

    let history = useHistory();

    const noWhitespace = { ignore_whitespace:true };

    //validate the signup
    const validateSignup = async (e) => {
        e.preventDefault();
        // console.log("validating signup")
        // console.log(username, email, password)
        
        if (validator.isEmpty(username, noWhitespace)) {
            setErrorMessage('There is no username')
            return;
        }

        if (validator.isLength(username, {max: 16 }) === false) {
            setErrorMessage("Your username can't be longer than 16 characters")
            return;;
        }

        if (validator.isEmail(email) === false)  {
            setErrorMessage('Invalid Email');
            return;
        }

        if (validator.isLength(password, {min: 6, max: 100 }) === false) {
            setErrorMessage('Your Password must be at least 6 characters')
            return;
        }
        await signupNewUser(username, password, email);

        history.push("/")

    }

    return (
        <Container>
            <Row className="signup">
                <Col xs={1} sm={2} lg={3} xl={4}>
                </Col>
                <Col xs={10} sm={8} lg={6} xl={4}>
                    <Form className="signup-form">                       
                        <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="What's your name?" value={username} onChange={ e => setUsername(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={ e => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={ e => setPassword(e.target.value)} />
                        </Form.Group>

                        <Button 
                        variant="light" 
                        size="lg" 
                        disabled={validator.isEmpty(username, noWhitespace) || validator.isEmpty(email, noWhitespace) || validator.isEmpty(password, noWhitespace) ? true : false} 
                        block 
                        onClick={validateSignup}
                        >
                            Submit
                        </Button>
                        <h1>{errorMessage}</h1>
                    </Form>
                </Col > 
                <Col xs={1} sm={2} lg={3} xl={4}>
                </Col>
            </Row>
        </Container>
    )
    
}

export default Signup;