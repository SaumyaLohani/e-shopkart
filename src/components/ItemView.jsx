import React,{useState,useEffect} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import {Row,Col,Button} from "react-bootstrap";
import {auth} from '../firebaseConfig'

function ItemView(){

    const [data,setData]=useState([]);
    const [quant,setQuant]=useState(0);
    let {id} =useParams();
    let uid;
    auth.onAuthStateChanged( user => {
        if (user) {
           uid = user.uid;
        } else {
            console.log("error");
        }
      });

    useEffect(()=> { 
        const getData= async() =>{
            try{
                const res = await axios.get("https://fakestoreapi.com/products/"+id);
                setData(res.data);
                console.log(id);
            } catch(e){
                console.log(e)
            }
        }
        getData();
    },[]);

    function minus(){
        if(quant>0){
            setQuant(quant-1);
        }
    }

    function plus(){
        setQuant(quant+1);
    }

    async function addItem(){
        await axios.put("https://fakestoreapi.com/carts",{
            userId:uid,
            products:[{productId:id,quantity:quant}]
        })
    }


    return(
        <div className="item">
            <Row>
                <Col>
                    <img src={data.image} alt="" />
                </Col>
                <Col>
                    <h1>{data.title}</h1><br />
                    <p>{data.description}</p>
                    <p>Price: {data.price} $</p>
                    <p>Quantity: <button className="b" onClick={()=>minus()}>-</button>  {quant}  <button className="b" onClick={()=>plus()}>+</button></p>
                    <Button variant="success" onClick={()=>addItem}>Add to Cart</Button>
                </Col>
            </Row>
        </div>
    );
}

export default ItemView;