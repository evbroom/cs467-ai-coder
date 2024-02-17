import axios from 'axios';
import { API_URL } from './helpers';

/**
 *  API - Manage Pet Profiles in Admin Dashboard
 *  ------------
 *  getPetProfiles
 *  postPetProfile
 *  patchPetProfile
 *  deletePetProfile
 *
 */

/**
 * Get request for Pet Profiles.
 *
 * Use it to fetch all pet profiles and display them in the Admin Dashboard.
 *
 * @returns {Object} - status code and array of pet profiles
 */
export const getPetProfiles = async () => {
  try {
    const response = await axios.get(`${API_URL}/pets/`, {
      token: 'Bearer 64c791e438adb7c92172802b109eb9a0dd0c58f9',
    });
    // Handle success
    return response;
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    return error.response;
  }
};

/**
 * POST request for Pet Profile.
 *
 * Use it to add a new pet profile to the database.
 *
 * @param {Object} petProfile - The new pet profile.
 * @returns {Object} - status code and the new pet profile id.
 */
export const postPetProfile = async (obj) => {
  const { data, navigate, setIsSubmitted, setSubmitStatusText } = obj;
  try {
    await axios.post(`${API_URL}/pets/`, data);
    setIsSubmitted(true);
    setSubmitStatusText('Pet profile added successfully! Redirecting...');
    setTimeout(() => navigate('/admin/pet-profiles'), 3000);
  } catch (error) {
    if (error.response) {
      setSubmitStatusText(
        `${error.response.status} ${error.response.statusText} - Failed to add pet profile. Please try again later.`
      );
    } else {
      setSubmitStatusText('Something went wrong. Please try again later.');
    }
  }
};

/**
 * PATCH request for Pet Profile.
 *
 * Use it to update an existing pet profile in the database.
 *
 * @param {Object} updatedData - The updated pet profile.
 * @param {Number} id - The id of the pet profile to be updated.
 * @returns {Object} - status code, if picture is updated, return the picture url
 */
export const patchPetProfile = async (obj) => {
  const { updatedData, id, navigate, setSubmitStatusText, setIsSubmitted } =
    obj;
  try {
    await axios.patch(`${API_URL}/pets/${id}/`, updatedData);
    setIsSubmitted(true);
    setSubmitStatusText('Pet profile updated successfully! Redirecting...');
    setTimeout(() => navigate('/admin/pet-profiles'), 3000);
  } catch (error) {
    if (error.response) {
      setSubmitStatusText(
        `${error.response.status} ${error.response.statusText} - Failed to update pet profile. Please try again later.`
      );
    } else {
      setSubmitStatusText('Something went wrong. Please try again later.');
    }
  }
};

/**
 * DELETE request for Pet Profile.
 *
 * Use it to delete an existing pet profile from the database.
 *
 * @param {Number} id - The id of the pet profile to be deleted.
 * @returns {Object} - status code
 */
export const deletePetProfile = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/pets/${id}/`);
    // Handle success
    return response;
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    return error.response;
  }
};
