import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, useHistory } from "react-router-dom";
import axios from 'axios';
import { UserContext } from '../../providers/UserProvider';

import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill'; // ES6
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import validator from 'validator';

import TagInput from '../ArticleForm/TagInput.js';
import CommentTab from "../MoviePage/DiscussionTabs/CommentTab.js";
import {getArticle, updateArticle, deleteArticle} from "./ArticlePage-fb.js"
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.js'

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';

import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ArticlePage = ({ match }) => {

    let history = useHistory();

    const articleTitle = match.params.urlString;

    const [article, setArticle] = useState(null);

    //hook for deletion modal
    const [delModalShow, setDelModal] = useState(false)
    
    let editModeDefault = {title: "", text: "", tags: [], show: false}
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
        editMode.show ? setEditMode({title: article.title, text: article.text, tags: article.tags, show: false}) : setEditMode({...editMode, show: true}) ;
    }


    //Update edited review
    const handleUpdate = async (e, id, editedText) => {
        e.preventDefault();

        await updateArticle(id, editedText);
        handleEditModeShow();

        let artToBe = await getArticle(articleTitle);

        console.log(editMode.title)

        editedText.title != article.title ? history.push(`/article/${editMode.title.toLowerCase().split(" ").join("-")}`)
        :
        setArticle(artToBe);

    }

    //Delete Comment
    const handleDelete = async (id) => {
        await deleteArticle(id);
        handleDelModalHide();
        history.push(`/user/${article.username}`);
    }

    const attributionStyle = {
        color: "lightgrey",
        fontSize: "14px"
    }

    const commentStyle = {
        backgroundColor: "black",
        paddingTop: "1em",
        marginBottom: "1em",
        borderRadius: ".25rem"
       
    }

    const articleTagStyle = {
        alignItems: "center",
        height: "32px",
        backgroundColor: "#6c757d",
        color: "white",
        padding: "5px 10px",
        marginRight: ".5em",
        borderRadius: ".25rem"
    }

    const tagDisplay = {
        display: "flex",
        flexDirection: "row"
    }

    useEffect(() => {

        //retrieve article data from firestore
        const fetchArticle = async () => {

            let artToBe = await getArticle(articleTitle);

            setArticle(artToBe);
            artToBe ?
            setEditMode({title: artToBe.title, text: artToBe.text, tags: artToBe.tags, show: false})
            :
            history.push(`/nomatch`)
        }

        fetchArticle();

    }, [articleTitle])

    const noWhitespace = { ignore_whitespace:true };


    const articleTags = tags => {
        return (
            tags.map(tag => (
                 <p style={articleTagStyle} key={tags.indexOf(tag)}>{tag}</p>
            ))
        )
    }

    if(article) {
        return (
            <UserContext.Consumer>
                {
                    user => (
                        <Container>
                            <Row>
                                <Col>
                                    <Row>
                                        <Col xs={10}>
                                            <h1>{article.title}</h1>
                                        </Col>
                                        
                                        <Col xs={2}>
                                        {
                                            user ?
                                            user.uid == article.authorId ?
                                            <div style={{marginTop: "10px"}}>
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
                                        </Col>
                                        
                                    </Row>
                                        {
                                        editMode.show ? 
                                            <Form>
                                                <Form.Group >
                                                    <Form.Label>Article Title</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        value={editMode.title} 
                                                        onChange={e => setEditMode({...editMode, title: e.target.value})} 
                                                        placeholder="What is the name of the article?" 
                                                    />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Article Content</Form.Label>                                    
                                                        <ReactQuill className="ql-style" value={editMode.text || ""} onChange={text => setEditMode({...editMode, text})} />                                
                                                </Form.Group>
                                                <Form.Group >
                                                    <Form.Label>Tags</Form.Label>
                                                    {/* tags entered here */}
                                                    <TagInput articleData={editMode} setArticleData={setEditMode} />
                                                </Form.Group>
                                                <div style={{textAlign: "right"}}>
                                                    <Button 
                                                        disabled={validator.isEmpty(editMode.title, noWhitespace) || validator.isEmpty(editMode.text, noWhitespace)  ? true : false} 
                                                            variant="light"
                                                            style={{marginRight: "1em"}}
                                                            type="submit" 
                                                            onClick={e => handleUpdate(e, article.articleId, editMode)}
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
                                            :
                                            <div>
                                                <p style={attributionStyle}><i>By <Link to={`/user/${article.username}`}>{article.username}</Link>, published {new Date(article.date.seconds * 1000).toLocaleDateString("en-US")}</i></p>
                                                {/* reacthtmlparser sets article markup */}
                                                <div>{ReactHtmlParser(article.text)}</div>
                                                <div style={tagDisplay}>
                                                    {articleTags(article.tags)}
                                                </div>
                                                <Link to={`/user/${article.username}`}><p className="return-link">{`<< See more from ${article.username}`}</p></Link>  
                                            </div>
                                        }
                                        <h2 className="movie-page-header">Comments</h2> 
                                        <div style={commentStyle}>
                                            <CommentTab type="article" id={article.articleId} />
                                        </div>                                                  
                                    </Col>
                                </Row>
                            {
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
                                    Are you sure you want to delete this article?
                                </Modal.Body>
                                <Modal.Footer >
                                <Button variant="danger" className="comment-delete-button" 
                                    onClick={() => handleDelete(article.articleId)}  
                                >
                                    Yes
                                </Button> 
                                <Button variant="light" className="btn-light" onClick={handleDelModalHide}>
                                    No
                                </Button>
                                </Modal.Footer>
                            </Modal>
                            }        
                        </Container>                         
                    ) 
                }
                
            </UserContext.Consumer>
        )
    } else {

        return (
            <div>
                <LoadingSpinner />
            </div>
        )    
    } 

}

export default ArticlePage;