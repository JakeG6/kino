import React, {useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import validator from 'validator';


import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import "./Comment.css"

import Tooltip from 'react-bootstrap/Tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrayingHands } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


import { UserContext } from '../../../providers/UserProvider';
import { LoginModalContext } from '../../../providers/LoginModalProvider';

import { updateComment, toggleUpvote, toggleDownvote, deleteComment } from './Comment-fb.js';

const Comment = props => {

    //get user information if logged in
    const user = useContext(UserContext);

    //context for login moodal
    const {loginShow, setLoginShow} = useContext(LoginModalContext)

    //hook for deletion modal
    const [delModalShow, setDelModal] = useState(false)


    let editModeDefault = {text: props.comment.text, show: false};
    //hook for edit mode
    const [editMode, setEditMode] = useState(editModeDefault);

    //show login modal
    const handleModalShow = () => {
        setLoginShow(true);
    }

    //show edit mode
    const handleEditModeShow = () => {
        editMode.show ? setEditMode(editModeDefault) : setEditMode({...editMode, show: true}) ;
    }
    
    //show delete confirmation modal
    const handleDelModalShow = () => {
        setDelModal(true);
    }

    const handleDelModalHide = () => {
        setDelModal(false);
    }

    //Update edited comment
    const handleUpdate = async (id, editedText) => {
        await updateComment(id, editedText);
        handleEditModeShow();

        props.setComments({...props.comments, gettingComments: true});

    }

    //Delete Comment
    const handleDelete = async (id) => {
        await deleteComment(id);
        handleDelModalHide();

        props.setComments({...props.comments, gettingComments: true});
        
    }

    //set visual for upvote/downvote based on if a user is logged in, and then how user has previously voted on this comment
    const [vote, setVote] = useState(user ? props.comment.upvoters.includes(user.uid) ? "upvoted" : props.comment.downvoters.includes(user.uid) ? "downvoted" : "" : "");
    const [pointCount, setPointCount] = useState(props.comment.points)

    const handleUpvote = async (id, user) => {

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

    const handleDownvote = async (id, user) => {
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

    //check if comment has been edited since initially posted
    const isEdited = lastEdited => {return lastEdited ? `, last edited ${new Date(props.comment.lastEdited.seconds * 1000).toLocaleDateString("en-US")}` : "" }

    return (
        <UserContext.Consumer>
            {
                user => (
                
                    <Card className="comment-card" >
                        <Card.Header className="comment-header">
                                            
                            <h4 className="comment-username"><Link to={`/user/${props.comment.username}`}>{props.comment.username}</Link></h4>
                            {   
                                user ?
                                user.uid === props.comment.authorId ?
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
                                        onClick={ user ? handleDelModalShow : handleModalShow}    
                                    />

                                </div>

                                :
                                <div></div>
                                :
                                <div></div>
                            }
                            
                        </Card.Header>
                        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                        
                        {editMode.show ?
                        <Card.Body>
                            <Form>
                                <Form.Group>
                                    <FormControl 
                                        as="textarea" 
                                        aria-label="With textarea" 
                                        rows={5} 
                                        placeholder="Enter comment" 
                                        value={editMode.text} 
                                        onChange={ e => setEditMode({...editMode, text: e.target.value})} 
                                    />
                                </Form.Group>
                                <div className="comment-submit">
                                    <Button
                                        variant="light" 
                                        type="submit" 
                                        style={{marginRight: "1em"}}
                                        onClick={() => handleUpdate(props.comment.commentId, editMode.text)}
                                        disabled = {validator.isEmpty(editMode.text, { ignore_whitespace:true })? true : false}
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
                        <Card.Body>{props.comment.text}</Card.Body>
                        
                        }
                        
                        <footer className="comment-footer">
                            <div className="comment-vote">
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
                            </div>
                            
                            <i>{`Posted ${new Date(props.comment.date.seconds * 1000).toLocaleDateString("en-US")}${isEdited(props.comment.lastEdited)}`}</i>
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