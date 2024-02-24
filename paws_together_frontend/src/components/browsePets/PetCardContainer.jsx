import PetCard from './PetCard';

const PetCardContainer = ({ petProfiles }) => {
  return (
    <div className="container grid lg:grid-cols-4 gap-4 justify-items-center">
      {petProfiles.map((petProfile) => {
        return <PetCard key={petProfile.id} petProfile={petProfile} />;
      })}
    </div>
  );
};
export default PetCardContainer;
