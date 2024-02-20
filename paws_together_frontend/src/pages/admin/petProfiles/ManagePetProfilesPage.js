import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { getPetProfiles } from '../../../utils/adminPetApi';
import PetProfileRow from '../../../components/admin/PetProfileRow';
import TableContainer from '../../../components/admin/TableContainer';
import LinkButton from '../../../components/common/LinkButton';

const ManagePetProfilePage = () => {
  const [petProfiles, setPetProfiles] = useState([]);
  const [error, setError] = useState('');
  const { authToken } = useAuth();

  const fieldset = [
    'Type',
    'Breed',
    'Dispositions',
    'Availability',
    'Date Created',
  ];

  useEffect(() => {
    getPetProfiles({ authToken, setPetProfiles, setError });
  }, []);

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
            <p>No pet data...</p>
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
          <p className="loading">Fetching pet profiles</p>
        )}
      </div>
    </div>
  );
};

export default ManagePetProfilePage;
