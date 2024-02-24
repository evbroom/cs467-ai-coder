import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../utils/adminApi';
import { useState } from 'react';
import DeleteConfirmModal from './DeleteConfirmModal';

const UserRow = ({ row, setData }) => {
  const { id, username, email } = row;
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Modal confirm delete function
  const onConfirm = async () => {
    await deleteUser(id, setError);
    if (!error) {
      setData((prevData) => prevData.filter((item) => item.id !== id));
    }
  };

  return (
    <>
      <tr className="border text-center">
        <td className="p-2 border">{username}</td>
        <td className="p-2 border">{email}</td>
        <td className="p-2 border">
          <Button
            variant="primary"
            onClick={() => navigate(`/admin/users/${id}`)}
          >
            Edit
          </Button>
        </td>
        <td className="p-2 border">
          <Button variant="danger" onClick={() => setShowModal(true)}>
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
