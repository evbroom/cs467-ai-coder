import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../utils/adminApi';
import { useState } from 'react';
import DeleteConfirmModal from './DeleteConfirmModal';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';

const UserRow = ({ row, setData, fieldset }) => {
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

  const [usernameLabel, emailLabel, actionsLabel] = fieldset;

  return (
    <>
      <tr className="border text-center">
        <td className="p-2 lg:border" data-column={usernameLabel}>
          {username}
        </td>
        <td className="p-2 lg:border" data-column={emailLabel}>
          {email}
        </td>
        <td className="p-2 lg:border" data-column={actionsLabel}>
          <div>
            <FaRegEdit
              className="inline text-blue-600 mr-4 cursor-pointer size-5"
              onClick={() => navigate(`/admin/users/${id}`)}
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
        onConfirm={onConfirm}
      />
    </>
  );
};

export default UserRow;
