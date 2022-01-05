import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import './App.css';
import {Routes,Route,Link} from 'react-router-dom';
import Home from './components/Home.jsx';
import ItemView from './components/ItemView.jsx';
import Category from './components/Category.jsx';
import LogIn from './components/LogIn.jsx';
import Dashboard from './components/Dashboard.jsx';
import Cart from './components/Cart.jsx';
import Orders from './components/Orders.jsx';
import Phone from './components/Phone.jsx';
import { useState, useEffect } from 'react';
import {Navbar,Nav,Container, Offcanvas, NavDropdown} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import {supabase,auth} from './supabase';
import {onAuthStateChanged, signOut} from 'firebase/auth'

function App() {

  const [categories,setCategories] = useState([]);
  const [supa,setSupa]=useState(true);
  const [id, setId]=useState("");
  const [phone, setPhone]=useState("");


  const out=async()=>{
    if(supa){
      const { error } = await supabase.auth.signOut();
    }else{
      signOut(auth).then(() => {
      }).catch((error) => {
        alert(error)
      });
    }
    window.location.href="/";
  }
  

  useEffect(() =>{
    const getData= async() =>{
      try{
        const res= await axios.get("https://fakestoreapi.com/products/categories");
        setCategories(res.data);
        if(supabase.auth.user()){
          let { data: u, error } = await supabase
            .from('user')
            .select('id').eq("email",supabase.auth.user().email);
          setId(u[0].id);
        }else{
          setSupa(false);
          onAuthStateChanged(auth, (u) => {
            if(u){
              setPhone(u.phoneNumber.replace("+91",""));
            }
          });
            let { data: u, error } = await supabase
              .from('user')
              .select('id').eq("phone",phone);
            setId(u[0].id);
          
        }
  }
        
     catch(e){
    }
  }
  getData();
  },[phone]);

  const sign=<FontAwesomeIcon icon={faUserCircle} size="lg" />;
  console.log(id);

  if(id || supabase.auth.user()){
    return (
      <div>
        <Navbar sticky="top" bg="light" >
          <Container fluid>
          <Nav>
          <Navbar.Brand href="/"><FontAwesomeIcon icon={faShoppingCart} />    E-ShopKart    </Navbar.Brand>
          </Nav>
          <Nav>
                <Nav.Link href={"/dashboard"}>Dashboard</Nav.Link>
                <NavDropdown className="sign" title={sign} id="basic-nav-dropdown" drop="start" >
                  <NavDropdown.Item href={"/cart/"}>Cart</NavDropdown.Item>
                  <NavDropdown.Item href={"/orders"}>My Orders</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={out}>Sign Out</NavDropdown.Item>
                </NavDropdown>
          </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/item/:id" element={<ItemView uid={id} />} />
          <Route exact path="/login" element={<LogIn />} />
          <Route path="/cart" element={<Cart uid={id} />} />
          <Route path="/dashboard" element={<Dashboard supa={supa} uid={id} />} />
          <Route path="/orders" element={<Orders uid={id} />} />
        </Routes>
      </div>
    );
  } else{
    return (
      <div>
        <Navbar fixed="top" bg="light">
          <Container fluid>
          <Nav>
          <Navbar.Brand href="/"><FontAwesomeIcon icon={faShoppingCart} />    E-ShopKart    </Navbar.Brand>
          </Nav>
          <Nav>
                <Nav.Link href="/login">Log In</Nav.Link>
          </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/item/:id" element={<ItemView />} />
          <Route exact path="/login" element={<LogIn />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route exact path="/login/phone" element={<Phone />} />
          <Route path="/orders" element={<Orders uid={id} />} />
        </Routes>
      </div>
    );
  }

  
}

export default App;
