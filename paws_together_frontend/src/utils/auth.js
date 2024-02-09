import axios from 'axios';
import { API_URL } from './helpers';

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
