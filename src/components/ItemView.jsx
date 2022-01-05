import React,{useState,useEffect} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import {Row,Col,Button, Modal} from "react-bootstrap";
import {supabase} from "../supabase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faCartPlus} from '@fortawesome/free-solid-svg-icons';

function ItemView(props){

    const [data,setData]=useState([]);
    const [quant,setQuant]=useState(1);
    let {id} =useParams();
    const [show, setShow] = useState(false);
    const [message,setMessage] = useState("")
    const handleClose = () => {
        setShow(false);
        if(props.uid===undefined){
            window.location.href="/login";
        }
    }

    const handleShow = () => setShow(true);

    useEffect(()=> { 
        const getData= async() =>{
            console.log(props)
            try{
                const res = await axios.get("https://fakestoreapi.com/products/"+id);
                setData(res.data);
            } catch(e){
                console.log(e)
            }
        }
        getData();
    },[]);

    function minus(){
        if(quant>1){
            setQuant(quant-1);
        }
    }

    function plus(){
        setQuant(quant+1);
    }

    async function addItem(){
        if(props.uid===undefined){
            setMessage("User not logged in!!");
            handleShow();
        }else{
            const { d, error } = await supabase
            .from('cart')
            .insert([
                { user: props.uid, product: data.title, quantity: quant},
            ]);
            console.log(props.uid);
            setMessage("Item added");
            handleShow();
        }
    }
    
    return(
        <>
        {props&& <div className="item">
            <Row>
                <Col>
                    <img src={data.image} alt="" />
                </Col>
                <Col>
                    <h1>{data.title}</h1><br />
                    <p>{data.description}</p>
                    <p>Price: {data.price} $</p>
                    <p>Quantity:&emsp; <FontAwesomeIcon icon={faMinus} onClick={()=>minus()} /> &nbsp; {quant} &nbsp; <FontAwesomeIcon icon={faPlus} onClick={()=>plus()} /></p><br/>
                    <Button variant="outline-primary" onClick={addItem} ><FontAwesomeIcon icon={faCartPlus} />&ensp;Add to Cart</Button>
                </Col>
            </Row>
        </div>}
        <Modal show={show} onHide={handleClose}>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </>
        
    );
}

export default ItemView;