import React, { useState, useEffect, useContext } from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

import {signinUser} from "../../firebase.js";
import { LoginModalContext } from "../../providers/LoginModalProvider";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import '../../App.css'


const SignIn = () => {

    const {loginShow, setLoginShow} = useContext(LoginModalContext);
    const [show, setShow] = useState(loginShow);


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