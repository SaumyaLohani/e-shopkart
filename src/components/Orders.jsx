import React,{useState, useEffect} from 'react';
import {supabase} from "../supabase";
import {Card, ListGroup, Modal} from "react-bootstrap";
import Loader from "react-loader-spinner";

function Orders(props){

    const [data,setData]=useState([]);
    

    useEffect(() =>{
        const getData= async() =>{
        console.log(props);
        try{
            let { data: orders, error } = await supabase.from('orders').select('items').eq('user',props.uid);
            setData(orders)
            console.log(data);
        } catch(e){
            console.log(e)
        }
    }

    getData();
    },[props]);

    if(data){
        return (
            <div className="order">
                <h1>My Orders</h1>
                <hr />
                {
                    data.map((d,index)=>{
                        return(
                        <Card>
                            <Card.Title style={{fontSize:'25px'}}>Order {index+1}</Card.Title>
                            <ListGroup>
                            {d.items.map((da,index)=>{
                                console.log(da);
                                return(
                                        <ListGroup.Item>{da.product}:<b>{da.quantity}</b></ListGroup.Item>
                                );
                            })}
                            </ListGroup>
                        </Card>
                        );
                    })
                }
            </div>
        );
    }else{
        return(<div className="order">
            <Loader
        type="Bars"
        color="#35589A"
        height={100}
        width={100}
      />
        </div>);
    }

    
}

export default Orders;