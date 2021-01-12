import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
// import Cheerio from "cheerio";

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

    //cheerio
    // const $ = cheerio.load() ;

    let history = useHistory();

    useEffect(() => {

        //retrieve article data from firestore
        const fetchArticles = async () => {

            let artsToBe = await getArticles(props.username);

            //sort articles in array from newest to oldest
            let sortedArticles = artsToBe.sort((a, b) => {
                let x = a.date.seconds, y = b.date.seconds
                
                if (x < y)
                return 1;

                if (x > y)
                    return -1;
                return 0;
            })

            setArticles(sortedArticles);

        }

        fetchArticles();

    }, [])

    if (articles) {
        return (
            <Container>
                <Row>
                    <Col>

                    {   
                        articles.length > 0 ?
                        
                        articles.map(article => (
                            <div className="article-preview" key={articles.indexOf(article)}>
                                <p><i>{new Date(article.date.seconds * 1000).toLocaleDateString("en-US")}</i></p>
                                <h2 onClick={() => history.push(`/article/${article.urlString}`)} >{article.title}</h2>
                                <div>{ReactHtmlParser(article.text)}</div>
                                <div className="read-more"><Link to={`/article/${article.urlString}`}>Read more</Link></div>
                            </div>
                        ))
                        
                        :
                        <div><p>This user hasn't published any articles.</p></div>
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