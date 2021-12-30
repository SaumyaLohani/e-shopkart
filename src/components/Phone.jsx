import React,{useState} from 'react';
import {supabase, auth} from '../supabase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import {Form,Button} from 'react-bootstrap';
import {signInWithPhoneNumber, RecaptchaVerifier} from 'firebase/auth';

 
function Phone(){
    const [p,setPhone]=useState("");
    const [s,setState]= useState(false);
    const [otp,setOtp]=useState("");

    const login=async()=>{

        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size':'invisible'
        }, auth);
        signInWithPhoneNumber(auth, "+91"+p, window.recaptchaVerifier).then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
          }).catch(alert);
          setState(true)
    }

    const verify=async()=>{
        window.confirmationResult.confirm(otp).then((result)=>{
            alert("User signed in");
            window.location.href="/";
        })
    }

    return(
        <div>
            {s?
            <div className="login">
            <FontAwesomeIcon icon={faUserCircle} size="5x" />
            <h4>Log In Using Phone</h4><br/>
            <Form>
                <div id="recaptcha-container" ></div>
                <Form.Group className="mb-3" >
                    <Form.Label>Phone Number: </Form.Label>
                    <Form.Text >
                        7500269270
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>OTP</Form.Label>
                    <Form.Control type="text" onChange={(e)=>setOtp(e.target.value)} placeholder="Enter OTP" />
                </Form.Group>
                <Button variant="success" onClick={verify}>Submit </Button>
            </Form>
        </div>
            :
            <div className="login">
                <FontAwesomeIcon icon={faUserCircle} size="5x" />
                <h4>Log In Using Phone</h4><br/>
                <Form>
                    <div id="recaptcha-container"></div>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control onChange={(e)=>{setPhone(e.target.value)}} type="text"  placeholder="Enter Phone Number" />
                    </Form.Group>
                    <Button variant="success" onClick={login}>Submit </Button>
                </Form>
            </div>}
        </div>
    );
}

export default Phone;