import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter as Link } from "react-router-dom";

import Spinner from 'react-bootstrap/Spinner';

import "./LoadingSpinner.css"

const LoadingSpinner = () => {

    return (
        <Container className="spinner-page">
            <Row >
                <Col className="d-flex justify-content-center align-items-center spinner-col">
                    <div >  
                        <Spinner  animation="border" variant="light" />
                    </div>  
                    
                </Col>
            </Row>
            
        </Container>

    )
}

export default LoadingSpinner;
