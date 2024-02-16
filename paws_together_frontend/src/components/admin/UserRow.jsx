import { Button } from 'react-bootstrap';

// TODO: Complete edit and delete functionality
// TODO: responsive design
// TODO: table design
const UserRow = ({ item, setData }) => {
  const handleUserEdit = (id) => {
    // Send a request to the server to edit the user
    console.log(`${id} Edit user`);
  };
  const handleUserDelete = (id) => {
    // Send a request to delete the user
    console.log(`${id} Delete user`);
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const { id, username, email } = item;
  return (
    <tr className="border text-center">
      <td className="p-2 border">{username}</td>
      <td className="p-2 border">{email}</td>
      <td className="p-2 border">
        <Button variant="primary" onClick={() => handleUserEdit(id)}>
          Edit
        </Button>
      </td>
      <td className="p-2 border">
        <Button variant="danger" onClick={() => handleUserDelete(id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default UserRow;
