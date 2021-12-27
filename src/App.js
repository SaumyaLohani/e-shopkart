import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import './App.css';
import {Routes,Route,Link} from 'react-router-dom';
import Home from './components/Home.jsx';
import ItemView from './components/ItemView.jsx';
import Category from './components/Category.jsx';
import SignIn from './components/SignIn.jsx';
import LogIn from './components/LogIn.jsx';
import Dashboard from './components/Dashboard.jsx';
import { useState, useEffect } from 'react';
import {Navbar,Nav,Container, Offcanvas, NavDropdown} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import {auth} from './firebaseConfig';
import {signOut} from 'firebase/auth';

function App() {

  const [categories,setCategories] = useState([]);
  const user=auth.currentUser;

  let uid;
    auth.onAuthStateChanged( user => {
        if (user) {
           uid = user.uid;
        } else {
            console.log("error");
        }
      });

  const out=()=>{
    signOut(auth).then(() => {
      alert('Signed Out Successfully!!');
      window.location.reload();
    }).catch((error) => {
      alert('Could Not be Signed out.');
    });
  }
  

  useEffect(() =>{
    const getData= async() =>{
      try{
        const res= await axios.get("https://fakestoreapi.com/products/categories");
        setCategories(res.data);
        console.log(categories);
    } catch(e){
        console.log(e)
    }
  }
  getData();
  },[]);

  const sign=<FontAwesomeIcon icon={faUserCircle} size="lg" />;

  if(user){
    return (
      <div>
        <Navbar bg="success" variant="dark" expand={false}>
          <Container fluid>
          <Nav>
          <Navbar.Brand href="/"><FontAwesomeIcon icon={faShoppingCart} />    E-ShopKart    </Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
            <Navbar.Offcanvas 
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end">
            <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">E-ShopKart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3 offc">
                <Link to="/">All</Link>
                {
                  categories.map((c,index)=> 
                  <Link to={"/category/"+c}>{c.charAt(0).toUpperCase() + c.slice(1)}</Link>
                  )
                }
            </Nav>
          </Offcanvas.Body>
          </Navbar.Offcanvas>
          </Nav>
          <Nav>
                <Nav.Link href={"/dashboard"}>Dashboard</Nav.Link>
                <NavDropdown className="sign" title={sign} id="basic-nav-dropdown" >
                  <NavDropdown.Item href={"/cart/"+uid}>Cart</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={out}>Sign Out</NavDropdown.Item>
                </NavDropdown>
          </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/item/:id" element={<ItemView />} />
          <Route exact path="/sign-in" element={<SignIn />} />
          <Route exact path="/login" element={<LogIn />} />
          <Route path="/cart/:uid" />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    );
  } else{
    return (
      <div>
        <Navbar bg="success" variant="dark" expand={false}>
          <Container fluid>
          <Nav>
          <Navbar.Brand href="/"><FontAwesomeIcon icon={faShoppingCart} />    E-ShopKart    </Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
            <Navbar.Offcanvas 
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end">
            <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">E-ShopKart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3 offc">
                <Link to="/">All</Link>
                {
                  categories.map((c,index)=> 
                  <Link to={"/category/"+c}>{c.charAt(0).toUpperCase() + c.slice(1)}</Link>
                  )
                }
            </Nav>
          </Offcanvas.Body>
          </Navbar.Offcanvas>
          </Nav>
          <Nav>
                <Nav.Link className="navtext" href="/login">Log In</Nav.Link>
                <Nav.Link className="navtext" href="/sign-in">Sign In</Nav.Link>
          </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/item/:id" element={<ItemView />} />
          <Route exact path="/sign-in" element={<SignIn />} />
          <Route exact path="/login" element={<LogIn />} />
          <Route path="/cart" />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    );
  }

  
}

export default App;
