import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import validator from 'validator';
import {updateUserProfile, checkPassword} from "../../firebase.js";

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';


const ChangePW = () => {

    let [password, setPassword] = useState('');
    let [newPassword, setNewPassword] = useState('');
    let [changeConfirm, setChangeConfirm] = useState(false);
    let [errorMessage, setErrorMessage] = useState('')


    const noWhitespace = { ignore_whitespace:true };

    const validatePWChange = async (e) => {

        e.preventDefault();
        
        if (validator.isEmpty(password, noWhitespace)) {
            setErrorMessage('There is no password')
            return;
        }

        if (validator.isEmpty(newPassword, noWhitespace)) {
            setErrorMessage('There is no new password')
            return;
        }

        if (password === newPassword) {
            setErrorMessage('Passwords are the same');
            return;
        }

        if (password === newPassword) {
            setErrorMessage('Passwords are the same');
            return;
        }

        const passwordCheck = await checkPassword(password);

        if (passwordCheck) {
            await updateUserProfile("password", newPassword);
            setChangeConfirm(true);
        }
        else {
            setErrorMessage('Current Password is wrong');
            return
        }

    }

    return (

        <Container>
            <h3>Change Your Password</h3>
            <Row>
                <Col >
                    {
                    !changeConfirm ?
                    
                        <Form className="changepw-form">     
                            <Form.Group >
                                <Form.Label>Current Password</Form.Label>
                                <Form.Control type="password" placeholder="Current password here" value={password} onChange={ e => setPassword(e.target.value)} />
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type="password" placeholder="New password here" value={newPassword} onChange={ e => setNewPassword(e.target.value)} />
                            </Form.Group>

                            <Button 
                                variant="light" 
                                size="lg" 
                                disabled={validator.isEmpty(password, noWhitespace) ? true : false} 
                                block 
                                onClick={validatePWChange}
                            >
                                Submit
                            </Button>
                            <b className="error-msg">{errorMessage}</b>

                        </Form>
                    
                    :

                        <div className="changepw-form">
                            <h3>Success</h3>
                            <p style={{textAlign: "center"}}>Your password has been successfully changed.</p>
                        </div>

                    }
                </Col > 
            </Row>
        </Container>
    )

}

export default ChangePW;