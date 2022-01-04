import React,{useState, useEffect} from 'react';
import {supabase} from "../supabase"

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
    }else{
        return(<></>);
    }

    
}

export default Orders;