import React,{useState,useEffect} from "react";
import axios from "axios";
import {Card} from 'react-bootstrap';
import ParticlesBg from 'particles-bg';

function Home() {

    const [data,setData] = useState([]);
  
    useEffect(() =>{
      const getData= async() =>{
        try{
          const res = await axios.get("https://fakestoreapi.com/products/");
          setData(res.data);
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
              <Card onClick={()=> window.location.href="/item/"+d.id}  >
                <Card.Img src={d.image} />
                <Card.Body>
                  <Card.Title>{d.title}</Card.Title>
                  <Card.Text>
                  Price: {d.price} $
                  </Card.Text>
                </Card.Body>
            </Card>
            )
          })
    
        }
      </div>
    );
  }

export default Home;