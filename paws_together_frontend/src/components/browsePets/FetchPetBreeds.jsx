import { getPetBreeds } from '../../utils/api';
import { useEffect, useState } from 'react';

const FetchPetBreeds = ({ type, setPetBreeds, setSelectBreedError }) => {
  const [dogBreeds, setDogBreeds] = useState([]);
  const [catBreeds, setCatBreeds] = useState([]);

  useEffect(() => {
    //if (type ==! 'Other'){
    //   const fetchPetBreeds = async () => {
    //   const response = await getPetBreeds(type);
    //   if (response.status === 200) {
    //     setPetBreeds(response.data);
    //   }
    // };
    // fetchPetBreeds()};
    // else {
    //  setPetBreeds(['Other']);
    //}

    // const dummyError = 'Fetching breeds failed. Please try again later';
    // setBreedError(dummyError);
    type === 'dogs'
      ? setPetBreeds(['Labrador', 'Beagle'])
      : type === 'cats'
      ? setPetBreeds(['Persian', 'Siamese'])
      : type === 'other'
      ? setPetBreeds(['Other'])
      : setPetBreeds([]);
  }, [type]);

  return null;
};

export default FetchPetBreeds;
