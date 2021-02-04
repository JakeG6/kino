import React, {useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { updateReview } from './Review-fb.js';
import validator from 'validator';


import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import Modal from 'react-bootstrap/Modal';

import "./Comment.css"
import "./Review.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { UserContext } from '../../../providers/UserProvider';
import { deleteReview } from '../../../firebase';


const Review = props => {

    //get user information if logged in
    const user = useContext(UserContext);

    //hook for deletion modal
    const [delModalShow, setDelModal] = useState(false)

    let editModeDefault = {rating: props.review.rating, title: props.review.title, text: props.review.text, show: false}

    //hook for edit mode
    const [editMode, setEditMode] = useState(editModeDefault);

    // show delete confirmation modal
    const handleDelModalShow = () => {
        setDelModal(true);
    }

    // hide confirmation modal
    const handleDelModalHide = () => {
        setDelModal(false);
    }

    //show/hide edit mode
    const handleEditModeShow = () => {
        editMode.show ? setEditMode(editModeDefault) : setEditMode({...editMode, show: true}) ;
    }

    //Update edited comment
    const handleUpdate = async (id, editedText) => {
        await updateReview(id, editedText);
        handleEditModeShow();

        props.setReviews({...props.reviews, gettingReviews: true});

    }

    // Delete Review
    const handleDelete = async (id) => {
        await deleteReview(id)
        handleDelModalHide();
        props.setReviews({...props.reviews, gettingReviews: true});
        
    }

    //check if review has been edited since initially posted
    const isEdited = lastEdited => {return lastEdited ? `, last edited ${new Date(props.review.lastEdited.seconds * 1000).toLocaleDateString("en-US")}` : "" }


    return (
        <UserContext.Consumer>
            {
                user => (            
                    <Card className="comment-card review-card" >
                        <Card.Header className="comment-header">                     
                            
                            <div className="stars">
                                {
                                Array.from({ length: props.review.rating}, (_, i) => 
                                    <div key={i}>
                                        <FontAwesomeIcon                                            
                                            icon={faStar} 
                                            size="2x" 
                                            color="gold"
                                        />
                                        
                                    </div>                                   
                                    )
                                }
                            </div>
                            {   
                                user ?
                                user.uid === props.review.authorId ?
                                <div>
                                    <FontAwesomeIcon 
                                        className={`edit-icon`}
                                        icon={faEdit} 
                                        size="2x" 
                                        color="white"
                                        onClick={ user ? handleEditModeShow : null}    
                                    />
                                    <FontAwesomeIcon 
                                        className={`delete-icon`}
                                        icon={faTimes} 
                                        size="2x" 
                                        color="white"
                                        onClick={handleDelModalShow}    
                                    />
                                </div>
                                    
                              
                                :
                                <div></div>
                                :
                                <div></div>
                            }
                            
                        </Card.Header>
                        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                        {
                            editMode.show ?
                            <Card.Body>
                                <Form className="review-form">
                                    <Form.Group>
                                        <Form.Label>Review Headline</Form.Label>
                                        <Form.Control value={editMode.title} onChange={ e => setEditMode({ ...editMode, title: e.target.value})} />
                                    </Form.Group>
                                    <Form.Group>
                                    <Form.Label>Review Text</Form.Label>
                                        <FormControl as="textarea" aria-label="With textarea" rows={5} value={editMode.text} onChange={ e => setEditMode({ ...editMode, text: e.target.value})} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control className="rating-control" value={editMode.rating} onChange={ e => setEditMode({ ...editMode, rating: e.target.value })} as="select" size="sm" >
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
                                            style={{marginRight: "1em"}}
                                            disabled = {
                                                ((!validator.isEmpty( editMode.title, { ignore_whitespace:true }) == true) &&
                                                (!validator.isEmpty( editMode.text, { ignore_whitespace:true }) == true ))
                                                ? false : true}
                                            onClick={() => handleUpdate(props.review.reviewId, editMode)}
                                        >
                                            Save Changes
                                        </Button>
                                        <Button
                                            variant="danger" 
                                            onClick={() => handleEditModeShow()}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                    
                                </Form>
                            </Card.Body>
                            :
                            <Card.Body className="review-body">
                                <div className="review-title">
                                    <h2>{props.review.title}</h2>
                                </div>
                                
                                <p className="review-text">{props.review.text} <i>-by <Link to={`/user/${props.review.username}`}>{props.review.username}</Link></i> </p>
                            </Card.Body>
                        }
                        
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
                            
                            <i>{`Posted ${new Date(props.review.date.seconds * 1000).toLocaleDateString("en-US")}${isEdited(props.review.lastEdited)}`}</i>
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