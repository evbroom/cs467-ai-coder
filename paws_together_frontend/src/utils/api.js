import axios from 'axios';
import { format } from 'date-fns';
import { API_URL, TOKEN_PREFIX } from './constants';
import { formatPetData } from './helper';

/**
 * User Signup Login Error Handler
 *
 * Handle error responses for user signup and login requests.
 *
 * @param {Number} status - HTTP status code
 * @param {Function} setError - Function to set the request error message.
 * @param {Boolean} isSignup - True if the error is from a signup request, false if from a login request.
 */
const userSignupLoginErrorHandler = (status, setError, isSignup = false) => {
  switch (status) {
    case 400:
      isSignup
        ? setError('Username or email already exists. Please try again.')
        : setError('Invalid username or password');
      break;
    case 401:
      setError('Invalid username or password');
      break;
    case 500:
      setError('Server error. Please try again.');
      break;
    default:
      setError('An unexpected error occurred. Please try again later.');
  }
};

/**
 * POST User Signup
 *
 * POST request for user signup.
 *
 * @param {Object} userData - User data to be posted. (username: string, email: string, password: string)
 * @param {Function} navigate - Function to navigate to a new page.
 * @param {Function} setSignupError - Function to set the request error message.
 * @param {Function} login - Function to set the login status.
 */
export const postUserSignup = async ({
  userData,
  navigate,
  setSignupError,
  login,
}) => {
  try {
    const response = await axios.post(`${API_URL}/signup/`, userData);
    // Handle success response
    const { username, token, is_admin } = response.data;
    login({ username, token, isAdmin: is_admin });
    navigate('/');
  } catch (error) {
    if (error.response) {
      // Handle error response
      userSignupLoginErrorHandler(error.response.status, setSignupError, true);
    } else {
      setSignupError('An unexpected error occurred. Please try again later.');
    }
  }
};

/**
 * Post Login
 *
 * POST request for user and admin login.
 *
 * @param {Object} credentials - User credentials to be posted. (username: string, password: string)
 * @param {Function} navigate - Function to navigate to a new page.
 * @param {Function} setLoginError- Function to set the request error message.
 * @param {Function} login - Function to set the login status.
 */
export const postLogin = async ({
  credentials,
  navigate,
  setLoginError,
  login,
}) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, credentials);
    // Handle success response
    const { token, is_admin } = response.data;
    login({ username: credentials.username, token, is_admin });
    navigate('/');
  } catch (error) {
    if (error.response) {
      // Handle error response
      userSignupLoginErrorHandler(error.response.status, setLoginError, true);
    } else {
      setLoginError('An unexpected error occurred. Please try again later.');
    }
  }
};

/**
 * GET Pet Breeds
 *
 * Use it to populate the breed dropdown in the Pet Search/Add/Edit form.
 *
 * @param {String} type - Pet type (e.g. dog, cat, other)
 * @param {Function} setBreeds - Function to set the pet breeds to be displayed.
 * @param {Function} setError - Function to set the request error message.
 */
export const getPetBreeds = async ({ type, setBreeds, setError }) => {
  try {
    const response = await axios.get(`${API_URL}/pets/breeds/${type}/`);
    // Handle success response
    setBreeds(response.data);
  } catch (error) {
    if (error.response) {
      // Handle error response
      switch (error.response.status) {
        case 404:
          setError('No breeds found for this type.');
          break;
        case 500:
          setError('Server error. Please try again later.');
          break;
        default:
          setError('An unexpected error occurred. Please try again later.');
      }
    } else {
      setError('An unexpected error occurred. Please try again later.');
    }
  }
};

/**
 * Get Pet Profiles
 *
 * GET request for the Browse Pets page and Pet Search form.
 *
 * @param {Number} page - Page number to fetch.
 * @param {Object} filter - Pet search filter object. (type: string, breed: string, dispositions: array, dateCreated: Date)
 * @param {Function} setPetProfiles - Function to set the pet profiles to be displayed.
 * @param {Function} setIsNextPage - Function to set the next page status.
 * @param {Function} setFetchError - Function to set the request error message.
 */
export const getPetProfiles = async ({
  page,
  filter = null,
  setPetProfiles,
  setIsNextPage,
  setFetchError,
}) => {
  // Set query parameters
  const queryParams = { page };
  if (filter) {
    const { type, breed, disposition, dateCreated } = filter;
    if (type) queryParams.type = type;
    if (breed) queryParams.breed = breed;
    if (disposition?.length > 0) queryParams.disposition = disposition;
    if (dateCreated) {
      queryParams.date_created = format(dateCreated, 'yyyy-MM-dd');
    }
  }

  try {
    const response = await axios.get(`${API_URL}/pets/`, {
      headers: {
        Authorization: `${TOKEN_PREFIX} ${localStorage.getItem('authToken')}`,
      },
      params: queryParams,
    });
    // Handle success response
    const responsePetData = response.data.pets;
    responsePetData.forEach((petData) => {
      formatPetData(petData);
    });
    setPetProfiles(responsePetData);
    setIsNextPage(response.data.is_next_page);
  } catch (error) {
    if (error.response) {
      // Handle error response
      switch (error.response.status) {
        case 400:
          setFetchError('Invalid request. Please check your inputs.');
          break;
        case 401:
          setFetchError('Token expired. Please log in again.');
          break;
        case 403:
          setFetchError('Forbidden. Please log in as an admin.');
          break;
        case 429:
          setFetchError('Too many requests. Please try again later.');
          break;
        case 500:
          setFetchError('Server error. Please try again later.');
          break;
        default:
          setFetchError(
            'An unexpected error occurred. Please try again later.'
          );
      }
    } else {
      setFetchError('An unexpected error occurred. Please try again later.');
    }
  }
};

/**
 * Get Pet Profile By ID
 *
 * GET request for pet profile by ID.
 *
 * @param {String} petId - The pet's ID.
 * @param {Function} setPetProfile - Function to set the pet profile to be displayed.
 * @param {Function} setFetchError - Function to set the request error message.
 */
export const getPetProfileById = async ({
  petId,
  setPetProfile,
  setFetchError,
}) => {
  try {
    const response = await axios.get(`${API_URL}/pets/${petId}`, {
      headers: {
        Authorization: `${TOKEN_PREFIX} ${localStorage.getItem('authToken')}`,
      },
    });
    // Handle success response
    formatPetData(response.data);
    setPetProfile(response.data);
  } catch (error) {
    if (error.response) {
      // Handle error response
      switch (error.response.status) {
        case 404:
          setFetchError('Pet profile not found.');
          break;
        case 500:
          setFetchError('Server error. Please try again later.');
          break;
        default:
          setFetchError(
            'An unexpected error occurred. Please try again later.'
          );
      }
    } else {
      setFetchError('An unexpected error occurred. Please try again later.');
    }
  }
};
