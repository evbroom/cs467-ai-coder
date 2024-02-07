import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

/**
 *  API Requests
 *  ------------
 *  getPetProfiles
 *  getSinglePetProfile
 *  postUserSignup
 *  postLogin
 */

/**
 * Get Pet Profiles request for Pet Browse and Search.
 *
 * Fetches pet profiles based on various filters.
 *
 * @param {number} page - Page number (e.g. 10 or 20 pet profiles per page).
 * @param {string} type - Pet type. (e.g. Dog, Cat, Other)
 * @param {string} breed - Pet breed.
 * @param {Array} disposition - Pet dispositions. (e.g. Good with other animals, Good with children, Animal must be leased at all times)
 * @param {string} dateCreated - Date created of pet profile. (Format: YYYY-MM-DD)
 * @returns {Object} - Returns an object with pet profiles and a boolean indicating if next page exists.
 * @throws {Error} - Throws an error if there is an issue with the request.
 */
export const getPetProfiles = async (
  page,
  type,
  breed,
  disposition,
  dateCreated
) => {
  const queryParams = { page };
  if (type) {
    queryParams.type = type;
  }
  if (breed) {
    queryParams.breed = breed;
  }
  if (disposition) {
    queryParams.disposition = disposition;
  }
  if (dateCreated) {
    queryParams.dateCreated = dateCreated;
  }

  try {
    const response = await axios.get(`${API_URL}/pets/`, {
      params: queryParams,
    });

    // Handle success
    console.log(response);
    return {
      data: response.data,
      hasNextPage: response.data.nextPage,
    };
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    console.error(error);
    throw new Error('Error fetching pet profiles');
  }
};

/**
 * Get Single Pet Profile request
 *
 * Fetches a single pet profile based on the pet's id.
 *
 * @param {number} id - Pet profile id.
 * @returns {Object} - Returns an object with pet profile details.
 * @throws {Error} - Throws an error if there is an issue with the request.
 */
export const getSinglePetProfile = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/pets/${id}`);

    // Handle success
    console.log(response);
    return {
      data: response.data,
    };
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    console.log(error);
    throw new Error("Error fetching pet profile's details");
  }
};

/**
 * Post User Signup request
 *
 * @param {Object} userData - User data to be posted. (username: string, email: string, password: string)
 * @returns {Object} - Returns a success message if the user is created.
 */
export const postUserSignup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup/`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Handle success
    return response;
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    return error.response;
  }
};

/**
 * Post Login request
 *
 * @param {Object} userData - User data to be posted. (username: string, password: string)
 * @returns {Object} - Returns a success message if the user is logged in.
 */
export const postLogin = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // Handle success
    return response;
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    return error.response;
  }
};
