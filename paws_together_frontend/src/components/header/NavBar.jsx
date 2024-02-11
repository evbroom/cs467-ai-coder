import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaPaw } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slices/loginStatusSlice';

function NavBar() {
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((state) => state.loginStatus.loggedIn);
  const username = useSelector((state) => state.loginStatus.user);
  const isAdmin = useSelector((state) => state.loginStatus.isAdmin);

  const handleLogout = () => {
    dispatch(logout());
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
            {userLoggedIn ? (
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
          </Nav>
        </Navbar.Collapse>
        <Navbar.Text className="ml-auto hidden lg:block">
          Hello, {userLoggedIn ? username : 'Guest'} {isAdmin && ' (Admin)'}!
        </Navbar.Text>
      </Container>
    </Navbar>
  );
}

export default NavBar;