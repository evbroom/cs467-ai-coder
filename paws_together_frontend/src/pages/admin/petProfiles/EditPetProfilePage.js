import AdminEditPetForm from '../../../components/forms/AdminEditPetForm';
import { getPetProfileById } from '../../../utils/adminApi';
import { useAuth } from '../../../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const EditPetProfilePage = () => {
  const { id } = useParams();
  const [petProfile, setPetProfile] = useState(null);
  const [fetchError, setFetchError] = useState('');
  const { authToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) navigate('/login');
    getPetProfileById(id, setPetProfile, setFetchError);
  }, [authToken]);

  return (
    <div className="container my-6 space-y-4">
      <h1 className="text-center">Edit Pet Profile</h1>
      {petProfile ? (
        <AdminEditPetForm initialPetProfile={petProfile} />
      ) : fetchError ? (
        <Alert variant="danger">{fetchError}</Alert>
      ) : (
        <p className="loading">Fetching Pet Data</p>
      )}
    </div>
  );
};

export default EditPetProfilePage;
