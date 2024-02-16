import {
  getPetProfiles,
  postPetProfile,
  patchPetProfile,
  deletePetProfile,
} from '../../utils/adminPetApi';
import { useState, useEffect } from 'react';

const ManagePetProfilePage = () => {
  const [petProfiles, setPetProfiles] = useState([]);

  const fetchPetProfiles = async () => {
    const response = await getPetProfiles();
    console.log(response);
  };

  useEffect(() => {
    fetchPetProfiles();
  }, []);

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
