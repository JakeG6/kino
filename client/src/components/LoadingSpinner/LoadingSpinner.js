import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter as Link } from "react-router-dom";

import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = () => {
    return (
        <Container>
            <Row >
                <Col>
                <Spinner className="text-center" animation="border" variant="light" />
                </Col>
            </Row>
            
        </Container>

    )
}

export default LoadingSpinner;
