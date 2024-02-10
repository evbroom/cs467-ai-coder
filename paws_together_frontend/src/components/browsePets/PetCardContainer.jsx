import PetCard from './PetCard';
import PetCardPagination from './PetCardPagination';

const PetCardContainer = ({ pets }) => {
  return (
    <div className="grow p-8 lg:p-16">
      <div className="container grid gap-6 lg:grid-cols-4">
        {pets.map((pet) => {
          return (
            <PetCard
              key={pet.id}
              image={pet.image}
              breed={pet.breed}
              availability={pet.availability}
            />
          );
        })}
      </div>
      <PetCardPagination />
    </div>
  );
};
export default PetCardContainer;
