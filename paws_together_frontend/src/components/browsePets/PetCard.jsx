import React from 'react';

/**
 * Modified from the generated code by ChatGPT by OpenAI
 * URL: https://chat.openai.com/share/4450b131-f86a-4e31-a976-b90b37ccdc53
 */
/**
 *
 * @param {*} param0
 * @returns
 */
const PetCard = ({ image, breed, availability, onClick }) => {
  return (
    <div className="border-2 rounded hover:cursor-pointer" onClick={onClick}>
      <img
        className="w-full"
        src={image}
        alt="Pet"
        style={{ height: '250px', objectFit: 'cover' }}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{breed}</div>
        <p className="text-gray-700 text-base">
          {availability ? 'Available' : 'Not Available'}
        </p>
      </div>
    </div>
  );
};

export default PetCard;
