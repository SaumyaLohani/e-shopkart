import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {Form, Button} from 'react-bootstrap';
import {auth} from '../firebaseConfig';
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth';

function SignIn(){

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const signup = ()=>{
        if(password=== confirm){
            createUserWithEmailAndPassword(auth, email , password)
            .then((userCredential)=>{
                sendEmailVerification(auth.currentUser).then(()=>{
                    alert("Email Verification Sent");
                })
            alert("Account Created");
            window.location.href="/";
        })
        .catch(alert);
        }
        else{
            alert("Password do not match!!!");
        }
    }


    return(
        <div className="signin">
            <FontAwesomeIcon icon={faUserCircle} size="5x" />
            <h4>Sign In</h4>
            <Form className="form">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control onChange={(e)=>{setConfirm(e.target.value)}} type="password" placeholder="Confirm Password" />
                </Form.Group>
                <Button onClick={signup} variant="success" className="button" >
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default SignIn;