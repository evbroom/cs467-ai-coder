import { useState, useEffect } from 'react';
import PetSearchForm from '../../components/browsePets/PetSearchForm';
import PetCardContainer from '../../components/browsePets/PetCardContainer';
import PetCardPagination from '../../components/browsePets/PetCardPagination';
import FetchPetProfiles from '../../components/browsePets/FetchPetProfiles';

/**
 * Modified from the generated code by OpenAI's ChatGPT 4:
 * Source: https://chat.openai.com/share/20b55a1d-8825-49da-8127-682eebcc2908
 */
const BrowsePetsPage = () => {
  const dummyPetData = (() => {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push({
        type: 'Dog',
        breed: 'german shepherd',
        disposition: ['Good with Kids', 'Good with Other Pets'],
        availability: 'Available',
        image:
          'https://images.pexels.com/photos/2071555/pexels-photo-2071555.jpeg',
        dateCreated: '2024-02-10',
        id: `${i}`,
      });
    }
    return arr;
  })();

  const dummyPetData2 = (() => {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push({
        type: 'Dog',
        breed: 'labrador',
        disposition: ['Good with Kids'],
        availability: 'Available',
        image:
          'https://images.pexels.com/photos/1696589/pexels-photo-1696589.jpeg',
        dateCreated: '2024-02-09',
        id: `${i}`,
      });
    }
    return arr;
  })();

  const [pets, setPets] = useState(dummyPetData);
  const [page, setPage] = useState(1);
  const [isNextPage, setIsNextPage] = useState(false);
  const onSearch = (data) => {
    // console.log(data);
    // using the data to fetch pet profiles
    // setPets(response.data);
    setPets(dummyPetData2);
  };

  return (
    <div className="grid lg:grid-cols-12 p-6 lg:p-12 space-y-4">
      <div className="lg:col-span-2">
        <PetSearchForm onSearch={onSearch} />
      </div>
      <div className="lg:col-span-10 flex flex-col">
        {/* <FetchPetProfiles setPets={setPets} page={page} setIsNextPage={setIsNextPage}/> */}
        <PetCardContainer pets={pets} />
        <PetCardPagination
          page={page}
          setPage={setPage}
          isNextPage={isNextPage}
        />
      </div>
    </div>
  );
};

export default BrowsePetsPage;
