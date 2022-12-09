import React from "react";
import {useNavigate} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';


const Header = () => {

  let navigate=useNavigate();
  
  function logout() {
   sessionStorage.clear();
    navigate('/')
  }



  return (


    <Navbar collapseOnSelect   expand="lg" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="http://localhost:3000/blogs">React-Redux-Blogs</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
        </Nav>
        <Nav className="my-2">
        {sessionStorage.getItem("username")!== null?<>
          <Nav.Link  href="http://localhost:3000/blogs">Blogs</Nav.Link>
          <Nav.Link  >Hello, {sessionStorage.getItem('username')}</Nav.Link>
          <Button variant="outline-danger"  onClick={logout}>LOGOUT</Button>

          
          </>:<>
          <NavDropdown title="Account" id="collasible-nav-dropdown">
            <NavDropdown.Item href="http://localhost:3000/Login">Login</NavDropdown.Item>
            <NavDropdown.Item href="http://localhost:3000/Signup"> Sign up </NavDropdown.Item>
          </NavDropdown>
          </>}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>

    // <div className="ui fixed menu">
     

 
    //     {sessionStorage.getItem("username")!== null?<><li><Link className="navbar-brand" to='/blogs'>Blogs</Link></li>
    //     {/* {sessionStorage.getItem('role')==="admin"?<li><Link className="navbar-brand" to='/Admindashboard'>Dashbord</Link></li>
    //     :<> </>} */}
    //     <li>Hello, {sessionStorage.getItem('username')}</li><li><button className="btn btn-outline-danger btn-sm" onClick={logout} >LOGOUT</button></li></>
    //     :<><li><Link  className="navbar-brand" to='/'>Login</Link></li></>}


  
   
     
    // </div>
  );
};

export default Header;
