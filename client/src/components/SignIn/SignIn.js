import React, { useState, useEffect, useContext } from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import {signinUser} from "../../firebase.js";
import { LoginModalContext } from "../../providers/LoginModalProvider";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import '../../App.css'


const SignIn = () => {

    const {loginShow, setLoginShow} = useContext(LoginModalContext);

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    async function handleSignin(event) {
        event.preventDefault();
        await signinUser(email, password)
        setLoginShow(false);
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
                </Form>
            </Modal.Body>
            <Modal.Footer className="login-modal-footer">
                <Link to={`/signup`} onClick={handleClose}><p>Don't have an account? Sign up here!</p></Link>
                <Button variant="primary" className="btn-light" onClick={handleSignin}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SignIn;