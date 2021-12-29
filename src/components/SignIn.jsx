import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {Form, Button, Alert} from 'react-bootstrap';
import {auth} from '../supabase';
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth';

function SignIn(){

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [err,setError]=useState("");
    let format=/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    const signup = ()=>{
        if(format.test(password) && /\d/.test(password) && /[a-zA-Z]/g.test(password)){
            if(password=== confirm){
                createUserWithEmailAndPassword(auth, email , password)
                .then((userCredential)=>{
                    sendEmailVerification(auth.currentUser).then(()=>{
                        setError("Email Verification Sent");
                    })
                setError("Account Created");
                window.location.href="/";
            })
            .catch((error)=>{
                setError(error.toString());
            });
            }
            else{
                setError("Password do not match!!!");
            }
        }else{
            setError("Weak Password!!")
        }
        
    }


    return(
        <div className="signin">
            <FontAwesomeIcon icon={faUserCircle} size="5x" />
            <h4>Sign In</h4>
            {err && <Alert variant="danger">{err}</Alert>}
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