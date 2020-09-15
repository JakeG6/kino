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
import "./Review.css"

import Tooltip from 'react-bootstrap/Tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrayingHands, faCommentSlash } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';



import { UserContext } from '../../../providers/UserProvider';
import { LoginModalContext } from '../../../providers/LoginModalProvider';

import { toggleUpvote, toggleDownvote, deleteReview } from '../../../firebase';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner.js'


const Review = props => {

    //get user information if logged in
    const user = useContext(UserContext);

    //hook for deletion modal
    const [delModalShow, setDelModal] = useState(false)

    // const starArr = new  

    // show delete confirmation modal
    const handleDelModalShow = () => {
        setDelModal(true);
    }

    const handleDelModalHide = () => {
        setDelModal(false);
    }

    // Delete Review
    const handleDelete = async (id) => {
        await deleteReview(id)
        handleDelModalHide();
        props.setReviews({...props.reviews, gettingReviews: true});
        
    }

    return (
        <UserContext.Consumer>
            {
                user => (            
                    <Card className="comment-card review-card">
                        <Card.Header className="comment-header">                     
                            
                            <div>
                                {
                                Array.from({ length: props.review.rating}, (_, i) => 
                                    <FontAwesomeIcon 
                                        icon={faStar} 
                                        size="2x" 
                                        color="gold"
                                    />
                                )
                                }
                            </div>
                            {   
                                user ?
                                user.uid === props.review.authorId ?
                                <OverlayTrigger placement="left" overlay={ <Tooltip> <strong>Delete</strong> </Tooltip>}>
                                    <FontAwesomeIcon 
                                        className={`delete-icon`}
                                        icon={faTimes} 
                                        size="2x" 
                                        color="white"
                                        onClick={handleDelModalShow}    
                                    />
                                </OverlayTrigger>
                                :
                                <div></div>
                                :
                                <div></div>
                            }
                            
                        </Card.Header>
                        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                        <Card.Body className="review-body">
                            <div className="review-title">
                                <h2>{props.review.title}</h2>
                                
                            </div>
                            
                            <p className="review-text">{props.review.text} <i>-by {props.review.username}</i> </p>
                            </Card.Body>
                        <footer className="comment-footer review-footer">
                            {/* <div className="comment-vote">
                                <OverlayTrigger placement="top" overlay={ <Tooltip> <strong>Patrician</strong> </Tooltip>}>
                                    <FontAwesomeIcon 
                                        className={`patrIcon ${vote === "upvoted" ? vote : ""}`} 
                                        icon={faPrayingHands} 
                                        size="2x" 
                                        color="white" 
                                        onClick={ user ? e =>  handleUpvote(props.comment.commentId, user) : handleModalShow}
                                    />
                                </OverlayTrigger>
                                <h5 className={vote === "upvoted" ? "green" : vote === "downvoted" ? "red" : ""}>{pointCount}</h5>
                                <OverlayTrigger placement="top" overlay={ <Tooltip> <strong>Plebian</strong> </Tooltip>}>
                                    <FontAwesomeIcon 
                                        className={`plebIcon ${vote === "downvoted" ? vote : ""}`}
                                        icon={faThumbsDown} 
                                        size="2x" 
                                        color="white"
                                        onClick={ user ? e => handleDownvote(props.comment.commentId, user) : handleModalShow}    
                                    />
                                </OverlayTrigger>
                            </div> */}
                            
                            <i>Posted {new Date(props.review.date.seconds * 1000).toLocaleDateString("en-US")}</i>
                        </footer>
                        {<Modal
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
                                Are you sure you want to delete this review?
                                
                            </Modal.Body>
                            <Modal.Footer >
                           <Button variant="danger" className="comment-delete-button" onClick={e => handleDelete(props.review.reviewId)}  >
                                Yes
                            </Button> 
                            <Button variant="light" className="btn-light" onClick={handleDelModalHide}>
                                No
                            </Button>
                            </Modal.Footer>
                        </Modal>
                        }
                    </Card>
                )
            }
        </UserContext.Consumer>
    )
}

export default Review