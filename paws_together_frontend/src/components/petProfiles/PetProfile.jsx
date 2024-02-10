import React from 'react';
import { Card } from 'react-bootstrap';

/**
 * This React component was modified based on an example provided by ChatGPT,
 *  incorporating both Tailwind CSS and Bootstrap components for styling and layout.
 * URL: https://chat.openai.com/share/1d8034bb-d94d-4e9e-8dc1-c601fd5a2c91
 */
const PetProfile = ({ pet }) => {
  return (
    <div
      className="flex flex-col items-center p-4"
      style={{ maxWidth: '700px', margin: 'auto' }}
    >
      {/* Pet Picture */}
      <img
        src={pet.pictureUrl}
        alt="Pet"
        className="w-700 h-700 object-cover mb-4"
      />

      {/* Pet Details */}
      <div className="w-full">
        {/* Using Bootstrap Card component for each profile item */}
        <Card className="mb-3">
          <Card.Body>Type: {pet.type}</Card.Body>
        </Card>
        <Card className="mb-3">
          <Card.Body>Breed: {pet.breed}</Card.Body>
        </Card>
        <Card className="mb-3">
          <Card.Body>Dispositions: {pet.dispositions.join(', ')}</Card.Body>
        </Card>
        <Card className="mb-3">
          <Card.Body>Availability: {pet.availability}</Card.Body>
        </Card>
        {/* Placeholder for News Item */}
        <Card className="mb-3">
          <Card.Body>News Item: </Card.Body>
        </Card>
        {/* Placeholder for Description */}
        <Card className="mb-3">
          <Card.Body>Description: {pet.description}</Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default PetProfile;
