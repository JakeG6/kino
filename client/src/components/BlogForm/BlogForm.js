import React, { useState, useEffect } from 'react';

// import { UserContext } from '../../../providers/UserProvider';
import { UserContext } from "../../providers/UserProvider";
import { getUserData } from "../../firebase.js";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

import ReactQuill from 'react-quill'; // ES6
import postArticle from './BlogForm-fb.js';
import TagInput from './TagInput.js';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';

const BlogForm = () => {

    const [articleData, setArticleData] = useState( { title: "", text: "", tags: [] } );

    const editorStyle = {
        backgroundColor: "white",
        color: "#495057",
        borderBottom: "0px solid #ced4da !important",
        borderRadius: "0 0 .25rem .25rem"    
    }

    const submitArticle = (e, user) => {
        e.preventDefault();
        console.log(articleData);
        postArticle(articleData, user)

    }

    return (

        <UserContext.Consumer>
        {
            user => (
                <Container>
                    <Row>
                        <Col>
                        <h1>Write Your Article</h1>
                            <Form>
                                <Form.Group >
                                    <Form.Label>Article Title</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value={articleData.title} 
                                        onChange={e => setArticleData({...articleData, title: e.target.value})} 
                                        placeholder="What is the name of the article?" 
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Article Content</Form.Label>
                                    <ReactQuill style={editorStyle} value={articleData.text || ""} onChange={text => setArticleData({...articleData, text})} />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Tags</Form.Label>
                                    {/* tags entered here */}
                                    <TagInput articleData={articleData} setArticleData={setArticleData} />
                                </Form.Group>
                                <Button variant="success" size="lg" block type="submit" onClick={e => submitArticle(e, user)}>
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            )
        }
        </UserContext.Consumer>
    )
}

export default BlogForm;