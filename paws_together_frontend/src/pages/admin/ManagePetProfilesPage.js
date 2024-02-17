import {
  getPetProfiles,
  postPetProfile,
  patchPetProfile,
  deletePetProfile,
} from '../../utils/adminPetApi';
import { useState, useEffect } from 'react';
import PetProfileTable from '../../components/admin/TableContainer';
import PetProfileRow from '../../components/admin/PetProfileRow';
import TableContainer from '../../components/admin/TableContainer';
import AddButton from '../../components/admin/AddButton';
import AddPetProfileForm from '../../components/admin/AddPetProfileForm';

const ManagePetProfilePage = () => {
  const generateDummyData = () => {
    const dummyData = [];
    for (let i = 6; i <= 15; i++) {
      const petProfile = {
        id: i,
        type: 'dogs',
        breed: `Breed ${i}`,
        disposition: ['good with kids', 'good with other pets'],
        imageUrl: `https://example.com/dog${i}.jpg`,
        dateCreated: `2022-01-0${i}`,
      };
      dummyData.push(petProfile);
    }
    return dummyData;
  };
  const dummyPetProfiles = [
    {
      id: 1,
      type: 'dogs',
      breed: 'Labrador Retriever',
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
    ...generateDummyData(),
  ];

  const [petProfiles, setPetProfiles] = useState(dummyPetProfiles);

  const petFieldset = ['Type', 'Breed', 'Dispositions', 'Date Created'];
  // const fetchPetProfiles = async () => {
  //   const response = await getPetProfiles();
  //   console.log(response);
  // };

  // useEffect(() => {
  //   fetchPetProfiles();
  // }, []);

  return (
    <div className="container my-8">
      <h1 className="text-center">Manage Pet Profiles</h1>
      <div className="flex justify-end">
        <AddButton route="/admin/add/pet-profiles" />
      </div>
      <TableContainer
        fieldset={petFieldset}
        data={petProfiles}
        RowComponent={PetProfileRow}
        setData={setPetProfiles}
      />
    </div>
  );
  // return <div>{
  //   petProfiles.map((petProfile) => {
  //     return <div key={petProfile.id}>
  //       <h2>{petProfile.name}</h2>
  //       <p>{petProfile.type}</p>
  //       <p>{petProfile.breed}</p>
  //       <p>{petProfile.disposition}</p>
  //       <p>{petProfile.dateCreated}</p>
  //     </div>
  //   })
  // }</div>
};

export default ManagePetProfilePage;
