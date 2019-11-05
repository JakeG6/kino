import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';  
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import ListGroup from 'react-bootstrap/ListGroup'

const createCrewList = pageMovie => {
      
    const movieCrew = pageMovie.movieCredits.crew;
  
    //object containing departments on film crew
    let deptObj = {};
   
    //fill object with departments
    for (let i = 0; i < movieCrew.length; i++) {
        if (deptObj.hasOwnProperty(movieCrew[i].department)) {
        }
        else {
            deptObj[movieCrew[i].department] = [];
        }
    }
    
    //fill departments with crew
    for (let i = 0; i < movieCrew.length; i++) {
        deptObj[movieCrew[i].department].push(movieCrew[i]);
    }

    //render full crew in JSX
    return (
        <div>
            <Accordion >
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Full Crew
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Container>
                            {
                            Object.keys(deptObj).map(department => (
                                <Row key={department}>
                                    <Col>
                                        <Row>
                                            <h4>{department}</h4>
                                        </Row>  
                                        {
                                        deptObj[department].map(crewMember => (
                                            <Row key={crewMember.id}>
                                                <Col>{crewMember.name}</Col>
                                                <Col>{crewMember.job}</Col>
                                                <Col></Col>
                                            </Row>
                                        ))
                                        }
                                    </Col>
                                </Row>
                            ))
                            }  
                            </Container>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>

            {/* {
            Object.keys(deptObj).map(department => (
                <div key={department}>
                    <h3>{department}</h3>
                    <ul>
                        {
                        deptObj[department].map(crewMember => (
                            <li key={crewMember.id}> {crewMember.name} <b>{crewMember.job}</b> </li>
                        ))
                        }
                    </ul>
                </div>
            ))
            } */}
        </div>
    )
}

export default createCrewList;