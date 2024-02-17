import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { deletePetProfile } from '../../utils/adminPetApi';
import { useState } from 'react';

const PetProfileRow = ({ item, setData }) => {
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const [error, setError] = useState();
  const handlePetProfileEdit = (id) => {
    navigate(`/admin/pet-profiles/${id}`);
  };
  const handlePetProfileDelete = (id) => {
    // TODO: Add confirmation modal
    // TODO: Display error message
    if (authToken === null) {
      navigate('/login');
    } else {
      deletePetProfile({ id, authToken, setError });
      if (!error) {
        setData((prevData) => prevData.filter((item) => item.id !== id));
      }
    }
  };

  const { id, type, breed, disposition, dateCreated } = item;
  return (
    <tr className="border text-center">
      <td className="p-2 border">{type}</td>
      <td className="p-2 border">{breed}</td>
      <td className="p-2 border whitespace-pre text-left">
        {disposition.join('\n')}
      </td>
      <td className="p-2 border">{dateCreated}</td>

      <td className="p-2 border">
        <Button variant="primary" onClick={() => handlePetProfileEdit(id)}>
          Edit
        </Button>
      </td>
      <td className="p-2 border">
        <Button variant="danger" onClick={() => handlePetProfileDelete(id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default PetProfileRow;
