import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPetProfileById } from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';
import PetProfile from '../../components/petProfile/PetProfile';
import { useNavigate } from 'react-router-dom';

const PetProfilePage = () => {
  const { id } = useParams();
  const { authToken } = useAuth();
  const [petProfile, setPetProfile] = useState(null);
  const [fetchError, setFetchError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) navigate('/login');
    getPetProfileById({
      petId: id,
      setPetProfile,
      setFetchError,
    });
  }, [id, authToken]);

  return (
    <div>
      {petProfile ? (
        <PetProfile petProfile={petProfile} />
      ) : (
        <div className="container justify-items-center m-10">
          <p className="text-red-500">{fetchError}</p>
        </div>
      )}
    </div>
  );
};
export default PetProfilePage;
