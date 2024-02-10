import PetSearchForm from '../../components/browsePets/PetSearchForm';
import PetCardContainer from '../../components/browsePets/PetCardContainer';
import FormTitle from '../../components/common/FormTitle';
import FormContainer from '../../components/common/FormContainer';
import { getPetProfiles } from '../../utils/api';
import { useState, useEffect } from 'react';

/**
 * Modified from the generated code by ChatGPT by OpenAI
 * URL: https://chat.openai.com/share/4450b131-f86a-4e31-a976-b90b37ccdc53
 */
const BrowsePetsPage = () => {
  const [data, setData] = useState([]);
  const pets = (() => {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push({
        image:
          'https://images.pexels.com/photos/1696589/pexels-photo-1696589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        breed: 'Labrador',
        availability: true,
        id: `${i}`,
      });
    }
    return arr;
  })();

  // Render pet cards based on initial data.
  useEffect(() => {
    // const fetchPetProfiles = async () => {
    //   try {
    //     const response = await getPetProfiles({ page: 1 });
    //     if (response.status === 200) {
    //       console.log(response.data);
    //       setData(response.data);
    //     } else {
    //       console.log('Failed to fetch pet profiles');
    //     }
    //   } catch (error) {
    //     console.log('Failed to fetch pet profiles');
    //   }
    // };
    // fetchPetProfiles();
    setData(pets);
  }, []);

  // Render pet cards based on search data.
  const onSearch = (data) => {
    const fetchPetProfiles = async () => {
      try {
        const response = await getPetProfiles({
          page: 1,
          type: data.type,
          breed: data.breed,
          disposition: data.disposition,
          dateCreated: data.dateCreated,
        });
        if (response.status === 200) {
          console.log(response.data);
          setData(response.data);
        } else {
          console.log('Failed to fetch pet profiles');
        }
      } catch (error) {
        console.log('Failed to fetch pet profiles');
      }
    };
    fetchPetProfiles();
  };

  return (
    <div className="flex flex-col lg:flex-row lg:ml-6">
      <FormContainer>
        <FormTitle title="Search Pets" />
        <PetSearchForm onSearch={onSearch} />
      </FormContainer>
      <PetCardContainer pets={data} />
    </div>
  );
};

export default BrowsePetsPage;
