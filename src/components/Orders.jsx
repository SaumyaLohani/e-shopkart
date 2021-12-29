import React,{useState, useEffect} from 'react';
import {supabase} from "../supabase"

function Orders(){

    const user= supabase.auth.user();
    const [data,setData]=useState([]);
    

    useEffect(() =>{
        const getData= async() =>{
        try{
            let { data: orders, error } = await supabase.from('orders').select('*').eq('user',user.id);
            setData(orders)
            console.log(data);
        } catch(e){
            console.log(e)
        }
    }

    getData();
    },[]);

    return (
        <div className="App">
            <h1>My Orders</h1>
            <hr />
            {
                data.map((d,index)=>{
                    return(
                    <div>
                        <h3>Order {index+1}</h3>
                        {d.items.map((da,index)=>{
                            console.log(da);
                            return(
                                <div>
                                    <p>Item no.: {index+1}</p>
                                    <p>Item name: {da.product}</p>
                                    <p>Item Quantity: {da.quantity}</p>
                                </div>
                            );
                        })}
                    </div>
                    );
                })
            }
        </div>
    );
}

export default Orders;