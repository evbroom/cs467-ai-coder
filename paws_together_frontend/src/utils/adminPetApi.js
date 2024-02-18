import axios from 'axios';
import { API_URL } from './constants';
import { adminAPIErrorHandler } from './helper';

/**
 * Manage Pet Profiles
 * -------------------
 * getPetProfiles
 * getPetProfileById
 * postPetProfile
 * patchPetProfile
 * deletePetProfile
 */

/**
 * GET request for pet profiles.
 *
 * Use it to fetch all pet profiles and display them on the Manage Pet Profiles Page.
 *
 * @param {String} authToken - The user's token.
 * @param {Function} setPetProfiles - Function to set the pet profiles to be displayed.
 * @param {Function} setError - Function to set the request error message.
 */
export const getPetProfiles = async ({
  authToken,
  setPetProfiles,
  setError,
}) => {
  try {
    const response = await axios.get(`${API_URL}/pets/`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    // Handle success
    setPetProfiles(response.data);
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    adminAPIErrorHandler(error.response.status, setError);
  }
};

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
        Authorization: `Bearer ${authToken}`,
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
      formData.append(key, petProfile[key][0]);
    } else {
      formData.append(key, petProfile[key]);
    }
  }

  try {
    await axios.post(`${API_URL}/pets/`, formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
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
    if (petProfile[key] && petProfile[key][0]) {
      formData.append(key, petProfile[key][0]);
    } else {
      formData.append(key, petProfile[key]);
    }
  }

  try {
    await axios.patch(`${API_URL}/pets/${petId}`, formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
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
        Authorization: `Bearer ${authToken}`,
      },
    });
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    adminAPIErrorHandler(error.response.status, setError);
  }
};
