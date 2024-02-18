import AdminAddEditPetProfileForm from '../../../components/forms/AdminAddEditPetProfileForm';
import { getPetProfileById } from '../../../utils/adminPetApi';
import { useAuth } from '../../../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const EditPetProfilePage = () => {
  const { id } = useParams();
  const [petProfile, setPetProfile] = useState({});
  const [error, setError] = useState(null);
  const { authToken } = useAuth();

  useEffect(() => {
    getPetProfileById({
      authToken,
      petId: id,
      setPetProfile,
      setError,
    });
  }, [id]);

  return (
    <div className="container my-6 space-y-4">
      <h1 className="text-center">Edit Pet Profile</h1>
      {petProfile ? (
        <AdminAddEditPetProfileForm initialPetProfile={petProfile} />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <p className="loading">Fetching Pet Data</p>
      )}
    </div>
  );
};

export default EditPetProfilePage;
