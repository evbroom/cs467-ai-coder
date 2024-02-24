import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { getPetProfiles } from '../../../utils/api';
import PetProfileRow from '../../../components/admin/PetProfileRow';
import TableContainer from '../../../components/admin/TableContainer';
import LinkButton from '../../../components/common/LinkButton';
import Pagination from '../../../components/common/Pagination';
import { useNavigate } from 'react-router-dom';

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
    'Edit',
    'Delete',
  ];

  useEffect(() => {
    if (!authToken) navigate('/login');
    getPetProfiles(page, setPetProfiles, setIsNextPage, setFetchError);
  }, [page]);

  return (
    <div className="my-6 space-y-2 mx-auto">
      <h1 className="text-center">Manage Pet Profiles</h1>
      <div className="container">
        <div className="flex justify-end pb-2">
          <LinkButton route="/admin/add-pet-profile" text="Add New" />
        </div>
        {petProfiles ? (
          petProfiles.length === 0 ? (
            <div className="container justify-items-center">
              <p>No pet profiles found.</p>
            </div>
          ) : (
            <TableContainer
              fieldset={fieldset}
              data={petProfiles}
              RowComponent={PetProfileRow}
              setData={setPetProfiles}
            />
          )
        ) : fetchError ? (
          <div className="container justify-items-center">
            <p className="text-red-500">{fetchError}</p>
          </div>
        ) : (
          <div className="container justify-items-center">
            <p className="loading">Fetching pet profiles</p>
          </div>
        )}
        <Pagination page={page} setPage={setPage} isNextPage={isNextPage} />
      </div>
    </div>
  );
};

export default ManagePetProfilePage;
