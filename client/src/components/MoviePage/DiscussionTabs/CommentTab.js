import React, {useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import validator from 'validator';


import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
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

import { UserContext } from '../../../providers/UserProvider';
import { LoginModalContext } from '../../../providers/LoginModalProvider';
import { postMovieComment, getMovieComments, toggleUpvote, toggleDownvote } from '../../../firebase';
import Comment from "./Comment";
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner.js'

const CommentTab = props => {

    //context for signin modal
    const {loginShow, setLoginShow} = useContext(LoginModalContext)


    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState({ commentOrder: "patrician", commentArr: [], gettingComments: true})
    

    const handleModalShow = () => {
        setLoginShow(true);
      }

    async function waitForMovieComments() {
        let newComments = await getMovieComments(props.movieId);

        // console.log(comments);

        let sortedComments;

        //sort comments by upvotes
        if (comments.commentOrder === "patrician") {
            // console.log("doing patrician stuff")
            sortedComments = newComments.sort((a, b) => {
              
                return b.points - a.points;
            })
            // console.log(sortedComments)
        }

        //sort comments by downvotes
        if (comments.commentOrder === "plebian") {
            // console.log("doing pleb stuff")
            sortedComments = newComments.sort((a, b) => {
                return a.points - b.points;
            })
        }

        //sort comments by newest
        if (comments.commentOrder === "newest") {
            // console.log("doing new stuff")
            sortedComments = newComments.sort((a, b) => {
                let x = a.date.nanoseconds, y = b.date.nanoseconds
                
                if (x > y)
                return 1;

                if (x < y)
                    return -1;
                return 0;
            })
        }

        //sort comments by newest
        if (comments.commentOrder === "oldest") {
            // console.log("doing old stuff")
            sortedComments = newComments.sort((a, b) => {
                let x = a.date.nanoseconds, y = b.date.nanoseconds
                
                if (x < y)
                return 1;

                if (x > y)
                    return -1;
                return 0;
            })
        }
        // console.log(sortedComments)

        setComments({...comments, commentArr: sortedComments, gettingComments: false});
    }

    useEffect(() => {

        waitForMovieComments();
   
    }, [comments.gettingComments])


    //submit comment, and trigger comments rerender
    const submitComment = async (event, movieId, text, user) => {
        event.preventDefault();
        await postMovieComment(movieId, text, user);
        setCommentText("");
        setComments({...comments, gettingComments: true});

    }

    const commentCards = comments => {
        return (
            comments.commentArr.map(comment => (
                    <Comment comment={comment} comments={comments} setComments={setComments} />
            ))
        )
    }

    //change order of comments and trigger comments rerender
    const changeCommentOrder = newOrder => {
        if (newOrder === comments.commentOrder) { 
            console.log("the order is the same");
            return; 
        }
        setComments({...comments, commentOrder: newOrder, gettingComments: true});
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
                            <div className="comment-submit">
                                <Button
                                    variant="light" 
                                    type="submit" 
                                    onClick={e => submitComment(e, props.movieId, commentText, user)}
                                    disabled = {validator.isEmpty(commentText, { ignore_whitespace:true })? true : false}
                                >
                                    Submit
                                </Button>
                            </div>
                            
                        </Form>
                    :
                        <Card className="comment-card please-signin">
                            <Card.Text>
                                <i><span className="modal-opener" onClick={handleModalShow}>Log in</span> or <Link to={`/signup`}> sign up</Link> to leave a comment</i>
                            </Card.Text>
                        </Card>
                )
            }
            </UserContext.Consumer>
            
            <div className="comment-stack">
                {/* comment order options */}
                <Dropdown  >
                    <Dropdown.Toggle variant="light" size="sm" id="dropdown-basic">
                        Sort By
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item className={`black-text ${comments.commentOrder==="patrician" ? "bold" : ""}`} onClick={e => changeCommentOrder("patrician")}>Most Patrician</Dropdown.Item>
                        <Dropdown.Item className={`black-text ${comments.commentOrder==="plebian" ? "bold" : ""}`} onClick={e => changeCommentOrder("plebian")}>Most Plebian</Dropdown.Item>
                        <Dropdown.Item className={`black-text ${comments.commentOrder==="newest" ? "bold" : ""}`} onClick={e => changeCommentOrder("newest")}>Newest</Dropdown.Item>
                        <Dropdown.Item className={`black-text ${comments.commentOrder==="oldest" ? "bold" : ""}`} onClick={e => changeCommentOrder("oldest")}>Oldest</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            {
                comments.gettingComments ? 
                    <LoadingSpinner />
                :
                
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

export default CommentTab;