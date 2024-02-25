import PetCard from './PetCard';

const PetCardContainer = ({ petProfiles }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {petProfiles.map((petProfile) => {
        return <PetCard key={petProfile.id} petProfile={petProfile} />;
      })}
    </div>
  );
};
export default PetCardContainer;
