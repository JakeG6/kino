import React, { useState, useEffect } from 'react';

// import { UserContext } from '../../../providers/UserProvider';
import { UserContext } from "../../providers/UserProvider";
import { getUserData } from "../../firebase.js";

import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill'; // ES6
import postArticle from './ArticleForm-fb.js';
import TagInput from './TagInput.js';

import "./ArticleForm.css";

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';

const ArticleForm = () => {

    const [articleData, setArticleData] = useState( { title: "", text: "", tags: [] } );

    let history = useHistory();

    const submitArticle = async (e, user) => {

        e.preventDefault();
        await postArticle(articleData, user)

        history.push(`/article/${articleData.title.toLowerCase().split(" ").join("-")}`);

    }

    return (

        <UserContext.Consumer>
        {
            user => 
                user?
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
                                            <ReactQuill className="ql-style" value={articleData.text || ""} onChange={text => setArticleData({...articleData, text})} />                                
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
                :
                
                <Redirect to="/" />           
        }
        </UserContext.Consumer>
    )
}

export default ArticleForm;