import React, {useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import validator from 'validator';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

import { UserContext } from '../../../providers/UserProvider';
import { postMovieReview, getMovieReviews } from './ReviewTab-fb.js';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner.js'
import Review from "./Review.js";

const ReviewTab = props => {

    const [reviewData, setReviewData] = useState({title: "", rating: 1, reviewText: ""});
    const [reviews, setReviews] = useState({reviewsArr: [], reviewOrder:"newest", gettingReviews: true})
    const [reviewForm, setReviewForm] = useState({userReviewExists: false, gettingForm: true});

    async function waitForMovieReviews() {
        let newReviews = await getMovieReviews(props.movieId);

        let sortedReviews;

        //sort reviews by newest
        if (reviews.reviewOrder === "newest") {
            sortedReviews = newReviews.sort((a, b) => {
                let x = a.date.seconds, y = b.date.seconds
                
                if (x < y)
                return 1;

                if (x > y)
                    return -1;
                return 0;
            })
        }

        //sort reviews by oldest
        if (reviews.reviewOrder === "oldest") {
            sortedReviews = newReviews.sort((a, b) => {
                let x = a.date.seconds, y = b.date.seconds
                
                if (x > y)
                return 1;

                if (x < y)
                    return -1;
                return 0;
            })
        }

        //sort reviews by rating, descending
        if (reviews.reviewOrder === "ratingDsc") {
           
            sortedReviews = newReviews.sort((a, b) => {
              
                return b.rating - a.rating;
            })
        }

        //sort reviews by rating, ascending
        if (reviews.reviewOrder === "ratingAsc") {
            sortedReviews = newReviews.sort((a, b) => {
                return a.rating - b.rating;
            })
        }
       
        setReviews({...reviews, reviewsArr: sortedReviews, gettingReviews: false});
    }

    useEffect(() => {
        
        waitForMovieReviews();
   
    }, [reviews.gettingReviews, props.movieId])


    const userReviewExists = (userId, reviewsArr) => {
        return (reviewsArr.filter(review => review.authorId === userId).length > 0) ? true : false;

    }

    const submitReview = async (event, movieId, reviewData, user) => {
        event.preventDefault();
        await postMovieReview(movieId, reviewData, user);
        setReviewData({title:"", rating: 1, reviewText: ""});
        setReviews({...reviews, gettingReviews: true});

    }

    //change order of comments and trigger comments rerender
    const changeReviewOrder = newOrder => {
        if (newOrder === reviews.reviewOrder) { 
            return; 
        }
        setReviews({...reviews, reviewOrder: newOrder, gettingReviews: true});
    }

    const reviewCards = reviews => {
        return (
            reviews.reviewsArr.map(review => (
                <div key={review.reviewId}>
                    <Review review={review} setReviews={setReviews} reviews={reviews}  />
                </div>
                
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
                        reviews.gettingReviews ? 
                    <LoadingSpinner />
                    :

                        user ?
                            userReviewExists(user.uid, reviews.reviewsArr) ?
                                <p>You have already posted a review for this movie.</p>
                            :
                            <Form className="black review-form">
                                <Form.Group>
                                    <Form.Label>Review Headline</Form.Label>
                                    <Form.Control value={reviewData.title} onChange={ e => setReviewData({ ...reviewData, title: e.target.value})} />
                                </Form.Group>
                                <Form.Group>
                                <Form.Label>Review Text</Form.Label>
                                    <FormControl as="textarea" aria-label="With textarea" rows={5} value={reviewData.reviewText} onChange={ e => setReviewData({ ...reviewData, reviewText: e.target.value})} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control className="rating-control" value={reviewData.rating} onChange={ e => setReviewData({ ...reviewData, rating: e.target.value })} as="select" size="sm" >
                                        <option value={1}>
                                            ⭐   |  Awful
                                        </option>
                                        <option value={2}>⭐⭐    |  Mediocore</option>
                                        <option value={3}>⭐⭐⭐    |  Good</option>
                                        <option value={4}>⭐⭐⭐⭐    |  Great</option>
                                        <option value={5}>⭐⭐⭐⭐⭐    |  Amazing</option>
                                    </Form.Control>
                                </Form.Group>
                                <div className="comment-submit">
                                    <Button  
                                    variant="light" 
                                    type="submit" 
                                    disabled = {
                                        ((!validator.isEmpty( reviewData.title, { ignore_whitespace:true }) == true) &&
                                        (!validator.isEmpty( reviewData.reviewText, { ignore_whitespace:true }) == true ))
                                        ? false : true}
                                    onClick={e => submitReview(e, props.movieId, reviewData, user)}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </Form>                           
                        :
                        <Card className="comment-card  please-signin">
                            <Card.Text>
                                <i>Log in or <Link to={`/signup`}> sign up</Link> to leave a review</i>
                            </Card.Text>
                        </Card>
                    )
                }
                </UserContext.Consumer>
            
                <div className="comment-stack">
                    <Dropdown  >
                        <Dropdown.Toggle variant="light" size="sm" id="dropdown-basic">
                            Sort By
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item className={`black-text ${reviews.reviewOrder==="newest" ? "bold" : ""}`} onClick={() => changeReviewOrder("newest")}>Newest</Dropdown.Item>
                            <Dropdown.Item className={`black-text ${reviews.reviewOrder==="oldest" ? "bold" : ""}`} onClick={() => changeReviewOrder("oldest")}>Oldest</Dropdown.Item>
                            <Dropdown.Item className={`black-text ${reviews.reviewOrder==="ratingDsc" ? "bold" : ""}`} onClick={() => changeReviewOrder("ratingDsc")}>Rating Descending</Dropdown.Item>
                            <Dropdown.Item className={`black-text ${reviews.reviewOrder==="ratingAsc" ? "bold" : ""}`} onClick={() => changeReviewOrder("ratingAsc")}>Rating Ascending</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    {
                        reviews.gettingReviews ? 
                            <LoadingSpinner />
                        :
                            reviews.reviewsArr.length > 0 ?
                            reviewCards(reviews)                                                                                              
                        :
                            <p style={{textAlign: "center", paddingBottom: "1em"}}>Nobody has reviewed this movie yet. You could be the first!</p>
                    }
                </div>
                </Col>
                <Col xs={1}></Col>
            </Row>
        </Tab.Content>
    )

}

export default ReviewTab;