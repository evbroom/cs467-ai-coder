import { useEffect } from 'react';
import { getPetProfileById } from '../../utils/api';

const FetchPetProfileById = (id, setPet) => {
  // TODO: handle error & error state
  useEffect(() => {
    const fetchPet = async () => {
      const response = await getPetProfileById(id);
      if (response.status === 200) {
        setPet(response.data);
      } else {
        console.log('Error fetching pet profile by id');
      }
    };
    fetchPet();
  }, [id]);
};
export default FetchPetProfileById;
