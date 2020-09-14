import React, {useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import validator from 'validator';

import Card from 'react-bootstrap/Card';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import Tooltip from 'react-bootstrap/Tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrayingHands } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';

import { UserContext } from '../../../providers/UserProvider';
import { LoginModalContext } from '../../../providers/LoginModalProvider';

import { toggleUpvote, toggleDownvote } from '../../../firebase';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner.js'

const Comment = props => {

      //get user information if logged in
    const user = useContext(UserContext);

    //context for moodal
    const {loginShow, setLoginShow} = useContext(LoginModalContext)

    const handleModalShow = () => {
        setLoginShow(true);
      }

    //set visual for upvote/downvote based on if a user is logged in, and then how user has previously voted on this comment
    const [vote, setVote] = useState(user ? props.comment.upvoters.includes(user.uid) ? "upvoted" : props.comment.downvoters.includes(user.uid) ? "downvoted" : "" : "");
    const [pointCount, setPointCount] = useState(props.comment.points)

    const handleUpvote = (id, user)=> {

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
        toggleUpvote(id, user);
    }

    const handleDownvote = (id, user) => {
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
        toggleDownvote(id, user);
    }

    return (
        <UserContext.Consumer>
            {
                user => (
                    <Card className="comment-card" key={props.comment.commentId}>
                        <Card.Header>                     
                            <h5>{props.comment.username}</h5>
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
                            
                            <i>Posted {new Date(props.comment.date.seconds * 1000).toLocaleDateString("en-US")}</i>
                    
                        </footer>
                    </Card>
                )
            }
        </UserContext.Consumer>
    )
}

export default Comment