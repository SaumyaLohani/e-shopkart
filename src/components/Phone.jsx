import React,{useState} from 'react';
import {supabase, auth, analytics} from '../supabase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import {Form,Button,Modal} from 'react-bootstrap';
import {signInWithPhoneNumber, RecaptchaVerifier} from 'firebase/auth';
import {logEvent} from "firebase/analytics";
 
function Phone(){
    const [p,setPhone]=useState("");
    const [s,setState]= useState(false);
    const [otp,setOtp]=useState("");
    const [message,setMessage] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        window.confirmationResult.confirm(otp).then((result)=>{
            window.location.href="/";
        })
    }
    const handleShow = () => setShow(true);

    const login=async()=>{
        if(/^\d+$/.test(p)){
            let { data: user, error } = await supabase
            .from('user')
            .select('id').eq('phone',p)
        
            if(user.length>0){
                window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                    'size':'invisible'
                }, auth);
                signInWithPhoneNumber(auth, "+91"+p, window.recaptchaVerifier).then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;
                }).catch(alert);
                setState(true)
            }
            else{
                setMessage("User not found");
                handleShow();
            }
        }else{
            setMessage("Invalid Phone Number");
            handleShow();
        }
    }

    const verify=async()=>{
        window.confirmationResult.confirm(otp).then((result)=>{
            logEvent(analytics,"phone_login",{
                value:p
            });
            setMessage("User signed in");
            handleShow();
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
                        {p}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>OTP</Form.Label>
                    <Form.Control type="text" onChange={(e)=>setOtp(e.target.value)} placeholder="Enter OTP" />
                </Form.Group>
                <Button variant="outline-primary" onClick={verify}>Submit </Button>
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
                    <Button variant="outline-primary" onClick={login}>Submit </Button>
                </Form>
            </div>}

        <Modal show={show} onHide={handleClose}>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    );
}

export default Phone;