import React,{useState} from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import {auth} from '../firebaseConfig';
import {updateProfile, sendEmailVerification, updatePassword, deleteUser} from 'firebase/auth';



function Dashboard(){

    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [confirm,setConfirm]=useState("");

    const change= ()=>{
        updateProfile(auth.currentUser, {
            displayName: name}).then(() => {
            alert("Info Updated");
            window.location.href="/";
          }).catch(alert);
    }

    const verify=()=>{
        sendEmailVerification(auth.currentUser).then(()=>{
            alert("Email Verification Sent!!");
            window.location.href="/";
        })
    }

    const pass=()=>{
        if(password===confirm){
            updatePassword(auth.currentUser,password).then(()=>{
                alert("Password Updated");
                window.location.href="/";
            })
        }else{
            alert("Password does not match");
        }
    }

    const del=()=>{
        deleteUser(auth.currentUser).then(()=>{
            alert("User Deleted");
            window.location.href="/";
        })
    }

    


    return(
        <div className="App dashboard">
            <h1>User Dashboard</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Enter Name" />
                    <Form.Label>Address</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Address" />
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control type="text" placeholder="Enter Pincode" />
                </Form.Group>
                <Button variant="success" onClick={change} >Submit</Button>
            </Form>
            <hr />
            <h3>Verify Your Email</h3> <br />
            <Button variant="success" onClick={verify}>Verify</Button>
            <hr />
            <h3>Reset Your Password</h3> <br />
            <Form>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control  type="password" placeholder="Current Password" />
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" onChange={(e)=>{setPassword(e.target.value)}}  placeholder="New Password" />
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control type="password" onChange={(e)=>{setConfirm(e.target.value)}}  placeholder="Confirm New Password" />
                </Form.Group>
                <Button variant="success" onClick={pass} >Change Password</Button>
            </Form>
            <hr />
            <h3>Delect Account</h3> <br />
            <Alert variant="danger">This will delete your account</Alert> <br />
            <Button variant="success" onClick={del}>Delete Account</Button>
        </div>
    );
}

export default Dashboard;