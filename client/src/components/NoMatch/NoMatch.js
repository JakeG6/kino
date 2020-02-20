import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';  
import Table from 'react-bootstrap/Table';


const NoMatch = () => {
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h1 className="literata" flud="true">404</h1>
                        <h1 className="literata" flud="true">PAGE NOT FOUND</h1>
                    </Col>
                </Row>
            </Container>
        </div>
    )
    
}

export default NoMatch;