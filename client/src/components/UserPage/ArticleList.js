import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import getArticles from "./ArticleList-FB.js"
import apiKey from "../apiKey";
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.js'

import "./ArticleList.css";

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

const ArticleList = props => {

    const [articles, setArticles] = useState([]);



    useEffect(() => {

        //retrieve article data from firestore
        const fetchArticles = async () => {

            let artsToBe = await getArticles(props.username);

            setArticles(artsToBe);

        }

        fetchArticles();

    }, [])

    if (articles) {
        return (
            <Container>
                <Row>
                    <Col>
                    {
                        articles.map(article => (
                            <div className="article-preview" key={articles.indexOf(article)}>
                                <p><i>12/27/2020</i></p>
                                <h2 >{article.title}</h2>
                                <div>{ReactHtmlParser(article.text)}</div>
                                <div className="read-more"><Link to={`/article/${article.title.split(" ").join("-")}`}>Read more</Link></div>
                            </div>
                        ))
                    }
                    </Col>
                </Row>
            </Container>
        )
    }
    else {

        return (
            <div>
                <LoadingSpinner />
            </div>
        )    
    } 



}

export default ArticleList;