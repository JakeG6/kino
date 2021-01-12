import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import getArticles from "../UserPage/ArticleList-FB.js";

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.js';

import "./DashboardArticles.css";

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';

const DashboardArticles = props => {

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

    if (articles) {
        return (
            <Container>
                
                <Row>
                    <Col>
                        <Button variant="light" size="lg" block onClick ={() => history.push(`/articleform`)}>Create New Article</Button>
                        <div style={{marginTop: "1em"}}></div>
                        {
                        
                        articles.length > 0 ?     
                            <ListGroup variant="flush">
                                {            
                                articles.map(article => 
                                    <ListGroup.Item><Link to={`/article/${article.urlString}`}>{article.title}</Link ></ListGroup.Item>
                                    )
                                }
                            </ListGroup> 
                            
                            :
                            <p>You haven't published any articles.</p>
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

export default DashboardArticles;