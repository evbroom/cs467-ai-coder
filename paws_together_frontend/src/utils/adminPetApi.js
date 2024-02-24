import axios from 'axios';
import { API_URL } from './constants';
import { TOKEN_PREFIX } from './constants';

const adminAPIErrorHandler = (status, setError) => {
  switch (status) {
    case 400:
      setError('Invalid request. Please check your inputs.');
      break;
    case 401:
      setError('Token expired. Please log in again.');
      break;
    case 403:
      setError('Forbidden. Please log in as an admin.');
      break;
    case 404:
      setError('Resource not found.');
      break;
    case 408:
      setError('Request timeout. Please try again later.');
      break;
    case 429:
      setError('Too many requests. Please try again later.');
      break;
    default:
      if (status >= 500) {
        setError('Server error. Please try again later.');
      } else {
        setError('Failed to fetch resource. Please try again later.');
      }
      break;
  }
};

/**
 * POST request for pet profile.
 *
 * Use it to add a new pet profile to the database.
 *
 * @param {Object} petProfile - The new pet profile.
 * @param {String} authToken - The user's token.
 * @param {Function} navigate - Function to navigate to another page.
 * @param {Function} setError - Function to set the request error message.
 */
export const postPetProfile = async ({
  petProfile,
  authToken,
  navigate,
  setError,
}) => {
  const formData = new FormData();
  for (const key in petProfile) {
    if (key === 'picture') {
      formData.append('picture_url', petProfile[key][0]);
    } else if (key === 'disposition') {
      petProfile[key].forEach((disposition) =>
        formData.append('disposition', disposition)
      );
    } else {
      formData.append(key, petProfile[key]);
    }
  }

  try {
    await axios.post(`${API_URL}/pets/`, formData, {
      headers: {
        Authorization: `${TOKEN_PREFIX} ${authToken}`,
      },
    });
    // Handle success
    navigate('/admin/pet-profiles');
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    adminAPIErrorHandler(error.response.status, setError);
  }
};

/**
 * PATCH request for pet profile.
 *
 * Use it to update an existing pet profile in the database.
 *
 * @param {Object} petProfile - The updated pet profile.
 * @param {String} petId - The ID of the pet profile to be updated.
 * @param {String} authToken - The user's token.
 * @param {Function} navigate - Function to navigate to another page.
 * @param {Function} setError - Function to set the request error message.
 */
export const patchPetProfile = async ({
  petProfile,
  petId,
  authToken,
  navigate,
  setError,
}) => {
  const formData = new FormData();
  for (const key in petProfile) {
    if (key === 'picture' && petProfile[key][0]) {
      formData.append('picture_url', petProfile[key][0]);
    } else if (key === 'disposition') {
      petProfile[key].forEach((disposition) =>
        formData.append('disposition', disposition)
      );
    } else {
      formData.append(key, petProfile[key]);
    }
  }

  try {
    await axios.patch(`${API_URL}/pets/${petId}/`, formData, {
      headers: {
        Authorization: `${TOKEN_PREFIX} ${authToken}`,
      },
    });
    // Handle success
    navigate('/admin/pet-profiles');
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    adminAPIErrorHandler(error.response.status, setError);
  }
};

/**
 * DELETE Pet Profile
 *
 * DELETE request for pet profile.
 *
 * @param {String} petId - The ID of the pet profile to be deleted.
 * @param {String} authToken - The user's token.
 * @param {Function} setError - Function to set the request error message.
 */
export const deletePetProfile = async ({ petId, authToken, setError }) => {
  try {
    await axios.delete(`${API_URL}/pets/${petId}`, {
      headers: {
        Authorization: `${TOKEN_PREFIX} ${authToken}`,
      },
    });
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    adminAPIErrorHandler(error.response.status, setError);
  }
};
