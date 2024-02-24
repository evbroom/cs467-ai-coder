import axios from 'axios';
import { API_URL } from './constants';
import { adminAPIErrorHandler } from './helper';
import { TOKEN_PREFIX } from './constants';

/**
 * GET request for pet profile by ID.
 *
 * Use it to fetch a specific pet profile by its ID.
 *
 * @param {String} authToken - The user's token.
 * @param {String} petId - The pet's ID.
 * @param {Function} setPetProfile - Function to set the pet profile to be displayed.
 * @param {Function} setError - Function to set the request error message.
 */
export const getPetProfileById = async ({
  authToken,
  petId,
  setPetProfile,
  setError,
}) => {
  try {
    const response = await axios.get(`${API_URL}/pets/${petId}`, {
      headers: {
        Authorization: `${TOKEN_PREFIX} ${authToken}`,
      },
    });
    // Handle success
    setPetProfile(response.data);
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    adminAPIErrorHandler(error.response.status, setError);
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
 * DELETE request for pet profile.
 *
 * Use it to delete a pet profile from the database.
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
