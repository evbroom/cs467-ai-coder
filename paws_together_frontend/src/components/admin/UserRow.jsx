import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { deleteUser } from '../../utils/adminUserApi';
import { useState } from 'react';
import DeleteConfirmModal from '../common/DeleteConfirmModal';

const UserRow = ({ row, setData }) => {
  const { id, username, email } = row;
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const [error, setError] = useState();
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (id) => {
    navigate(`/admin/users/${id}`);
  };

  const onConfirm = async () => {
    await deleteUser({ userId: id, authToken, setError });
    if (!error) {
      setData((prevData) => prevData.filter((item) => item.id !== id));
    }
  };
  const handleDelete = () => {
    // Passing delete function to confirm modal
    setShowModal(true);
  };

  return (
    <>
      <tr className="border text-center">
        <td className="p-2 border">{username}</td>
        <td className="p-2 border">{email}</td>
        <td className="p-2 border">
          <Button variant="primary" onClick={() => handleEdit(id)}>
            Edit
          </Button>
        </td>
        <td className="p-2 border">
          <Button variant="danger" onClick={() => handleDelete()}>
            Delete
          </Button>
        </td>
      </tr>
      <DeleteConfirmModal
        show={showModal}
        setShow={setShowModal}
        onConfirm={onConfirm}
      />
    </>
  );
};

export default UserRow;
