import React, {useState, useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
import { UserContext } from '../../providers/UserProvider';

const CommentTabs = () => {

    return (
        <Row>
            <Col>
                <Row>
                    <Col>
                        <h2 className="movie-page-header">Discussion</h2>
                    </Col>
                </Row>
                    <Col>
                        <Tabs defaultActiveKey="review" id="uncontrolled-tab-example">
                            <Tab eventKey="review" title="Reviews">
                                <p>home.</p>
                            </Tab>
                            <Tab eventKey="discussion" title="Discussion">
                            {/* <UserContext.Consumer>
                                {
                                    user => (
                                        user ?
                                            <p>posts go here</p>
                                        :
                                            <Card>
                                                <Card.Text>
                                                    Log in or sign up to leave a comment
                                                </Card.Text>
                                            </Card>
                                    )
                                    
                                        
                                }
                            </UserContext.Consumer> */}
                                
                            </Tab>
                        </Tabs>
                    </Col>
                
            </Col>
        </Row>
    )
}

export default CommentTabs;