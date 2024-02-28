import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { getPetProfiles } from '../../../utils/api';
import PetProfileRow from '../../../components/admin/PetProfileRow';
import TableContainer from '../../../components/admin/TableContainer';
import Pagination from '../../../components/common/Pagination';
import { useNavigate } from 'react-router-dom';
import LinkButton from '../../../components/common/LinkButton';

const ManagePetProfilePage = () => {
  const [petProfiles, setPetProfiles] = useState(null);
  const [fetchError, setFetchError] = useState('');
  const [page, setPage] = useState(1);
  const [isNextPage, setIsNextPage] = useState(false);
  const { authToken } = useAuth();
  const navigate = useNavigate();

  const fieldset = [
    'Type',
    'Breed',
    'Disposition',
    'Availability',
    'Date Created',
    'Actions',
  ];

  useEffect(() => {
    if (!authToken) navigate('/login');
    getPetProfiles(page, setPetProfiles, setIsNextPage, setFetchError);
  }, [page]);

  return (
    <div className="container my-6 space-y-2">
      {petProfiles ? (
        <>
          <div className="flex justify-center mx-auto">
            <TableContainer
              title="Pet Profiles"
              fieldset={fieldset}
              data={petProfiles}
              RowComponent={PetProfileRow}
              setData={setPetProfiles}
              linkButton={
                <LinkButton
                  route="/admin/add-pet-profile"
                  text="Add a New Pet"
                />
              }
            />
          </div>
          <Pagination page={page} setPage={setPage} isNextPage={isNextPage} />
        </>
      ) : fetchError ? (
        <div className="flex justify-center mx-auto">
          <p className="text-red-500">{fetchError}</p>
        </div>
      ) : (
        <div className="flex justify-center mx-auto">
          <p className="loading">Fetching pet profiles</p>
        </div>
      )}
    </div>
  );
};

export default ManagePetProfilePage;
