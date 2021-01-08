import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import CommentTab from "../MoviePage/DiscussionTabs/CommentTab.js";
import getArticle from "./ArticlePage-FB.js"
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.js'

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

const ArticlePage = ({ match }) => {

    const [article, setArticle] = useState(null);

    const articleTitle = match.params.urlString;

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

        }

        fetchArticle();

    }, [articleTitle])

    const articleTags = tags => {
        return (
            tags.map(tag => (
                 <p style={articleTagStyle} key={tags.indexOf(tag)}>{tag}</p>
            ))
        )
    }

    if(article) {

        return (

            <Container>
                <Row>
                    <Col>
                        <h1>{article.title}</h1>
                        <p style={attributionStyle}><i>By <Link to={`/user/${article.username}`}>{article.username}</Link>, published {new Date(article.date.seconds * 1000).toLocaleDateString("en-US")}</i></p>
                        {/* reacthtmlparser sets article markup */}
                        <div>{ReactHtmlParser(article.text)}</div>
                        <div style={tagDisplay}>
                            {articleTags(article.tags)}
                        </div>
                        <Link to={`/user/${article.username}`}><p className="return-link">{`<< See more from ${article.username}`}</p></Link>  
                        <h2 className="movie-page-header">Comments</h2> 
                 
                        <div style={commentStyle}>
                            <CommentTab type="article" id={article.articleId} />
                        </div>
                    </Col>
                </Row>
                        
            </Container>
        
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