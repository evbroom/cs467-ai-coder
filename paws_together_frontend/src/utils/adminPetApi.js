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
    const response = await axios.get(`${API_URL}/pets/`);
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
export const postPetProfile = async (petProfile) => {
  try {
    const response = await axios.post(`${API_URL}/pets/`, petProfile);
    // Handle success
    return response;
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    return error.response;
  }
};

/**
 * PATCH request for Pet Profile.
 *
 * Use it to update an existing pet profile in the database.
 *
 * @param {Object} petProfile - The updated pet profile.
 * @param {Number} id - The id of the pet profile to be updated.
 * @returns {Object} - status code, if picture is updated, return the picture url
 */
export const patchPetProfile = async (petProfile, id) => {
  try {
    const response = await axios.patch(`${API_URL}/pets/${id}/`, petProfile);
    // Handle success
    return response;
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    return error.response;
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
