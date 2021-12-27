import React,{useState, useEffect} from 'react';
import axios from "axios";
import {auth} from '../firebaseConfig';
import {Row,Col} from 'react-bootstrap';

function Cart(){

    const [data,setData]=useState([]);
    let products=[];
    let uid;
    auth.onAuthStateChanged( user => {
        if (user) {
           uid = user.uid;
        } else {
            console.log("error");
        }
      });

    useEffect(() =>{
        const getData= async() =>{
          try{
            const res = await axios.get("https://fakestoreapi.com/carts/user/"+uid);
            setData(res.data);
            data.map(async(d,index)=>{
                const resp=await axios.get("https://fakestoreapi.com/products/"+d.productId);
                products.push([...resp.data,d.quantity]);
                console.log(products);
            })
        } catch(e){
            console.log(e)
        }
      }
      getData();
      },[]);

    return(
        <div>
            <h1>Cart Itemss</h1>
            {
                products.map((d,index) => {
                    return(
                        <Row onClick={()=> window.location.href="/item/"+d.id} style={{ backgroundColor: 'white', padding: '10px', border: '1px solid'}}>
                            <Col>
                                <img src={d.image} alt="" />
                            </Col> 
                            <Col>
                                <h3>{d.title}</h3>
                                <p>
                                Price: {d.price} $
                                </p>
                                <p>Quantity: {d.quantity}</p>
                            </Col>
                        </Row>
                    )
                })
            }
        </div>
    );
}

export default Cart;