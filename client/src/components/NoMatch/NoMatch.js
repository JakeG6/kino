import React from 'react';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';  


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