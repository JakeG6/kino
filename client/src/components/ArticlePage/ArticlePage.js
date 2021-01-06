import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


import getArticle from "./ArticlePage-FB.js"
import apiKey from "../apiKey";
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.js'

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

const ArticlePage = ({ match }) => {

    const [article, setArticle] = useState(null);

    const articleTitle = match.params.title.split("-").join(" ");

    const attributionStyle = {
        color: "lightgrey",
        fontSize: "14px"
    }

    useEffect(() => {

        //retrieve article data from firestore
        const fetchArticle = async () => {
            console.log('we are going to getArticle');

            let artToBe = await getArticle(articleTitle);

            console.log(artToBe);

            setArticle(artToBe);

        }

        fetchArticle();

    }, [articleTitle])

    if(article) {

        return (
            <Container>
                <Row>
                    <Col>
                        <h1>{article.title}</h1>
                        <p style={attributionStyle}><i>By <Link to={`/user/${article.username}`}>{article.username}</Link>, published {new Date(article.date.seconds * 1000).toLocaleDateString("en-US")}</i></p>
                        {/* reacthtmlparser sets article markup */}
                        <div>{ReactHtmlParser(article.text)}</div>
                        <h2>Comments</h2>
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