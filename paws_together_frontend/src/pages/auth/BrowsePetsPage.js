import { useState, useEffect } from 'react';
import PetSearchForm from '../../components/forms/PetSearchForm';
import PetCardContainer from '../../components/browsePets/PetCardContainer';
import Pagination from '../../components/common/Pagination';
import { getPetProfiles } from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

/**
 * Modified from the generated code by OpenAI's ChatGPT 4:
 * Accessed on: 2/13/24
 * Source: https://chat.openai.com/share/20b55a1d-8825-49da-8127-682eebcc2908
 */
const BrowsePetsPage = () => {
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const [petProfiles, setPetProfiles] = useState(null);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(null);
  const [fetchError, setFetchError] = useState('');
  const [isNextPage, setIsNextPage] = useState(false);

  useEffect(() => {
    if (!authToken) navigate('/login');
    getPetProfiles({
      page,
      filter,
      setPetProfiles,
      setIsNextPage,
      setFetchError,
    });
  }, [page, authToken]);

  return (
    <div className="grid lg:grid-cols-12 p-6 lg:p-12 space-y-4">
      <div className="lg:col-span-2">
        <PetSearchForm
          setPetProfiles={setPetProfiles}
          setPage={setPage}
          setIsNextPage={setIsNextPage}
          setFetchError={setFetchError}
          setFilter={setFilter}
        />
      </div>
      <div className="lg:col-span-10 flex flex-col">
        {petProfiles ? (
          petProfiles.length === 0 ? (
            <div className="container justify-items-center">
              <p>No pet profiles found.</p>
            </div>
          ) : (
            <PetCardContainer petProfiles={petProfiles} />
          )
        ) : fetchError ? (
          <div className="container justify-items-center">
            <p className="text-red-500">{fetchError}</p>
          </div>
        ) : (
          <div className="container justify-items-center">
            <p className="loading">Loading pet profiles</p>
          </div>
        )}
        <Pagination page={page} setPage={setPage} isNextPage={isNextPage} />
      </div>
    </div>
  );
};

export default BrowsePetsPage;
