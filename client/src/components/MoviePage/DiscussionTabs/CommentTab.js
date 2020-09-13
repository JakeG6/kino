import React, {useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import validator from 'validator';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import Overlay from 'react-bootstrap/Overlay'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import Tab from 'react-bootstrap/Tab';

import Tooltip from 'react-bootstrap/Tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrayingHands } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';

import { UserContext } from '../../../providers/UserProvider';
import { postMovieComment, getMovieComments, toggleUpvote, toggleDownvote } from '../../../firebase';
import Comment from "./Comment";
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner.js'

const CommentTab = props => {

    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState({commentArr: [], gettingComments: true})

      //state handlers for modal
    const [show, setShow] = useState(false);



    useEffect(() => {

        async function waitForMovieComments() {
            let comments = await getMovieComments(props.movieId);
            console.log(comments);
            setComments({commentArr: comments, gettingComments: false});
        }

        waitForMovieComments();
   
    }, [props.movieId])

    const submitComment = (event, movieId, text, user) => {
        event.preventDefault();
        postMovieComment(movieId, text, user);
        setCommentText("");
    }

    const commentCards = comments => {
        return (
            comments.commentArr.map(comment => (
             
                    <Comment comment={comment} />
                
            ))
        )
    }
    
    if (comments.gettingComments === false) {
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
                            <Form>
                                <Form.Group controlId="formNewComment">
                                    <FormControl 
                                        as="textarea" 
                                        aria-label="With textarea" 
                                        rows={5} 
                                        placeholder="Enter comment" 
                                        value={commentText} 
                                        onChange={ e => setCommentText(e.target.value)} 
                                    />
                                </Form.Group>
                                <Button
                                    className="comment-submit"
                                    variant="light" 
                                    type="submit" 
                                    onClick={e => submitComment(e, props.movieId, commentText, user)}
                                    disabled = {validator.isEmpty(commentText, { ignore_whitespace:true })? true : false}
                                >
                                    Submit
                                </Button>
                            </Form>
                        :
                            <Card className="comment-card please-signin">
                                <Card.Text>
                                    <i>Log in or <Link to={`/signup`}> sign up</Link> to leave a comment</i>
                                </Card.Text>
                            </Card>
                    )
                }
                </UserContext.Consumer>
                
                <div className="comment-stack">
                {
                    comments.commentArr.length > 0 ?
                        commentCards(comments)                                                                                              
                    :
                    <p>Nobody has commented on this movie yet.</p>
                }
                </div>
                </Col>
                <Col xs={1}>

                    </Col>
                </Row>
            </Tab.Content>
        )
    }
    else {
        return (
            <LoadingSpinner />
        )
    }
    
}

export default CommentTab;