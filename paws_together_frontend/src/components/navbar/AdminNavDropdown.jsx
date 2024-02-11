import NavDropdown from 'react-bootstrap/NavDropdown';

const AdminNavDropdown = () => {
  return (
    <NavDropdown title="Admin" id="basic-nav-dropdown">
      <NavDropdown.Item href="/admin/pet-profiles">
        Manage Pet Profiles
      </NavDropdown.Item>
      <NavDropdown.Item href="/admin/users">Manage Users</NavDropdown.Item>
    </NavDropdown>
  );
};
export default AdminNavDropdown;
