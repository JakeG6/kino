import React, {useState, useEffect, useContext } from 'react';

import "./DiscussionTabs.css"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';

import { UserContext } from '../../../providers/UserProvider';
import CommentTab from "./CommentTab";
import ReviewTab from "./ReviewTab";
import { postMovieComment, getMovieComments } from '../../../firebase';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner.js'

const DiscussionTabs = props => {

    return (
        <Row>
            <Col>
                <Row>
                    <Col>
                        <h2 className="movie-page-header">Discussion</h2>
                    </Col>
                </Row>
                    <Col>
                        <div className="discussion black">
                            <Tabs defaultActiveKey="review" id="uncontrolled-tab-example"  >
                                <Tab eventKey="review" title="Reviews" className="disTab black">
                                    <ReviewTab movieId={props.movieId} />
                                </Tab>
                                <Tab eventKey="comments" title="Comments" className="disTab black">
                                    <CommentTab movieId={props.movieId} />
                                </Tab> 
                            </Tabs>
                        </div>
                    </Col>
            </Col>
        </Row>
    )

            
        
    
}

export default DiscussionTabs;