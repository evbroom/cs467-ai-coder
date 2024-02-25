import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { deletePetProfile } from '../../utils/adminApi';
import { useState } from 'react';
import DeleteConfirmModal from './DeleteConfirmModal';

const PetProfileRow = ({ row, setData }) => {
  const { id, type, breed, disposition, availability, date_created } = row;
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [showModal, setShowModal] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  // Modal confirm delete function
  const onConfrim = async () => {
    if (!isRequesting) {
      setIsRequesting(true);
      await deletePetProfile(id, setError);
    }
    setIsRequesting(false);
    if (!error) {
      setData((prevData) => prevData.filter((item) => item.id !== id));
    }
  };

  return (
    <>
      <tr className="border text-center">
        <td className="p-2 border">{type}</td>
        <td className="p-2 border">{breed}</td>
        <td className="p-2 border whitespace-pre text-left">
          {disposition.join('\n')}
        </td>
        <td className="p-2 border">{availability}</td>
        <td className="p-2 border">{date_created}</td>
        <td className="p-2 border">
          <Button
            variant="primary"
            onClick={() => navigate(`/admin/pet-profiles/${id}`)}
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
        onConfirm={onConfrim}
      />
    </>
  );
};

export default PetProfileRow;
