import React,{useState, useEffect} from 'react';
import {Form, Button, Alert, Modal} from 'react-bootstrap';
import {supabase,auth} from '../supabase';
import {signOut} from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash} from '@fortawesome/free-solid-svg-icons';


function Dashboard(props){

    const user= supabase.auth.user();

    const [n,setName] = useState("");
    const [add,setAdd] = useState("");
    const [phone,setPhone] = useState("");
    const [pin,setPin] = useState("");
    const [data,setData] = useState();
    const [message,setMessage] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        if(message==="User updated successfully" || message==="User Deleted Successfully"){
            window.location.href="/";
        }
    }
    const handleShow = () => setShow(true);

    const change= async()=>{
        if(/^\d+$/.test(phone) && /^\d+$/.test(pin)){
            const { data, error } = await supabase
            .from('user')
            .upsert([
                {name: n, address: add, phone:phone, pincode:pin, email:user.email  },
            ]);
            setMessage("User updated successfully");
            handleShow();
            
        }else{
            setMessage("Invalid Pin or Phone");
            handleShow();
        }
    }

    const del=async ()=>{
        const { data, error } = await supabase
            .from('user')
            .delete()
            .eq('email', user.email);
        setMessage("User Deleted Successfully");
        if(props.supa){
            const { error } = await supabase.auth.signOut();
          }else{
            signOut(auth).then(() => {
            }).catch((error) => {
              setMessage(error)
            });
          }
          handleShow();
    }

    useEffect(() =>{
        const getData= async() =>{
        console.log(props);
        try{
            let { data: u, error } = await supabase.from('user').select('*').eq('id',props.uid);
            console.log(u);
            console.log(error);
            setName(u[0].name);
            setPhone(u[0].phone);
            setAdd(u[0].address);
            setPin(u[0].pincode);
            setData(u);
        } catch(e){
            console.log(e)
        }
    }

    getData();
    },[props]);

    if(data){
        return(
            <div className="App dashboard">
                <h1>User Dashboard</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Enter Name" value={data[0].name}/>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control onChange={(e)=>{setPhone(e.target.value)}} type="text" placeholder="Enter Phone" value={data[0].phone} />
                        <Form.Label>Address</Form.Label>
                        <Form.Control onChange={(e)=>{setAdd(e.target.value)}} as="textarea" rows={3} placeholder="Address" value={data[0].address} />
                        <Form.Label>Pincode</Form.Label>
                        <Form.Control onChange={(e)=>{setPin(e.target.value)}} type="text" placeholder="Enter Pincode" value={data[0].pincode} />
                    </Form.Group>
                    <Button variant="outline-primary" onClick={change} >Submit</Button>
                </Form>
                <hr />
                <h3>Delect Account</h3> <br />
                <Alert variant="danger">This will delete your account</Alert> <br />
                <Button variant="outline=danger" onClick={del} ><FontAwesomeIcon icon={faTrash} />&ensp;Delete Account</Button>

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
    }else{
        return(
            <div className="App dashboard">
                <h1>User Dashboard</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Enter Name"/>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control onChange={(e)=>{setPhone(e.target.value)}} type="text" placeholder="Enter Phone" />
                        <Form.Label>Address</Form.Label>
                        <Form.Control onChange={(e)=>{setAdd(e.target.value)}} as="textarea" rows={3} placeholder="Address" />
                        <Form.Label>Pincode</Form.Label>
                        <Form.Control onChange={(e)=>{setPin(e.target.value)}} type="text" placeholder="Enter Pincode" />
                    </Form.Group>
                    <Button variant="outline-primary" onClick={change} >Submit</Button>
                </Form>
                <hr />
                <h3>Delect Account</h3> <br />
                <Alert variant="danger">This will delete your account</Alert> <br />
                <Button variant="outline-danger" onClick={del} ><FontAwesomeIcon icon={faTrash} />&ensp;Delete Account</Button>

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
}

export default Dashboard;