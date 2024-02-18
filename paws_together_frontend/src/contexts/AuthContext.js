import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = async ({ username, token, isAdmin }) => {
    setUser(username);
    setAuthToken(token);
    setIsAdmin(isAdmin);
  };
  const logout = async () => {
    setUser(null);
    setAuthToken(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authToken,
        login,
        logout,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
