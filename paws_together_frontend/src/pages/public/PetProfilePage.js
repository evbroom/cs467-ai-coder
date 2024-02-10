import { useState } from 'react';
import { useParams } from 'react-router-dom';
import FetchPetProfileById from '../../components/petProfile/FetchPetProfileById';
import PetProfile from '../../components/petProfile/PetProfile';

const PetProfilePage = () => {
  const { id } = useParams();
  // TODO: Validate id
  const dummyDescription = 'Good doggo! ';
  const [pet, setPet] = useState({
    type: 'Dog',
    breed: 'German Shepherd',
    disposition: ['Good With Kids', 'Good With Other Pets'],
    availability: 'Available',
    description: dummyDescription.repeat(100),
    image: 'https://images.pexels.com/photos/2071555/pexels-photo-2071555.jpeg',
  });

  return (
    <div>
      {/* <FetchPetProfileById id={id} setPet={setPet} /> */}
      <PetProfile pet={pet} />
    </div>
  );
};
export default PetProfilePage;
