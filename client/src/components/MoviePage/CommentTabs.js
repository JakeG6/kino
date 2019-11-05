import React from 'react';

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

const CommentTabs = () => {

    return (
        <Tabs defaultActiveKey="review" id="uncontrolled-tab-example">
            <Tab eventKey="review" title="Reviews">
                <p>home.</p>
            </Tab>
            <Tab eventKey="discussion" title="Discussion">
                <p>I was born by a river.</p>
            </Tab>
        </Tabs>
    )
    
}

export default CommentTabs;