import React,{useEffect,useState} from 'react';
import {supabase} from '../supabase';
import {Button, Card, Modal,Col,Row, Alert} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import Loader from "react-loader-spinner";

function Cart(props){

    const [data,setData]=useState([]);
    const [name, setName]= useState("");const [message,setMessage] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        if(message==="Order item deleted"){
            window.location.reload();
        }
    }
    const handleShow = () => setShow(true);

    useEffect(() =>{
        const getData= async() =>{
          try{
            let { data: cart, error } = await supabase.from('cart').select("*").eq('user',props.uid);
            setData(cart);
        } catch(e){
            console.log(e)
        }
      }
      getData();
      },[props]);

      const order= async()=>{
        const { d, error } = await supabase
            .from('orders')
            .insert([
                { items:data, user:props.uid},
            ])
        const { da, er } = await supabase
            .from('cart')
            .delete()
            .eq('user', props.uid);
        setMessage("Order Placed");
        handleShow();
      }

      const del= async(val)=>{
        const { data, error } = await supabase
            .from('cart')
            .delete()
            .eq('product', val);
        setMessage("Order item deleted");
        handleShow();
      }
    if(data){
        if(data.length>0){
            return(
                <div className="cart">
                    <h1> Cart </h1>
                    {
                        data.map((d,index)=>{
                            return(
                                <div>
                                    <Card>
                                        <Row>
                                            <Col className="a">
                                                <Card.Title>{index+1}. &ensp;{d.product}</Card.Title>
                                                <Card.Text>&ensp; &ensp; &ensp;Quantity:{d.quantity}&emsp;</Card.Text>
                                            </Col>
                                            <Col className="c">
                                                <Button variant="outline-danger"  onClick={()=>del(d.product)}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </Col>
                                        </Row>
                                    </Card>
                                </div>
                            );
                        })
                    }
                    <Button variant="outline-primary" onClick={order}><FontAwesomeIcon icon={faCheckCircle}  />&ensp;Place Order</Button>
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
                <div className="cart">
                    <h1>Cart</h1><br/> <br/>
                    <Alert variant="warning">!!! CART IS EMPTY!!!</Alert>
                </div>
            );
        }

    
    }else{
        return(
        <div className="cart">
        <Loader
        type="Bars"
        color="#35589A"
        height={100}
        width={100}
      />
        
        </div>);
    }
}

export default Cart;