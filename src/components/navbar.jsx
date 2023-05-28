import { React, useContext } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { AuthContext } from '../context/AuthProvider';

export const NavbarMenu = () => {
  const { Auth, setAuth } = useContext(AuthContext);

  const logout = () => {
    setAuth({});
    localStorage.clear();
    window.location.replace("http://localhost:3000/home");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Weather</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {Auth?.isAdmin !== undefined ? <Nav.Link href="/forecast">Forecast</Nav.Link> : ""}
          {Auth?.isAdmin ? <Nav.Link href="/admin">Admin</Nav.Link> : ""}
        </Nav>
        <Navbar.Text className="justify-content-end">
          {
            Auth?.isAdmin === undefined ? 
              <Button variant="dark" href='/login'>Log in</Button>
              : Auth.isAdmin ? 
                'ADMIN' 
                : 'USER'
          }
        </Navbar.Text>
        {
          Auth?.isAdmin !== undefined ? 
            <Button variant="dark" onClick={logout}>Log out</Button>
            : ''
        }
      </Container>
    </Navbar>
  );
}
