import axios from 'axios';
import { API_URL } from './constants';
import { format } from 'date-fns';
import { userSignupLoginErrorHandler } from './helper';

/**
 * GET request for pet breeds.
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
    // Handle success
    setBreeds(response.data);
  } catch (error) {
    switch (error.response.status) {
      case 404:
        setError('No breeds found for this type.');
        break;
      case 500:
        setError('Server error. Please try again later.');
        break;
      default:
        setError('An unexpected error occurred. Please try again later.');
        break;
    }
  }
};

/**
 * GET request for the Browse Pets page and Pet Search form.
 *
 * Use it to fetch pet profiles based on the search criteria or all pet profiles.
 *
 * @param {*} param0
 */
export const getPetProfiles = async ({
  page,
  type,
  breed,
  dispositions,
  dateCreated,
  authToken,
  setPetProfiles,
  setIsNextPage,
  setError,
}) => {
  const queryParams = { page };
  type ? (queryParams.type = type) : null;
  breed ? (queryParams.breed = breed) : null;
  dispositions ? (queryParams.dispositions = dispositions) : null;
  dateCreated
    ? (queryParams.dateCreated = format(dateCreated, 'yyyy-MM-dd'))
    : null;

  try {
    const response = await axios.get(
      `${API_URL}/pets/`,
      {
        params: queryParams,
      },
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    // Handle success
    setIsNextPage(response.data.is_next_page);
    setPetProfiles(response.data.pets);
  } catch (error) {
    switch (error.response.status) {
      case 404:
        setError('No pet profiles found.');

      case 500:
        setError('Server error. Please try again later.');

      default:
        setError('An unexpected error occurred. Please try again later.');
    }
  }
};

export const getPetProfileById = async ({
  petId,
  authToken,
  setPetProfile,
  setError,
}) => {
  try {
    const response = await axios.get(`${API_URL}/pets/${petId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    // Handle success
    setPetProfile(response.data);
  } catch (error) {
    switch (error.response.status) {
      case 404:
        setError('Pet profile not found.');

      case 500:
        setError('Server error. Please try again later.');

      default:
        setError('An unexpected error occurred. Please try again later.');
    }
  }
};

/**
 * POST request for user signup.
 *
 * @param {Object} userData - User data to be posted. (username: string, email: string, password: string)
 * @param {Function} navigate - Function to navigate to a new page.
 * @param {Function} setError - Function to set the request error message.
 * @param {Function} login - Function to set the login status.
 */
export const postUserSignup = async ({
  userData,
  navigate,
  setError,
  login,
}) => {
  try {
    const response = await axios.post(`${API_URL}/signup/`, userData);
    // Handle success
    const { username, token, is_admin } = response.data;
    login({ username, token, isAdmin: is_admin });
    navigate('/');
  } catch (error) {
    userSignupLoginErrorHandler(error.response.status, setError, true);
  }
};

/**
 * POST request for user login.
 *
 * @param {Object} credentials - username: {String}, password: {String}
 * @param {Function} navigate - Function to navigate to a new page.
 * @param {Function} setError - Function to set the request error message.
 * @param {Function} login - Function to set the login status.
 */
export const postLogin = async ({ credentials, navigate, setError, login }) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, credentials);
    // Handle success
    const { username, token, is_admin } = response.data;
    login({ username, token, isAdmin: is_admin });
    navigate('/');
  } catch (error) {
    userSignupLoginErrorHandler(error.response.status, setError);
  }
};
