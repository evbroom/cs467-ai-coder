import { Container, Nav, Navbar } from 'react-bootstrap';
import { FaPaw } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import AdminNavDropdown from './AdminNavDropdown';

function NavBar() {
  const { user, isAdmin, logout } = useAuth();

  const handleLogout = () => {
    // TODO: Send logout request to the backend
    logout();
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
            {user ? (
              <>
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
            {isAdmin && <AdminNavDropdown />}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Text className="ml-auto hidden lg:block">
          Hello, {user ? user : 'Guest'} {isAdmin && ' (Admin)'}!
        </Navbar.Text>
      </Container>
    </Navbar>
  );
}

export default NavBar;
