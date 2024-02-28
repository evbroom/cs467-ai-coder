import { useNavigate } from 'react-router-dom';
import { deletePetProfile } from '../../utils/adminApi';
import { useState } from 'react';
import DeleteConfirmModal from './DeleteConfirmModal';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';

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
    actionsLabel,
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
        <td className="p-2 lg:border" data-column={actionsLabel}>
          <div>
            <FaRegEdit
              className="inline text-blue-600 mr-4 cursor-pointer size-5"
              onClick={() => navigate(`/admin/pet-profiles/${id}`)}
            />
            <RiDeleteBin6Line
              className="inline text-red-600 cursor-pointer size-5"
              onClick={() => setShowModal(true)}
            />
          </div>
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
