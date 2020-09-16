import React, {useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import validator from 'validator';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import "./Comment.css"

import Tooltip from 'react-bootstrap/Tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrayingHands, faCommentSlash } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


import { UserContext } from '../../../providers/UserProvider';
import { LoginModalContext } from '../../../providers/LoginModalProvider';

import { toggleUpvote, toggleDownvote, updateUserPoints, deleteComment } from '../../../firebase';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner.js'

const Comment = props => {

    //get user information if logged in
    const user = useContext(UserContext);

    //context for login moodal
    const {loginShow, setLoginShow} = useContext(LoginModalContext)

    //hook for deletion modal
    const [delModalShow, setDelModal] = useState(false)

    //show login modal
    const handleModalShow = () => {
        setLoginShow(true);
    }
    
    //show delete confirmation modal
    const handleDelModalShow = () => {
        setDelModal(true);
    }

    const handleDelModalHide = () => {
        setDelModal(false);
    }

    //Delete Comment
    const handleDelete = async (id) => {
        await deleteComment(id)
        handleDelModalHide();
        props.setComments({...props.comments, gettingComments: true});
        
    }

    //set visual for upvote/downvote based on if a user is logged in, and then how user has previously voted on this comment
    const [vote, setVote] = useState(user ? props.comment.upvoters.includes(user.uid) ? "upvoted" : props.comment.downvoters.includes(user.uid) ? "downvoted" : "" : "");
    const [pointCount, setPointCount] = useState(props.comment.points)

    const handleUpvote = async (id, authorId, user) => {

        //remove the user from upvoters if they've upvoted already
        if (vote === "upvoted") {
            setVote("");
            setPointCount(pointCount -1 );
        }
        // add the user to upvoters if they're in downvoters, and compensate for points lost from downvoting
        else if (vote === "downvoted") {
            setVote("upvoted");
            setPointCount(pointCount + 2);          
        }
        //add the user to upvoters if they haven't voted on the comment
        else {
            setVote("upvoted");
            setPointCount(pointCount + 1);
                   
        }
        await toggleUpvote(id, user);
    }

    const handleDownvote = async (id, authorId, user) => {
        //remove the user from downvoters if they've downvoted already
        if (vote === "downvoted") {
            setVote("");
            setPointCount(pointCount + 1 );
        }
        // add the user to downvoters if they're in upvoters, and compensate for points gained from upvoting
        else if (vote === "upvoted") {
            setVote("downvoted");
            setPointCount(pointCount -2 );     
        }
        //add the user to downvoters if they haven't voted on the comment
        else {
            setVote("downvoted");
            setPointCount(pointCount - 1);
        }
        await toggleDownvote(id, user);
        
    }

    return (
            <UserContext.Consumer>
                {
                    user => (
                  
                        <Card className="comment-card" key={props.comment.commentId}>
                            <Card.Header className="comment-header">
                                {
                                    
                                }                     
                                <h4>{props.comment.username}</h4>
                                {   
                                    user ?
                                    user.uid === props.comment.authorId ?
                                    <OverlayTrigger placement="left" overlay={ <Tooltip> <strong>Delete</strong> </Tooltip>}>
                                        <FontAwesomeIcon 
                                            className={`delete-icon`}
                                            icon={faTimes} 
                                            size="2x" 
                                            color="white"
                                            onClick={ user ? handleDelModalShow : handleModalShow}    
                                        />
                                    </OverlayTrigger>
                                    :
                                    <div></div>
                                    :
                                    <div></div>
                                }
                                
                            </Card.Header>
                            <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                            <Card.Body> {props.comment.text} </Card.Body>
                            <footer className="comment-footer">
                                <div className="comment-vote">
                                    <OverlayTrigger placement="top" overlay={ <Tooltip> <strong>Patrician</strong> </Tooltip>}>
                                        <FontAwesomeIcon 
                                            className={`patrIcon ${vote === "upvoted" ? vote : ""}`} 
                                            icon={faPrayingHands} 
                                            size="2x" 
                                            color="white" 
                                            onClick={ user ? e =>  handleUpvote(props.comment.commentId, props.comment.authorId, user) : handleModalShow}
                                        />
                                    </OverlayTrigger>
                                    <h5 className={vote === "upvoted" ? "green" : vote === "downvoted" ? "red" : ""}>{pointCount}</h5>
                                    <OverlayTrigger placement="top" overlay={ <Tooltip> <strong>Plebian</strong> </Tooltip>}>
                                        <FontAwesomeIcon 
                                            className={`plebIcon ${vote === "downvoted" ? vote : ""}`}
                                            icon={faThumbsDown} 
                                            size="2x" 
                                            color="white"
                                            onClick={ user ? e => handleDownvote(props.comment.commentId, props.comment.authorId, user) : handleModalShow}    
                                        />
                                    </OverlayTrigger>
                                </div>
                                
                                <i>Posted {new Date(props.comment.date.seconds * 1000).toLocaleDateString("en-US")}</i>
                            </footer>
                            <Modal
                                show={delModalShow}
                                onHide={() => setDelModal(false)}
                                size="sm"
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>
                                    Warning!
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Are you sure you want to delete this comment?
                                </Modal.Body>
                                <Modal.Footer >
                                <Button variant="danger" className="comment-delete-button" onClick={e => handleDelete(props.comment.commentId)}  >
                                    Yes
                                </Button>
                                <Button variant="light" className="btn-light" onClick={handleDelModalHide}>
                                    No
                                </Button>
                                </Modal.Footer>
                            </Modal>
                        </Card>
                    )
                }
            </UserContext.Consumer>
        
        
    )
}

export default Comment