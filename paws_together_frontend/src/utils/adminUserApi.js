import axios from 'axios';
import { API_URL } from './helpers';

/**
 *  API - Manage Users in Admin Dashboard
 *  ------------
 *  getUsers
 *  postUser
 *  patchUser
 *  deleteUser
 *
 */

/**
 * Get request for Users.
 *
 * Use it to fetch all users and display them in the Admin Dashboard.
 *
 * @returns {Object} - status code and array of users.
 */
export const getUsers = async ({ authToken, setUsers, setError }) => {
  try {
    const response = await axios.get(`${API_URL}/users/`, {
      authorization: `Bearer ${authToken}`,
    });
    setUsers(response.data);
  } catch (error) {
    if (error.response) {
      setError(`${error.response.status} ${error.response.statusText}`);
    } else {
      setError('Failed to fetch users');
    }
  }
};

/**
 * POST request for User.
 *
 * Use it to add a new user to the database.
 *
 * @param {Object} user - The new user.
 * @returns {Object} - status code and the new user id.
 */
export const postUser = async ({ user }) => {
  try {
    const response = await axios.post(`${API_URL}/users/`, user);
    // Handle success
    return response;
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    return error.response;
  }
};

/**
 * PATCH request for User.
 *
 * @param {Object} user - The updated user.
 * @param {Number} id - The id of the user to be updated.
 * @returns {Object} - status code.
 */
export const patchUser = async (user, id) => {
  try {
    const response = await axios.patch(`${API_URL}/users/${id}/`, user);
    // Handle success
    return response;
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    return error.response;
  }
};

/**
 * DELETE request for User.
 *
 * Use it to delete an existing user from the database.
 *
 * @param {*} id - The id of the user to be deleted.
 * @returns {Object} - status code.
 */
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${id}/`);
    // Handle success
    return response;
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    return error.response;
  }
};
