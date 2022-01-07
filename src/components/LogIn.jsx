import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faPhone } from '@fortawesome/free-solid-svg-icons';
import {faGoogle} from '@fortawesome/free-brands-svg-icons'
import {Button, Alert, Container, Row, Col} from 'react-bootstrap';
import {supabase, analytics} from '../supabase';
import {logEvent} from "firebase/analytics";

function LogIn(){

    const [err,setError]=useState("");

    const login= async ()=>{
        const { user, session, error } = await supabase.auth.signIn({
            provider: 'google',
          });
          if(error){
              setError(error);
          }else{
            logEvent(analytics,"gmail_login",{
                value:user.email
            });
          }
    }

    return(
        <>
        <Alert>Complete your user profile after logging in by going to dashboard</Alert>
        <Container fluid className="login">
            <Row>
                <Col>
                <FontAwesomeIcon icon={faUserCircle} size="5x" />
                <h4>Log In</h4><br/>
                </Col>
            </Row>
            <Row>
            <Col></Col>
            </Row>
            <Row>
                <Col>
                <Button variant="primary" onClick={login}><FontAwesomeIcon icon={faGoogle} />   Log in with Google</Button><br /><br/>
            <Button variant="outline-secondary" href="/login/phone"><FontAwesomeIcon icon={faPhone} />   Log in using Phone</Button>
                </Col>
            
            </Row>
            
            {err && <Alert variant="danger">{err}</Alert>} 
        </Container>
        </>
    );
}

export default LogIn;