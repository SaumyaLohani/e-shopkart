import React,{useState,useEffect} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {Button, Card} from 'react-bootstrap';

function Category(){

    const [data,setData]=useState([]);
    let {id} =useParams();

    useEffect(()=> { 
        const getData= async() =>{
            try{
                const res = await axios.get("https://fakestoreapi.com/products/category/"+id);
                setData(res.data);
                console.log(id);
            } catch(e){
                console.log(e)
            }
        }
        getData();
    },[id]);


    return(
        <div className="App">
      
        {
          data.map((d,index)=>{
            return(
              <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={d.image} />
              <Card.Body>
                <Card.Title>{d.title}</Card.Title>
                <Card.Text>
                  Price: {d.price}
                </Card.Text>
                <Button variant="success">View Item</Button>
              </Card.Body>
            </Card>
            )
          })
    
        }
        
      
     
      
      </div>
    );
}

export default Category;