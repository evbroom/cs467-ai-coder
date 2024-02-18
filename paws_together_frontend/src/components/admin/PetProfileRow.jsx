import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { deletePetProfile } from '../../utils/adminPetApi';
import { useState } from 'react';
import DeleteConfirmModal from '../common/DeleteConfirmModal';

const PetProfileRow = ({ row, setData }) => {
  const { id, type, breed, dispositions, availability, date_created } = row;
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const [error, setError] = useState();
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (id) => {
    navigate(`/admin/pet-profiles/${id}`);
  };

  const handleDelete = (id) => {
    // Passing delete function to confirm modal
    const onConfrim = async () => {
      await deletePetProfile({ petId: id, authToken, setError });
      if (!error) {
        setData((prevData) => prevData.filter((item) => item.id !== id));
      }
    };
    setShowModal(true);
    return (
      <DeleteConfirmModal
        show={showModal}
        setShow={setShowModal}
        onConfirm={onConfrim}
      />
    );
  };

  return (
    <tr className="border text-center">
      <td className="p-2 border">{type}</td>
      <td className="p-2 border">{breed}</td>
      <td className="p-2 border whitespace-pre text-left">
        {dispositions.join('\n')}
      </td>
      <td className="p-2 border">{date_created}</td>
      <td className="p-2 border">{availability}</td>
      <td className="p-2 border">
        <Button variant="primary" onClick={() => handleEdit(id)}>
          Edit
        </Button>
      </td>
      <td className="p-2 border">
        <Button variant="danger" onClick={() => handleDelete(id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default PetProfileRow;
