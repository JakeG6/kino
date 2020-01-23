import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';  
import Table from 'react-bootstrap/Table';

import profilePlaceholder from './profile-placeholder.jpeg';

const createCastList = pageMovie => {
    
    //array containing film cast
    const movieCast = pageMovie.movieCredits.cast;

    //check for dead profile images
    // const imgError = event => {
    //     const image = event.target;
    //     image.onerror = null;
    //     image.src = profilePlaceholder;
    // }

    const checkProfilePath = path => {
        return path ?  `https://image.tmdb.org/t/p/w45${path}` : profilePlaceholder;
    }

    //render full crew in JSX
    return (
        <div>
            <Container>
                <Row>
                    <Col>    
                        <h2 className="movie-page-header center">Cast</h2>
                        <Table striped  variant="dark">
                            <tbody>
                            {
                                movieCast.map(castMember => (
                                    <tr key={castMember.cast_id}>
                                        <td>
                                            <Image 
                                                src={checkProfilePath(castMember.profile_path)}
                                                width={45}
                                                height={67}
                                                rounded
                                            />
                                        </td>
                                        <td>
                                            <Link to={`/search/?type=discover&wca=${castMember.id}`}>{castMember.name}</Link>
                                        </td>
                                        <td>
                                            "{castMember.character}"
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default createCastList;