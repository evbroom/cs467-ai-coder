import { useEffect } from 'react';
import { getPetProfiles } from '../../utils/api';

const FetchPetProfiles = ({ page, setPets, setIsNextPage }) => {
  // Add search parameters.
  useEffect(() => {
    const fetchPetProfiles = async () => {
      try {
        const response = await getPetProfiles({ page });
        if (response.status === 200) {
          console.log(response.data);
          setPets(response.data);
          setIsNextPage(response.data.hasNextPage);
        } else {
          console.log('Failed to fetch pet profiles');
        }
      } catch (error) {
        console.log('Failed to fetch pet profiles');
      }
    };
    fetchPetProfiles();
  }, [page]);
  return null;
};

export default FetchPetProfiles;
