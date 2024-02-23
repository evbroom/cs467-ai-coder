import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { deletePetProfile } from '../../utils/adminPetApi';
import { useState } from 'react';
import DeleteConfirmModal from '../common/DeleteConfirmModal';

const PetProfileRow = ({ row, setData }) => {
  const { id, type, breed, disposition, availability, date_created } = row;
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const [error, setError] = useState();
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (id) => {
    navigate(`/admin/pet-profiles/${id}`);
  };

  const onConfrim = async () => {
    await deletePetProfile({ petId: id, authToken, setError });
    if (!error) {
      setData((prevData) => prevData.filter((item) => item.id !== id));
    }
  };

  // Convert disposition array to string
  function convertDisposition(disposition) {
    let dispositionString = '';
    for (let i = 0; i < disposition.length; i++) {
      const disp = disposition[i];
      switch (disp) {
        case 'good_with_animals':
          dispositionString += 'Good with animals\n';
          break;
        case 'good_with_children':
          dispositionString += 'Good with children\n';
          break;
        case 'leash_needed':
          dispositionString += 'Pet must be leashed at all times\n';
          break;
      }
    }
    return dispositionString;
  }

  return (
    <>
      <tr className="border text-center">
        <td className="p-2 border">{type}</td>
        <td className="p-2 border">{breed}</td>
        <td className="p-2 border whitespace-pre text-left">
          {convertDisposition(disposition)}
        </td>
        <td className="p-2 border">{date_created}</td>
        <td className="p-2 border">{availability}</td>
        <td className="p-2 border">
          <Button variant="primary" onClick={() => handleEdit(id)}>
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
        onConfirm={onConfrim}
      />
    </>
  );
};

export default PetProfileRow;
