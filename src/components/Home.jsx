import React,{useState,useEffect} from "react";
import axios from "axios";
import { Button, Card} from 'react-bootstrap';
import {Link} from "react-router-dom";

function Home() {

    const [data,setData] = useState([]);
  
    useEffect(() =>{
      const getData= async() =>{
        try{
          const res = await axios.get("https://fakestoreapi.com/products/");
          setData(res.data);
          console.log(data);
      } catch(e){
          console.log(e)
      }
    }
    getData();
    },[]);
  
  
    return (
      <div className="App">
        
      
        {
          data.map((d,index)=>{
            return(
              <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={d.image} />
              <Card.Body>
                <Card.Title>{d.title}</Card.Title>
                <Card.Text>
                  Price: {d.price} $
                </Card.Text>
                <Link to={"/item/"+d.id}><Button variant="success">View Item</Button></Link>
              </Card.Body>
            </Card>
            )
          })
    
        }
        
      
     
      
      </div>
    );
  }

export default Home;