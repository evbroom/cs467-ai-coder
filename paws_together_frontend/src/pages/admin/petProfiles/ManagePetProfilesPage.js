import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { getPetProfiles } from '../../../utils/adminPetApi';
import PetProfileRow from '../../../components/admin/PetProfileRow';
import TableContainer from '../../../components/admin/TableContainer';
import LinkButton from '../../../components/common/LinkButton';
import Pagination from '../../../components/common/Pagination';
import { useNavigate } from 'react-router-dom';

const ManagePetProfilePage = () => {
  const [petProfiles, setPetProfiles] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [isNextPage, setIsNextPage] = useState(false);
  const { authToken } = useAuth();
  const navigate = useNavigate();

  const fieldset = [
    'Type',
    'Breed',
    'Dispositions',
    'Availability',
    'Date Created',
  ];

  useEffect(() => {
    if (!authToken) navigate('/login');
    getPetProfiles({
      authToken,
      setPetProfiles,
      setIsNextPage,
      setError,
      page,
    });
  }, [page]);

  return (
    <div className="container my-6 space-y-2">
      <h1 className="text-center">Manage Pet Profiles</h1>
      <div className="mx-auto">
        <div className="flex justify-end pb-2">
          <LinkButton
            route="/admin/add-pet-profile"
            text="Add New Pet Profile"
          />
        </div>
        {petProfiles ? (
          petProfiles.length === 0 ? (
            <div className="container">
              <p>No pet data...</p>
            </div>
          ) : (
            <TableContainer
              fieldset={fieldset}
              data={petProfiles}
              RowComponent={PetProfileRow}
              setData={setPetProfiles}
            />
          )
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <div className="container">
            <p className="loading">Fetching pet profiles</p>
          </div>
        )}
        <Pagination page={page} setPage={setPage} isNextPage={isNextPage} />
      </div>
    </div>
  );
};

export default ManagePetProfilePage;
