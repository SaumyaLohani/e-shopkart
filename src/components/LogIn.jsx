import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {Form, Button} from 'react-bootstrap';

function LogIn(){
    return(
        <div className="login">
            <FontAwesomeIcon icon={faUserCircle} size="5x" />
            <h4>Log In</h4>
            <Form className="form">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit" className="button" >
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default LogIn;