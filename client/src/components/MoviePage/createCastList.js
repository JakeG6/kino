import React from 'react';

import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'

const createCastList = pageMovie => {
    
    //array containing film cast
    const movieCast = pageMovie.movieCredits.cast;

    //render full crew in JSX
    return (
        <div>
            <Accordion >
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                           Full Cast
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Table striped bordered>
                                <tbody>
                                {
                                    movieCast.map(castMember => (
                                        <tr key={castMember.cast_id}>
                                            <td>
                                                {castMember.name}
                                            </td>
                                            <td>
                                                "{castMember.character}"
                                            </td>
                                        </tr>
                
                                    ))
                                }
                                </tbody>
                            </Table>
                            {/* <ul>
                            {
                            movieCast.map(castMember => (
                            <li key={castMember.cast_id}> 
                                {castMember.name} <b>"{castMember.character}"</b> 
                            </li>
                            ))
                            }
                            </ul>    */}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            {/* <ul>
                {
                movieCast.map(castMember => (
                <li key={castMember.cast_id}> 
                    {castMember.name} <b>"{castMember.character}"</b> 
                </li>
                ))
                }
            </ul>            */}
        </div>
    )
}

export default createCastList;