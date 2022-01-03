import React,{useState,useEffect} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import {Row,Col,Button} from "react-bootstrap";
import {supabase} from "../supabase";

function ItemView(props){

    const [data,setData]=useState([]);
    const [quant,setQuant]=useState(0);
    let {id} =useParams();

    useEffect(()=> { 
        const getData= async() =>{
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
        if(quant>0){
            setQuant(quant-1);
        }
    }

    function plus(){
        setQuant(quant+1);
    }

    async function addItem(){
        const { d, error } = await supabase
        .from('cart')
        .insert([
            { user: props.uid[0].id, product: data.title, quantity: quant},
        ]);
        console.log(props.uid[0].id);
        alert("Item added")
    }

    
    return(
        <>
        {props.uid[0].id && 
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
                    <Button variant="success" onClick={addItem} >Add to Cart</Button>
                </Col>
            </Row>
        </div>
        }
        </>
        
    );
}

export default ItemView;