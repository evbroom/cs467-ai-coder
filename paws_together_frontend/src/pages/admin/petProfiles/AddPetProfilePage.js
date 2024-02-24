import AdminAddPetForm from '../../../components/forms/AdminAddPetForm';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AddPetProfilePage = () => {
  const { authToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) navigate('/login');
  }, [authToken]);

  return (
    <div className="container my-6 space-y-4">
      <h1 className="text-center">Add Pet Profile</h1>
      <AdminAddPetForm />
    </div>
  );
};
export default AddPetProfilePage;
