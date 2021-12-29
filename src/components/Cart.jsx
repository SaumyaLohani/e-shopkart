import React,{useEffect,useState} from 'react';
import {supabase} from '../supabase';
import {Button} from "react-bootstrap";

function Cart(){

    const user=supabase.auth.user();
    const [data,setData]=useState([]);

    useEffect(() =>{
        const getData= async() =>{
          try{
        let { data: cart, error } = await supabase
          .from('cart')
          .select("*").eq('user',user.id);
          setData(cart);
        } catch(e){
            console.log(e)
        }
      }
      getData();
      },);

      const order= async()=>{
        const { d, error } = await supabase
            .from('orders')
            .insert([
                { items:data, user:user.id },
            ])
        const { da, er } = await supabase
            .from('cart')
            .delete()
            .eq('user', user.id);
        alert("Order Placed!!");
      }

    return(
        <div className="App">
            <h1>{user.email}'s Cart </h1>
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