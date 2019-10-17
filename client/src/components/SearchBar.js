import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'

class SearchBar extends Component {

    render() {

        return (
            <div>
                <Form inline>
                    <Form.Control type="text" placeholder="Search for films" />
                </Form>
            </div>
        )

    }
    
}

export default SearchBar