import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

import ReactQuill from 'react-quill'; // ES6

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Row from 'react-bootstrap/Row';

import Tooltip from 'react-bootstrap/Tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { UserContext } from '../../providers/UserProvider';
import { LoginModalContext } from '../../providers/LoginModalProvider';
import { setTextRange } from 'typescript';
import { text } from '@fortawesome/fontawesome-svg-core';

// import { toggleUpvote, toggleDownvote, updateUserPoints, deleteComment } from '../../firebase';

const BlogForm = () => {

    const [articleData, setArticleData] = useState( {title: "", text: "", tags: []} );

    const editorStyle = {
        backgroundColor: "white",
        color: "#495057",
        // borderBottom: "1px solid #ced4da",
        borderRadius: ".25rem"    
    }

    // const handleText = () => { setArticleData({...articleData, text: text}) }


    return (
        <Container>
            <Row>
                <Col>
                    <Form>
                        <Form.Group >
                            <Form.Label>Article Title</Form.Label>
                            <Form.Control type="text" placeholder="What is the name of the article?" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Article Content</Form.Label>
                            
                            <ReactQuill style={editorStyle} value={articleData.text || ""} onChange={text => setArticleData({...articleData, text})} />
                            
                            {/* <Form.Control type="text" /> */}
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Tags</Form.Label>
                            <Form.Control type="text" placeholder="Help others find your article" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Post
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default BlogForm;