import React,{useEffect,useState} from 'react';
import {supabase} from '../supabase';
import {Button} from "react-bootstrap";

function Cart(props){

    const [data,setData]=useState([]);
    const [name, setName]= useState("");

    useEffect(() =>{
        const getData= async() =>{
          try{
            let { data: cart, error } = await supabase.from('cart').select("*").eq('user',props.uid[0].id);
            let {data: e, er} = await supabase.from('cart').select("*").eq('user',props.uid[0].id);
            console.log(e);
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
                { items:data, user:props.uid[0].id},
            ])
        const { da, er } = await supabase
            .from('cart')
            .delete()
            .eq('user', props.uid[0].id);
        alert("Order Placed!!");
      }

    return(
        <div className="App">
            <h1>Cart </h1>
            {
                data.map((d,index)=>{
                    return(
                        <div>
                            {d.product}:{d.quantity}
                        </div>
                    );
                })
            }
            <Button onClick={order}>Place Order</Button>
        </div>
    );
}

export default Cart;