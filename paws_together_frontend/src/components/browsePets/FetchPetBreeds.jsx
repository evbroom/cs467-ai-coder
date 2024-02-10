import { getPetBreeds } from '../../utils/api';
import { useEffect, useState } from 'react';

const FetchPetBreeds = ({ type, setPetBreeds }) => {
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
