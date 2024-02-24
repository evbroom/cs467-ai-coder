export const adminAPIErrorHandler = (status, setError) => {
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

export const openInNewWindow = (url) => {
  window.open(url, '_blank');
};

/**
 * Format Type
 *
 * Capitalize the first letter of the type.
 * Used to format the response from the API.
 *
 * @param {String} type - The type of pet.
 * @returns
 */
export const formatType = (type) => {
  return type.charAt(0).toUpperCase() + type.slice(1);
};

/**
 * Format Availability
 * Used to format the response from the API.
 *
 * @param {String} availability - The availability of the pet.
 * @returns
 */
export const formatAvailability = (availability) => {
  switch (availability) {
    case 'available':
      return 'Available';
    case 'pending':
      return 'Pending';
    case 'adopted':
      return 'Adopted';
    default:
      return 'Not Available';
  }
};

/**
 * Format Disposition
 * Used to format the response from the API.
 *
 * @param {String} disposition - The disposition of the pet.
 * @returns
 */
export const formatDisposition = (disposition) => {
  switch (disposition) {
    case 'good_with_animals':
      return 'Good with other animals';
    case 'good_with_children':
      return 'Good with children';
    case 'leash_needed':
      return 'Must be leashed at all times';
    default:
      return 'Unknown';
  }
};

/**
 * Convert UTC Date
 *
 * Convert the date to month/day/year format.
 * Used to format the response from the API.
 *
 * @param {String} date - The date in UTC format.
 * @returns
 */
export const convertUTCDate = (date) => {
  const dateUTC = new Date(date + 'T00:00:00Z');
  const year = dateUTC.getUTCFullYear();
  const month = dateUTC.getUTCMonth() + 1;
  const day = dateUTC.getUTCDate();
  return `${month}/${day}/${year}`;
};

/**
 * Format Pet Data
 *
 * Format the pet data from the API response.
 * Used to format the response from the API.
 *
 * @param {Object} petData - The pet data from the API response.
 */
export const formatPetData = (petData) => {
  petData.type = formatType(petData.type);
  petData.availability = formatAvailability(petData.availability);
  petData.disposition = petData.disposition.map((item) => {
    return formatDisposition(item);
  });
  petData.date_created = convertUTCDate(petData.date_created);
};
