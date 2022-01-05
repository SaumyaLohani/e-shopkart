import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faPhone } from '@fortawesome/free-solid-svg-icons';
import {faGoogle} from '@fortawesome/free-brands-svg-icons'
import {Button, Alert} from 'react-bootstrap';
import {supabase} from '../supabase';

function LogIn(){

    const [err,setError]=useState("");

    const login= async ()=>{
        const { user, session, error } = await supabase.auth.signIn({
            provider: 'google',
          });
          if(error){
              setError(error);
          }
    }

    return(
        <div className="login">
            <FontAwesomeIcon icon={faUserCircle} size="5x" />
            <h4>Log In</h4><br/>
            <Alert>Complete your user profile after logging in by going to dashboard</Alert>
            <Button variant="primary" onClick={login}><FontAwesomeIcon icon={faGoogle} />   Log in with Google</Button><br /><br/>
            <Button variant="outline-secondary" href="/login/phone"><FontAwesomeIcon icon={faPhone} />   Log in using Phone</Button>
            {err && <Alert variant="danger">{err}</Alert>} 
        </div>
    );
}

export default LogIn;