import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import validator from 'validator';
import {passwordReset} from "../../firebase.js";

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';

import "./PWReset.css"

const PWReset = () => {

    let [email, setEmail] = useState('');
    let [sendingConfirm, setSendingConfirm] = useState(false);
    let [errorMessage, setErrorMessage] = useState('')


    const noWhitespace = { ignore_whitespace:true };

    const validatePWReset = async (e) => {

        e.preventDefault();
        // console.log("validating signup")
        // console.log(username, email, password)
        
        if (validator.isEmpty(email, noWhitespace)) {
            setErrorMessage('There is no email')
            return;
        }

        if (validator.isEmail(email) === false)  {
            setErrorMessage('Invalid email');
            return;
        }

        await passwordReset(email);

        setSendingConfirm(true);

    }

    return (

        <Container>
            <h1>Reset Your password</h1>
            <Row>

                <Col xs={1} sm={2} lg={3} xl={4}>
                </Col>
                <Col xs={10} sm={8} lg={6} xl={4}>
                    {
                    !sendingConfirm ?
                    
                        <Form className="reset-form">     
                            <Form.Group >
                                <Form.Label>To reset your password, enter the email associated with your account.</Form.Label>
                                <Form.Control type="username" placeholder="What's your email?" value={email} onChange={ e => setEmail(e.target.value)} />
                            </Form.Group>

                            <Button 
                               
                                variant="light" 
                                size="lg" 
                                disabled={validator.isEmpty(email, noWhitespace) ? true : false} 
                                block 
                                onClick={validatePWReset}
                            >
                                Submit
                            </Button>
                            <b className="error-msg">{errorMessage}</b>

                        </Form>
                    
                    :

                        <div className="reset-form">
                            <h3>Success</h3>
                            <p style={{textAlign: "center"}}>An email has been sent with further instructions to reset your password.</p>
                        
                            <div className="go-home">
                                <Link to={`/`} >{`<< Return Home`}</Link>
                            </div>
                        </div>

                    }
                </Col > 
                <Col xs={1} sm={2} lg={3} xl={4}>
                </Col>
            </Row>
        </Container>
    )

}

export default PWReset;