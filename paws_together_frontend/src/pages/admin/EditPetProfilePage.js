import AddEditPetProfileForm from '../../components/admin/AddEditPetProfileForm';
import { getPetProfileById } from '../../utils/api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const EditPetProfilePage = () => {
  // TODO: remove dummy data
  const dummyData = {
    type: 'dog',
    breed: 'Labrador Retriever',
    dispositions: ['Good with other animals', 'Good with children'],
    description: 'This is a labrador',
    picture: 'https://via.placeholder.com/150',
    date_created: '2021-10-01',
  };

  const { id } = useParams();
  const [petData, setPetData] = useState(dummyData);
  const [error, setError] = useState(null);
  //   useEffect(() => {
  //     const fetchPetData = async () => {
  //       const response = await getPetProfileById(id);
  //       if (response?.status === 200) {
  //         setPetData(response.data);
  //       } else {
  //         response
  //           ? setError(`${response.status} ${response.statusText}`)
  //           : setError('Failed to fetch pet data');
  //       }
  //     };
  //     fetchPetData();
  //   }, [id]);

  return (
    <div className="container my-6 space-y-4">
      <h1 className="text-center">Edit Pet Profile</h1>
      {petData ? (
        <AddEditPetProfileForm initialPetData={petData} />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <p className="loading">Fetching Pet Data</p>
      )}
    </div>
  );
};

export default EditPetProfilePage;
