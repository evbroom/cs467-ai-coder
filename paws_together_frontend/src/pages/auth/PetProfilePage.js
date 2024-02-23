import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPetProfileById } from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';
import PetProfile from '../../components/petProfile/PetProfile';

const PetProfilePage = () => {
  const { id } = useParams();
  const { authToken } = useAuth();
  const [petProfile, setPetProfile] = useState({});
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    getPetProfileById({
      petId: id,
      authToken,
      setPetProfile,
      setError: setFetchError,
    });
  }, [id, authToken]);

  return (
    <div>
      {petProfile ? (
        <PetProfile petProfile={petProfile} />
      ) : (
        <p className="text-red-500">{fetchError}</p>
      )}
    </div>
  );
};
export default PetProfilePage;
