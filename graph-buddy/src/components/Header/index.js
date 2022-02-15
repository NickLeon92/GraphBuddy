import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
   
    <Navbar bg="dark" variant="dark">
      <Container>
        <h1 style = {{color:'white', marginRight:'1rem'}}>Graph Buddy</h1>
        <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/me">Profile</Nav.Link>
          <Nav.Link href="#features">Feature</Nav.Link>
        </Nav>

        <div>
          {Auth.loggedIn() ? (
            
              <Button  onClick={logout}>
                Logout
              </Button>
            
          ) : (
            <>
            <Link to="/login">
              <Button variant="success" style = {{marginRight:'.5rem'}}>
                Login
              </Button>
            </Link >
            <Link to="/signup">
              <Button style = {{marginLeft:'.5rem'}}>
                Signup
              </Button>
            </Link>
            </>
          )}
        </div>

      </Container>
    </Navbar>
  );
};

export default Header;
