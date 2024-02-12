import React from 'react';
import PetData from './PetData';
import PetPicture from './PetPicture';

/**
 * This React component was modified based on an example provided by ChatGPT,
 *  incorporating both Tailwind CSS and Bootstrap components for styling and layout.
 * URL: https://chat.openai.com/share/1d8034bb-d94d-4e9e-8dc1-c601fd5a2c91
 */
const PetProfile = ({ pet }) => {
  const { type, breed, disposition, availability, description, image } = pet;
  const dummyNewsItem = 'No news items available.';
  return (
    <div className="p-6 lg:py-12 space-y-6 max-w-xl mx-auto">
      <PetPicture imageUrl={image} />
      <PetData field="Type" value={type} />
      <PetData field="Breed" value={breed} />
      <PetData field="Dispositions" value={disposition} />
      <PetData field="Availability" value={availability} />
      <PetData field="Description" value={description} />
      <PetData field="News Item" value={dummyNewsItem} />
    </div>
  );
};

export default PetProfile;
