import React from "react";
import PetData from "./PetData";
import PetPicture from "./PetPicture";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PetProfile = ({ petProfile }) => {
  const navigate = useNavigate();
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
    <div className="px-4 py-6 md:py-12 max-w-3xl mx-auto space-y-4">
      <button
        onClick={() => navigate(-1)}
        className="px-3 py-2 border-2 border-gray-300 rounded-md flex items-center"><FaArrowLeft className="mr-2"/>Back to Browse Pets
      </button>
        <PetPicture imageUrl={picture_url} />
      <div className="flex items-center space-2 mt-0">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Created on {date_created}
        </span>
      </div>
      <div className="grid gap-2">
        <h1 className="font-bold text-3xl mb-0">{type}</h1>
      </div>
      <div className="grid gap-2">
        <PetData field="Breed" value={breed} />
        <PetData field="Disposition" value={disposition} />
        <PetData field="Availability" value={availability} />
      </div>
      <div className="grid gap-4 text-base md:text-lg">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default PetProfile;
