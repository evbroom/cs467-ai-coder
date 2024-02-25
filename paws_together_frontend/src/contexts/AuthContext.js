import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => localStorage.getItem('user') || null);
  const [authToken, setAuthToken] = useState(
    () => localStorage.getItem('authToken') || null
  );
  const [isAdmin, setIsAdmin] = useState(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin === 'true') {
      return true;
    }
    return false;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(localStorage.getItem('user') || null);
      setAuthToken(localStorage.getItem('authToken') || null);
      setIsAdmin(localStorage.getItem('isAdmin') || false);
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = async ({ username, token, is_admin }) => {
    localStorage.setItem('user', username);
    localStorage.setItem('authToken', token);
    localStorage.setItem('isAdmin', is_admin);
    setUser(username);
    setAuthToken(token);
    setIsAdmin(is_admin);
  };
  const logout = async () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAdmin');
    setUser(null);
    setAuthToken(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authToken,
        isAdmin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
