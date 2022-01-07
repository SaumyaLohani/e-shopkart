import React,{useState,useEffect} from "react";
import axios from "axios";
import {Card,Row, Col, Form} from 'react-bootstrap';
import Loader from "react-loader-spinner";
import {logEvent} from "firebase/analytics";
import {analytics} from "../supabase";

function Home() {

    const [data,setData] = useState([]);
    const [radio,setRadio]= useState("all");
    const [load,setLoad]=useState(true);
    const [matches, setMatches] = useState(
      window.matchMedia("(max-width: 600px)").matches
    )
    logEvent(analytics,"homepage_visited", {
      index: 1
    });
  
    useEffect(() =>{
      window.matchMedia("(max-width: 600px)").addEventListener('change', e => setMatches( e.matches ));
      const getData= async() =>{
        setLoad(true);
        if(radio==="all"){
          const res = await axios.get("https://fakestoreapi.com/products/");
          setData(res.data);
        }else if(radio==="elec"){
          const res = await axios.get("https://fakestoreapi.com/products/category/electronics");
          setData(res.data);
        }else if(radio==="jwel"){
          const res = await axios.get("https://fakestoreapi.com/products/category/jewelery");
          setData(res.data);
        }else if(radio==="men"){
          const res = await axios.get("https://fakestoreapi.com/products/category/men's clothing");
          setData(res.data);
        }else{
          const res = await axios.get("https://fakestoreapi.com/products/category/women's clothing");
          setData(res.data);
        }
        setLoad(false);
    }
    getData();
    },[radio,matches]);

    if(matches){
      if(data){
        return (
          <div className="App">
            <Row className="r">
              
                <Form>
                  <Form.Check type="radio" label="All" name="group" onChange={()=>setRadio("all")} defaultChecked/>
                  <Form.Check type="radio" label="Electronics" name="group" onChange={()=>setRadio("elec")}/>
                  <Form.Check type="radio" label="Jwelery" name="group" onChange={()=>setRadio("jwel")}/>
                  <Form.Check type="radio" label="Men's Clothing" name="group" onChange={()=>setRadio("men")}/>
                  <Form.Check type="radio" label="Women's Clothing" name="group" onChange={()=>setRadio("women")}/>
                </Form>
                </Row>
                
              <Col className="">
              {
                load?<Loader
                type="Bars"
                color="#35589A"
                height={100}
                width={100}
              />:
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
              </Col>
            
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
    }}else{
      if(data){
        return (
          <div className="App">
            <Row className="r">
            <Col sm={1} className="rad">
                <Form>
                  <Form.Check type="radio" label="All" name="group" onChange={()=>setRadio("all")} defaultChecked/>
                  <Form.Check type="radio" label="Electronics" name="group" onChange={()=>setRadio("elec")}/>
                  <Form.Check type="radio" label="Jwelery" name="group" onChange={()=>setRadio("jwel")}/>
                  <Form.Check type="radio" label="Men's Clothing" name="group" onChange={()=>setRadio("men")}/>
                  <Form.Check type="radio" label="Women's Clothing" name="group" onChange={()=>setRadio("women")}/>
                </Form>
              </Col>
              <Col className="dat">
              {load?<Loader
                type="Bars"
                color="#35589A"
                height={100}
                width={100}
              />:
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
              </Col>

            </Row>
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
    
  }

export default Home;