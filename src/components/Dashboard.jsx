import React,{useState, useEffect} from 'react';
import {Form, Button, Alert, Modal} from 'react-bootstrap';
import {supabase,auth} from '../supabase';
import {signOut} from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import Loader from "react-loader-spinner";


function Dashboard(props){

    const user= supabase.auth.user();
    const [load, setLoad]= useState(true)
    const [n,setName] = useState("");
    const [add,setAdd] = useState("");
    const [phone,setPhone] = useState("");
    const [pin,setPin] = useState("");
    const [data,setData] = useState();
    const [message,setMessage] = useState("");
    const [show, setShow] = useState(false);
    const [dis, setDis]=useState(true);
    const handleClose = () => {
        setShow(false);
        if(message==="User updated successfully" || message==="User Deleted Successfully"){
            window.location.href="/";
        }
    }
    const handleShow = () => setShow(true);

    const ins=async()=>{
        if(/^\d+$/.test(phone) && /^\d+$/.test(pin)){
            const { data, error } = await supabase
            .from('user')
            .insert([
                {name: n, address: add, phone:phone, pincode:pin, email:user.email  },
            ])
            console.log(error);
            setMessage("User Registered successfully");
            handleShow();
            
        }else{
            setMessage("Invalid Pin or Phone");
            handleShow();
        }
    }

    const change= async()=>{
        if(/^\d+$/.test(phone) && /^\d+$/.test(pin)){
            const { data, error } = await supabase
            .from('user')
            .update([
                {name: n, address: add, phone:phone, pincode:pin, email:user.email  },
            ]).eq('id',props.uid);
            console.log(error);
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
            .eq('id', props.uid);
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
        setLoad(false);
        console.log(props);
        try{
            if(props.uid!==""){
                console.log(props.uid)
                setLoad(true)
                let { data: u, error } = await supabase.from('user').select('*').eq('id',props.uid);
                setName(u[0].name);
                setPhone(u[0].phone);
                setAdd(u[0].address);
                setPin(u[0].pincode);
                setData(u);
                setLoad(false)
            }
        } catch(e){
            console.log(e)
        }
    }
    getData();
    },[props]);

    if(load){
        return(
            <div className="App dashboard">
                <Loader
              type="Bars"
              color="#35589A"
              height={100}
              width={100}
            />
            </div>
        );
    }else{
        if(data){
            return(
                <div className="App dashboard">
                    <h1>User Dashboard</h1>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Name</Form.Label>
                            <Form.Control disabled={dis} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Enter Name" value={n}/>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control disabled={dis} onChange={(e)=>{setPhone(e.target.value)}} type="text" placeholder="Enter Phone" value={add} />
                            <Form.Label>Address</Form.Label>
                            <Form.Control disabled={dis} onChange={(e)=>{setAdd(e.target.value)}} as="textarea" rows={3} placeholder="Address" value={phone} />
                            <Form.Label>Pincode</Form.Label>
                            <Form.Control disabled={dis} onChange={(e)=>{setPin(e.target.value)}} type="text" placeholder="Enter Pincode" value={pin} />
                        </Form.Group>
                        <Button variant="outline-primary" onClick={change} >Submit</Button>&ensp;&ensp;
                        <Button variant="outline-info" onClick={()=>setDis(false)} >Edit</Button>
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
                        <Button variant="outline-primary" onClick={ins} >Submit</Button>
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

    
}

export default Dashboard;