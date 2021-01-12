import React, { useState, useEffect, useContext } from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { facebookSignin, googleSignin, signinUser, checkUser } from "../../firebase.js";
import facebookLogo from'./facebook-logo-png-38347.png';
import { LoginModalContext } from "../../providers/LoginModalProvider";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import '../../App.css'

const SignIn = () => {

    const {loginShow, setLoginShow} = useContext(LoginModalContext);

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [errorMessage, setErrorMessage] = useState("");

    const handleSignin = async event => {
        event.preventDefault();

        // console.log("about to sign in user");

        await signinUser(email, password);

        // console.log("about to check if user is signed in");

        const signedIn = await checkUser();

        // console.log(signedIn)
        
        if (signedIn) {
            setEmail("")
            setPassword("")
            setErrorMessage("")
            setLoginShow(false);
        }
        else {
            setErrorMessage("Incorrect username and/or password")
            return;
        }

    }

    const handleClose = () => {
        setLoginShow(false);

    }

    return (
        <Modal show={loginShow} onHide={handleClose} className="login-modal">
            <Modal.Header closeButton>
                <Modal.Title>Sign In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Email" value={email} onChange={ e => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={ e => setPassword(e.target.value)} />
                    </Form.Group>

                    {/* Submit Button */}
                    <Button variant="success" className="emailSignin" onClick={handleSignin} block>Submit</Button>
                    <div style={{height: "3em" }}>
                        <b style={{textAlign: "center"}} className="error-msg">{errorMessage}</b>
                    </div>
                    
                    <Link  to={`/pwreset`} onClick={handleClose} className="pwResetLink"><p>Forgot your password?</p></Link>

                </Form>
            </Modal.Body>
            <Modal.Footer className="login-modal-footer">
                <Container>
                    <Row>
                        {/* Google signin button */}
                        <Col className="justify-content-center">
                            <button className="googleBtn" type="button" onClick={googleSignin}>
                                <img
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                alt="google logo"
                                />
                                Sign In With Google
                            </button>    
                        </Col>
                        {/* Facebook signin button */}
                        <Col className="justify-content-center">
                            <button className="facebookBtn" onClick={facebookSignin}>
                                <img
                                    src={facebookLogo}
                                    alt="facebook logo"
                                />
                                Sign in with Facebook
                            </button>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        
                        <Link  to={`/signup`} onClick={handleClose}><p>Don't have an account? Sign up here!</p></Link>
                     
                    </Row>
                </Container> 
            </Modal.Footer>
        </Modal>
    )
}

export default SignIn;