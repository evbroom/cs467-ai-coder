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

export const userSignupLoginErrorHandler = (
  status,
  setError,
  isSignup = false
) => {
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
      break;
  }
};

export const openInNewWindow = (url) => {
  window.open(url, '_blank');
};

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

export const convertUTCDate = (date) => {
  const dateUTC = new Date(date + 'T00:00:00Z');
  const year = dateUTC.getUTCFullYear();
  const month = dateUTC.getUTCMonth() + 1;
  const day = dateUTC.getUTCDate();
  return `${month}/${day}/${year}`;
};

export const formatPetData = (petData) => {
  petData.availability = formatAvailability(petData.availability);
  petData.disposition = petData.disposition.map((item) => {
    return formatDisposition(item);
  });
  petData.date_created = convertUTCDate(petData.date_created);
};
