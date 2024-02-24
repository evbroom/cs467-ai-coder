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
 * Manage Users
 * -------------------
 * getUsers
 * getUserById
 * postUser
 * patchUser
 * deleteUser
 */

/**
 * GET request for users.
 *
 * Use it to fetch all user data and display them on the Manage Users Page.
 *
 * @param {String} authToken - The admin user's token.
 * @param {Function} setUsers - Function to set the user data to be displayed.
 * @param {Function} setError - Function to set the request error message.
 */
export const getUsers = async ({ authToken, setUsers, setError }) => {
  try {
    const response = await axios.get(`${API_URL}/users/`, {
      headers: {
        Authorization: `${TOKEN_PREFIX} ${authToken}`,
      },
    });
    // Handle success
    setUsers(response.data);
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    adminAPIErrorHandler(error?.response?.status, setError);
  }
};

/**
 * GET request for user by ID.
 *
 * Use it to fetch a specific user data by its ID.
 *
 * @param {String} authToken - The admin user's token.
 * @param {String} userId - The user's ID.
 * @param {Function} setUser - Function to set the user data to be displayed.
 * @param {Function} setError - Function to set the request error message.
 */
export const getUserById = async ({ authToken, userId, setUser, setError }) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `${TOKEN_PREFIX} ${authToken}`,
      },
    });
    // Handle success
    setUser(response.data);
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    adminAPIErrorHandler(error.response.status, setError);
  }
};

/**
 * POST request for user.
 *
 * Use it to add a new user to the database.
 *
 * @param {Object} User - The new user data.
 * @param {String} authToken - The admin user's token.
 * @param {Function} navigate - Function to navigate to another page.
 * @param {Function} setError - Function to set the request error message.
 */
export const postUser = async ({ user, authToken, navigate, setError }) => {
  try {
    await axios.post(`${API_URL}/users/`, user, {
      headers: {
        Authorization: `${TOKEN_PREFIX} ${authToken}`,
      },
    });
    // Handle success
    navigate('/admin/users');
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    adminAPIErrorHandler(error.response.status, setError);
  }
};

/**
 * PATCH request for user.
 *
 * Use it to update an existing user data in the database.
 *
 * @param {Object} User - The updated user data.
 * @param {String} userId - The ID of the user to be updated.
 * @param {String} authToken - The admin user's token.
 * @param {Function} navigate - Function to navigate to another page.
 * @param {Function} setIsSubmitted - Function to set the submission status.
 * @param {Function} setError - Function to set the request error message.
 */
export const patchUser = async ({
  user,
  userId,
  authToken,
  navigate,
  setError,
}) => {
  try {
    await axios.patch(`${API_URL}/users/${userId}/`, user, {
      headers: {
        Authorization: `${TOKEN_PREFIX} ${authToken}`,
      },
    });
    // Handle success
    navigate('/admin/users');
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    adminAPIErrorHandler(error.response.status, setError);
  }
};

/**
 * DELETE request for user.
 *
 * Use it to delete a user from the database.
 *
 * @param {String} userId - The ID of the user to be deleted.
 * @param {String} authToken - The admin user's token.
 * @param {Function} setError - Function to set the request error message.
 */
export const deleteUser = async ({ userId, authToken, setError }) => {
  try {
    await axios.delete(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `${TOKEN_PREFIX} ${authToken}`,
      },
    });
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    adminAPIErrorHandler(error.response.status, setError);
  }
};
