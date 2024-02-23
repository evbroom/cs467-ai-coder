import React from 'react';
import PetData from './PetData';
import PetPicture from './PetPicture';

const PetProfile = ({ petProfile }) => {
  const {
    type,
    breed,
    disposition,
    picture_url,
    availability,
    description,
    date_created,
  } = petProfile;

  return (
    <div className="p-6 lg:py-12 space-y-6 max-w-xl mx-auto">
      <PetPicture imageUrl={picture_url} />
      <PetData field="Type" value={type} />
      <PetData field="Breed" value={breed} />
      <PetData field="Disposition" value={disposition} />
      <PetData field="Availability" value={availability} />
      <PetData field="Description" value={description} />
      <PetData field="Date Created" value={date_created} />
    </div>
  );
};

export default PetProfile;
