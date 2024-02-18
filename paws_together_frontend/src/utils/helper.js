export const adminAPIErrorHandler = (status, setError) => {
  switch (status) {
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
