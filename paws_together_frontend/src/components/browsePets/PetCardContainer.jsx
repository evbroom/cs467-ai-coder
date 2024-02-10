import PetCard from './PetCard';
import PetCardPagination from './PetCardPagination';
import { useState } from 'react';

const PetCardContainer = ({ pets }) => {
  const [id, setId] = useState('');
  const [pet, setPet] = useState('');

  const onClick = (id) => {
    setId(id);
    setPet(pet);
  };
  return (
    <>
      <div className="grow p-8 lg:p-16">
        <div className="container grid gap-6 lg:grid-cols-4">
          {pets.map((pet) => {
            return (
              <PetCard
                key={pet.id}
                image={pet.image}
                breed={pet.breed}
                availability={pet.availability}
                onClick={onClick(pet.id)}
              />
            );
          })}
        </div>
        <PetCardPagination />
      </div>
    </>
  );
};
export default PetCardContainer;
