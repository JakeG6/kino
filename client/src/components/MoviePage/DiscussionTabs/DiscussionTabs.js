import React from 'react';

import "./DiscussionTabs.css"

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import CommentTab from "./CommentTab";
import ReviewTab from "./ReviewTab";


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
                        <div id="discussion" className="black">
                            <Tabs defaultActiveKey="review"  >
                                <Tab eventKey="review" title="Reviews" className="disTab black">
                                    <ReviewTab movieId={props.movieId} />
                                </Tab>
                                <Tab eventKey="comments" title="Comments" className="disTab black">
                                    <CommentTab id={props.movieId} type="movie" />
                                </Tab> 
                            </Tabs>
                        </div>
                    </Col>
            </Col>
        </Row>
    )  
}

export default DiscussionTabs;