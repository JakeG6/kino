import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import ReactHtmlParser from 'react-html-parser';
// import Cheerio from "cheerio";

import getArticles from "./ArticleList-FB.js"

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.js'

import "./ArticleList.css";

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


const ArticleList = props => {

    const [articles, setArticles] = useState([]);

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

    const createPreviewElement = str => {
        let arr = str.split("><").slice(0,1);
        arr.push(">")
        
        return arr.join("")
    }

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
                                {/* preview only the first X words of the article of the article */}
                                <div>{ReactHtmlParser(createPreviewElement(article.text))}</div>
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