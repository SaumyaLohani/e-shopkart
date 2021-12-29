import React,{useState} from 'react';
import {supabase} from '../supabase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import {Form,Button} from 'react-bootstrap';


 
function Phone(){
    const [p,setPhone]=useState("");
    const [s,setState]= useState(false);
    const [otp,setOtp]=useState("");

    const login=async()=>{
        let { user, error } = await supabase.auth.signIn({
            phone: p,
          });
        console.log(user);
        console.log(error);
        setState(true);
    }

    const verify=async()=>{
        let { session, error } = await supabase.auth.verifyOTP({
            phone: p,
            token: otp,
          })
    }

    return(
        <div>
            {s?
            <div className="login">
            <FontAwesomeIcon icon={faUserCircle} size="5x" />
            <h4>Log In Using Phone</h4><br/>
            <Form>
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