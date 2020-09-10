import React, {useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';

import { UserContext } from '../../../providers/UserProvider';
import CommentTab from "./CommentTab";
import { postMovieReview, getMovieReviews } from '../../../firebase';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner.js'

const ReviewTab = props => {

    const [reviewData, setReviewData] = useState({title: "", rating: 1, reviewText: ""});
    const [reviews, setReviews] = useState({reviewsArr: [], gettingReviews: true})

    useEffect(() => {

        async function waitForMovieReviews() {
            let reviews = await getMovieReviews(props.movieId);
            console.log(reviews);
            setReviews({reviewsArr: reviews, gettingReviews: false});
        }

        waitForMovieReviews();
   
    }, [props.movieId])

    const submitReview = (event, movieId, reviewData, user) => {
        event.preventDefault();
        postMovieReview(movieId, reviewData, user);
        setReviewData({title:"", rating: 1, reviewText: ""});
    }

    const reviewCards = reviews => {
        return (
            reviews.reviewsArr.map(review => (
                <Card>
                    <Card.Subtitle className="mb-2 text-muted">{review.username}</Card.Subtitle>
                    <Card.Body>
                        {review.text}
                    </Card.Body>
                </Card>
            ))
        )
    }


    return (
        <Tab.Content>
            
                <Row>
                    <Col xs={1}>
                    </Col>

                    <Col xs={10}>
                    
                <UserContext.Consumer>
                {
                user => (
                    user ?
                    <Accordion>                              
                        <Card>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0" className="reviewButton">
                                Write a review!
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Form className="black review-form">
                                    <Form.Group>
                                        <Form.Label>Review Headline</Form.Label>
                                        <Form.Control value={reviewData.title} onChange={ e => setReviewData({ ...reviewData, title: e.target.value})} />
                                    </Form.Group>
                                    <Form.Group controlId="formNewComment">
                                    <Form.Label>Review Text</Form.Label>
                                        <FormControl as="textarea" aria-label="With textarea" rows={5} value={reviewData.reviewText} onChange={ e => setReviewData({ ...reviewData, reviewText: e.target.value})} />
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.SelectCustomSizeLg">
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control value={reviewData.rating} onChange={ e => setReviewData({ ...reviewData, rating: e.target.value })} as="select" size="lg" >
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" onClick={e => submitReview(e, props.movieId, reviewData, user)}>
                                        Submit
                                    </Button>
                                </Form>
                                </Accordion.Collapse>
                            </Card>
                    </Accordion>
                    :
                    <Card className="comment-card  please-signin">
                        <Card.Text>
                            <i>Log in or <Link to={`/signup`}> sign up</Link> to leave a review</i>
                        </Card.Text>
                    </Card>
                )
            }
            </UserContext.Consumer>
            </Col>
            <Col xs={1}></Col>
                </Row>
            
            
            <div>
                {
                    reviews.reviewsArr.length > 0 ?
                        reviewCards(reviews)                                                                                              
                    :
                    <p style={{textAlign: "center", paddingBottom: "1em"}}>Nobody has reviewed this movie yet. You could be the first!</p>
                }
            </div>
        </Tab.Content>
    )

}

export default ReviewTab;