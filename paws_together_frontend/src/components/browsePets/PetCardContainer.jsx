import PetCard from './PetCard';

const PetCardContainer = ({ pets }) => {
  return (
    <div className="container grid lg:grid-cols-4 gap-4 justify-items-center">
      {pets.map((pet) => {
        return <PetCard key={pet.id} {...pet} />;
      })}
    </div>
  );
};
export default PetCardContainer;
