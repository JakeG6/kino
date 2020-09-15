import React, {useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import validator from 'validator';


import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faStar } from '@fortawesome/free-solid-svg-icons';

import { UserContext } from '../../../providers/UserProvider';
import { postMovieReview, getMovieReviews } from '../../../firebase';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner.js'
import Review from "./Review.js";

const ReviewTab = props => {

    const [reviewData, setReviewData] = useState({title: "", rating: 1, reviewText: ""});
    const [reviews, setReviews] = useState({reviewsArr: [], reviewOrder:"newest", gettingReviews: true})

    async function waitForMovieReviews() {
        let newReviews = await getMovieReviews(props.movieId);

        // console.log(reviews);

        let sortedReviews;

        //sort reviews by newest
        if (reviews.reviewOrder === "newest") {
            // console.log("doing new stuff")
            sortedReviews = newReviews.sort((a, b) => {
                let x = a.date.seconds, y = b.date.seconds
                console.log(typeof(x))
                
                if (x < y)
                return 1;

                if (x > y)
                    return -1;
                return 0;
            })
        }

        //sort reviews by oldest
        if (reviews.reviewOrder === "oldest") {
            // console.log("doing old stuff")
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
            // console.log(sortedReviews)
        }

        //sort reviews by rating, ascending
        if (reviews.reviewOrder === "ratingAsc") {
            // console.log("doing pleb stuff")
            sortedReviews = newReviews.sort((a, b) => {
                return a.rating - b.rating;
            })
        }
       
        console.log(sortedReviews)

        setReviews({...reviews, reviewsArr: sortedReviews, gettingReviews: false});
    }

    useEffect(() => {
        waitForMovieReviews();
        const x = true;
        const y = false;
        console.log((x == true) && (y == true) ? true : false)
     
   
    }, [reviews.gettingReviews, props.movieId])

    const submitReview = async (event, movieId, reviewData, user) => {
        event.preventDefault();
        console.log(movieId, reviewData, user)
        await postMovieReview(movieId, reviewData, user);
        setReviewData({title:"", rating: 1, reviewText: ""});
        setReviews({...reviews, gettingReviews: true});

    }

    //change order of comments and trigger comments rerender
    const changeReviewOrder = newOrder => {
        if (newOrder === reviews.reviewOrder) { 
            console.log("the order is the same");
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
                    user ?
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
                                onClick={e => submitReview(e, props.movieId, reviewData, user)}>
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