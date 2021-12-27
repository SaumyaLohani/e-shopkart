import React,{useState,useEffect} from "react";
import axios from "axios";
import { Row, Col, Card} from 'react-bootstrap';
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
              <Row onClick={()=> window.location.href="/item/"+d.id} style={{ backgroundColor: 'white', padding: '10px', border: '1px solid'}}>
              <Col>
                <img src={d.image} alt="" />
              </Col> 
              <Col>
                <h3>{d.title}</h3>
                <p>
                  Price: {d.price} $
                </p>
              </Col>
            </Row>
            )
          })
    
        }
        
      
     
      
      </div>
    );
  }

export default Home;