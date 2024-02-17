import { getPetProfiles } from '../../utils/adminPetApi';
import { useState, useEffect } from 'react';
import PetProfileRow from '../../components/admin/PetProfileRow';
import TableContainer from '../../components/admin/TableContainer';
import AddButton from '../../components/admin/AddButton';
import { useAuth } from '../../components/auth/AuthContext';

const ManagePetProfilePage = () => {
  // TODO: remove dummy data
  const dummyPetProfiles = [
    {
      id: 1,
      type: 'dogs',
      breed: 'Labrador',
      disposition: ['good with kids', 'good with other pets'],
      imageUrl: 'https://example.com/dog1.jpg',
      dateCreated: '2022-01-01',
    },
    {
      id: 2,
      type: 'cats',
      breed: 'Siamese',
      disposition: ['good with other pets'],
      imageUrl: 'https://example.com/cat1.jpg',
      dateCreated: '2022-01-02',
    },
    {
      id: 3,
      type: 'dogs',
      breed: 'Golden Retriever',
      disposition: ['always leashed'],
      imageUrl: 'https://example.com/dog2.jpg',
      dateCreated: '2022-01-03',
    },
    {
      id: 4,
      type: 'other',
      breed: 'Rabbit',
      disposition: ['good with kids', 'good with other pets'],
      imageUrl: 'https://example.com/rabbit1.jpg',
      dateCreated: '2022-01-04',
    },
    {
      id: 5,
      type: 'cats',
      breed: 'Persian',
      disposition: ['good with other pets'],
      imageUrl: 'https://example.com/cat2.jpg',
      dateCreated: '2022-01-05',
    },
  ];

  const [petProfiles, setPetProfiles] = useState(dummyPetProfiles);
  const [error, setError] = useState(null);
  const petFieldset = ['Type', 'Breed', 'Dispositions', 'Date Created'];
  const { authToken } = useAuth();

  useEffect(() => {
    if (!authToken) {
      setError('Unauthorized');
    } else {
      getPetProfiles(authToken, setPetProfiles, setError);
    }
  }, [petProfiles, setPetProfiles]);

  return (
    <div className="container my-6 space-y-2">
      <h1 className="text-center">Manage Pet Profiles</h1>
      <div className="w-1/2 mx-auto">
        <div className="flex justify-end pb-2">
          <AddButton route="/admin/add-pet-profiles" />
        </div>
        {petProfiles ? (
          petProfiles.length === 0 ? (
            <p>No pet data...</p>
          ) : (
            <TableContainer
              fieldset={petFieldset}
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
