import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { deletePetProfile } from '../../utils/adminApi';
import { useState } from 'react';
import DeleteConfirmModal from './DeleteConfirmModal';

const PetProfileRow = ({ row, setData, fieldset }) => {
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

  // destructuring fieldsets to use as labels on mobile
  const [
    typeLabel,
    breedLabel,
    dispositionLabel,
    availabilityLabel,
    dateCreatedLabel,
    editLabel,
    deleteLabel,
  ] = fieldset;
  return (
    <>
      <tr className="border text-center">
        <td className="p-2 lg:border" data-column={typeLabel}>
          {type}
        </td>
        <td className="p-2 lg:border" data-column={breedLabel}>
          {breed}
        </td>
        <td
          className="p-2 lg:border whitespace-pre text-left"
          data-column={dispositionLabel}
        >
          {disposition.join('\n')}
        </td>
        <td className="p-2 lg:border" data-column={availabilityLabel}>
          {availability}
        </td>
        <td className="p-2 lg:border" data-column={dateCreatedLabel}>
          {date_created}
        </td>
        <td className="p-2 lg:border" data-column={editLabel}>
          <Button
            variant="primary"
            onClick={() => navigate(`/admin/pet-profiles/${id}`)}
          >
            Edit
          </Button>
        </td>
        <td className="p-2 lg:border" data-column={deleteLabel}>
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
