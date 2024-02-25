import { Container, Nav, Navbar } from 'react-bootstrap';
import { FaPaw } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import AdminNavDropdown from './AdminNavDropdown';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <FaPaw className="inline m-2" />
          PawsTogether
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/browse-pets">Browse Pets</Nav.Link>
          </Nav>
          {user && (
            <Nav className="d-lg-none">
              {isAdmin && <AdminNavDropdown />}
              <Nav.Link href="#" onClick={handleLogout}>
                Logout
              </Nav.Link>
            </Nav>
          )}
          {!user && (
            <Nav className="d-lg-none">
              <Nav.Link href="/signup/">Sign Up</Nav.Link>
              <Nav.Link href="/login/">Login</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
        <Navbar.Text className="ml-auto d-none d-lg-block">
          Hello, {user ? user : 'Guest'} {isAdmin && ' (Admin)'}!
        </Navbar.Text>
        <Navbar.Text className="mx-3 d-none d-lg-block">|</Navbar.Text>
        <Nav className="ml-auto d-none d-lg-flex">
          {user ? (
            <>
              {isAdmin && <AdminNavDropdown />}
              <Nav.Link href="#" onClick={handleLogout}>
                Logout
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/signup/">Sign Up</Nav.Link>
              <Nav.Link href="/login/">Login</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
