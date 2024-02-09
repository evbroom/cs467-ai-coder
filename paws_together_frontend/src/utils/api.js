import axios from 'axios';
import { API_URL } from './helpers';

/**
 *  API - Requests from Public Users
 *  ------------
 *  getPetBreeds
 *  getPetProfiles
 *  getSinglePetProfile
 *
 */

/**
 * GET request for pet breeds.
 *
 * Use it to populate the breed dropdown in the Pet Search form.
 *
 * @param {string} type - pet type (e.g. Dog, Cat, Other)
 * @returns {Object} - Returns an object with pet breeds.
 */
export const getPetBreeds = async (type) => {
  try {
    const response = await axios.get(`${API_URL}/pets/breeds/${type}`);
    // Handle success
    return response;
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    return error.response;
  }
};

/**
 * Get request for Pet Profiles for Browse Pets page and Pet Search form.
 *
 * Use it to fetch pet profiles based on the search criteria or all pet profiles.
 *
 * @param {number} page - Page number (e.g. 10 or 20 pet profiles per page).
 * @param {string} type - Pet type. (e.g. Dog, Cat, Other)
 * @param {string} breed - Pet breed.
 * @param {Array} disposition - Pet dispositions. (e.g. Good with other animals, Good with children, Animal must be leased at all times)
 * @param {string} dateCreated - Date created of pet profile. (Format: YYYY-MM-DD)
 * @returns {Object} - Returns an object with pet profiles, including a boolean indicating if next page exists.
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
    return response;
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    return error.response;
  }
};

/**
 * GET request for a single pet profile.
 *
 * Use it to fetch a single pet profile based on the pet profile id.
 *
 * @param {number} id - Pet profile id.
 * @returns {Object} - Returns an object with pet profile details.
 * @throws {Error} - Throws an error if there is an issue with the request.
 */
export const getSinglePetProfile = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/pets/${id}`);
    // Handle success
    return response;
  } catch (error) {
    // Handle error (e.g. 404, 500, etc.)
    console.log(error);
    throw new Error("Error fetching pet profile's details");
  }
};
