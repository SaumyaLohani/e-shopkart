import React,{useState} from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import {supabase,auth} from '../supabase';
import {signOut} from "firebase/auth";



function Dashboard(props){

    const user= supabase.auth.user();

    const [n,setName] = useState("");
    const [add,setAdd] = useState("");
    const [phone,setPhone] = useState("");
    const [pin,setPin] = useState("");

    const change= async()=>{
        const { data, error } = await supabase
        .from('user')
        .upsert([
            {name: n, address: add, phone:phone, pincode:pin, email:user.email  },
        ]);
        alert("User updated successfully");
        window.location.reload();
    }

    const del=async ()=>{
        const { data, error } = await supabase
            .from('user')
            .delete()
            .eq('email', user.email);
        alert("User Deleted Successfully");
        if(props.supa){
            const { error } = await supabase.auth.signOut();
          }else{
            signOut(auth).then(() => {
            }).catch((error) => {
              alert(error)
            });
          }
          window.location.href="/";
    }

    


    return(
        <div className="App dashboard">
            <h1>User Dashboard</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Enter Name" />
                    <Form.Label>Phone</Form.Label>
                    <Form.Control onChange={(e)=>{setPhone(e.target.value)}} type="text" placeholder="Enter Phone" />
                    <Form.Label>Address</Form.Label>
                    <Form.Control onChange={(e)=>{setAdd(e.target.value)}} as="textarea" rows={3} placeholder="Address" />
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control onChange={(e)=>{setPin(e.target.value)}} type="text" placeholder="Enter Pincode" />
                </Form.Group>
                <Button variant="success" onClick={change} >Submit</Button>
            </Form>
            <hr />
            <h3>Delect Account</h3> <br />
            <Alert variant="danger">This will delete your account</Alert> <br />
            <Button variant="success" onClick={del} >Delete Account</Button>
        </div>
    );
}

export default Dashboard;