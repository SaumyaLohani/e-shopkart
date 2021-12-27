import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {Form, Button} from 'react-bootstrap';
import {auth} from '../firebaseConfig';
import {signInWithEmailAndPassword} from 'firebase/auth';

function LogIn(){

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const login=()=>{
        signInWithEmailAndPassword(auth,email, password)
        .then((userCredential) => {
          window.location.href="/";
        }).catch(alert); 
    }

    return(
        <div className="login">
            <FontAwesomeIcon icon={faUserCircle} size="5x" />
            <h4>Log In</h4>
            <Form className="form">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" />
                </Form.Group>
                <Button onClick={login} variant="success" className="button" >
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default LogIn;