import axios from 'axios';
import { API_URL, TOKEN_PREFIX } from './constants';

// Custom Axios for Admin APIs
const adminAxios = axios.create({
  headers: {
    Authorization: `${TOKEN_PREFIX} ${localStorage.getItem('authToken')}`,
  },
  baseURL: API_URL,
});

/**
 * Admin API Error Handler
 *
 * Set the error message based on the response status.
 *
 * @param {Object} response - The response object from the API request.
 * @param {Function} setError - Function to set the request error message.
 */
const adminAPIErrorHandler = (response, setError) => {
  if (response) {
    switch (response.status) {
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
        if (response.status >= 500) {
          setError('Server error. Please try again later.');
        } else {
          setError('Failed to fetch resource. Please try again later.');
        }
    }
  } else {
    setError('Failed to fetch resource. Please try again later.');
  }
};

/**
 * GET Pet Profile By ID
 *
 * Use it to fetch a specific pet profile by its ID.
 * For admin edit pet profile page.
 *
 * @param {String} petId - The pet's ID.
 * @param {Function} setPetProfile - Function to set the pet profile to be displayed.
 * @param {Function} setError - Function to set the request error message.
 */
export const getPetProfileById = async (petId, setPetProfile, setError) => {
  try {
    const response = await adminAxios.get(`/pets/${petId}`);
    // Handle success response
    setPetProfile(response.data);
  } catch (error) {
    adminAPIErrorHandler(error.response, setError);
  }
};

/**
 * POST Pet Profile
 *
 * Use it to add a new pet profile to the database.
 *
 * @param {Object} petProfile - The new pet profile.
 * @param {Function} setError - Function to set the request error message.
 * @param {Function} navigate - Function to navigate to another page.
 */
export const postPetProfile = async (petProfile, setError, navigate) => {
  // Create a new FormData object to send the pet profile data
  const formData = new FormData();
  for (const key in petProfile) {
    if (key === 'picture') {
      formData.append('picture_url', petProfile[key][0]);
    } else if (key === 'disposition') {
      petProfile[key].forEach((disposition) =>
        formData.append('disposition', disposition)
      );
    } else if (key === 'news') {
      petProfile[key].forEach((news) => formData.append('news', news));
    } else {
      formData.append(key, petProfile[key]);
    }
  }

  try {
    await adminAxios.post('/pets/', formData);
    // Handle success response
    navigate('/admin/pet-profiles');
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    adminAPIErrorHandler(error.response, setError);
  }
};

/**
 * PATCH Pet Profile
 *
 * Use it to update an existing pet profile in the database.
 *
 * @param {String} petId - The ID of the pet profile to be updated.
 * @param {Object} petProfile - The updated pet profile.
 * @param {Function} navigate - Function to navigate to another page.
 * @param {Function} setError - Function to set the request error message.
 */
export const patchPetProfile = async (
  petId,
  petProfile,
  setError,
  navigate
) => {
  // Create a new FormData object to send the pet profile data
  const formData = new FormData();
  for (const key in petProfile) {
    if (key === 'picture') {
      formData.append('picture_url', petProfile[key][0]);
    } else if (key === 'disposition') {
      petProfile[key].forEach((disposition) =>
        formData.append('disposition', disposition)
      );
    } else if (key === 'news') {
      if (petProfile[key].length > 0) {
        petProfile[key].forEach((news) => formData.append('news', news));
      } else {
        formData.append('news', 'null');
      }
    } else {
      formData.append(key, petProfile[key]);
    }
  }

  try {
    await adminAxios.patch(`/pets/${petId}/`, formData);
    // Handle success response
    navigate('/admin/pet-profiles');
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    adminAPIErrorHandler(error.response, setError);
  }
};

/**
 * DELETE Pet Profile
 *
 * DELETE request for pet profile.
 *
 * @param {String} petId - The ID of the pet profile to be deleted.
 * @param {Function} setError - Function to set the request error message.
 */
export const deletePetProfile = async (petId, setError) => {
  try {
    await adminAxios.delete(`/pets/${petId}`);
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    adminAPIErrorHandler(error.response, setError);
  }
};

/**
 * GET Users
 *
 * Use it to fetch all user data and display them on the Manage Users Page.
 *
 * @param {Function} setUsers - Function to set the user data to be displayed.
 * @param {Function} setError - Function to set the request error message.
 */
export const getUsers = async (setUsers, setError) => {
  try {
    const response = await adminAxios.get(`/users/`);
    // Handle success
    setUsers(response.data);
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    adminAPIErrorHandler(error.response, setError);
  }
};

/**
 * GET User by ID
 *
 * Use it to fetch a specific user data by its ID.
 *
 * @param {String} userId - The user's ID.
 * @param {Function} setUser - Function to set the user data to be displayed.
 * @param {Function} setError - Function to set the request error message.
 */
export const getUserById = async (userId, setUser, setError) => {
  try {
    const response = await adminAxios.get(`/users/${userId}`);
    // Handle success
    setUser(response.data);
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    adminAPIErrorHandler(error.response, setError);
  }
};

/**
 * PATCH User
 *
 * Use it to update an existing user data in the database.
 *
 * @param {String} userId - The ID of the user to be updated.
 * @param {Object} user - The updated user data.
 * @param {Function} navigate - Function to navigate to another page.
 * @param {Function} setError - Function to set the request error message.
 */
export const patchUser = async (userId, user, navigate, setError) => {
  try {
    await adminAxios.patch(`/users/${userId}/`, user);
    // Handle success
    navigate('/admin/users');
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    adminAPIErrorHandler(error.response, setError);
  }
};

/**
 * DELETE User
 *
 * Use it to delete a user from the database.
 *
 * @param {String} userId - The ID of the user to be deleted.
 * @param {Function} setError - Function to set the request error message.
 */
export const deleteUser = async (userId, setError) => {
  try {
    await adminAxios.delete(`/users/${userId}`);
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    adminAPIErrorHandler(error.response.status, setError);
  }
};
