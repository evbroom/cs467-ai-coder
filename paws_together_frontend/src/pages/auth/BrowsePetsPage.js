import { useState, useEffect } from 'react';
import PetSearchForm from '../../components/forms/PetSearchForm';
import PetCardContainer from '../../components/browsePets/PetCardContainer';
import PetCardPagination from '../../components/browsePets/PetCardPagination';
import { getPetProfiles } from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Modified from the generated code by OpenAI's ChatGPT 4:
 * Accessed on: 2/13/24
 * Source: https://chat.openai.com/share/20b55a1d-8825-49da-8127-682eebcc2908
 */
const BrowsePetsPage = () => {
  const [petProfiles, setPetProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [isNextPage, setIsNextPage] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [currentFilters, setCurrentFilters] = useState({});
  const { authToken } = useAuth();

  useEffect(() => {
    getPetProfiles({
      page,
      ...currentFilters,
      authToken,
      setPetProfiles,
      setIsNextPage,
      setError: setFetchError,
    });
  }, [page, setPetProfiles, setIsNextPage, setFetchError]);

  return (
    <div className="grid lg:grid-cols-12 p-6 lg:p-12 space-y-4">
      <div className="lg:col-span-2">
        <PetSearchForm
          setPetProfiles={setPetProfiles}
          setPage={setPage}
          setIsNextPage={setIsNextPage}
          setError={setFetchError}
          setCurrentFilters={setCurrentFilters}
        />
      </div>
      <div className="lg:col-span-10 flex flex-col">
        {petProfiles ? (
          petProfiles.length === 0 ? (
            <p>No pet profiles found.</p>
          ) : (
            <PetCardContainer petProfiles={petProfiles} />
          )
        ) : fetchError ? (
          <p className="text-red-500">{fetchError}</p>
        ) : (
          <p>Loading...</p>
        )}
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
