import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';  

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
            <Container>
                <Row>
                    <Col>
                        <h2 className="movie-page-header center">Production Crew</h2>
                    </Col>
                </Row>
            {
            Object.keys(deptObj).map(department => (
                <Row key={department}>
                    <Col>
                        <h4 className="department-header">{department}</h4>
                        {
                        deptObj[department].map(crewMember => (
                            <Row key={crewMember.id}>
                                <Col >{crewMember.name}</Col>
                                <Col >{crewMember.job}</Col>
                            </Row>
                        ))
                        }
                    </Col>
                </Row>
            ))
            }  
            </Container>
        </div>
    )
}

export default createCrewList;